import knex from "knex";
import { mysql } from '../../config/database.js'

const myKnex = knex(mysql);

class MySql {
    constructor() {}

    async create(table) {
        myKnex.schema.hasTable(table).then( exists => {
        if (!exists) {
            switch(table) {
                case 'productos':
                    return myKnex.schema.createTable(table, table => {
                
                        table.increments('id').primary();
                        table.string('nombre');
                        table.string('descripcion');
                        table.integer('codigo');
                        table.string('foto');
                        table.float('precio');
                        table.integer('stock');
                    });
                    break;
                case 'carritos':
                    return myKnex.schema.createTable(table, table => {
                        table.increments('id').primary();
                        table.string('nombre_carrito');
                        table.integer('id_producto');
                        table.string('nombre');
                        table.string('descripcion');
                        table.integer('codigo');
                        table.string('foto');
                        table.float('precio');
                        table.integer('stock');
                    });
                    break;
            }
        }else { console.log(`existe la tabla ${table}.`) }
        });
    }

    async get(collection, id) {
        try {
            if(id) {
                const product = await myKnex.from(collection).where('id','=',id);
                if(product.length===0){
                    return {error: 'producto no encontrado.'}
                }
                return product;
            }
            const products = await myKnex.from(collection).select();
            
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
            const res = await myKnex(collection).insert(product);
            return await this.get(collection, res);
        } catch (err) {
            throw err;
        }
    }

    async addToCart(collection, productId) {
         /**
         * HARDCODEADO a un solo carrito
         */
        try {
            const product = await this.get('productos', productId);
            if(product.error){
                return {error: 'producto no encontrado.'}
            }
            const { nombre, descripcion, codigo, foto, precio, stock } = product[0];
            const res = await myKnex(collection).insert({
                nombre_carrito: 'carrito1', 
                id_producto: productId,
                nombre,
                descripcion,
                codigo,
                foto,
                precio,
                stock
            });
    
            return await this.get(collection, res);
        } catch (err) {
            throw err;
        }
    }   

    async delete(collection, id){
        try {
            const itemDeleted = await this.get(collection, id);
            const res = await myKnex.from(collection).where('id','=', id).del();
            if(res) {
                return itemDeleted[0];
      
            }
            return {error: 'producto no encontrado.'}
        } catch (err) {
            throw err;
        }
    }

    async update(collection, product){
        try {
            const { id } = product;
            console.log('ID: ', id);
            console.log('update: ',product);
            const res = await myKnex.from(collection).where('id', id)
                .update( {...product});
            
            if(res) {
                const productUpdated = await this.get(collection, id);
                return productUpdated[0];        
            }
            return {error: 'producto no encontrado.'}
        } catch (err) {
            throw err;
        }
    }
}

export default MySql;
