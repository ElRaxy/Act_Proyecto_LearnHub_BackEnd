import React from 'react'
import { Link } from 'react-router-dom'
import './Panel.css'

const Panel = () => {
  return (
    <div className="panel-root">
      <div className="panel-bg" />

      <div className="panel-wrap">
        <h1>Panel de Gestión</h1>

        <div className="panel-options">
          <Link to="/courses" className="panel-item fadeUp" style={{ '--d': '0s' }}>
            <div className="panel-iconFrame">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <span>Cursos</span>
          </Link>

          <Link to="/usuarios" className="panel-item fadeUp" style={{ '--d': '0.12s' }}>
            <div className="panel-iconFrame">
              <i className="fa-solid fa-users"></i>
            </div>
            <span>Usuarios</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Panel
