import {Router } from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import {createProject, getAllProjects, getProjectById, updateProject, deleteProject} from '../controllers/project.controller.js'


const router = Router()

/**
 * @swagger
 * /project/create:
 *   post:
 *     summary: Crea un nuevo proyecto
 *     description: Permite crear un proyecto asociado al usuario
 *     tags:
 *       - proyectos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Proyecto Nuevo
 *               description:
 *                 type: string
 *                 example: Descripción del proyecto
 *               status:
 *                 type: string
 *                 enum: [en proceso, finalizado, pausado, cancelado]
 *                 example: en proceso
 *               ispublic:
 *                 type: boolean
 *                 example: false
 *               expiration_time:
 *                 type: string
 *                 format: date-time
 *                 example: "2027-12-31T23:59:59Z"
 *     responses:
 *       200:
 *         description: Proyecto creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Se ha creado el proyecto correctamente
 *       400:
 *         description: Campos faltantes o inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/create',verifyToken,  createProject)

/**
 * @swagger
 * /project/getAllProjects:
 *   get:
 *     summary: Obtiene todos los proyectos
 *     description: Método utilizado para obtener todos los proyectos del usuario
 *     tags:
 *       - proyectos
 *     security:
 *       - bearerAuth: []
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
 *                   example: Proyectos obtenidos correctamente
 *                 count: 
 *                   type: integer
 *                   example: 1   
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_project:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: Titulo del Proyecto
 *                       description:
 *                         type: string
 *                         example: Aquí va la descripción
 *                       status:
 *                         type: string
 *                         example: en proceso
 *                       ispublic:
 *                         type: boolean
 *                         example: false
 *                       expiration_date:
 *                         type: string
 *                         format: date-time
 *                         example: "2027-12-31T23:59:59Z"
 *                       defeated_time:
 *                         type: string
 *                         format: date-time
 *                         example: "2027-12-31T23:59:59Z"
 *       400:
 *         description: Campos faltantes o inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/getAllProjects', verifyToken, getAllProjects)

/**
 * @swagger
 * /project/get/{id_project}:
 *   get:
 *     summary: Obtiene proyecto por id    
 *     description: Método utilizado para obtener un proyecto usando el id         
 *     tags:
 *       - proyectos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_project
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proyecto
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
 *                   example: Proyecto obtenido correctamente
 *                 data:
 *                   type: object
 *                   count: 
 *                     type: integer
 *                     example: 1   
 *                   properties:
 *                     id_project:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: Título del Proyecto
 *                     description:
 *                       type: string
 *                       example: Aquí va la descripción
 *                     status:
 *                       type: string
 *                       example: en proceso
 *                     ispublic:
 *                       type: boolean
 *                       example: false
 *                     expiration_date:
 *                       type: string
 *                       format: date-time
 *                       example: "2027-12-31T23:59:59Z"
 *                     defeated_time:
 *                       type: string
 *                       format: date-time
 *                       example: "2027-12-31T23:59:59Z"
 *       400:
 *         description: Campos faltantes o inválidos
 *       401:
 *         description: No encontrado o no autorizado
 *       500:
 *         description: Error del servidor
 */
router.get('/get/:id_project', verifyToken, getProjectById )

/**
 * @swagger
 * /project/modify/{id_project}:
 *   put:
 *     summary: Actualiza un proyecto
 *     description: Permite modificar un proyecto asocieado
 *     tags:
 *       - proyectos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_project
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proyecto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Proyecto Nuevo
 *               description:
 *                 type: string
 *                 example: Descripción del proyecto
 *               status:
 *                 type: string
 *                 enum: [en proceso, finalizado, pausado, cancelado]
 *                 example: en proceso
 *               ispublic:
 *                 type: boolean
 *                 example: false
 *               expiration_time:
 *                 type: string
 *                 format: date-time
 *                 example: "2027-12-31T23:59:59Z"
 *     responses:
 *       200:
 *         description: Proyecto modificado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Se ha modificado el proyecto correctamente
 *       400:
 *         description: Campos faltantes o inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/modify/:id_project', verifyToken, updateProject )

/**
 * @swagger
 * /project/delete/{id_project}:
 *   delete:
 *     summary: Elimina un proyecto
 *     description: Permite al usuario eliminar un proyecto
 *     tags:
 *       - proyectos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_project
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proyecto
 *     responses:
 *       200:
 *         description: Proyecto eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Se ha eliminado el proyecto correctamente
 *       404:
 *         description: Proyecto no encontrado o no tienes acceso a el
 *       400:
 *         description: Error al obtener el id del proyecto
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/delete/:id_project', verifyToken, deleteProject )

export default router