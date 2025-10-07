// src/layouts/MainLayout.jsx
import React, { useState } from "react"
import Sidebar from "../components/sidebar"
import { Outlet } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import '../styles/MainLayout.css'

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="d-flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main
        className="main-content flex-grow-1 p-4 mt-3"
        style={{
          marginLeft: isOpen ? '250px' : '0',
          transition: 'margin-left 0.3s ease',
          width: isOpen ? 'calc(100% - 250px)' : '100%',
        }}
      >
        <Outlet /> {/* Aquí se renderizan las páginas internas como Proyectos, Perfil, etc. */}
      </main>
    </div>
  )
}

export default MainLayout
