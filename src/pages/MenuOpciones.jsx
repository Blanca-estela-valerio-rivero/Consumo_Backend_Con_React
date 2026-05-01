import { useState, useEffect } from 'react'
import { semestresData, materiasData, currentUser } from '../shared/constants/data'
import { obtenerAlumnos, crearAlumno, actualizarAlumno, eliminarAlumno } from '../features/alumnos/services/alumnoService'
import { obtenerMaterias, crearMateria, actualizarMateria, eliminarMateria } from '../features/materias/services/materiaService'
import { obtenerSemestres, crearSemestre, actualizarSemestre, eliminarSemestre } from '../features/semestres/services/semestreService'
import Sidebar from '../layouts/Sidebar.jsx'
import SemestreCard from '../features/semestres/components/SemestreCard.jsx'

const navigationItems = {
  principal: [
    { id: 'dashboard', label: 'Dashboard', icon: 'bi-speedometer2' },
  ],
  gestion: [
    { id: 'alumnos', label: 'Alumnos', icon: 'bi-people', count: 0 },
    { id: 'materias', label: 'Materias', icon: 'bi-book', count: 0 },
    { id: 'semestres', label: 'Semestres', icon: 'bi-calendar', count: 0 },
  ],
}

// Helper functions
const getAvatarColor = (index) => {
  const colors = ['avatar-blue', 'avatar-green', 'avatar-purple', 'avatar-cyan', 'avatar-orange']
  return colors[index % colors.length]
}

const getInitials = (nombre) => {
  if (!nombre) return 'NA'
  return nombre
    .split(' ')
    .map(n => n.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2)
}

