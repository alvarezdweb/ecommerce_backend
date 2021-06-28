import { read, create, write } from './persistence.js'

class Products {
    
    #products 
    #file = 'products.txt'

    constructor(products) {
        this.#products = products || [];
        create(this.#file, this.#products);
    };

    async getProducts(id) {
        
        this.#products = await read(this.#file);

        if(id) {
            const product = this.#products.filter( product => product.id == id);
            if(product.length===0){
                return {error: 'producto no encontrado.'}
            }
            return product;
        }
        if(this.#products.length===0){
            return {error: 'no hay productos cargados.'}
        }
        return this.#products;
    };

    async addProduct(product) {

        this.#products = await read(this.#file);
        const newProduct = {id: this.#products.length +1, timestamp: Date.now(), ...product}
        this.#products.push(newProduct);
        await write(this.#file, this.#products);

        return newProduct;
    };

    async updateProduct(product) {

        let updated = false;

        this.#products = await read(this.#file);

        this.#products = this.#products.map( e => {
            if(e.id === product.id){
                updated = true;
                return product;

            }
            return e;
        });

        await write(this.#file, this.#products);
        
        if(updated){
            return product;
        }
        return {error: 'producto no encontrado.'}
    };

    async deleteProduct(id) {
        let deletedItem;

        this.#products = await read(this.#file);

        this.#products = this.#products.filter( product => {
            if( product.id != id){
                return product
            }
            deletedItem = product;
        });

        await write(this.#file, this.#products);
        
        if(deletedItem){
            return deletedItem;
        }
        return {error: 'producto no encontrado.'}
    }
}

export default Products;