import { useState } from "react"
import { useDispatch } from "react-redux"
import { register } from '../features/auth/authThunks'
import { useNavigate, Link } from 'react-router-dom'

import logo from '../assets/logo_todo.png'
import '../styles/register.css'

const RegisterPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [first_name, setFirs_name] = useState('Nombres')
    const [last_name, setLast_name] = useState('Apellidos')
    const [mail, setMail] = useState('CorreoEjemplo@gmail.com')
    const [password, setPassword] = useState('')

    const [error, setError] = useState(null)
    const [successful, setSuccessful] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await dispatch(register({ first_name, last_name, mail, password }))

        if (result.success) {
            setError(null)
            setSuccessful(result.message)
            setTimeout(() => navigate('/login'), 3000)
        } else {
            setSuccessful(null)
            setError(result.message)
        }
    }

    return (
        <div className="register-page d-flex justify-content-center align-items-center vh-100">
            <div className="glass-card shadow p-4">
                {/* Logo */}
                <div className="text-center mb-3">
                    <img src={logo} alt="Logo" className="logo mb-2" />
                    <h3 className="brand-text">ToDo App</h3>
                </div>

                <h4 className="text-center mb-4">Crear nueva cuenta</h4>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Nombres</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ej: Juan"
                                onChange={(e) => setFirs_name(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Apellidos</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ej: Pérez"
                                onChange={(e) => setLast_name(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Correo electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="ejemplo@correo.com"
                            onChange={(e) => setMail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}
                    {successful && <div className="alert alert-success">{successful}</div>}

                    <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-custom">
                            Registrarse
                        </button>
                    </div>

                    <p className="text-center small">
                        ¿Ya tienes cuenta? <Link to="/login" className="login-link">Inicia sesión</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
