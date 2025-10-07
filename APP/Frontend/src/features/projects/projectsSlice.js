import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [],
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.list = action.payload
    },
    // podrías agregar más acciones como agregarProyecto, eliminarProyecto, etc.
  }
})

export const { setProjects } = projectsSlice.actions
export default projectsSlice.reducer
