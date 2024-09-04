import jwt from 'jsonwebtoken';
import { userPayload } from '../types/userPayload';

export const generateToken = (user: userPayload) => {
    const secretKey = process.env.JWT_SECRET || 'jwt-auth-poc-project';
    return jwt.sign(user, secretKey, { expiresIn: '1hr'});
}