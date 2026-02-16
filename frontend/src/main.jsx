import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from "axios" //npm i axios

// Configuración de variables de entorno
const host = import.meta.env.VITE_BASE_URL_BACKEND

// Configuración global de Axios
window.axios = axios
window.axios.defaults.baseURL = host
window.axios.defaults.headers.common["Accept"] = "application/json"
window.axios.defaults.headers.common["Content-Type"] = "application/json"
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"
window.axios.defaults.withCredentials = true//Trabajar con cookies (httpOnly - Token)

createRoot(document.getElementById('root')).render(
    <App />
)
