import { execQuery } from "../config/db.js"
import querys from "../querys/querys.js"



//creacion de una nueva categoria en un proyecto
export const createCategory = async (req, res) => {
    const id_user = req.user.id_user
    const { id_project, description, color } = req.body

    if (!id_user) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        })
    }
    if (!id_project) {
        return res.status(400).json({
            message: 'No se ha proporcionado el id del proyecto'
        })
    }
    if (!description || !color) {
        return res.status(400).json({
            message: 'los campos descripcion y color son obligatorios'
        })
    }
    try {
        const validId = parseInt(id_project, 10)
        //valida si el proyecto existe y le pertenece al usuario
        const [response] = await execQuery(querys.projects.getById, [validId, id_user, validId])
        if (!response) {
            return res.status(404).json({ message: "Proyecto no encontrado o no tienes acceso a el" })
        }
        //valida que el proyecto le pertenezca y que no intente crear una categoria a uno publico
        if (id_user !== response.id_user) {
            return res.status(401).json({ message: "Permiso denegado" })
        }

        await execQuery(querys.categories.create, [id_project, description, color])
        res.json({
            message: "Categoria creada correctamente"
        }
        )
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Error interno en el servidor" })
    }
}

//obtener categoria por id
export const getCategory = async (req, res) => {
    const id_user = req.user.id_user
    const id_category = req.params.id_category
    if (!id_user) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        })
    }
    if (!id_category) {
        return res.status(400).json({
            message: 'No se ha proporcionado el id de la categoria'
        })
    }
    try {
        const validId = parseInt(id_category, 10)
        //obtiene la categoria 
        const [response] = await execQuery(querys.categories.getByID, [validId])
        if (!response) {
            return res.status(404).json({
                message: 'Categoria no encontrada'
            })
        }

        //valida que si tenga acceso al proyecto y por ende mostrar la acategoria
        if ((response.id_user !== id_user) & (response.ispublic == false)) {
            return res.status(401).json({
                message: 'No tienes permiso para ver esta categoria'
            })
        }
        res.json(
            {
                message: 'Categoria obtenida exitosamente',
                data:
                {
                    id_category: response.id_category,
                    id_project: response.id_project,
                    description: response.description,
                    ispublic: response.ispublic,
                    color: response.color
                }
            }
        )


    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Error interno en el servidor" })
    }
}

//obtiene todas las categorias por proyectos
export const getAllByProject = async (req, res) => {
    const id_user = req.user.id_user
    const id_project = req.params.id_project
    if (!id_user) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        })
    }
    if (!id_project) {
        return res.status(400).json({
            message: 'No se ha proporcionado el id del proyecto'
        })
    }
    try {
        const validId = parseInt(id_project, 10)
        //realiza la consulta
        const response = await execQuery(querys.categories.getAllByProject, [validId])
        if (response.length === 0) {
            return res.status(404).json({ message: "categoria no encontrado o no tienes acceso a el" })
        }
        //valida si tiene permisos para ver todas las categorias
        const first_data = response[0]
        if ((first_data.id_user !== id_user) & (first_data.ispublic == false)) {
            return res.status(404).json({
                message: 'No tiene permisos para ver las categorias'
            })
        }

        const dataPurged = response.map(e => ({
            id_category: e.id_category,
            id_project: e.id_project,
            description: e.description,
            ispublic: e.ispublic,
            color: e.color
        }))
        res.json({
            message: "Categorias obtenidas correctamente",
            count: response.length,
            data: dataPurged
        })


    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Error interno en el servidor" })
    }
}

//actualiza una categoria 
export const updateCategory = async (req, res) => {
    const id_user = req.user.id_user
    const id_category = req.params.id_category
    const {description, color} = req.body

    if (!id_user) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        })
    }
    if (!id_category) {
        return res.status(400).json({
            message: 'No se ha proporcionado el id de la categoria'
        })
    }
    try {
        const validId = parseInt(id_category, 10)
        //obtiene la categoria 
        const [response] = await execQuery(querys.categories.getByID, [validId])
        if (!response) {
            return res.status(404).json({
                message: 'Categoria no encontrada'
            })
        }

        //valida que si tenga acceso al proyecto y por ende mostrar la acategoria
        if (response.id_user !== id_user) {
            return res.status(401).json({
                message: 'No tienes permiso para editar esta categoria'
            })
        }

        await execQuery(querys.categories.update, [description, color, id_category])
        res.json({
            message: 'La categoria fue modificada correctamente' 
        })


    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Error interno en el servidor" })
    }
}

//elimina una categoria 
export const deleteCategory = async (req, res) => {
    const id_user = req.user.id_user
    const id_category = req.params.id_category

    if (!id_user) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        })
    }
    if (!id_category) {
        return res.status(400).json({
            message: 'No se ha proporcionado el id de la categoria'
        })
    }
    try {
        const validId = parseInt(id_category, 10)
        //obtiene la categoria 
        const [response] = await execQuery(querys.categories.getByID, [validId])
        if (!response) {
            return res.status(404).json({ message: "categoria no encontrado o no tienes acceso a el" })
        }

        //valida que si tenga acceso al proyecto y por ende mostrar la acategoria
        if (response.id_user !== id_user) {
            return res.status(401).json({
                message: 'No tienes permiso para eliminar esta categoria'
            })
        }

        await execQuery(querys.categories.delete, [id_category])
        res.json({
            message: 'La categoria fue eliminada correctamente' 
        })


    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Error interno en el servidor" })
    }
}