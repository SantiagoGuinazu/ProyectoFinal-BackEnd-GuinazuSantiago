import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';

export const sendEmail = async (email, url, cliente) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASS_EMAIL,
            },
        });

        await transporter.sendEmail({
            from: `Ecommerce <santigui2003@gmail.com>`,
            to: `${email}`,
            subject: 'Cambiar contraseña',
            html: templateHtmlEmail(email, url, cliente)
        });

    } catch (error) {
        logger.error(error);
    }
};

export const sendEmailTicket = async (email, codigo, cliente, items, totalCompra) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASS_EMAIL,
            },
        });

        await transporter.sendMail({
            from: `Ecommerce <santigui2003@gmail.com>`,
            to: `${email}`,
            subject: 'Ticket de compra',
            html: templateHtmlEmailCompra(codigo, cliente, items, totalCompra)
        });

    } catch (error) {
        logger.error(error)
    }
}

const templateHtmlEmailCompra = (codigo, cliente, items, totalCompra) => {
    console.log({ items });
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Ticket de Compra</h2>
            <h3>Código: ${codigo}</h3>
            <p>Estimado(a) ${cliente},</p>
            <p>¡Gracias por tu compra!</p>
            <h3>Detalles de la compra:</h3>
            <ul>
                ${items.map(item => `
                    <li>
                        <strong>${item.title}</strong> - ${item.quantity} x $${item.price}
                    </li>
                `).join('')}
            </ul>
            <p>Total de la compra: $${totalCompra}</p>
            <p>¡Esperamos verte pronto de nuevo!</p>
            <p>Saludos,</p>
            <p>Tu Tienda Online</p>
        </div>
    `;
}

const templateHtmlEmail = (email, url, cliente) => {
    const link = url;
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Cambiar contraseña</h2>
        <h3>Email: ${email}</h3>
        <p>Estimado(a) ${cliente},</p>
        <p>Haga click en este link para el cambio de contraseña ${link},</p>
        <h3>Detalles de la compra:</h3>
        <p>Saludos,</p>
    </div>
`;
};