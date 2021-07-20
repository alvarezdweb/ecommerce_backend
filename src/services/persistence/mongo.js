
class Mongo {

    constructor(){}

    async get(collection, id) {
        try {
            const model = await this.getCollection(collection);            
            if(id) {
                const product = await model.findById(id);
                if(product === null){
                    return {error: 'producto no encontrado.'}
                }
                return product;
            }
            const products = await model.find();

            if(products.length===0){ 
                return {error: 'no hay productos cargados.'}
            }

            return products;
        } catch (err) {
            throw err;
        }
    }

    async add(collection, product){
        try {
            console.log(product);
            const model = await this.getCollection(collection);

            return await model.create(product);
        } catch (err) {
            throw err;
        }
    }

    async addToCart(collection, productId) {
         /**
         * HARDCODEADO a un solo carrito
         */
        try {
            const cartItems = await this.get(collection);
            const product = await this.get('productos', productId);
            console.log(product);
            if(product.error) {
                return {error: 'producto no encontrado.'};
            }

            if(cartItems.error){
                return this.add(collection, {timestamp: new Date(), products: product });
            }

            cartItems[0].products.push(product);
            return await this.update(collection, cartItems[0]);
        } catch (err) {
            throw err;
        }
    }

    async delete(collection, id){
        try {
            const model = await this.getCollection(collection);
            const deletedItem =  await this.get(collection, id);
            await model.deleteOne({_id: id});
            return deletedItem;
        } catch (err) {
            throw err;
        }
    }

    async update(collection, product){
        try {
            const model = await this.getCollection(collection);
            const res = await model.updateOne({_id: product.id}, {$set: {...product}});
            
            if(res){
                return res;
            }
            return {error: 'producto no encontrado.'}
        } catch (err) {
            throw err;
        }
    }

    async getCollection(collection) {
        try {
            const model = await import(`../../models/${collection}.js`)
            console.log('myModel: ', model);
            return model.default 
        } catch (err) {
            throw err;
        }
    }
}

export default Mongo;