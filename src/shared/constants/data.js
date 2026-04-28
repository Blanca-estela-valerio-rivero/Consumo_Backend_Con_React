export const semestresData = [
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

export const alumnosData = [
  { id: 1, nombre: 'Ana Perez', codigo: 'ALU-001', semestre: 'Ciclo 2024 - 2' },
  { id: 2, nombre: 'Luis Martinez', codigo: 'ALU-002', semestre: 'Ciclo 2024 - 2' },
  { id: 3, nombre: 'Carlos Ruiz', codigo: 'ALU-003', semestre: 'Ciclo 2024 - 1' },
]

export const materiasData = [
  { id: 1, nombre: 'Matematica I', codigo: 'MAT-101', creditos: 4 },
  { id: 2, nombre: 'Programacion', codigo: 'INF-201', creditos: 5 },
  { id: 3, nombre: 'Fisica General', codigo: 'FIS-110', creditos: 4 },
]

export const currentUser = {
  initials: 'AD',
  name: 'Admin General',
  role: 'Administrador',
}
