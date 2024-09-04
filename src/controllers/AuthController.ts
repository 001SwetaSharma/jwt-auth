import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { generateToken } from '../utils/jwtAuth';
import { userPayload } from '../types/userPayload';

export class AuthController {
    constructor(){}

    public async register(req: Request, res: Response){
        try {
            const userExists = await AuthService.findUserByUserName(req.body.username);
            
            if(userExists) {
                throw new Error('400 User already exists!');
            }
            const user = await AuthService.createUser(req.body);
            res.status(201).json({'message':'registered successfully', data: user});
        } catch (err: unknown) {
            throw err;
        }
    }

    public async login(req: Request, res: Response){
        try {
            const { username, password } = req.body;
            if(!username || !password) {
                throw new Error('400 Invalid Credentials!');
            }

            const userDetail = await AuthService.findUserByUserName(username);
            if(!userDetail) {
                throw new Error('400 Invalid Credentials!');
            }
            const checkPassword = await AuthService.comparePassword(password, userDetail.password);
            if(!checkPassword) {
                throw new Error('400 Invalid Credentials!');
            }

            const token = (await AuthService.saveUserToken(userDetail))?.token;
            if(!token) {
                throw new Error('User token not saved successfully');
            }
            res.status(200).json({"message": "successfully logged in", data: token});
        } catch(err: unknown) {
            throw err;
        }
    }

    public async profile(req:Request, res:Response) {
        const username = req.query.username;

        if(!username) {
            throw new Error('Unauthorized, user is not logged in');
        }
        try {
            
            res.status(200).json({message: `Welcome user:: ${username}`})
        } catch(err: unknown) {
            throw err;
        }
    }
}