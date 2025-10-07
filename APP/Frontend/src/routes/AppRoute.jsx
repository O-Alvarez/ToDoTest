import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from '../components/PrivateRoute'

// Páginas públicas
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

// Layout y páginas privadas
import MainLayout from '../layouts/MainLayout'
import ProjectsPage from '../pages/ProjectsPage'
import ProfilePage from '../pages/ProfilePage'

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<ProjectsPage />} /> {/* Ruta "/" */}
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}
