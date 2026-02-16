import React, { useEffect, useState } from 'react'
import { sendRequest } from '../../utils/functions'
import { useNavigate } from "react-router-dom"

const Index = () => {
  const [usuarios, setUsuarios] = useState([])
  const navigate = useNavigate()
  
  const role = localStorage.getItem('profile') || 'GUESS'
  const isAdmin = role === 'ADMINISTRADOR'
  const isProfesor = role === 'PROFESOR'
  const isGuess = role === 'GUESS'

  const getUsuarios = async () => {
    if (isGuess) return
    const res = await sendRequest("GET", "/users")
    if (res.success) setUsuarios(res.data)
  }

  const eliminar = async (id) => {
    if (!isAdmin) return
    if (window.confirm("¿Eliminar usuario?")) {
      const res = await sendRequest("DELETE", "/users/" + id, {})
      if (res.success) getUsuarios()
    }
  }

  useEffect(() => { 
    if (isGuess) navigate("/")
    else getUsuarios()
  }, [role])

  if (isGuess) return null

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Gestión de Usuarios</h1>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#343a40', color: 'white' }}>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Perfil</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => {
            // El botón mostrará "Ver / Editar" si eres Admin o Profesor
            const puedeEditar = isAdmin || isProfesor;

            return (
              <tr key={u._id || u.id} style={{ textAlign: 'center' }}>
                <td>{u.dni}</td>
                <td>{u.firstName} {u.lastName}</td>
                <td>{u.profile}</td>
                <td>
                  <button onClick={() => navigate("/usuarios/" + (u._id || u.id))}>
                    {puedeEditar ? "Ver / Editar" : "Ver"}
                  </button>
                  {isAdmin && (
                    <button onClick={() => eliminar(u._id || u.id)} style={{ color: 'red', marginLeft: '5px' }}>Borrar</button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Index