import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'

import { FaProjectDiagram, FaUserEdit, FaSignOutAlt, FaAlignJustify } from 'react-icons/fa'
import logo from '../assets/logo_todo.png'
import '../styles/sidebar.css'

const Sidebar = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const toggleSidebar = () => setIsOpen(prev => !prev)

    const handleLogout = () => {
        dispatch(logout())
        setTimeout(() => navigate('/login'), 100)
    }

    return (
        <>
            {/* Botón toggle visible siempre */}
            <button
                className="btn btn-outline-secondary position-fixed top-0 start-0 m-2"
                onClick={toggleSidebar}
                style={{ zIndex: 1100, width: '40px', height: '40px', padding: '0', borderRadius: '6px' }}
                aria-label="Toggle sidebar"
            >
                {isOpen ? '✕' : <FaAlignJustify size={20} />}
            </button>

            {/* Sidebar */}
            <div
                className={`sidebar d-flex flex-column justify-content-between shadow ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}
                style={{
                    width: isOpen ? '250px' : '0px',
                    height: '100vh',
                    overflowX: 'hidden',
                    backgroundColor: 'var(--color-background)',
                    borderRight: isOpen ? '1px solid #ddd' : 'none',
                    transition: 'width 0.3s ease',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 1040,
                    padding: isOpen ? '1rem' : '0',
                }}
            >
                {isOpen && (
                    <>
                        <div className="text-center mb-4">
                            <img
                                src={logo}
                                alt="Logo"
                                className="img-fluid"
                                style={{ maxHeight: '60px' }}
                            />
                            <h5 className="mt-2" style={{ color: 'var(--color-primary)' }}>
                                ToDo App
                            </h5>
                        </div>

                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <Link
                                    to="/"
                                    className="nav-link sidebar-link"
                                >
                                    <FaProjectDiagram className="me-2" />
                                    Proyectos
                                </Link>
                            </li>
                            <li className="nav-item mb-2">
                                <Link
                                    to="/profile"
                                    className="nav-link sidebar-link"
                                >
                                    <FaUserEdit className="me-2" />
                                    Editar Perfil
                                </Link>
                            </li>
                        </ul>

                        <div className="mt-4">
                            <button
                                className="btn btn-outline-danger w-100"
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt className="me-2" />
                                Cerrar sesión
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Sidebar
