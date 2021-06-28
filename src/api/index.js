import { Router } from 'express';
import products from './routes/products.js';
import cart from './routes/cart.js';


export default () => {
    const app = Router();
    products(app);
    cart(app);

    return app;
}