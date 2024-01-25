import { response, request } from 'express';
import { UsersRepository } from '../repositories/index.js';
import { createHash } from '../utils/bcryptPassword.js';
import { generateToken } from '../utils/jsonWebToken.js';

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
        req.body.password = createHash(req.body.password);
        const result = await UsersRepository.registerUser(req.body);
        const {_id, name, lastName, email, rol} = result;
        const token = generateToken({_id, name, lastName, email, rol});
        return res.json({ok:true, result, token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok:false, msg: 'Por favor, contactarse con un admin'})
    }
}