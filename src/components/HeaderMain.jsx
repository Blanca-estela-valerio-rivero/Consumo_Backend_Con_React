import React from 'react'

export default function HeaderMain({ activeItem, getPageTitle, getPageSubtitle }) {
  return (
    <header 
      className="sticky-top border-bottom p-4" 
      style={{ 
        background: 'rgba(11, 17, 26, 0.7)',
        backdropFilter: 'blur(10px)',
        borderColor: '#1f2937'
      }}
    >
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <nav style={{ fontSize: '0.85rem' }}>
            <span className="text-light opacity-50">Academ</span>
            <span className="text-light opacity-35 mx-2">›</span>
            <span className="text-light opacity-70">{activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}</span>
          </nav>
          <h6 className="text-white fw-semibold mt-1 mb-0" style={{ fontSize: '1.25rem' }}>
            {getPageTitle()}
          </h6>
        </div>
        <button 
          className="btn d-flex align-items-center justify-content-center fw-bold" 
          style={{ 
            width: '40px', 
            height: '40px', 
            fontSize: '0.85rem',
            backgroundColor: 'rgba(34, 211, 238, 0.1)',
            color: '#22d3ee',
            border: '1px solid rgba(34, 211, 238, 0.3)',
            borderRadius: '50%'
          }}
        >
          AD
        </button>
      </div>
    </header>
  )
}
