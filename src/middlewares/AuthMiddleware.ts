import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { userPayload } from '../types/userPayload';
import { AuthService } from '../services/AuthService';


export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
    try {
        let authHeader = req.headers['authorization'] as string;
        const token = authHeader?.split(' ')[1];

        if(!token) {
            return res.status(401).json({"message": "Unauthorized: No token provided"});
        }

       const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as userPayload;
       const userData = await AuthService.findUserbyToken(decoded.username, token);
       if(!userData) {
        throw Error('401 Unauthorised');
       }

       if(req.method === 'POST' || req.method === 'PUT') req.body.user = decoded;
       else {
        const { id, username} = decoded;
        req.query = { id, username };
       } 
       next();
    } catch(err: unknown) {
        return res.status(403).json({message: 'Invalid or expired token'});
    }
}