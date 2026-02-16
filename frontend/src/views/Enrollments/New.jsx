import React, { useState, useEffect } from 'react'
import GenericFrom from '../../components/GenericFrom'
import { useNavigate } from 'react-router-dom'
import { sendRequest } from '../../utils/functions'

const NewEnrollment = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  const [data, setData] = useState({
    userId: '',
    courseId: '',
    enrollmentsDate: '',
    status: 'pendiente',
    notes: ''
  })

  // Cargar usuarios y cursos al montar
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const usersRes = await sendRequest('GET', '/users')
      const coursesRes = await sendRequest('GET', '/courses')
      setUsers(usersRes.data || [])
      setCourses(coursesRes.data || [])
      setLoading(false)
    }
    fetchData()
  }, [])

  // Campos del formulario con selects para usuarios y cursos
  const fields = [
    {
      key: 'userId',
      label: 'Usuario',
      type: 'select',
      options: users.map(u => ({
        value: u._id,
        label: `${u.firstName} ${u.lastName} (${u.email})`
      })),
      optionValue: 'value',
      optionLabel: 'label'
    },
    {
      key: 'courseId',
      label: 'Curso',
      type: 'select',
      options: courses.map(c => ({
        value: c._id,
        label: `${c.title} (${c.category})`
      })),
      optionValue: 'value',
      optionLabel: 'label'
    },
    { key: 'enrollmentsDate', label: 'Fecha de Matrícula', type: 'date' },
    {
      key: 'status',
      label: 'Estado',
      type: 'select',
      options: [
        { value: 'pendiente', label: 'Pendiente' },
        { value: 'aprobado', label: 'Aprobado' },
        { value: 'rechazado', label: 'Rechazado' }
      ],
      optionValue: 'value',
      optionLabel: 'label'
    },
    { key: 'notes', label: 'Notas', type: 'textarea' }
  ]

  // Manejar cambios en el formulario
  const handleChange = (key, value) => {
    setData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Guardar matrícula
  const handleSave = async () => {
    // Enviar solo los IDs y campos requeridos
    const dataToSend = {
      userId: data.userId,
      courseId: data.courseId,
      enrollmentsDate: data.enrollmentsDate,
      status: data.status,
      notes: data.notes
    }

    // POST a /enrollments
    const res = await sendRequest('POST', '/enrollments', dataToSend)
    if (res.success) {
      navigate('/enrollments')
    } else {
      alert(res.message || 'Error al crear la matrícula')
    }
  }

  if (loading) return <div>Cargando datos...</div>

  return (
    <div style={{ padding: '20px' }}>
      <h1>Crear Matrícula</h1>
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

export default NewEnrollment