import React, { useEffect, useState } from 'react'
import { sendRequest } from '../../utils/functions'
import { useNavigate } from 'react-router-dom'

const IndexEnrollments = () => {
  const [enrollments, setEnrollments] = useState([])
  const navigate = useNavigate()

const getEnrollments = async () => {
    const res = await sendRequest('GET', '/enrollments')
    console.log("Respuesta completa de la función:", res) // <-- Mira esto en la consola

    // Verifica EXACTAMENTE cómo se escribe la propiedad en tu functions.js
    if (res.succes === true || res.success === true) { 
      setEnrollments(res.data)
    } else {
      console.error("No se pudo cargar: res.succes es falso o indefinido")
    }
  }

  useEffect(() => {
    getEnrollments()
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Listado de Matrículas</h1>
      <button onClick={() => navigate('/enrollments/new')}>Nueva Matrícula</button>
      
      <table
        border="1"
        style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginTop: '20px' }}
      >
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th>Estudiante (User)</th>
            <th>Curso (Course)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((e) => (
            <tr key={e._id}>
              {/* Solo mostramos el nombre del estudiante */}
              <td>
                {e.userId ? `${e.userId.firstName} ${e.userId.lastName}` : 'N/A'}
              </td>
              
              {/* Solo mostramos el título del curso */}
              <td>
                {e.courseId ? e.courseId.title : 'N/A'}
              </td> 

              <td>
                <button onClick={() => navigate(`/enrollments/${e._id}`)}>
                  Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default IndexEnrollments