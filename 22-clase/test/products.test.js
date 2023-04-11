import { info } from '../src/config/config.js'
import { createServer } from '../src/negocio/server/createServer.js';
import chai from 'chai';
import axios from 'axios';
const PORT = info.p
axios.defaults.baseURL = `http://localhost:${PORT}/api/products`
const expect = chai.expect
await createServer(PORT)
describe('Test products API', () => {
    describe('GET', () => {
        it('Debería devolver un array y status 200', async () => {
            const { data, status } = await axios.get('/')
            expect(status).to.eql(200)
            expect(data).to.be.a('array')
        })
    })

    describe('POST', () => {
        it('debería incorporar un usuario', async () => {
            const newProduct = {
                "name": "Papa Noel",
                "description": "El mejor Papa Noel",
                "price": 1500,
                "image": "{{IMAGE_URL_3}}"
            }
            const { status, data } = await axios.post('/', newProduct)
            expect(status).to.eql(201)
            const newProductSaved = data
            expect(newProductSaved).to.include.keys('name', 'price', 'description', 'id', 'image')
            expect(newProductSaved.name).to.equal(newProduct.name)
            expect(newProductSaved.price).to.equal(newProduct.price)
            expect(newProductSaved.description).to.equal(newProduct.description)
            expect(newProductSaved.image).to.equal(newProduct.image)
        })
    })

    describe('GET product by ID', () => {
        it('Debería devolver un usuario', async () => {
            const { status, data } = await axios.get('/25a80830-8fb9-431c-883e-3d1cbb09e73d')
            expect(status).to.eql(200)
            expect(data.id).to.eql("25a80830-8fb9-431c-883e-3d1cbb09e73d")
        })
    })

    describe('PUT product by id', () => {
        it('Debería modificar y devolver un usuario', async () => {
            const productToUpdate = {
                "name": "Test Put with Mocha",
                "price": 1700,
                "image": "{{IMAGE_URL_4}}"
            }
            const { status, data } = await axios.put('/5c18a570-6a14-4fd7-9dcb-68a01be4ca17', productToUpdate)
            expect(status).to.eql(201)
            expect(data.name).to.equal(productToUpdate.name)
            expect(data.price).to.equal(productToUpdate.price)
            expect(data.image).to.equal(productToUpdate.image)
        })
    })

    describe('DELETE one product by id', () => {
        it('Deberia eliminar un producto y devolver status 200', async () => {
            const { status, data } = await axios.delete('/2c444a96-e61a-4df1-994f-cd7d817f3bfc')
            expect(status).to.eql(200)
            expect(data.acknowledged).to.equal(true)
            expect(data.deletedCount).to.equal(1)
        })
    })

})