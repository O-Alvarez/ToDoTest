import { Router } from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import {
    createTask,
    getTaskById,
    getAllByCategory,
    getAllByProject,
    updateTask,
    deleteTask
} from '../controllers/tasks.controller.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Tareas
 *   description: Endpoints para gestionar tareas dentro de proyectos
 */

/**
 * @swagger
 * /task/create:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_category
 *               - title
 *               - description
 *               - priority
 *               - expiration_date
 *             properties:
 *               id_category:
 *                 type: integer
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *               expiration_date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Tarea creada exitosamente
 *       400:
 *         description: Faltan campos obligatorios
 *       403:
 *         description: No tienes permiso para crear la tarea
 *       500:
 *         description: Error interno del servidor
 */
router.post('/create', verifyToken, createTask)

/**
 * @swagger
 * /task/get/{id_task}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_task
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Consulta exitosa
 *       403:
 *         description: No tienes permiso para ver esta tarea
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/get/:id_task', verifyToken, getTaskById)

/**
 * @swagger
 * /task/getByCategory/{id_category}:
 *   get:
 *     summary: Obtener todas las tareas de una categoría
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_category
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Consulta exitosa
 *       403:
 *         description: No tienes permiso para ver estas tareas
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/getByCategory/:id_category', verifyToken, getAllByCategory)

/**
 * @swagger
 * /task/getByProject/{id_project}:
 *   get:
 *     summary: Obtener todas las tareas de un proyecto
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_project
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del proyecto
 *     responses:
 *       200:
 *         description: Consulta exitosa
 *       403:
 *         description: No tienes permiso para ver estas tareas
 *       404:
 *         description: Proyecto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/getByProject/:id_project', verifyToken, getAllByProject)

/**
 * @swagger
 * /task/update/{id_task}:
 *   put:
 *     summary: Actualizar una tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_task
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - priority
 *               - expiration_date
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *               expiration_date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente
 *       403:
 *         description: No tienes permiso para actualizar esta tarea
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/update/:id_task', verifyToken, updateTask)

/**
 * @swagger
 * /task/delete/{id_task}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_task
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 *       403:
 *         description: No tienes permiso para eliminar esta tarea
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/delete/:id_task', verifyToken, deleteTask)

export default router
