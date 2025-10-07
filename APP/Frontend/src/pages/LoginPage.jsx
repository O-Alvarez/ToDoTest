import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from '../features/auth/authThunks'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"

//* complementos
import "../styles/register.css"
import logo from "../assets/logo_todo.png"


export default function LoginPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [mail, setMail] = useState('ejemplo@mail.com')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    //funcion a realizar cuando se de submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await dispatch(login({ mail, password }))
        if (result.success) {
            navigate('/')
        } else {
            setError(result.message)
        }
    }

    return (
        <div className="register-page d-flex justify-content-center align-items-center vh-100">
            <div className="glass-card shadow p-4">
                {/* Logo y nombre */}
                <div className="text-center mb-3">
                    <img src={logo} alt="Logo" className="logo mb-2" />
                    <h3 className="brand-text">ToDo App</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Correo electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="tu@email.com"
                            value={mail}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-custom">
                            Entrar
                        </button>
                    </div>

                    <p className="text-center small">
                        ¿No tienes cuenta?{" "}
                        <Link to="/register" className="login-link">
                            Regístrate aquí
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}