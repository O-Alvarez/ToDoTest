//Aqui esta la configuracion del redux, el cual permite englobar el estado de la aplicacion
import {configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import projectsReducer from '../features/projects/projectsSlice'

//almacena todos los estados de la aplicacion para compartir datos entre componentes
const store = configureStore({
    reducer: {
        auth: authReducer,
        projects: projectsReducer
    }
})

export default store