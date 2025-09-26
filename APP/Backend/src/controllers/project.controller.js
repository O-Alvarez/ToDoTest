import { response } from "express"
import { execQuery } from "../config/db.js"
import querys from '../querys/querys.js'


export const createProject = async (req, res) => {
  const id_user = req.user.id_user
  const { title, description, status, expiration_time } = req.body

  if (!id_user) {
    return res.status(500).json({ message: "hubo un error al recuperar el usuario" })
  }
  if (!title) {
    return res.status(400).json({ message: "El campo titulo es obligatorio" })
  }

  try {
    //Crea el proyecto
    await execQuery(querys.projects.create, [id_user, title, description, status, expiration_time])
    //obtiene el id del ultimo proyecto creado por el usuario
    const [lastProject] = await execQuery(querys.projects.getLastCreated, [id_user])

    // console.log('ultimo proyecto: ', lastProject)

    if (lastProject.length === 0) {
      return res.status(500).json({ message: "Hubo un error al recuperar el ultimo proyecto" })
    }
    //crea 3 categorias para el usuario y crea una tarea
    await execQuery(querys.categories.create, [lastProject.id_project, 'Analisis', 'amarillo'])
    const [lastCategory] = await execQuery(querys.categories.getLastCategory, [lastProject.id_project])

    // console.log('ultima categoria: ', lastCategory)  

    if (lastCategory.length === 0) {
      return res.status(500).json({ message: "Hubo un error al recuperar la ultima categoria" })
    }
    await execQuery(querys.categories.create, [lastProject.id_project, 'Desarrollo', 'verde'])
    await execQuery(querys.categories.create, [lastProject.id_project, 'Pruebas', 'azul'])
    //crea una tarea para la categoria analisis
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const expiration_date = tomorrow.toISOString().slice(0, 19).replace('T', ' ')

    await execQuery(querys.tasks.create, [lastProject.id_project, lastCategory.id_category,
      'Nueva Tarea', 'Ingrese descripcion aqui', 'media', expiration_date])

    res.json(
      {
        message: 'Se ha creado el proyecto correctamente'
      }
    )


  } catch (e) {
    console.error(e)
    return res.status(500).json({ message: "Error interno en el servidor" })
  }

}

export const getAllProjects = async (req, res) => {
  const id_user = req.user.id_user
  if (!id_user) {
    return res.status(500).json({ message: "hubo un error al recuperar el usuario" })
  }
  try {
    const response = await execQuery(querys.projects.getAllByUser, [id_user])
    if (!response || response.length === 0) {
      return res.status(404).json({ message: "No se ha recuperado ningun proyecto" })
    }
    res.json({
      message: 'Se han recuperado los proyectos correctamente',
      count: response.length,
      data: response
    })

  } catch (e) {
    console.error(e)
    return res.status(500).json({ message: "Error interno en el servidor" })
  }



}

export const getProjectById = async (req, res) => {
  const id_user = req.user.id_user
  const id_project = req.params.id_project
  if (!id_user) {
    return res.status(500).json({ message: "hubo un error al recuperar el usuario" })
  }
  if (!id_project) {
    return res.status(400).json({ message: "Proyecto invalido" })
  }

  try {
    const validId = parseInt(id_project, 10)
    const response = await execQuery(querys.projects.getById, [validId, id_user, validId])

    if (!response || response.length === 0) {
      return res.status(404).json({ message: "Proyecto no encontrado o no tienes acceso a el" })
    }

    //valida si el proyecto le pertenece 
    const modify = (user, response) => {
      return user === response.id_user
    }



    res.json({
      message: 'Se ha recuperado el proyecto correctamente',
      modify: modify(id_user, response),
      count: response.length,
      data: response
    })


  } catch (e) {
    console.error(e)
    return res.status(500).json({ message: "Error interno en el servidor" })
  }
}

export const updateProject = async (req, res) => {
  const id_user = req.user.id_user
  const id_project = req.params.id_project
  const { title, description, status, ispublic, expiration_date } = req.body

  if (!id_user) {
    return res.status(500).json({ message: "hubo un error al recuperar el usuario" })
  }
  if (!id_project) {
    return res.status(500).json({ message: "Error al obtener el id del proyecto" })
  }

  if (!title) {
    return res.status(400).json({ message: "El campo titulo es obligatorio" })
  }

  try {
    //busca el id del proyecto para poder validar
    const validId = parseInt(id_project, 10)

    //busca el proyecto que desean modificar
    const [response] = await execQuery(querys.projects.getById, [validId, id_user, validId])
    if (!response) {
      return res.status(404).json({ message: "Proyecto no encontrado o no tienes acceso a el" })
    }

    //valida que el proyecto le pertenezca y que no sea uno publico
    if (id_user !== response.id_user) {
      return res.status(404).json({ message: "No puedes modificar este proyecto" })
    }

    const expirationDateFormatted = convertTimeStamp(expiration_date)

    //actualiza el registro
    await execQuery(querys.projects.update, [title, description, status, ispublic, expirationDateFormatted, id_project, id_user])

    res.json({
      message: 'Se ha actualizado el proyecto correctamente'
    })

  } catch (e) {
    console.error(e)
    return res.status(500).json({ message: "Error interno en el servidor" })
  }
}

export const deleteProject = async (req, res) => {
  const id_user = req.user.id_user
  const id_project = req.params.id_project
  if (!id_user) {
    return res.status(500).json({ message: "hubo un error al recuperar el usuario" })
  }
  if (!id_project) {
    return res.status(500).json({ message: "Error al obtener el id del proyecto" })
  }
  try{
    const validId = parseInt(id_project, 10)
    //busca el proyecto que desean modificar
    const [response] = await execQuery(querys.projects.getById, [validId, id_user, validId])
    if (!response) {
      return res.status(404).json({ message: "Proyecto no encontrado o no tienes acceso a el" })
    }

    //valida que el proyecto le pertenezca y que no intente eliminar uno publico
    if (id_user !== response.id_user) {
      return res.status(404).json({ message: "No puedes eliminar este proyecto" })
    }

    //si le pertenece entonces le permite eliminarlo
    await execQuery(querys.projects.delete, [validId, id_user])
    res.json({
      message: 'Se ha eliminado el proyecto correctamente'
    })


  }catch(e){
    console.error(e)
    return res.status(500).json({ message: "Error interno en el servidor" })
  }
}


const convertTimeStamp = (IsoDate) => {
  return new Date(IsoDate)
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');
}
