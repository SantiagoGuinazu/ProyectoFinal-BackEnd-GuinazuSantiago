import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';

export const sendEmail = async (email, url) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
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
            html: templateHtmlEmail(email, url)
        });

    } catch (error) {
        logger.error(error);
    }
};

const templateHtmlEmail = (email, url) => {
    const titulo = 'Cambiar contraseña en la cuenta de Ecommerce';
    const link = url;
    return (
        `<div>
            <p>Agregar template de John ${email} + ${titulo} + ${link}</p>
        </div>`
    );
};