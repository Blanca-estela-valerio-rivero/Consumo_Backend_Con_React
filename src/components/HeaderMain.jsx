import React from 'react'

export default function HeaderMain({ activeItem, getPageTitle, getPageSubtitle }) {
  return (
    <header className="sticky-top border-bottom border-secondary p-4" style={{ background: 'rgba(10, 22, 40, 0.5)', backdropFilter: 'blur(10px)' }}>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <nav style={{ fontSize: '0.85rem' }}>
            <span className="text-light opacity-50">Academ</span>
            <span className="text-light opacity-35 mx-2">›</span>
            <span className="text-light opacity-60">{activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}</span>
          </nav>
          <h6 className="text-white fw-semibold mt-1 mb-0">{getPageTitle()}</h6>
        </div>
        <button className="btn btn-primary rounded-3 d-flex align-items-center justify-content-center fw-bold" style={{ width: '40px', height: '40px', fontSize: '0.85rem' }}>
          AD
        </button>
      </div>
    </header>
  )
}
