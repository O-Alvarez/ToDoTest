import { Router } from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import {deleteUser , alterUser, changePass} from '../controllers/user.controller.js'


const router = Router()
/**
 * @swagger
 * /user/delete:
 *   delete:                            # get, post, put, delete, patch
 *     summary: Eliminacion de usuario
 *     description: Ruta utilizada para que el usuario pueda eliminar su registro
 *     tags:
 *       - usuarios                      
 *     security:                          # Opcional: si requiere autenticación
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Se ha eliminado el usuario correctamente
 *       400:
 *         description: es necesario el id_user
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.delete('/delete' , verifyToken , deleteUser )

/**
 * @swagger
 * /user/update:
 *   put:                            # get, post, put, delete, patch
 *     summary: Actualiza la infomacion del usuario
 *     description: Utilizado para que el usuario pueda editar su informacion
 *     tags:
 *       - usuarios                       # Agrupa por funcionalidad (por ejemplo: usuarios, auth, productos)
 *     security:                          # Opcional: si requiere autenticación
 *       - bearerAuth: []
 *     requestBody:                       # Opcional: solo para métodos que envían body (post, put, patch)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: nuevo nombre
 *               last_name:
 *                 type: string 
 *                 example: nuevo apellido
 *               mail:    
 *                 type: string 
 *                 example: nuevomail@gmail.com
 *     responses:
 *       200:
 *         description: Se han actualizado los datos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Se han actualizado los datos correctamente
 *       400:
 *         description: Hacen falta campos  
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.put('/update', verifyToken, alterUser)

/**
 * @swagger
 * /user/updatePass:
 *   patch:                            # get, post, put, delete, patch
 *     summary: Actualiza la contraseña del usuario
 *     description: Metodo utilizado para que el usuario pueda actualizar su contraseña
 *     tags:
 *       - usuarios                       # Agrupa por funcionalidad (por ejemplo: usuarios, auth, productos)
 *     security:                          # Opcional: si requiere autenticación
 *       - bearerAuth: []
 *     requestBody:                       # Opcional: solo para métodos que envían body (post, put, patch)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               old_password:
 *                 type: string
 *                 example: 123456
 *               new_password:
 *                 type: string 
 *                 example: nuevacontraseña123
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Operación realizada correctamente
 *       400:
 *         description: La contraseña anterior es invalida
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.patch('/updatePass', verifyToken, changePass)

export default router 