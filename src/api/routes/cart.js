import { Router } from "express";
import Cart from "../../services/Cart.js";

const route = Router();
const cart = new Cart();

export default (app) => {
    app.use('/carrito', route);

    route.get('/listar', async (req, res) => {
        res.json(await cart.getCartItems());
    });

    route.get('/listar/:id', async (req, res) => {
        res.json(await cart.getCartItems(req.params.id));
    });

    route.post('/agregar/:id_producto', async (req, res) => {
        const productId = req.params.id_producto;   
        res.send(await cart.addItem(productId));
    });

    route.delete('/borrar/:id', async (req, res) => {
        const id = req.params.id;
        res.json(await cart.deleteItem(id));
    });
}