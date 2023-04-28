import dotenv from "dotenv"
import parse from 'yargs/yargs'
dotenv.config()
const yargs = parse(process.argv.slice(2))


// Files
export const RUTA = '../products.txt';
export const CART_ROUT = '../cart.txt';

// PERSISTENCIA
export const PERSISTENCIA = 'mongodb';


export const info = yargs
    .alias({
        p: 'PORT',
        m: 'MODE'
    })
    .default({
        PORT: 8080,
        MODE: 'FORK'
    })
    .argv


export const NODE_MAILER_CONFIG = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASS
    }
};

export const CNX_STR = process.env.CNX_STR
export const DB_NAME = process.env.DB_NAME
export const SECRET_WORD = process.env.SECRET_WORD
export const SALT = process.env.SALT
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL

