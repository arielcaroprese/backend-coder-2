import { Router } from "express"
import productsManager from '../productsManager.js';
import { socketServer } from '../app.js';

const router = Router()

router.get('/', async (req, res) => {
    const {limit} = req.query
    try {
        const products = await productsManager.getProducts(limit)
        res.status(200).json({ message: 'Products', products})
    } catch (error) {
        res.status(500).json({error})
        console.log(error)
    }
})

router.get('/:idProduct', async (req, res) => {
    const {idProduct} = req.params
    try {
        const product = await productsManager.getProductsById(+idProduct)
        res.status(200).json({ message: 'Products', product})
    } catch (error) {
        res.status(500).json({error})
    }
}) 

router.post('/', async (req, res) => {
    const newProduct = req.body
    try {
        const addedProduct = await productsManager.addProduct(newProduct)
        const products = await productsManager.getProducts()
        socketServer.emit('productsUpdate', products)
        res.status(200).json({ message: 'Product added', addedProduct})
    } catch (error) {
        
    }
})

router.put('/:idProduct', async (req, res) => {
    const {idProduct} = req.params
    const updatedInfo = req.body
    try {
        const updatedProduct = await productsManager.updateProduct(+idProduct, updatedInfo)
        res.status(200).json({ message: 'Product updated', updatedProduct})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.delete('/:idProduct', async (req, res) => {
    const {idProduct} = req.params
    try {
        await productsManager.deleteProduct(+idProduct)
        const products = await productsManager.getProducts()
        socketServer.emit('productsUpdate', products)
        res.status(200).json({ message: 'Product deleted'})
    } catch (error) {
        res.status(500).json({error})
    }
})

export default router