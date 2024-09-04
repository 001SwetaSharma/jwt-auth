import bcrypt from 'bcryptjs';
import { userPayload } from '../types/userPayload';
import { generateToken } from '../utils/jwtAuth';

const users: userPayload[] = [];

export class AuthService {
    constructor(){}

    static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    static async comparePassword(plainText: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainText, hashPassword);
    }

    static async createUser(user: { username: string, password: string }): Promise<userPayload> {

        if(!user.username || !user.password) {
            throw new Error('400 invalid credentials');
        }
        const hashPassword = await this.hashPassword(user.password);

        const newUser: userPayload = {
            id: (users.length + 1).toString(),
            username: user.username,
            password: hashPassword
        }
        users.push(newUser);
        return newUser;
    }

    static async findUserByUserName(username: string): Promise<any> {
        return users.find(user => user.username === username);
    }

    static async findUserbyToken(username: string, token:string): Promise<userPayload | undefined> {
        return users.find(user => user.username === username && user.token === token);
    }

    static async saveUserToken(userDetail: userPayload): Promise<userPayload | undefined> {
        for(let user of users) {
            if(user.username === userDetail.username) {
                user.token = generateToken(user);
                return user;
            }
        }
    }
}