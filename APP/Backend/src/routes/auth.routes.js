//en este archivo se definen todas las rutas de los controladores, en este caso de autenticacion
import { Router } from "express";
import {authUser, registerUser} from '../controllers/auth.controller.js'

const router = Router()
router.post('/login', authUser)
router.post('/register', registerUser)

export default router
