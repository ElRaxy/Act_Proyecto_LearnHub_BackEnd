import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { sendRequest } from '../../utils/functions'
import GenericFrom from '../../components/GenericFrom'

const ShowShow = () => {
  const { id } = useParams()
  const [course, setCourse] = useState({})
  const navigate = useNavigate()



  // Por defecto NO editamos (solo lectura)
  const [isEditing, setIsEditing] = useState(false)

  const [data, setData] = useState({
    title: '',
    description: '',
  })

  const getCourses = async () => {
    if (!id || id === '0' || id === 'new') return
    const res = await sendRequest('GET', `/courses/show/` + id)
    if (res && res.success) {
      setData(res.data)
    }
  }

  const fields = [
    { key: 'title', label: 'Titulo', type: 'text' },
    { key: 'description', label: 'Descripcion', type: 'text' },

  ]

  const handleChange = (fields, value) => {
    setData(prev => ({ ...prev, [fields]: value }))
  }

  const handleSave = async () => {
    const dataToSend = {
      title: data.title,
      description: data.description,
    }
    console.log("Enviando PUT a /courses/" + id, dataToSend)

    const res = await sendRequest('PUT', `/courses/${id}`, dataToSend)

    if (res && res.success) {
      alert("Se ha actualizado correctamente")
      navigate(`/courses`)
    } else {
      alert("Error" + res.status + "" + (res.data?.message || res.message))
    }
  }

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este curso?')) {
      const res = await sendRequest('DELETE', `/courses/${id}`)
      if (res && res.success) {
        alert("Curso eliminado correctamente")
        navigate('/courses')
      } else {
        alert("Error al eliminar: " + (res.data?.message || res.message))
      }
    }
  }

  useEffect(() => {
    getCourses()
  }, [id])

  return (
    <div>
      <h1>Detalles del curso</h1>
      <h5>ID: {id}</h5>

      <div style={{ marginBottom: '15px' }}>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}>Editar</button>
        ) : (
          <button onClick={() => setIsEditing(false)}>Cancelar Edición</button>
        )}
        {' '}
        <button
          onClick={handleDelete}
          style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}
        >
          Eliminar
        </button>
      </div>
      <GenericFrom
        fields={fields}
        data={data}
        onChange={handleChange}
        onBack={() => navigate(`/courses`)}
        onSave={handleSave}
        isEditing={isEditing}
      />
    </div>
  )
}
export default ShowShow
