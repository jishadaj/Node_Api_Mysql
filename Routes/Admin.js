import express from 'express'
import { deleteUser, getAllUsers, updateUser } from '../Controller/adminControllers.js';


const router = express.Router();

router.get('/getAllUsers',getAllUsers)
router.put('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)


export default router