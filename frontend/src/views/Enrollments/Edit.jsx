import React, { useEffect, useState } from 'react'
import GenericFrom from '../../components/GenericFrom'
import { useNavigate, useParams } from 'react-router-dom'
import { sendRequest } from '../../utils/functions'

const EditEnrollment = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [data, setData] = useState({
    userId: '',
    courseId: '',
    enrollmentsDate: '',
    status: '',
    notes: ''
  })

  const fields = [
    { key: 'userId', label: 'ID Usuario', type: 'text' },
    { key: 'courseId', label: 'ID Curso', type: 'text' },
    { key: 'enrollmentsDate', label: 'Fecha de Matrícula', type: 'date' },
    { key: 'status', label: 'Estado', type: 'select', options: [
        { value: 'pendiente', label: 'Pendiente' },
        { value: 'aprobado', label: 'Aprobado' },
        { value: 'rechazado', label: 'Rechazado' }
      ], optionValue: 'value', optionLabel: 'label' 
    },
    { key: 'notes', label: 'Notas', type: 'textarea' }
  ]

  const getEnrollment = async () => {
    const res = await sendRequest('GET', `/enrollments/${id}`)
    
    // 1. Verificamos 'success' (como sale en tu consola)
    if (res.success || res.succes) {
      
      // 2. SOLUCIÓN CLAVE: Si res.data es un Array, tomamos la posición [0]
      const d = Array.isArray(res.data) ? res.data[0] : res.data

      if (d) {
        setData({
          userId: d.userId?._id || d.userId || '',
          courseId: d.courseId?._id || d.courseId || '',
          enrollmentsDate: d.enrollmentsDate ? d.enrollmentsDate.split('T')[0] : '',
          status: d.status || '',
          notes: d.notes || ''
        })
      } else {
        alert('La matrícula no contiene datos válidos')
        navigate('/enrollments')
      }
    } else {
      alert('No se pudo encontrar la matrícula: ' + (res.message || 'Error 404'))
      navigate('/enrollments')
    }
  }

  useEffect(() => {
    getEnrollment()
  }, [id])

  const handleChange = (key, value) => {
    setData({ ...data, [key]: value })
  }

  const handleSave = async () => {
    // 3. Enviamos solo los IDs al backend para evitar errores de validación
    const dataToSend = {
        ...data,
        userId: data.userId?._id || data.userId,
        courseId: data.courseId?._id || data.courseId
    }

    const res = await sendRequest('PUT', `/enrollments/${id}`, dataToSend)
    
    if (res.success || res.succes) {
      alert('Matrícula actualizada')
      navigate('/enrollments')
    } else {
      alert('Error al guardar: ' + res.message)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Editar Matrícula</h1>
      <GenericFrom
        fields={fields}
        data={data}
        onChange={handleChange}
        onBack={() => navigate('/enrollments')}
        onSave={handleSave}
        isEditing={true}
      />
    </div>
  )
}

export default EditEnrollment