import factory from './factory.js';
import config from '../config/index.js';



const Persistence = await factory.getPersistence(config.persistence);
const instance = new Persistence();

class Products {
    
    #products 
    #collection = 'productos';

    constructor(products) {
        this.#products = products || [];
        if(config.persistence === 'mysql'){
            instance.create(this.#collection);
        } 
    };

    async getProducts(id) {
        return await instance.get(this.#collection,id)
    };

    async addProduct(product) {
        return instance.add(this.#collection, product);
    };

    async updateProduct(product) {
        return await instance.update(this.#collection, product);
    };

    async deleteProduct(id) {
        return await instance.delete(this.#collection, id);
    }
}

export default Products;