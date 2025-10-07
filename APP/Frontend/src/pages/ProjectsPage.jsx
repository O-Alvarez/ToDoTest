import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../features/projects/projectsThunks'
import "../styles/projects.css"
import { FaFolderOpen } from 'react-icons/fa' // Icono para proyecto

const ProjectsPage = () => {
  const dispatch = useDispatch()
  const projects = useSelector((state) => state.projects.list)

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'en proceso':
        return 'badge bg-success';
      case 'pausado':
        return 'badge bg-warning text-dark';
      case 'finalizado':
        return 'badge bg-primary';
      default:
        return 'badge bg-secondary';
    }
  }

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateStr).toLocaleDateString('es-ES', options)
  }

  return (
    <div className="container projects-page">
      <h1 className="mb-4 text-primary fw-bold">📁 Proyectos</h1>

      <div className="row">
        {projects.length === 0 ? (
          <p className="text-muted">No hay proyectos aún.</p>
        ) : (
          projects.map((project, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={project.id}>
              <div className="card project-card animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="card-body d-flex flex-column">
                  <div className="project-icon text-center mb-3">
                    <FaFolderOpen size={40} className="text-primary" />
                  </div>
                  <h5 className="card-title text-dark text-center">{project.title}</h5>
                  <p className="card-text text-muted">{project.description}</p>

                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className={`badge ${getStatusBadgeColor(project.status)}`}>
                        {project.status}
                      </span>
                      <small className="text-muted">
                        <i className="bi bi-calendar-event me-1"></i>
                        {formatDate(project.expiration_date)}
                      </small>
                    </div>
                    <button className="btn btn-outline-primary w-100">
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ProjectsPage
