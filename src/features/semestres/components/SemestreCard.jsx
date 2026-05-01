import React from 'react'

export default function SemestreCard({ semestre, onEdit, onDelete }) {
  const isActivo = semestre.estado === 'Activo';
  const badgeColor = isActivo ? '#10b981' : '#64748b';
  
  return (
    <div className="materia-row-compact">
      <div className="materia-col-codigo" style={{ width: '80px' }}>
        <div className="avatar-circle avatar-xs" style={{ backgroundColor: '#1e293b', color: '#38bdf8' }}>
          <i className="bi bi-calendar-event"></i>
        </div>
      </div>
      <div className="materia-col-info" style={{ flex: '3' }}>
        <div className="materia-nombre-compact">{semestre.nombre}</div>
      </div>
      <div className="materia-col-profesor" style={{ flex: '2' }}>
        <span style={{ 
          color: badgeColor, 
          fontSize: '0.85rem', 
          fontWeight: '500', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px' 
        }}>
          {isActivo && <i className="bi bi-circle-fill" style={{ fontSize: '0.5rem' }}></i>}
          {semestre.estado}
        </span>
      </div>
      <div className="d-flex gap-2 ms-auto align-items-center">
        <button className="btn btn-sm btn-outline-info" style={{ border: 'none' }} onClick={onEdit}>
          <i className="bi bi-pencil"></i>
        </button>
        <button className="btn btn-sm btn-outline-danger" style={{ border: 'none' }} onClick={onDelete}>
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  )
}
