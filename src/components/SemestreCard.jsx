import React from 'react'

export default function SemestreCard({ semestre }) {
  return (
    <div className="col-md-6 col-lg-4 col-xl-3">
      <div className="semestre-card-compact">
        <div className="semestre-card-compact-icon">
          <i className="bi bi-calendar-event"></i>
        </div>
        <div className="semestre-card-compact-content">
          <h5 className="semestre-card-compact-title">{semestre.nombre}</h5>
          <span className="semestre-card-compact-badge">
            {semestre.estado === 'Activo' && (
              <i className="bi bi-circle-fill me-1" style={{ fontSize: '0.5rem' }}></i>
            )}
            {semestre.estado}
          </span>
        </div>
      </div>
    </div>
  )
}
