import { Router } from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import {deleteUser , alterUser, changePass} from '../controllers/user.controller.js'


const router = Router()

router.delete('/delete' , verifyToken , deleteUser )
router.put('/updateUser', verifyToken, alterUser)
router.patch('/changePass', verifyToken, changePass)

export default router 