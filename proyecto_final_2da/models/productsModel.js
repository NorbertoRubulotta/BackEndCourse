import { chosenProdsContainer } from "../containers/DataContainer.js";
import { randomUUID } from 'crypto';


function validadrProducto(obj) {
    if (!obj.name) throw new Error('Product title is mandatory');
    if (!obj.description) throw new Error('Product description is mandatory');
    if (typeof obj.name !== 'string') throw new Error('Title is not valid');
    if (typeof obj.description !== 'string') throw new Error('description is not valid');
    if (!obj.price) throw new Error('Price can not be empty');
    if (obj.price < 0) throw new Error('The price is incorrect');
    if (!obj.image) throw new Error('Product image is mandatory');
    return obj;
}

export async function saveProds(obj) {
    obj.id = randomUUID();
    let newProductValidated = validadrProducto(obj)
    try {
        newProductValidated = await chosenProdsContainer.save(newProductValidated);
        return newProductValidated;
    } catch (err) {
        throw new Error({ errorMsg: err.message });
    }
}

