import { request, response } from 'express';
import { MessagesRepository } from '../repositories/index.js';

export const getMessages = async (req = request, res = response) => {
    try {
        const user = req.user;
        const message = req.message;
        const messages = await MessagesRepository.getMessages(user, message);
        return res.json({ messages });
    } catch (error) {
        return res.status(500).json({ msg: 'Hablar con un administrador' });
    }
};