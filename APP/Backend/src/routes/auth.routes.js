//en este archivo se definen todas las rutas de los controladores, en este caso de autenticacion
import { Router } from "express";
import {authUser, registerUser, verify} from '../controllers/auth.controller.js'

const router = Router()
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autenticación de usuario
 *     description: Retorna el token de autenticación para los usuarios registrados
 *     tags:
 *       - autenticacion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 example: '123456'
 *     responses:
 *       200:
 *         description: Respuesta con token de autenticación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Se ha iniciado sesion correctamente' 
 *                 token:
 *                   type: string
 *                   example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...'
 *       401:
 *         description: Correo o contraseña incorrecta
 * 
 *       500:   
 *         description: Error interno del servidor
 */
router.post('/login', authUser)

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registro de usuarios
 *     description: Utilizado para registrar a un usuario nuevo con un correo único 
 *     tags:
 *       - autenticacion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:        
 *               first_name:
 *                 type: string
 *                 example: Juan
 *               last_name:
 *                 type: string
 *                 example: Juan
 *               mail:
 *                 type: string
 *                 format: email
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 example: '123456'
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Se ha registrado correctamente'
 *       401:
 *         description: Campos faltantes o inválidos
 */
router.post('/register', registerUser)


/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: Verifica la validez del token JWT
 *     description: Verifica si el token del usuario aún es válido y retorna los datos del usuario autenticado.
 *     tags:
 *       - autenticacion
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido y usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Token válido'
 *                 user:
 *                   type: object
 *                   properties:
 *                     id_user:
 *                       type: integer
 *                       example: 1
 *                     first_name:
 *                       type: string
 *                       example: Juan
 *                     last_name:
 *                       type: string
 *                       example: Pérez
 *                     mail:
 *                       type: string
 *                       format: email
 *                       example: juan@example.com
 *       401:
 *         description: Token inválido o sesión expirada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Sesión expirada. Vuelve a iniciar sesión.'
 *       403:
 *         description: Token inválido o no autorizado
 */

router.get('/verify', verify)

export default router
