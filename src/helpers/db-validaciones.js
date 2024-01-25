import { ProductsRepository, UsersRepository } from "../repositories/index.js";

export const existeEmail = async (email) => {
    const emailExiste = await UsersRepository.getUserByEmail(email);
    if(emailExiste)
        throw new Error(`El email ${email} ya esta registrado`);
}

export const existeCode = async (code) => {
    const codeExiste = await ProductsRepository.getProductByCode(code);
    if(codeExiste)
        throw new Error(`El code ${code} ya esta registrado en otro producto`);
}