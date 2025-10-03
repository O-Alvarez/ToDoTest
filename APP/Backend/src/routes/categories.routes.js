import { Router } from "express"
import { verifyToken } from '../middlewares/verifyToken.js'
import { createCategory, getCategory, getAllByProject, updateCategory, deleteCategory } from "../controllers/categories.controller.js"


const router = Router()

 /**
 * @swagger
 * /category/create:
 *   post:
 *     summary: Crea una nueva categoria 
 *     description: Permite crear una nueva categoria y asociarla a un proyecto para organizar tareas
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_project:
 *                 type: integer
 *                 example: 5
 *               description:
 *                 type: string
 *                 example: Titulo de la categoria
 *               color:
 *                 type: string
 *                 enum:  [verde, rojo, amarillo, azul]
 *                 example: verde
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
 *                   example: Se ha creado la categoria correctamente
 *       400:
 *         description: Campos faltantes o inválidos
 *       404:
 *         description: proyecto no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/create', verifyToken, createCategory)

 /**
 * @swagger
 * /category/get/{id_category}:
 *   get:
 *     summary: Obtiene una categoria
 *     description: Permite obtener una categoria utilizando el id como parametro
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_category
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de de la categoria
 *     responses:
 *       200:
 *         description: consulta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categoria obtenida correctamente
 *                 data:
 *                   type: object 
 *                   properties:
 *                     id_category:
 *                       type: integer
 *                       example: 1
 *                     id_project:
 *                       type: integer
 *                       example: 1
 *                     description:
 *                       type: string
 *                       example: Título de la categoria
 *                     ispublic:
 *                       type: boolean
 *                       example: false
 *                     color:
 *                       type: string
 *                       format: date-time
 *                       example: 'verde'
 *       400:
 *         description: Campos faltantes o inválidos
 *       404:
 *         description: proyecto no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/get/:id_category', verifyToken, getCategory)


/**
 * @swagger
 * /category/getAll/{id_project}:
 *   get:
 *     summary: Obtiene todas las categorías de un proyecto
 *     description: Permite obtener las categorías asociadas a un proyecto mediante su ID.
 *     tags:
 *       - Categorias
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
 *         description: Consulta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categorías obtenidas correctamente
 *                 count:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_category:
 *                         type: integer
 *                         example: 1
 *                       id_project:
 *                         type: integer
 *                         example: 1
 *                       description:
 *                         type: string
 *                         example: Título de la categoría
 *                       ispublic:
 *                         type: boolean
 *                         example: false
 *                       color:
 *                         type: string
 *                         example: verde
 *       400:
 *         description: Campos faltantes o inválidos
 *       404:
 *         description: Proyecto no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/getAll/:id_project', verifyToken, getAllByProject)


 /**
 * @swagger
 * /category/modify/{id_category}:
 *   put:
 *     summary: Modifica una categoria
 *     description: Permite modificar una categoria
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_category
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de de la categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: Titulo de la categoria modificado
 *               color:
 *                 type: string
 *                 enum:  [verde, rojo, amarillo, azul]
 *                 example: verde
 *
 *     responses:
 *       200:
 *         description: consulta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categoria modificada correctamente
 *       400:
 *         description: Campos faltantes o inválidos
 *       404:
 *         description: proyecto no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/modify/:id_category', verifyToken, updateCategory )

 /**
 * @swagger
 * /category/delete/{id_category}:
 *   delete:
 *     summary: elimina una categoria
 *     description: Permite eliminar una categoria
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_category
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de de la categoria
 *     responses:
 *       200:
 *         description: eliminacion exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categoria eliminada correctamente
 *       400:
 *         description: Campos faltantes o inválidos
 *       404:
 *         description: proyecto no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/delete/:id_category', verifyToken, deleteCategory )

export default router