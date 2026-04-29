import React from 'react'

export default function Sidebar({ navigationItems, activeItem, onNavigate, currentUser }) {
  return (
    <nav 
      className="d-flex flex-column" 
      style={{ 
        width: '280px', 
        overflowY: 'auto',
        backgroundColor: '#0b111a',
        borderRight: '1px solid #1f2937'
      }}
    >
      <div className="p-4" style={{ borderBottom: '1px solid #1f2937' }}>
        <div className="d-flex align-items-center gap-2">
          <div 
            className="d-flex align-items-center justify-content-center rounded p-2" 
            style={{ 
              background: 'rgba(34, 211, 238, 0.1)', 
              border: '1px solid rgba(34, 211, 238, 0.3)', 
              width: '40px', 
              height: '40px' 
            }}
          >
            <i className="bi bi-book text-info fs-5"></i>
          </div>
          <div>
            <p className="fw-bold text-white mb-0">Academ</p>
            <small className="text-muted" style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
              SISTEMA ACADÉMICO
            </small>
          </div>
        </div>
      </div>

      <div className="p-3">
        {Object.entries(navigationItems).map(([section, items]) => (
          <div key={section} className="mb-4">
            <small 
              className="text-uppercase fw-semibold d-block px-2 mb-2" 
              style={{ color: '#94a3b8', fontSize: '0.7rem', letterSpacing: '0.05em' }}
            >
              {section === 'principal' ? 'Principal' : 'Gestión'}
            </small>
            <div className="nav flex-column gap-1">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`nav-link sidebar-nav-item d-flex align-items-center justify-content-between px-3 py-2 fw-500`}
                  style={{ 
                    fontSize: '0.95rem', 
                    cursor: 'pointer',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    backgroundColor: activeItem === item.id ? 'rgba(30, 41, 59, 0.6)' : 'transparent',
                    color: activeItem === item.id ? '#22d3ee' : '#cbd5e1',
                    borderLeft: activeItem === item.id ? '3px solid #22d3ee' : 'none',
                    paddingLeft: activeItem === item.id ? 'calc(0.75rem - 3px)' : '0.75rem'
                  }}
                >
                  <span className="d-flex align-items-center gap-2">
                    <i className={`bi ${item.icon}`}></i>
                    {item.label}
                  </span>
                  {item.count !== undefined && (
                    <span 
                      className="badge badge-notification"
                      style={{
                        backgroundColor: '#374151',
                        color: '#ffffff',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 mt-auto" style={{ borderTop: '1px solid #1f2937' }}>
        <button 
          className="btn d-flex align-items-center gap-2 w-100 py-2" 
          style={{ 
            fontSize: '0.9rem',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'inherit'
          }}
        >
          <div 
            className="d-flex align-items-center justify-content-center rounded-circle fw-bold text-white" 
            style={{ 
              background: 'linear-gradient(135deg, #22d3ee, #0891b2)', 
              width: '40px', 
              height: '40px', 
              fontSize: '0.8rem' 
            }}
          >
            {currentUser.initials}
          </div>
          <div className="text-start">
            <small className="d-block fw-semibold text-white">{currentUser.name}</small>
            <small className="d-block" style={{ color: '#94a3b8' }}>{currentUser.role}</small>
          </div>
        </button>
      </div>
    </nav>
  )
}
