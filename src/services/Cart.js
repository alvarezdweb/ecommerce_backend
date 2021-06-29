import { read, create, write } from './persistence.js';
class Cart {

    #cartItems
    #file = 'cart.txt'

    constructor(products = []){
        this.#cartItems = products;
        create(this.#file, this.#cartItems);
    }

    async getCartItems(id){

        this.#cartItems = await read(this.#file);

        if(id) {
            const product = this.#cartItems.filter( product => product.id == id);
            if(product.length===0){
                return {error: 'producto no encontrado.'}
            }
            return product;
        }
        if(this.#cartItems.length===0){
            return {error: 'no hay productos cargados.'}
        }
        return this.#cartItems;
    }

    async addItem(productId, cartId = 1) {

        this.#cartItems = await read(this.#file);
        let products = await read('products.txt');

        let product = products.filter(product => product.id == productId);
        /**
         * Hardcodeado a 1 carrito. Cuando el proyecto avance puede recibir
         * por req.params.ID_CARRITO ?
         */
        const cart = this.#cartItems.filter( cart => cart.id === cartId );

        if(cart.length === 0) {
            cart.push({id: cartId, timestamp: Date.now(), products: []})
        }

        if(product.length === 0) {
            return { error: "producto no encontrado." }
        }

        cart[0].products.push(product[0]);
        this.#cartItems = cart;
        await write(this.#file, this.#cartItems);

        return cart[0];
    };

    async deleteItem(id) {
        let deletedItem;

        this.#cartItems = await read(this.#file);

        this.#cartItems = this.#cartItems.filter( item => {
            if( item.id != id){
                return item
            }
            deletedItem = item;
        });

        await write(this.#file, this.#cartItems);
        
        if(deletedItem){
            return deletedItem;
        }
        return {error: 'producto no encontrado.'}
    }
}

export default Cart;