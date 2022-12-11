import express from 'express'
import { routerProducts, routerShoppingCart } from './routers/routes_controllers.js';

// Server
export const app = express()

const PORT = process.env.PORT ?? 8080

const server = app.listen(PORT, () => {
    console.log(`Server running on PORT ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', routerProducts)
app.use('/api/shoppingcart', routerShoppingCart)

let isAdmin = false;

export function onlyForAdmins(req, res, next) {
    if (isAdmin) {
        next()
    } else {
        res.status(403).json({ Error: -1, Description: `ROUTE '${req.originalUrl}', METHOD '${req.method}' NOT AUTHORIZED` })
    }
}

app.post('/login', (req, res) => {
    isAdmin = true
    res.status(200).json({ Message: "Login Successful" })
})

app.post('/logout', (req, res) => {
    isAdmin = false
    res.status(200).json({ Message: "Logout Successful" })
})

app.all('*', (req, res) => {
    res.status(404).json({ Error: -2, Description: `ROUTE '${req.originalUrl}', METHOD '${req.method}' NOT FOUND ` })
})


/* ===================== PRODUCTOS PARA CARGAR =========================================

{"title": "Escuadra", "price": "123.45", "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"}
{"title": "Calculadora", "price": "234.56", "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"}
{"title": "Globo Terráqueo", "price": "345.67", "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"}
*/

