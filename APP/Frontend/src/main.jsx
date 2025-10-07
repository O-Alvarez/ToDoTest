import React from 'react'
import ReactDOM from 'react-dom/client'

// Importa estilos globales, aquí puedes importar Bootstrap si lo usas
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './app/store.js'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)