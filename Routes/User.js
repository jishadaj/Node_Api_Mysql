import express from 'express'
import { userRegistration, userLogin } from '../Controller/userController.js'
import { getAllProduct } from '../Controller/vendorController.js'

const router = express.Router()

router.post('/register',userRegistration)
router.post('/login', userLogin)
router.get('/getAllProducts', getAllProduct)

export default router;