import express from 'express'
import routerApiProducts from './routerApiProducts.js'
import routerApiMessages from './routerApiMessages.js'

export const app = express()

app.use(express.json())

app.use('/api/products', routerApiProducts);
app.use('/api/messages', routerApiMessages);