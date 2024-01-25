import { response, request } from 'express';

export const loginUsuario = async(req=request, res=response) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({ok:false, msg: 'Por favor, contactarse con un admin'})
    }
}
export const crearUsuario = async(req=request, res=response) => {
    try {

    } catch (error) {
        console.log(error);
        return res.status(500).json({ok:false, msg: 'Por favor, contactarse con un admin'})
    }
}