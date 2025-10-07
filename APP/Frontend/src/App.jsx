import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { verifyToken } from './features/auth/authThunks'
import AppRouter from './routes/AppRoute'

function App() {
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(verifyToken())
  }, [dispatch])


  return <AppRouter />
}

export default App
