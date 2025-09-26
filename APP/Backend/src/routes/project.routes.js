import {Router } from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import {createProject, getAllProjects, getProjectById, updateProject, deleteProject} from '../controllers/project.controller.js'


const router = Router()
router.post('/create',verifyToken,  createProject)
router.get('/getAllProjects', verifyToken, getAllProjects)
router.get('/getById/:id_project', verifyToken, getProjectById )
router.put('/modify/:id_project', verifyToken, updateProject )
router.delete('/delete/:id_project', verifyToken, deleteProject )

export default router;