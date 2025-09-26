import axios from "axios"


const API_URL = 'http://localhost:8000'

export const login = async (mail, password) => {
    const response = await axios.post(`${API_URL}/auth/login` , {
        mail,
        password
    })
    return response.data
}