import React, { useEffect, useState } from 'react'
import { sendRequest } from '../../utils/functions'
import { useNavigate } from 'react-router-dom'

const IndexCourses = () => {
  const [courses, setCourses] = useState([])

  const navigate = useNavigate()

  const getCourses = async () => {
    const res = await sendRequest('GET', '/courses')
    if (res.success) {
      setCourses(res.data)
    } else {
      alert(res.message)
    }
  }

  useEffect(() => {
    getCourses()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Listado de Cursos</h1>
      <button onClick={() => navigate('/courses/new')}>Nuevo Curso</button>
      <table
        border="1"
        style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}
      >
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th>ID</th>
            <th>Titulo del curso</th>
            <th>Descripcion del curso</th>

          </tr>
        </thead>
        <tbody>
          {courses.map(m => (
            <tr key={m._id}>
              <td>{m._id}</td>
              <td>{m.title}</td>
              <td>{m.description}</td>

              <td>
                <button onClick={() => navigate(`/courses/${m._id}`)}>Detalles</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default IndexCourses

// const mongoose = require('mongoose')

// const courseSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   category: { type: String, required: true },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date, required: true },
//   location: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// })

// // Usa exactamente "courses"
// module.exports = mongoose.models.Course || mongoose.model('Course', courseSchema, 'courses')
