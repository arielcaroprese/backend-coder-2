import { Router } from 'express';
import productsManager from '../productsManager.js';
import { socketServer } from '../app.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const products = await productsManager.getProducts();
        res.render('home', {products})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error interno del servidor"})
    }
})

router.get('/realtimeproducts', async (req, res) => {
    try {
        res.render('realTimeProducts');
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Error interno del servidor"})
    }
})

export default router;