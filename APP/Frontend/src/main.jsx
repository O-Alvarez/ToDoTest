import React from 'react'
import ReactDOM from 'react-dom/client'

// Importa estilos globales, aquí puedes importar Bootstrap si lo usas
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)