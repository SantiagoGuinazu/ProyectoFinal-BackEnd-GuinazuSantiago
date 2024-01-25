import { response, request } from 'express';
import { UsersRepository } from '../repositories/index.js';

export const loginUsuario = async(req=request, res=response) => {
    try {
        return res.json({ok:true, msg:'loginUsuario'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok:false, msg: 'Por favor, contactarse con un admin'})
    }
}
export const crearUsuario = async(req=request, res=response) => {
    try {
        const result = await UsersRepository.registerUser(req.body);
        return res.json({ok:true, result})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok:false, msg: 'Por favor, contactarse con un admin'})
    }
}