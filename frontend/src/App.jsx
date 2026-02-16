import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import IndexEnrollments from "./views/Enrollments/Index"
import NewEnrollment from "./views/Enrollments/New"
import ShowEnrollment from "./views/Enrollments/Show";

// Estilos
import './App.css';

// Vistas
import UsuariosIndex from "./views/usuarios/IndexUsuarios";
import UsuariosShow from "./views/usuarios/ShowUsuarios";
import Login from "./views/usuarios/Login"
import Register from "./views/usuarios/Register"
import Panel from "./views/Panel"
import IndexCourses from './views/Courses/IndexCourses'
import NewCourses from './views/Courses/NewCourses'
import ShowCourses from './views/Courses/ShowCourses'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redireccion al login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login y Registro */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Panel */}
        <Route path="/panel" element={<Panel />} />

        {/* Users */}
        <Route path="/usuarios" element={<UsuariosIndex />} />
        <Route path="/usuarios/:id" element={<UsuariosShow />} />

        {/* Courses */}
        <Route path="/courses" element={<IndexCourses />} />
        <Route path="/courses/new" element={<NewCourses />} />
        <Route path="/courses/:id" element={<ShowCourses />} />

        {/* Enrollments */}
        <Route path="/enrollments" element={<IndexEnrollments />} />
        <Route path="/enrollments/new" element={<NewEnrollment />} />
        <Route path="/enrollments/:id" element={<ShowEnrollment />} />
      </Routes>
    </BrowserRouter>    


  )
}

export default App
