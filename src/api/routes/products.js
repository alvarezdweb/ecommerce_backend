import { Router } from "express";
import Products from "../../services/Products.js";
import isAdmin from "../middlewares/isAdmin.js";

const route = Router();
const product = new Products();

export default (app) => {
    app.use('/productos', route);

    route.get('/info', (req, res) => {
        res.send('INFO OK!');
    })

    route.get('/listar', async (req, res) => {
        res.json(await product.getProducts());
    });

    route.get('/listar/:id', async (req, res) => {
        res.json(await product.getProducts(req.params.id))
    });

    route.post('/agregar', isAdmin, async (req, res) => {
        const newProduct = req.body.item;   
        res.send(await product.addProduct(newProduct));
    });

    route.put('/actualizar/:id', isAdmin, async (req, res) => {
        const id = req.params.id;
        const updateData = { id: id, ...req.body.item };
        res.json(await product.updateProduct(updateData));
    });

    route.delete('/borrar/:id', isAdmin, async (req, res) => {
        const id = req.params.id;
        res.json(await product.deleteProduct(id));
    });
}