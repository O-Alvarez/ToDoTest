import querys from "../querys/querys.js"
import { execQuery } from "../config/db.js"
import convertTimeStamp from "../utils/convertTimeStamp.js"

// CREAR TAREA
export const createTask = async (req, res) => {
    const id_user = req.user.id_user
    const { id_category, title, description, priority, expiration_date } = req.body

    if (!id_category || !title || !description || !priority || !expiration_date) {
        return res.status(400).json({ message: "Faltan campos obligatorios" })
    }

    try {
        const category = await getCategoryWithOwnership(id_category)

        if (!category || category.id_user !== id_user) {
            return res.status(403).json({ message: "No tienes acceso a esta categoría/proyecto" })
        }

        const newDate = convertTimeStamp(expiration_date)
        await execQuery(querys.tasks.create, [category.id_project, id_category, title, description, priority, newDate])

        return res.json({ message: "Tarea creada exitosamente" })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Error interno en el servidor" })
    }
}

// OBTENER TAREA POR ID
export const getTaskById = async (req, res) => {
    const id_user = req.user.id_user
    const { id_task } = req.params

    if (!id_task) {
        return res.status(400).json({ message: "ID de tarea no proporcionado" })
    }

    try {
        const [task] = await execQuery(querys.tasks.getById, [id_task])

        if (!task) return res.status(404).json({ message: "Tarea no encontrada" })

        const isOwner = task.id_user === id_user
        const isPublic = task.ispublic === 1 || task.ispublic === true

        if (!isOwner && !isPublic) {
            return res.status(403).json({ message: "No tienes permiso para ver esta tarea" })
        }
        const { id_user: _omit, ...cleanTask } = task
        return res.json({ message: "Consulta exitosa", data: cleanTask })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Error interno en el servidor" })
    }
}

// OBTENER TODAS LAS TAREAS POR CATEGORIA
export const getAllByCategory = async (req, res) => {
    const id_user = req.user.id_user
    const { id_category } = req.params

    if (!id_category) {
        return res.status(400).json({ message: "ID de categoría no proporcionado" })
    }

    try {
        const category = await getCategoryWithOwnership(id_category)

        if (!category) return res.status(404).json({ message: "Categoría no encontrada" })

        const isOwner = category.id_user === id_user
        const isPublic = category.ispublic === 1 || category.ispublic === true

        if (!isOwner && !isPublic) {
            return res.status(403).json({ message: "No tienes permiso para ver las tareas de esta categoría" })
        }
        const tasks = await execQuery(querys.tasks.getAllByCategory, [id_category])
        const cleanTasks = tasks.map(({ id_user: _omit, ...task }) => task)
        return res.json({ message: "Consulta exitosa", count: tasks.length, data: cleanTasks })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Error interno en el servidor" })
    }
}

// OBTENER TODAS LAS TAREAS POR PROYECTO
export const getAllByProject = async (req, res) => {
    const id_user = req.user.id_user
    const { id_project } = req.params

    if (!id_project) {
        return res.status(400).json({ message: "ID de proyecto no proporcionado" })
    }

    try {
        const [project] = await execQuery(querys.projects.getById, [id_project, id_user, id_project])

        if (!project) {
            return res.status(403).json({ message: "No tienes acceso a este proyecto" })
        }
        const tasks = await execQuery(querys.tasks.getAllByProject, [id_project])
        const cleanTasks = tasks.map(({ id_user: _omit, ...task }) => task)
        return res.json({ message: "Consulta exitosa", count: tasks.length, data: cleanTasks })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Error interno en el servidor" })
    }
}

// ACTUALIZAR TAREA
export const updateTask = async (req, res) => {
    const id_user = req.user.id_user
    const { id_task } = req.params
    const { title, description, priority, expiration_date } = req.body

    if (!id_task || !title || !description || !priority || !expiration_date) {
        return res.status(400).json({ message: "Faltan campos obligatorios" })
    }

    try {
        const [task] = await execQuery(querys.tasks.getById, [id_task])

        if (!task || task.id_user !== id_user) {
            return res.status(403).json({ message: "No tienes permiso para actualizar esta tarea" })
        }

        const newDate = convertTimeStamp(expiration_date)

        await execQuery(querys.tasks.update, [title, description, priority, newDate, id_task])
        return res.json({ message: "Tarea actualizada correctamente" })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Error interno en el servidor" })
    }
}

// ELIMINAR TAREA
export const deleteTask = async (req, res) => {
    const id_user = req.user.id_user
    const { id_task } = req.params

    if (!id_task) {
        return res.status(400).json({ message: "ID de tarea no proporcionado" })
    }

    try {
        const [task] = await execQuery(querys.tasks.getById, [id_task])

        if (!task || task.id_user !== id_user) {
            return res.status(403).json({ message: "No tienes permiso para eliminar esta tarea" })
        }

        await execQuery(querys.tasks.delete, [id_task])
        return res.json({ message: "Tarea eliminada correctamente" })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Error interno en el servidor" })
    }
}

// FUNCIONES DE VERIFICACIÓN
const getCategoryWithOwnership = async (id_category) => {
    const [category] = await execQuery(querys.categories.getByID, [id_category])
    return category || null
}
