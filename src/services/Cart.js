import factory from './factory.js';
import config from '../config/index.js';


const Persistence = await factory.getPersistence(config.persistence);
const instance = new Persistence();

class Cart {

    #cartItems
    #collection = 'carritos';


    constructor(products = []){
        this.#cartItems = products;
        if(config.persistence === 'mysql'){
            instance.create(this.#collection);
        } 
    }

    async getCartItems(id){
        return await instance.get(this.#collection, id)
    }

    async addItem(productId) {
        return await instance.addToCart(this.#collection, productId);
    };

    async deleteItem(id) {
        return await instance.delete(this.#collection, id);
    }
}

export default Cart;