import { useState } from 'react'

const navigationItems = {
  principal: [
    { id: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
  ],
  gestion: [
    { id: 'alumnos', label: 'Alumnos', icon: 'bi-people', count: 248 },
    { id: 'materias', label: 'Materias', icon: 'bi-book', count: 34 },
    { id: 'semestres', label: 'Semestres', icon: 'bi-calendar', count: 3 },
  ],
}

const semestresData = [
  {
    id: 1,
    nombre: 'Ciclo 2024 - 2',
    estado: 'Activo',
    fechaInicio: 'Agosto 2024',
    fechaFin: 'Diciembre',
    alumnos: 248,
    materias: 34,
  },
  {
    id: 2,
    nombre: 'Ciclo 2024 - 1',
    estado: 'Cerrado',
    fechaInicio: 'Enero 2024',
    fechaFin: 'Junio 2024',
    alumnos: 230,
    materias: 31,
  },
  {
    id: 3,
    nombre: 'Ciclo 2025 - 1',
    estado: 'Próximo',
    fechaInicio: 'Enero 2025',
    fechaFin: 'Junio 2025',
    alumnos: 0,
    materias: 0,
  },
]

const alumnosData = [
  { id: 1, nombre: 'Ana Perez', codigo: 'ALU-001', semestre: 'Ciclo 2024 - 2' },
  { id: 2, nombre: 'Luis Martinez', codigo: 'ALU-002', semestre: 'Ciclo 2024 - 2' },
  { id: 3, nombre: 'Carlos Ruiz', codigo: 'ALU-003', semestre: 'Ciclo 2024 - 1' },
]

const materiasData = [
  { id: 1, nombre: 'Matematica I', codigo: 'MAT-101', creditos: 4 },
  { id: 2, nombre: 'Programacion', codigo: 'INF-201', creditos: 5 },
  { id: 3, nombre: 'Fisica General', codigo: 'FIS-110', creditos: 4 },
]

export default function MenuOpciones({ activeItem = 'semestres', onNavigate }) {
  const [currentUser] = useState({
    initials: 'AD',
    name: 'Admin General',
    role: 'Administrador',
  })

  const handleNavigate = (itemId) => {
    if (typeof onNavigate === 'function') {
      onNavigate(itemId)
    }
  }

  const getPageTitle = () => {
    if (activeItem === 'semestres') return 'Períodos Académicos'
    if (activeItem === 'alumnos') return 'Gestión de Alumnos'
    if (activeItem === 'materias') return 'Gestión de Materias'
    if (activeItem === 'dashboard') return 'Dashboard'
    return 'Sistema Académico'
  }

  const getPageSubtitle = () => {
    if (activeItem === 'semestres') return 'Gestión de ciclos y semestres registrados'
    if (activeItem === 'alumnos') return 'Administra estudiantes y su información'
    if (activeItem === 'materias') return 'Administra materias y contenido curricular'
    if (activeItem === 'dashboard') return 'Bienvenido al sistema de gestión académica'
    return ''
  }

  const renderSectionContent = () => {
    if (activeItem === 'dashboard') {
      return (
        <div className="p-5 flex-grow-1">
          <h1 className="text-white fw-bold mb-2" style={{ fontSize: '2.5rem' }}>{getPageTitle()}</h1>
          <p className="text-light opacity-75 mb-4">Resumen general del sistema académico</p>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card bg-dark bg-opacity-50 border-secondary rounded-4 h-100">
                <div className="card-body">
                  <small className="text-light opacity-75 text-uppercase">Alumnos</small>
                  <h2 className="text-info fw-bold mb-0">248</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-dark bg-opacity-50 border-secondary rounded-4 h-100">
                <div className="card-body">
                  <small className="text-light opacity-75 text-uppercase">Materias</small>
                  <h2 className="text-info fw-bold mb-0">34</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-dark bg-opacity-50 border-secondary rounded-4 h-100">
                <div className="card-body">
                  <small className="text-light opacity-75 text-uppercase">Semestres</small>
                  <h2 className="text-info fw-bold mb-0">3</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (activeItem === 'alumnos') {
      return (
        <div className="p-5 flex-grow-1">
          <h1 className="text-white fw-bold mb-2" style={{ fontSize: '2.5rem' }}>{getPageTitle()}</h1>
          <p className="text-light opacity-75 mb-4">Listado de alumnos registrados</p>
          <div className="card bg-dark bg-opacity-50 border-secondary rounded-4">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-dark table-hover align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Codigo</th>
                      <th>Nombre</th>
                      <th>Semestre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alumnosData.map((alumno) => (
                      <tr key={alumno.id}>
                        <td>{alumno.codigo}</td>
                        <td>{alumno.nombre}</td>
                        <td>{alumno.semestre}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (activeItem === 'materias') {
      return (
        <div className="p-5 flex-grow-1">
          <h1 className="text-white fw-bold mb-2" style={{ fontSize: '2.5rem' }}>{getPageTitle()}</h1>
          <p className="text-light opacity-75 mb-4">Materias y creditos del plan curricular</p>
          <div className="row g-4">
            {materiasData.map((materia) => (
              <div key={materia.id} className="col-md-6 col-lg-4">
                <div className="card bg-dark bg-opacity-50 border-secondary rounded-4 h-100">
                  <div className="card-body">
                    <small className="text-info fw-semibold">{materia.codigo}</small>
                    <h5 className="text-white mt-2 mb-3">{materia.nombre}</h5>
                    <span className="badge bg-primary-subtle text-primary-emphasis">{materia.creditos} creditos</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="d-flex" style={{ height: '100vh', background: '#0a1628' }}>
      <nav className="bg-dark border-end border-secondary" style={{ width: '280px', overflowY: 'auto' }}>
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
                    onClick={() => handleNavigate(item.id)}
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

      <main className="flex-grow-1 d-flex flex-column" style={{ overflowY: 'auto', background: 'linear-gradient(135deg, #0f2a3d 0%, #061219 100%)' }}>
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
              {currentUser.initials}
            </button>
          </div>
        </header>

        {activeItem === 'semestres' && (
          <div className="p-5 flex-grow-1">
            <div className="d-flex align-items-start justify-content-between mb-5">
              <div>
                <h1 className="text-white fw-bold mb-2" style={{ fontSize: '2.5rem' }}>{getPageTitle()}</h1>
                <p className="text-light opacity-75">{getPageSubtitle()}</p>
              </div>
              <button className="btn btn-primary btn-lg rounded-3 fw-semibold" style={{ whiteSpace: 'nowrap' }}>
                <i className="bi bi-plus-lg"></i> Nuevo semestre
              </button>
            </div>

            <div className="row g-4">
              {semestresData.map((semestre) => (
                <div key={semestre.id} className="col-md-6 col-lg-4">
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
                          <div className="p-3 rounded-3 border border-secondary border-opacity-25" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                            <p className="text-info fw-bold mb-0" style={{ fontSize: '1.8rem' }}>{semestre.alumnos}</p>
                            <small className="text-light opacity-60 text-uppercase fw-semibold">Alumnos</small>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="p-3 rounded-3 border border-secondary border-opacity-25" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                            <p className="text-info fw-bold mb-0" style={{ fontSize: '1.8rem' }}>{semestre.materias}</p>
                            <small className="text-light opacity-60 text-uppercase fw-semibold">Materias</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeItem !== 'semestres' && renderSectionContent()}
      </main>
    </div>
  )
}
