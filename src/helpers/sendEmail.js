import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';

export const sendEmail = async (email) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth:{
                user: process.env.USER_EMAIL,
                pass: process.env.PASS_EMAIL,
            },
        });

        await transporter.sendEmail({
            from: `Ecommerce <santigui2003@gmail.com>`,
            to: `${email}`,
            subject: 'Cambiar contraseña',
            html: templateHtmlEmail(email)
        })

    } catch (error) {
        logger.error(error)
    }
}

const templateHtmlEmail = (email) => {
    const titulo = 'Cambiar contraseña en la cuenta de Ecommerce';
    const link = 'Aun falta configurar';
    return (
        `<div>
            <p>Agregar template de John ${titulo} + ${link}</p>
        </div>`
    );
}