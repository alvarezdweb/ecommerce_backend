import { Router } from "express";
import Products from "../../services/Products.js";

const route = Router();
const product = new Products();

export default (app) => {
    app.use('/productos', route);

    route.get('/listar', async (req, res) => {
        res.json(await product.getProducts());
    });

    route.get('/listar/:id', async (req, res) => {
        res.json(await product.getProducts(req.params.id))
    });

    route.post('/agregar', async (req, res) => {
        const newProduct = req.body;   
        res.send(await product.addProduct(newProduct));
    });

    route.put('/actualizar/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const updateData = { id: id, ...req.body };
        res.json(await product.updateProduct(updateData));
    });

    route.delete('/borrar/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        res.json(await product.deleteProduct(id));
    });
}