import API from '../../api/axios'
import { setProjects } from './projectsSlice'

export const fetchProjects = () => async (dispatch) => {
 const token = localStorage.getItem('token')



  try {
    const response = await API.get('/project/getAllProjects', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    dispatch(setProjects(response.data.data))
    return { success: true }
  } catch (e) {
    console.error('Error al obtener proyectos:', e)
    return {
      success: false,
      message: e.response?.data?.message || 'Error desconocido al obtener proyectos'
    }
  }
}
