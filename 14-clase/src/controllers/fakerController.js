
import { fakerProducts } from "../containers/containerFaker.js";


export async function getFakerProducts(req, res) {
    const array = await fakerProducts.getAll();
    res.status(200);
    res.json(array);


}