export default function MenuOpciones({ activeItem = 'semestres', onNavigate }) {
  const [currentUserState] = useState(currentUser)
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedCarrera, setSelectedCarrera] = useState('')
  const [alumnos, setAlumnos] = useState([])
  const [alumnoEditando, setAlumnoEditando] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    matricula: '',
    carrera: '',
    semestre: '',
    correo: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [materias, setMaterias] = useState([])
  const [materiaEditando, setMateriaEditando] = useState(null)
  const [formDataMateria, setFormDataMateria] = useState({
    nombre: '',
    creditos: '',
    semestre: ''
  })
  const [showModalSemestre, setShowModalSemestre] = useState(false)
  const [semestres, setSemestres] = useState([])
  const [semestreEditando, setSemestreEditando] = useState(null)
  const [formDataSemestre, setFormDataSemestre] = useState({
    nombre: '',
    estado: 'Activo'
  })

  const handleNavigate = (itemId) => {
    if (typeof onNavigate === 'function') {
      onNavigate(itemId)
    }
  }

  const fetchAlumnos = async () => {
    try {
      const data = await obtenerAlumnos();
      setAlumnos(data);
    } catch (error) {
      console.error("Error al obtener alumnos", error);
    }
  }

  const fetchMaterias = async () => {
    try {
      const data = await obtenerMaterias();
      setMaterias(data);
    } catch (error) {
      console.error("Error al obtener materias", error);
    }
  }

  const fetchSemestres = async () => {
    try {
      const data = await obtenerSemestres();
      setSemestres(data);
    } catch (error) {
      console.error("Error al obtener semestres", error);
    }
  }

  useEffect(() => {
    fetchAlumnos();
    fetchMaterias();
    fetchSemestres();
  }, []);

  const getPageTitle = () => {
    if (activeItem === 'semestres') return 'Períodos Académicos'
    if (activeItem === 'alumnos') return 'Gestión de Alumnos'
    if (activeItem === 'materias') return 'Gestión de Materias'
    if (activeItem === 'dashboard') return 'Dashboard'
    return 'Sistema Académico'
  }


  const renderSectionContent = () => {
    if (activeItem === 'dashboard') {
      const carreras = [
        'Sistemas',
        'Arquitectura',
        'Civil',
        'Mecatrónica',
        'Administración',
        'Gestión'
      ];
      
      const distributionCounts = carreras.map(c => alumnos.filter(a => a.carrera === c).length);
      const maxAlumnos = Math.max(...distributionCounts, 1); // Avoid division by zero

      return (
        <div className="px-5 pb-5 pt-4 flex-grow-1">
          <div className="d-flex align-items-start justify-content-between mb-5">
            <div>
              <h1 className="text-white fw-bold mb-3" style={{ fontSize: '2.5rem' }}>{getPageTitle()}</h1>
              <p style={{ color: '#94a3b8', marginBottom: '0' }}>Resumen general del sistema académico</p>
            </div>
          </div>

          {/* Tarjetas de Estadísticas Principales */}
          <div className="row g-4 mb-5">
            {/* Alumnos */}
            <div className="col-md-4">
              <div 
                className="stat-card" 
                style={{ cursor: 'pointer' }}
                onClick={() => onNavigate('alumnos')}
              >
                <div className="d-flex align-items-start justify-content-between mb-3">
                  <div className="stat-icon">
                    <i className="bi bi-people"></i>
                  </div>
                </div>
                <div className="stat-label">Alumnos</div>
                <div className="stat-number">{alumnos.length}</div>
              </div>
            </div>

            {/* Materias */}
            <div className="col-md-4">
              <div 
                className="stat-card"
                style={{ cursor: 'pointer' }}
                onClick={() => onNavigate('materias')}
              >
                <div className="d-flex align-items-start justify-content-between mb-3">
                  <div className="stat-icon">
                    <i className="bi bi-book"></i>
                  </div>
                </div>
                <div className="stat-label">Materias</div>
                <div className="stat-number">{materias.length}</div>
              </div>
            </div>

            {/* Semestres */}
            <div className="col-md-4">
              <div 
                className="stat-card"
                style={{ cursor: 'pointer' }}
                onClick={() => onNavigate('semestres')}
              >
                <div className="d-flex align-items-start justify-content-between mb-3">
                  <div className="stat-icon">
                    <i className="bi bi-calendar"></i>
                  </div>
                </div>
                <div className="stat-label">Semestres</div>
                <div className="stat-number">{semestres.length}</div>
              </div>
            </div>
          </div>

          {/* Gráficas de CSS Puro */}
          <div className="row g-4 mt-4">
            {/* Distribución por Carrera */}
            <div className="col-lg-6">
              <div className="stat-card">
                <h6 className="text-white fw-bold mb-4">Distribución por Carrera</h6>
                <div className="bar-chart">
                  {distributionCounts.map((count, idx) => {
                    const heightPercent = (count / maxAlumnos) * 100;
                    return (
                      <div 
                        key={idx} 
                        className="bar position-relative" 
                        style={{ height: `${heightPercent}%` }}
                        title={`${count} alumnos`}
                      >
                        {count > 0 && (
                          <span style={{
                            position: 'absolute',
                            top: '-20px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            color: '#94a3b8',
                            fontSize: '0.75rem'
                          }}>
                            {count}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="d-flex justify-content-between mt-3" style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  {carreras.map(c => <span key={c}>{c}</span>)}
                </div>
              </div>
            </div>

            {/* Aprobados vs Reprobados */}
            <div className="col-lg-6">
              <div className="stat-card">
                <h6 className="text-white fw-bold mb-4">Desempeño Académico</h6>
                <div className="d-flex align-items-center justify-content-between">
                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <div className="donut-chart">
                      <div className="donut-inner">
                        <div className="donut-percentage">0%</div>
                        <div className="donut-label">Aprobados</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ flex: 1, paddingLeft: '2rem' }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <div 
                          style={{ 
                            width: '12px', 
                            height: '12px', 
                            borderRadius: '3px',
                            backgroundColor: '#10b981'
                          }}
                        ></div>
                        <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Aprobados: 0</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <div 
                          style={{ 
                            width: '12px', 
                            height: '12px', 
                            borderRadius: '3px',
                            backgroundColor: '#ef4444'
                          }}
                        ></div>
                        <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Reprobados: 0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (activeItem === 'alumnos') {
      const filteredAlumnos = alumnos.filter(alumno => {
        if (!searchQuery.trim()) return true
        const query = searchQuery.toLowerCase()
        return (
          (alumno.nombre || '').toLowerCase().includes(query) ||
          (alumno.apellido_paterno || '').toLowerCase().includes(query) ||
          (alumno.apellido_materno || '').toLowerCase().includes(query) ||
          (alumno.matricula || '').toLowerCase().includes(query)
        )
      }).filter(alumno => {
        if (!selectedCarrera) return true
        return alumno.carrera === selectedCarrera
      })

      const carreras = [
        'Sistemas',
        'Arquitectura',
        'Civil',
        'Mecatrónica',
        'Administración',
        'Gestión'
      ]

      const inputStyle = {
        backgroundColor: '#1b2431',
        border: '1px solid #2d3748',
        color: '#e2e8f0',
        borderRadius: '8px',
        padding: '0.75rem 1rem',
        fontSize: '0.9rem',
        transition: 'border-color 0.2s, box-shadow 0.2s'
      }

      const inputFocusStyle = {
        ...inputStyle,
        border: '1px solid #22d3ee',
        boxShadow: '0 0 0 3px rgba(34, 211, 238, 0.1)',
        outline: 'none'
      }

      const labelStyle = {
        color: '#94a3b8',
        fontSize: '0.8rem',
        fontWeight: '500',
        display: 'block',
        marginBottom: '0.5rem'
      }

      const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
      }

      const validateAlumnoForm = () => {
        const errors = {}
        const nameRegex = /^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?$/
        const lastNameRegex = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+$/
        const matriculaRegex = /^[0-9]{8}$/
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!formData.nombre || !nameRegex.test(formData.nombre.trim())) {
          errors.nombre = 'Debe contener 1 o 2 nombres, cada uno iniciando en mayúscula y el resto en minúscula. Sin números ni caracteres especiales.'
        }
        if (!formData.apellido_paterno || !lastNameRegex.test(formData.apellido_paterno.trim())) {
          errors.apellido_paterno = 'Debe iniciar con mayúscula seguida de minúsculas. Sin números, espacios ni caracteres especiales.'
        }
        if (formData.apellido_materno && !lastNameRegex.test(formData.apellido_materno.trim())) {
          errors.apellido_materno = 'Debe iniciar con mayúscula seguida de minúsculas. Sin números, espacios ni caracteres especiales.'
        }
        if (!formData.matricula || !matriculaRegex.test(formData.matricula.trim())) {
          errors.matricula = 'La matrícula debe ser de exactamente 8 números.'
        }
        if (!formData.correo || !emailRegex.test(formData.correo.trim())) {
          errors.correo = 'Debe ingresar un correo electrónico válido.'
        }
        
        return errors
      }

      const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = validateAlumnoForm()
        if (Object.keys(errors).length > 0) {
          setFormErrors(errors)
          return
        }
        setFormErrors({})

        try {
          const dataToSend = {
            ...formData,
            semestre: parseInt(formData.semestre) || 1
          };
          if (alumnoEditando) {
            await actualizarAlumno(alumnoEditando.id_alumno, dataToSend);
            alert('Alumno actualizado correctamente');
          } else {
            await crearAlumno(dataToSend);
            alert('Alumno creado correctamente');
          }
          setShowModal(false);
          setFormData({ nombre: '', apellido_paterno: '', apellido_materno: '', matricula: '', carrera: '', semestre: '', correo: '' });
          setAlumnoEditando(null);
          fetchAlumnos();
        } catch {
          alert('Ocurrió un error al guardar');
        }
      }

      const handleEdit = (alumno) => {
        setAlumnoEditando(alumno);
        setFormData({
          nombre: alumno.nombre || '',
          apellido_paterno: alumno.apellido_paterno || '',
          apellido_materno: alumno.apellido_materno || '',
          matricula: alumno.matricula || '',
          carrera: alumno.carrera || '',
          semestre: alumno.semestre || '',
          correo: alumno.correo || ''
        });
        setShowModal(true);
      }

      const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este alumno?')) {
          try {
            await eliminarAlumno(id);
            alert('Alumno eliminado correctamente');
            fetchAlumnos();
          } catch {
            alert('Error al eliminar alumno');
          }
        }
      }

      const getAvatarColorByCarrera = (carrera) => {
        const map = {
          'Sistemas': 'avatar-blue',
          'Arquitectura': 'avatar-purple',
          'Civil': 'avatar-cyan',
          'Mecatrónica': 'avatar-orange',
          'Administración': 'avatar-green',
          'Gestión': 'avatar-blue'
        }
        return map[carrera] || 'avatar-blue'
      }

      return (
        <div className="px-5 pb-5 pt-4 flex-grow-1">
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <h1 className="text-white fw-bold mb-2" style={{ fontSize: '2.5rem' }}>
                Alumnos <span style={{ fontFamily: 'serif', fontStyle: 'italic' }}>Registrados</span>
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Gestión de estudiantes activos en el sistema</p>
            </div>
            <button
              className="btn fw-semibold mt-2"
              style={{
                backgroundColor: '#22d3ee',
                color: '#0b111a',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                whiteSpace: 'nowrap'
              }}
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus-lg me-2"></i> Nuevo alumno
            </button>
          </div>

<div className="d-flex align-items-center gap-3 mb-4">
            <div className="flex-grow-1" style={{ maxWidth: '80%' }}>
              <input
                type="text"
                className="search-input w-100"
                placeholder="Buscar alumno por nombre o código..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="form-select"
              style={{
                backgroundColor: '#121a26',
                border: '1px solid #1f2937',
                color: '#ffffff',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                minWidth: '180px',
                maxWidth: '200px'
              }}
              value={selectedCarrera}
              onChange={(e) => setSelectedCarrera(e.target.value)}
            >
<option value="">Todas las carreras</option>
              {carreras.map(c => (
                <option key={c} value={c} style={{ backgroundColor: '#121a26' }}>{c}</option>
              ))}
            </select>
            <span style={{ color: '#64748b', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
              {filteredAlumnos.length} estudiantes
            </span>
          </div>

          <div className="materia-list-compact">
            {filteredAlumnos.map((alumno) => {
              const initials = getInitials(alumno.nombre)
              const avatarClass = getAvatarColorByCarrera(alumno.carrera)
              return (
                <div key={alumno.id_alumno || alumno.id} className="materia-row-compact">
                  <div className="materia-col-codigo" style={{ width: '120px' }}>
                    <span className="badge-codigo">{alumno.matricula || 'N/A'}</span>
                  </div>
                  <div className="materia-col-info" style={{ flex: '2' }}>
                    <div className="materia-nombre-compact">{alumno.nombre} {alumno.apellido_paterno} {alumno.apellido_materno}</div>
                    <div className="materia-carrera-compact">{alumno.carrera || 'Sin carrera'}</div>
                  </div>
                  <div className="materia-col-profesor" style={{ flex: '2' }}>
                    <div className={`avatar-circle avatar-xs ${avatarClass}`}>
                      {initials}
                    </div>
                    <span className="profesor-nombre-compact">{alumno.correo || 'Sin correo'}</span>
                  </div>
                  <div className="materia-col-creditos" style={{ width: '100px' }}>
                    Sem. {alumno.semestre || 1}
                  </div>
                  <div className="d-flex gap-2 ms-auto align-items-center">
                    <button className="btn btn-sm btn-outline-info" style={{ border: 'none' }} onClick={() => handleEdit(alumno)}>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger" style={{ border: 'none' }} onClick={() => handleDelete(alumno.id_alumno || alumno.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {showModal && (
            <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
              <div className="modal-dialog modal-dialog-centered">
                <div 
                  className="modal-content"
                  style={{ 
                    backgroundColor: '#101720', 
                    border: '1px solid #1f2937', 
                    borderRadius: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <div className="modal-header" style={{ borderBottom: '1px solid #1f2937', padding: '1.5rem' }}>
                    <div>
                      <h5 className="modal-title" style={{ color: '#22d3ee', fontWeight: '600', fontSize: '1.25rem' }}>
                        <i className="bi bi-person-plus me-2"></i> {alumnoEditando ? 'Editar Alumno' : 'Nuevo Alumno'}
                      </h5>
                      <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.25rem', marginBottom: '0' }}>
                        {alumnoEditando ? 'Modificar datos del estudiante' : 'Registrar un nuevo estudiante en el sistema'}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      style={{ filter: 'brightness(0) saturate(100%) invert(71%) sepia(96%) saturate(1745%) hue-rotate(156deg) brightness(95%) contrast(101%)' }}
                      onClick={() => {
                        setShowModal(false);
                        setAlumnoEditando(null);
                        setFormData({ nombre: '', apellido_paterno: '', apellido_materno: '', matricula: '', carrera: '', semestre: '', correo: '' });
                        setFormErrors({});
                      }}
                    ></button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="modal-body" style={{ padding: '1.5rem' }}>
                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <label style={labelStyle}>Nombre *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            required
                            style={inputStyle}
                            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                          />
                          {formErrors.nombre && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{formErrors.nombre}</div>}
                        </div>
                        <div className="col-md-6">
                          <label style={labelStyle}>Apellido Paterno *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="apellido_paterno"
                            value={formData.apellido_paterno}
                            onChange={handleInputChange}
                            required
                            style={inputStyle}
                            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                          />
                          {formErrors.apellido_paterno && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{formErrors.apellido_paterno}</div>}
                        </div>
                      </div>

                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <label style={labelStyle}>Apellido Materno</label>
                          <input
                            type="text"
                            className="form-control"
                            name="apellido_materno"
                            value={formData.apellido_materno}
                            onChange={handleInputChange}
                            style={inputStyle}
                            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                          />
                          {formErrors.apellido_materno && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{formErrors.apellido_materno}</div>}
                        </div>
                        <div className="col-md-6">
                          <label style={labelStyle}>Matrícula *</label>
                          <input
                            type="text"
                            className="form-control"
                            name="matricula"
                            value={formData.matricula}
                            onChange={handleInputChange}
                            required
                            maxLength="8"
                            style={inputStyle}
                            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                          />
                          {formErrors.matricula && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{formErrors.matricula}</div>}
                        </div>
                      </div>

                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <label style={labelStyle}>Email *</label>
                          <input
                            type="email"
                            className="form-control"
                            name="correo"
                            value={formData.correo}
                            onChange={handleInputChange}
                            required
                            style={inputStyle}
                            onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                          />
                          {formErrors.correo && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{formErrors.correo}</div>}
                        </div>
                        <div className="col-md-6">
                          <label style={labelStyle}>Carrera *</label>
                          <select
                            className="form-select"
                            name="carrera"
                            value={formData.carrera}
                            onChange={handleInputChange}
                            required
                            style={{
                              ...inputStyle,
                              backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\'%3e%3cpath fill=\'none\' stroke=\'%2322d3ee\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'m2 5 6 6 6-6\'/%3e%3c/svg%3e")',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'right 0.75rem center',
                              backgroundSize: '16px 12px',
                              appearance: 'none',
                              color: formData.carrera ? '#e2e8f0' : '#94a3b8'
                            }}
                          >
                            <option value="" style={{ backgroundColor: '#101720' }}>Selecciona una carrera</option>
                            {carreras.map(c => (
                              <option key={c} value={c} style={{ backgroundColor: '#101720', color: '#e2e8f0' }}>{c}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label style={labelStyle}>Semestre *</label>
                        <input
                          type="number"
                          className="form-control"
                          name="semestre"
                          value={formData.semestre}
                          onChange={handleInputChange}
                          required
                          min="1"
                          max="12"
                          placeholder="Ej: 5"
                          style={inputStyle}
                          onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                          onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                        />
                      </div>
                    </div>
                    <div className="modal-footer" style={{ borderTop: '1px solid #1f2937', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                      <button
                        type="button"
                        className="btn"
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid #22d3ee',
                          color: '#22d3ee',
                          borderRadius: '8px',
                          padding: '0.75rem 1.5rem',
                          fontWeight: '500'
                        }}
                        onClick={() => {
                          setShowModal(false);
                          setAlumnoEditando(null);
                          setFormData({ nombre: '', apellido_paterno: '', apellido_materno: '', matricula: '', carrera: '', semestre: '', correo: '' });
                        }}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="btn fw-semibold"
                        style={{
                          backgroundColor: '#22d3ee',
                          border: 'none',
                          color: '#0b111a',
                          borderRadius: '8px',
                          padding: '0.75rem 1.5rem',
                          fontWeight: '600'
                        }}
                      >
                        <i className="bi bi-check-lg me-2"></i> Guardar alumno
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }

    if (activeItem === 'materias') {
      const filteredMaterias = materias.filter(materia => {
        if (!searchQuery.trim()) return true
        const query = searchQuery.toLowerCase()
        return (
          (materia.nombre || '').toLowerCase().includes(query) ||
          (materia.codigo || '').toLowerCase().includes(query) ||
          (materia.profesor || '').toLowerCase().includes(query)
        )
      }).filter(materia => {
        if (!selectedCarrera) return true
        return materia.carrera === selectedCarrera
      })

      const carrerasMateria = [
        'Ingeniería en Sistemas',
        'Arquitectura',
        'Ingeniería Civil',
        'Mecatrónica',
        'Administración',
        'Gestión Empresarial'
      ]

      const handleInputChangeMateria = (e) => {
        const { name, value } = e.target
        setFormDataMateria(prev => ({ ...prev, [name]: value }))
      }

      const handleSubmitMateria = async (e) => {
        e.preventDefault()
        try {
          const dataToSend = {
            ...formDataMateria,
            creditos: parseInt(formDataMateria.creditos) || 0,
            semestre: parseInt(formDataMateria.semestre) || 1
          };
          
          if (materiaEditando) {
            const idMateria = materiaEditando.id || materiaEditando.id_materia;
            await actualizarMateria(idMateria, dataToSend);
            alert('Materia actualizada correctamente');
          } else {
            await crearMateria(dataToSend);
            alert('Materia creada correctamente');
          }
          setShowModal(false);
          setFormDataMateria({ nombre: '', creditos: '', semestre: '' });
          setMateriaEditando(null);
          fetchMaterias();
        } catch {
          alert('Ocurrió un error al guardar la materia');
        }
      }

      const handleEditMateria = (materia) => {
        setMateriaEditando(materia);
        setFormDataMateria({
          nombre: materia.nombre || '',
          creditos: materia.creditos || '',
          semestre: materia.semestre || ''
        });
        setShowModal(true);
      }

      const handleDeleteMateria = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta materia?')) {
          try {
            await eliminarMateria(id);
            alert('Materia eliminada correctamente');
            fetchMaterias();
          } catch {
            alert('Error al eliminar materia');
          }
        }
      }

      return (
        <div className="px-5 pb-5 pt-4 flex-grow-1">
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <h1 className="text-white fw-bold mb-2" style={{ fontSize: '2.5rem' }}>
                Catálogo de <span style={{ fontFamily: 'serif', fontStyle: 'italic' }}>Materias</span>
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Gestión de materias y contenido curricular</p>
            </div>
            <button
              className="btn fw-semibold mt-2"
              style={{
                backgroundColor: '#22d3ee',
                color: '#0b111a',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.5rem',
                whiteSpace: 'nowrap'
              }}
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus-lg me-2"></i> Nueva Materia
            </button>
          </div>

          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="position-relative flex-grow-1" style={{ maxWidth: '80%' }}>
              <i className="bi bi-search position-absolute" style={{ left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}></i>
              <input
                type="text"
                className="search-input w-100 ps-5"
                placeholder="Buscar materias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="form-select"
              style={{
                backgroundColor: '#121a26',
                border: '1px solid #1f2937',
                color: '#ffffff',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                minWidth: '180px',
                maxWidth: '200px'
              }}
              value={selectedCarrera}
              onChange={(e) => setSelectedCarrera(e.target.value)}
            >
              <option value="">Todas las carreras</option>
              {carrerasMateria.map(c => (
                <option key={c} value={c} style={{ backgroundColor: '#121a26' }}>{c}</option>
              ))}
            </select>
            <span style={{ color: '#64748b', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
              {filteredMaterias.length} materias
            </span>
          </div>

          <div className="materia-list-compact">
            {filteredMaterias.length > 0 ? (
              filteredMaterias.map((materia, idx) => {
                const profesorInitials = getInitials(materia.profesor)
                const avatarClass = getAvatarColor(idx)
                return (
                  <div key={materia.id} className="materia-row-compact">
                    <div className="materia-col-codigo">
                      <span className="badge-codigo">{materia.codigo}</span>
                    </div>
                    <div className="materia-col-info">
                      <div className="materia-nombre-compact">{materia.nombre}</div>
                      <div className="materia-carrera-compact">{materia.carrera}</div>
                    </div>
                    <div className="materia-col-profesor">
                      <div className={`avatar-circle avatar-xs ${avatarClass}`}>
                        {profesorInitials}
                      </div>
                      <span className="profesor-nombre-compact">{materia.profesor}</span>
                    </div>
                    <div className="materia-col-creditos">
                      {materia.creditos} créditos
                    </div>
                    <div className="materia-col-horario">
                      {materia.horario || `Semestre ${materia.semestre}`}
                    </div>
                    <div className="d-flex gap-2 ms-3 align-items-center">
                      <button className="btn btn-sm btn-outline-info" style={{ border: 'none' }} onClick={() => handleEditMateria(materia)}>
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger" style={{ border: 'none' }} onClick={() => handleDeleteMateria(materia.id || materia.id_materia)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-5" style={{ color: '#64748b' }}>
                <i className="bi bi-search mb-3" style={{ fontSize: '2rem' }}></i>
                <p>No se encontraron materias que coincidan con tu búsqueda</p>
              </div>
            )}
          </div>

{showModal && (
            <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}>
              <div className="modal-dialog modal-dialog-centered">
                <div 
                  className="modal-content"
                  style={{ 
                    backgroundColor: '#101720', 
                    border: '1px solid #1f2937', 
                    borderRadius: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <div className="modal-header" style={{ borderBottom: '1px solid #1f2937', padding: '1.5rem' }}>
                    <div>
                      <h5 className="modal-title" style={{ color: '#22d3ee', fontWeight: '600', fontSize: '1.25rem' }}>
                        <i className="bi bi-book me-2"></i> {materiaEditando ? 'Editar Materia' : 'Nueva Materia'}
                      </h5>
                      <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.25rem', marginBottom: '0' }}>
                        {materiaEditando ? 'Actualiza los datos de la materia' : 'Registrar una nueva materia en el sistema'}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      style={{ filter: 'brightness(0) saturate(100%) invert(71%) sepia(96%) saturate(1745%) hue-rotate(156deg) brightness(95%) contrast(101%)' }}
                      onClick={() => {
                        setShowModal(false);
                        setMateriaEditando(null);
                        setFormDataMateria({ nombre: '', creditos: '', semestre: '' });
                      }}
                    ></button>
                  </div>
                  <form onSubmit={handleSubmitMateria}>
                    <div className="modal-body" style={{ padding: '1.5rem' }}>
                      <div className="mb-3">
                        <label style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '0.5rem' }}>
                          Nombre de la Materia *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="nombre"
                          value={formDataMateria.nombre}
                          onChange={handleInputChangeMateria}
                          required
                          style={{
                            backgroundColor: '#1b2431',
                            border: '1px solid #2d3748',
                            color: '#e2e8f0',
                            borderRadius: '8px',
                            padding: '0.75rem 1rem',
                            fontSize: '0.9rem'
                          }}
                          onFocus={(e) => {
                            e.target.style.border = '1px solid #22d3ee'
                            e.target.style.boxShadow = '0 0 0 3px rgba(34, 211, 238, 0.1)'
                          }}
                          onBlur={(e) => {
                            e.target.style.border = '1px solid #2d3748'
                            e.target.style.boxShadow = 'none'
                          }}
                        />
                      </div>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '0.5rem' }}>
                            Créditos *
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="creditos"
                            value={formDataMateria.creditos}
                            onChange={handleInputChangeMateria}
                            required
                            min="1"
                            style={{
                              backgroundColor: '#1b2431',
                              border: '1px solid #2d3748',
                              color: '#e2e8f0',
                              borderRadius: '8px',
                              padding: '0.75rem 1rem',
                              fontSize: '0.9rem'
                            }}
                            onFocus={(e) => {
                              e.target.style.border = '1px solid #22d3ee'
                              e.target.style.boxShadow = '0 0 0 3px rgba(34, 211, 238, 0.1)'
                            }}
                            onBlur={(e) => {
                              e.target.style.border = '1px solid #2d3748'
                              e.target.style.boxShadow = 'none'
                            }}
                          />
                        </div>
                        <div className="col-md-6">
                          <label style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: '500', display: 'block', marginBottom: '0.5rem' }}>
                            Semestre *
                          </label>
                          <select
                            className="form-select"
                            name="semestre"
                            value={formDataMateria.semestre || ''}
                            onChange={handleInputChangeMateria}
                            required
                            style={{
                              backgroundColor: '#1b2431',
                              border: '1px solid #2d3748',
                              color: '#e2e8f0',
                              borderRadius: '8px',
                              padding: '0.75rem 1rem',
                              fontSize: '0.9rem',
                              backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\'%3e%3cpath fill=\'none\' stroke=\'%2322d3ee\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'m2 5 6 6 6-6\'/%3e%3c/svg%3e")',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'right 0.75rem center',
                              backgroundSize: '16px 12px',
                              appearance: 'none'
                            }}
                          >
                            <option value="" style={{ backgroundColor: '#101720' }}>Selecciona semestre</option>
                            {[1,2,3,4,5,6,7,8,9,10].map(n => (
                              <option key={n} value={n} style={{ backgroundColor: '#101720', color: '#e2e8f0' }}>{n}° Semestre</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer" style={{ borderTop: '1px solid #1f2937', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                      <button
                        type="button"
                        className="btn"
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid #22d3ee',
                          color: '#22d3ee',
                          borderRadius: '8px',
                          padding: '0.75rem 1.5rem',
                          fontWeight: '500'
                        }}
                        onClick={() => setShowModal(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="btn fw-semibold"
                        style={{
                          backgroundColor: '#22d3ee',
                          border: 'none',
                          color: '#0b111a',
                          borderRadius: '8px',
                          padding: '0.75rem 1.5rem',
                          fontWeight: '600'
                        }}
                      >
                        <i className="bi bi-check-lg me-2"></i> Guardar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
</div>
)}
        </div>
      )
    }

    return null
  }

  const dynamicNavigationItems = {
    ...navigationItems,
    gestion: navigationItems.gestion.map(item => {
      if (item.id === 'alumnos') return { ...item, count: alumnos.length }
      if (item.id === 'materias') return { ...item, count: materias.length }
      if (item.id === 'semestres') return { ...item, count: semestres.length }
      return item
    })
  }

  return (
    <div className="d-flex" style={{ height: '100vh', background: '#0b111a' }}>
      <Sidebar navigationItems={dynamicNavigationItems} activeItem={activeItem} onNavigate={handleNavigate} currentUser={currentUserState} />

      <main className="flex-grow-1 d-flex flex-column" style={{ overflowY: 'auto', background: '#0b111a' }}>

        {activeItem === 'semestres' && (
          <div className="px-5 pb-5 pt-4 flex-grow-1">
            <div className="d-flex justify-content-between align-items-start mb-5">
              <div>
                <h1 className="text-white fw-bold mb-2" style={{ fontSize: '2.5rem' }}>
                  Períodos <span style={{ fontFamily: 'serif', fontStyle: 'italic' }}>Académicos</span>
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Gestión de ciclos y semestres escolares</p>
              </div>
              <button
                className="btn fw-semibold mt-2"
                style={{
                  backgroundColor: '#22d3ee',
                  color: '#0b111a',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1.5rem',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => setShowModalSemestre(true)}
              >
                <i className="bi bi-plus-lg me-2"></i> Nuevo Semestre
              </button>
            </div>

            <div className="materia-list-compact">
              {semestres.map((semestre) => (
                <SemestreCard 
                  key={semestre.id || semestre.id_semestre} 
                  semestre={semestre}
                  onEdit={() => {
                    setSemestreEditando(semestre);
                    setFormDataSemestre({ nombre: semestre.nombre, estado: semestre.estado });
                    setShowModalSemestre(true);
                  }}
                  onDelete={async () => {
                    if (window.confirm('¿Estás seguro de eliminar este semestre?')) {
                      try {
                        await eliminarSemestre(semestre.id || semestre.id_semestre);
                        alert('Semestre eliminado correctamente');
                        fetchSemestres();
                      } catch {
                        alert('Error al eliminar semestre');
                      }
                    }
                  }}
                />
              ))}
            </div>

            {showModalSemestre && (
              <div 
                className="modal-backdrop-fade show"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(4px)',
                  zIndex: 1050,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div className="modal-semestre-content" style={{ maxWidth: '480px', width: '100%', margin: '1rem' }}>
                  <div className="modal-semestre-header">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="modal-semestre-title">
                          <i className="bi bi-calendar-plus me-2"></i> {semestreEditando ? 'Editar Semestre' : 'Nuevo Semestre'}
                        </h5>
                        <p className="modal-semestre-description">
                          {semestreEditando ? 'Actualiza los datos del período académico' : 'Registra un nuevo período académico al sistema'}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        style={{ filter: 'brightness(0) saturate(100%) invert(71%) sepia(96%) saturate(1745%) hue-rotate(156deg) brightness(95%) contrast(101%)' }}
                        onClick={() => {
                          setShowModalSemestre(false);
                          setSemestreEditando(null);
                          setFormDataSemestre({ nombre: '', estado: 'Activo' });
                        }}
                      ></button>
                    </div>
                  </div>
                  <div className="modal-semestre-body">
                    <div className="form-group-semestre">
                      <label className="label-semestre-input">NUEVO SEMESTRE *</label>
                      <input
                        type="text"
                        className="input-semestre-single"
                        name="nombre"
                        value={formDataSemestre.nombre}
                        onChange={(e) => setFormDataSemestre({ ...formDataSemestre, nombre: e.target.value })}
                        placeholder="Ej: 2024-1"
                      />
                    </div>
                  </div>
                  <div className="modal-semestre-footer">
                    <button
                      type="button"
                      className="btn-cancelar-semestre-icon"
                      onClick={() => setShowModalSemestre(false)}
                    >
                      <i className="bi bi-x-lg me-2"></i> Cancelar
                    </button>
                    <button
                      type="button"
                      className="btn-guardar-semestre"
                      onClick={async () => {
                        try {
                          if (semestreEditando) {
                            await actualizarSemestre(semestreEditando.id || semestreEditando.id_semestre, formDataSemestre);
                            alert('Semestre actualizado correctamente');
                          } else {
                            await crearSemestre(formDataSemestre);
                            alert('Semestre guardado correctamente');
                          }
                          setShowModalSemestre(false);
                          setFormDataSemestre({ nombre: '', estado: 'Activo' });
                          setSemestreEditando(null);
                          fetchSemestres();
                        } catch {
                          alert('Ocurrió un error al guardar el semestre');
                        }
                      }}
                    >
                      <i className="bi bi-check-lg me-2"></i> Guardar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeItem !== 'semestres' && renderSectionContent()}
      </main>
    </div>
  )
}
