import express from 'express'
import { addProduct, deleteProduct, getActiveProducts, getAllProduct, getProductById, updateProduct, vendorRegister } from '../Controller/vendorController.js';

const router = express.Router()

router.post('/register', vendorRegister)
router.post('/addProduct/:vendorId', addProduct)
router.get('/getAllProducts', getAllProduct)
router.get('/getProduct/:id', getProductById)
router.post('/updateProduct/:id',updateProduct)
router.delete('/deleteProduct/:id', deleteProduct)
router.get('/getActiveProducts/:avtive',getActiveProducts)


export default router;