// src/types/express.d.ts
import { userPayload } from './userPayload';

declare global {
    namespace Express {
        interface Request {
            user?: userPayload; // Adding the user property to the Request interface
        }
    }
}
