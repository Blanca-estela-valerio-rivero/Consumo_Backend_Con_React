import axios from 'axios';

const API_URL = 'http://localhost:8080/alumnos';

export const obtenerAlumnos = async () => {
    try {
        const response = await axios.get(`${API_URL}/traer-alumnos`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener alumnos', error);
        throw error;
    }
};

export const obtenerAlumnoPorId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/traer-alumno/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener alumno con id ${id}`, error);
        throw error;
    }
};

export const crearAlumno = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/insertar-alumnos`, data);
        return response.data;
    } catch (error) {
        console.error('Error al crear alumno', error);
        throw error;
    }
};

export const actualizarAlumno = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/editar-alumnos/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar alumno con id ${id}`, error);
        throw error;
    }
};

export const eliminarAlumno = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/eliminar-alumnos/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar alumno con id ${id}`, error);
        throw error;
    }
};
