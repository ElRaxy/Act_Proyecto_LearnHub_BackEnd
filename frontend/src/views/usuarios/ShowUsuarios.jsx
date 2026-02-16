import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { sendRequest } from '../../utils/functions'
import GenericFrom from '../../components/GenericFrom'

const ShowUsuario = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const myProfile = localStorage.getItem('profile')

  const [userData, setUserData] = useState({})
  const [isEditing, setIsEditing] = useState(false)

  const isAdmin = myProfile === 'ADMINISTRADOR'
  const isProfesor = myProfile === 'PROFESOR'
  const isAlumno = myProfile === 'ALUMNO'

  // --- NUEVA LÓGICA DE PERMISOS ---
  // Ahora permitimos editar si es ADMIN o si es PROFESOR (a cualquier usuario)
  const canEdit = isAdmin || isProfesor;

  const fields = [
    { key: 'dni', label: 'DNI', type: 'text', disabled: !isAdmin },
    { key: 'firstName', label: 'Nombre', type: 'text' },
    { key: 'lastName', label: 'Apellidos', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    { 
      key: 'profile', 
      label: 'Perfil', 
      type: 'select',
      disabled: !isAdmin, // El profesor puede editar datos, pero no cambiar roles
      options: [
        { id: 'ADMINISTRADOR', nombre: 'ADMINISTRADOR' },
        { id: 'PROFESOR', nombre: 'PROFESOR' },
        { id: 'ALUMNO', nombre: 'ALUMNO' }
      ],
      optionValue: 'id',
      optionLabel: 'nombre'
    }
  ]

  const getUsuario = async () => {
    const res = await sendRequest("GET", "/users/show/" + id)
    if (res.success) setUserData(res.data)
  }

  useEffect(() => {
    if (!myProfile) navigate("/")
    else getUsuario()
  }, [id])

  const handleSave = async () => {
    const res = await sendRequest("PUT", "/users/" + id, userData)
    if (res.success) {
      setIsEditing(false)
      alert("Cambios guardados con éxito")
    }
  }

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Información del Perfil</h1>
      <hr />
      
      {/* Botón visible para Admin y Profesor siempre */}
      {!isEditing && canEdit && (
        <button 
          onClick={() => setIsEditing(true)} 
          style={{ 
            marginBottom: '20px', 
            padding: '10px 25px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Activar Edición
        </button>
      )}

      {isAlumno && (
        <div style={{ padding: '10px', background: '#f8d7da', color: '#721c24', marginBottom: '20px', borderRadius: '4px' }}>
          <strong>Aviso:</strong> Los alumnos no tienen permiso para editar perfiles.
        </div>
      )}

      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
        <GenericFrom 
          data={userData}
          fields={fields}
          onChange={(key, val) => setUserData({...userData, [key]: val})}
          onSave={handleSave}
          onBack={() => navigate("/usuarios")}
          isEditing={isEditing} 
        />
      </div>
    </div>
  )
}

export default ShowUsuario