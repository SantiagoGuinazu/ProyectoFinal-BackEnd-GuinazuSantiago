import jwt from 'jsonwebtoken';
import { logger } from './logger.js';

export const generateToken = (user, timeExpire ='8h') => {
    try {
        return jwt.sign({...user},process.env.JWT_SECRET_KEY,{expiresIn:timeExpire});
    } catch (error) {
        logger.error();
        throw error;
    }
};