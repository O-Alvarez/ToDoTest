import API from '../../api/axios'
import { loginSuccess, setLoading, logout } from './authSlice'

export const login = (credentials) => async (dispatch) => {
    try {
        const response = await API.post('/auth/login', credentials)
        const { user, token } = response.data
        dispatch(loginSuccess({ user, token }))
        return { success: true }
    } catch (e) {
        console.error('error al inciar sesion: ', e)
        return {
            success: false,
            message: e.response?.data?.message || 'error desconocido'
        }
    }
}

export const register = (credentials) => async (dispatch) => {
    try {
        const response = await API.post('/auth/register', credentials)
        return {
            message: response.data?.message || 'Registro exitoso',
            success: true
        }

    } catch (e) {
        console.error('error al registrar el usuario: ', e)
        return {
            success: false,
            message: e.response?.data?.message || 'error desconocido'
        }
    }
}

//funcion para consultar el token en cada refresco de pagina
export const verifyToken = () => async (dispatch) => {
    const token = localStorage.getItem('token')

    dispatch(setLoading(true))

    if (!token) {
        dispatch(setLoading(false))
        return
    }

    try {
        const response = await API.get('/auth/verify', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const user = response.data.user
        dispatch(loginSuccess({ user, token }))

    } catch (error) {
        console.error('Token inválido o expirado:', error.message);
        localStorage.removeItem('token');
        dispatch(logout());
    } finally{
        dispatch(setLoading(false))
    }

}
