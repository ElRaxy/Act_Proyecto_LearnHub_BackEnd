import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { sendRequest } from '../../utils/functions'
import GenericFrom from '../../components/GenericFrom'

const ShowEnrollment = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [enrollment, setEnrollment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [data, setData] = useState({
    userId: '',
    courseId: '',
    enrollmentsDate: '',
    status: '',
    notes: ''
  })
  const [users, setUsers] = useState([])
  const [courses, setCourses] = useState([])

  // Cargar matrícula
  useEffect(() => {
    const fetchEnrollment = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await sendRequest('GET', `/enrollments/show/${id}`)
        setEnrollment(res.data)
        setData({
          userId: res.data.userId?._id || res.data.userId || '',
          courseId: res.data.courseId?._id || res.data.courseId || '',
          enrollmentsDate: res.data.enrollmentsDate ? res.data.enrollmentsDate.slice(0,10) : '',
          status: res.data.status || '',
          notes: res.data.notes || ''
        })
      } catch (err) {
        setError('No se pudo encontrar la matrícula: ' + (err.message || 'Error desconocido'))
      }
      setLoading(false)
    }
    fetchEnrollment()
  }, [id])

  // Cargar usuarios y cursos solo cuando se entra en modo edición
  useEffect(() => {
    if (isEditing) {
      const fetchUsersAndCourses = async () => {
        const usersRes = await sendRequest('GET', '/users')
        const coursesRes = await sendRequest('GET', '/courses')
        setUsers(usersRes.data || [])
        setCourses(coursesRes.data || [])
      }
      fetchUsersAndCourses()
    }
  }, [isEditing])

  // Campos del formulario
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

  const handleChange = (key, value) => {
    setData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = async () => {
    const dataToSend = {
      userId: data.userId,
      courseId: data.courseId,
      enrollmentsDate: data.enrollmentsDate,
      status: data.status,
      notes: data.notes
    }
    const res = await sendRequest('PUT', `/enrollments/${id}`, dataToSend)
    if (res && res.success) {
      alert("Matrícula actualizada correctamente")
      navigate('/enrollments') // Redirige al listado
    } else {
      alert("Error al actualizar: " + (res.data?.message || res.message))
    }
  }

  if (loading) return <div>Cargando matrícula...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>
  if (!enrollment) return <div>No se encontró la matrícula.</div>

  return (
    <div style={{ padding: '20px' }}>
      <h1>Detalle de Matrícula</h1>
      <div style={{ marginBottom: '15px' }}>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)}>Editar</button>
        )}
        <button
          onClick={() => navigate('/enrollments')}
          style={{ marginLeft: '10px' }}
        >
          Volver al listado
        </button>
      </div>
      {isEditing ? (
        <GenericFrom
          fields={fields}
          data={data}
          onChange={handleChange}
          onBack={() => setIsEditing(false)}
          onSave={handleSave}
          isEditing={true}
        />
      ) : (
        <table style={{ marginTop: '20px' }}>
          <tbody>
            <tr>
              <td><b>ID:</b></td>
              <td>{enrollment._id}</td>
            </tr>
            <tr>
              <td><b>Usuario:</b></td>
              <td>
                {enrollment.userId
                  ? `${enrollment.userId.firstName} ${enrollment.userId.lastName} (${enrollment.userId.email})`
                  : enrollment.userId}
              </td>
            </tr>
            <tr>
              <td><b>Curso:</b></td>
              <td>
                {enrollment.courseId
                  ? `${enrollment.courseId.title} (${enrollment.courseId.category})`
                  : enrollment.courseId}
              </td>
            </tr>
            <tr>
              <td><b>Fecha de Matrícula:</b></td>
              <td>{enrollment.enrollmentsDate ? new Date(enrollment.enrollmentsDate).toLocaleDateString() : ''}</td>
            </tr>
            <tr>
              <td><b>Estado:</b></td>
              <td>{enrollment.status}</td>
            </tr>
            <tr>
              <td><b>Notas:</b></td>
              <td>{enrollment.notes}</td>
            </tr>
            <tr>
              <td><b>Creado:</b></td>
              <td>{enrollment.createdAt ? new Date(enrollment.createdAt).toLocaleString() : ''}</td>
            </tr>
            <tr>
              <td><b>Actualizado:</b></td>
              <td>{enrollment.updatedAt ? new Date(enrollment.updatedAt).toLocaleString() : ''}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ShowEnrollment