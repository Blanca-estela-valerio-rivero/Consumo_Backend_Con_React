import React from 'react'

export default function Sidebar({ navigationItems, activeItem, onNavigate, currentUser }) {
  return (
    <nav className="bg-dark border-end border-secondary d-flex flex-column" style={{ width: '280px', overflowY: 'auto' }}>
      <div className="p-4 border-bottom border-secondary">
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex align-items-center justify-content-center rounded p-2" style={{ background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(147, 197, 253, 0.3)', width: '40px', height: '40px' }}>
            <i className="bi bi-book text-info fs-5"></i>
          </div>
          <div>
            <p className="fw-bold text-white mb-0">Academ</p>
            <small className="text-muted">SISTEMA ACADÉMICO</small>
          </div>
        </div>
      </div>

      <div className="p-3">
        {Object.entries(navigationItems).map(([section, items]) => (
          <div key={section} className="mb-4">
            <small className="text-muted text-uppercase fw-semibold d-block px-2 mb-2">
              {section === 'principal' ? 'Principal' : 'Gestión'}
            </small>
            <div className="nav flex-column gap-1">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`nav-link sidebar-nav-item d-flex align-items-center justify-content-between px-3 py-2 rounded-3 fw-500 transition ${
                    activeItem === item.id
                      ? 'active-item bg-primary bg-opacity-25 border border-primary border-opacity-50 text-info'
                      : 'text-light opacity-85 border border-transparent'
                  }`}
                  style={{ fontSize: '0.95rem', cursor: 'pointer' }}
                >
                  <span className="d-flex align-items-center gap-2">
                    <i className={`bi ${item.icon}`}></i>
                    {item.label}
                  </span>
                  {item.count !== undefined && (
                    <span className={`badge rounded-pill ${activeItem === item.id ? 'bg-info text-dark' : 'bg-secondary'}`}>
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 mt-auto border-top border-secondary">
        <button className="btn btn-outline-secondary d-flex align-items-center gap-2 w-100 py-2" style={{ fontSize: '0.9rem' }}>
          <div className="d-flex align-items-center justify-content-center rounded-circle fw-bold text-white" style={{ background: 'linear-gradient(135deg, #3b82f6, #1e40af)', width: '40px', height: '40px', fontSize: '0.8rem' }}>
            {currentUser.initials}
          </div>
          <div className="text-start">
            <small className="d-block fw-semibold text-white">{currentUser.name}</small>
            <small className="d-block text-muted">{currentUser.role}</small>
          </div>
        </button>
      </div>
    </nav>
  )
}
