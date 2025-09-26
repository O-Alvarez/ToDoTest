import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from '../pages/Login'

const AppRouter = () => (
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  </BrowserRouter>
)
export default AppRouter