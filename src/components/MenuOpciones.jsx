import { useState } from 'react'
import { semestresData, alumnosData, materiasData, currentUser } from '../shared/constants/data'
import Sidebar from './Sidebar'
import HeaderMain from './HeaderMain'
import SemestreCard from './SemestreCard'

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

export default function MenuOpciones({ activeItem = 'semestres', onNavigate }) {
  const [currentUserState] = useState(currentUser)

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
      <Sidebar navigationItems={navigationItems} activeItem={activeItem} onNavigate={handleNavigate} currentUser={currentUserState} />

      <main className="flex-grow-1 d-flex flex-column" style={{ overflowY: 'auto', background: 'linear-gradient(135deg, #0f2a3d 0%, #061219 100%)' }}>
        <HeaderMain activeItem={activeItem} getPageTitle={getPageTitle} getPageSubtitle={getPageSubtitle} />

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
                <SemestreCard key={semestre.id} semestre={semestre} />
              ))}
            </div>
          </div>
        )}

        {activeItem !== 'semestres' && renderSectionContent()}
      </main>
    </div>
  )
}
