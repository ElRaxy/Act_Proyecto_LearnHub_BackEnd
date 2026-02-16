import GenericFrom from '../../components/GenericFrom' // Verifica que esta ruta sea correcta
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendRequest } from '../../utils/functions'

const NewCourses = () => {
  const navigate = useNavigate()

  const [data, setData] = useState({
    title: '',
    description: '',
    category: '',
    startDate: '',
    endDate: '',
    location: '',
  })

  const fields = [
    { key: 'title', label: 'Título', type: 'text' },
    { key: 'description', label: 'Descripción', type: 'textarea' }, 
    { key: 'category', label: 'Categoría', type: 'text' },
    { key: 'startDate', label: 'Fecha de inicio', type: 'date' },
    { key: 'endDate', label: 'Fecha de fin', type: 'date' },
    { key: 'location', label: 'Ubicación', type: 'text' },
  ]

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    const res = await sendRequest('POST', '/courses', data)
    if (res.success || res.status === 201 || res.status === 200) { 
      alert('Curso creado correctamente')
      navigate(`/courses`)
    } else {
      alert('Error: ' + (res.data?.message || res.message))
    }
  }

  return (
    <div className="wrap">
      <h1>Crear Curso</h1>
      <GenericFrom
        fields={fields}
        data={data}
        onChange={handleChange}
        onBack={() => navigate(`/courses`)}
        onSave={handleSave}
        isEditing={true} 
      />
    </div>
  )
}

export default NewCourses
