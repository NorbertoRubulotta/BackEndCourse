import dotenv from "dotenv"
import parse from 'yargs/yargs'
dotenv.config()
const yargs = parse(process.argv.slice(2))

export const info = yargs
    .alias({
        p: 'PORT'
    })
    .default({
        PORT: 8080,
    })
    .argv




export const VARIABLEDEENTORNO = process.env.VARIABLEDEENTORNO
export const PORT = process.env.PORT
export const CNX_STR = process.env.CNX_STR
export const DB_NAME = process.env.DB_NAME
export const SECRET_WORD = process.env.SECRET_WORD
export const SALT = process.env.SALT

export const MYSQLCONF = {
    client: process.env.MYSQLCLIENT,
    connection: process.env.MYSQLCONNECTION
}

