import { createSlice } from "@reduxjs/toolkit"

//aqui va la configuracion de los posibles estados, en este caso de autenticacion
//en cada slice se encuentra cada trozo de los estados globales en este caso el estado de un usuario logueado o no logueado

//el estado inicial del usuario al entrar a la aplicacion
const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    loading: true
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //si el logueo es exitoso entonces se guarda este estado los valores
        loginSuccess: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = true
            localStorage.setItem('token', action.payload.token)
            state.loading = false
        },
        //si se desloguea se limpia el token 
        logout: (state) => {
            state.user = null
            state.token = null
            state.isAuthenticated = null
            state.loading = false
        },
        //este estado se utiliza para obtener el token del localstorage para no salir en caso se refresque la pagina
        setAuthFromStorage: (state, action) => {
            state.token = action.payload.token
            state.user = action.payload.user
            state.isAuthenticated = !!action.payload.token
            state.loading = false
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },

})

export const { loginSuccess, logout, setAuthFromStorage, setLoading } = authSlice.actions

export default authSlice.reducer