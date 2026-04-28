import React from 'react'

export default function SemestreCard({ semestre }) {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card border-secondary bg-dark bg-opacity-50 h-100 rounded-4 shadow-sm" style={{ backdropFilter: 'blur(10px)' }}>
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="card-title text-white fw-bold mb-0">{semestre.nombre}</h5>
            <span
              className={`badge rounded-pill ${
                semestre.estado === 'Activo'
                  ? 'bg-success bg-opacity-75'
                  : semestre.estado === 'Cerrado'
                  ? 'bg-secondary'
                  : 'bg-warning bg-opacity-75 text-dark'
              }`}
            >
              {semestre.estado === 'Activo' && <i className="bi bi-circle-fill me-1" style={{ fontSize: '0.6rem' }}></i>}
              {semestre.estado}
            </span>
          </div>
          <small className="text-light opacity-75 d-block mb-3">
            <i className="bi bi-calendar-event me-1"></i>
            {semestre.fechaInicio} — {semestre.fechaFin}
          </small>

          <hr className="border-secondary opacity-25 my-3" />

          <div className="row g-2">
            <div className="col-6">
              <div className="p-3 rounded-3 border border-secondary border-opacity-25" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                <p className="text-info fw-bold mb-0" style={{ fontSize: '1.8rem' }}>{semestre.alumnos}</p>
                <small className="text-light opacity-60 text-uppercase fw-semibold">Alumnos</small>
              </div>
            </div>
            <div className="col-6">
              <div className="p-3 rounded-3 border border-secondary border-opacity-25" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                <p className="text-info fw-bold mb-0" style={{ fontSize: '1.8rem' }}>{semestre.materias}</p>
                <small className="text-light opacity-60 text-uppercase fw-semibold">Materias</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
