import axios from 'axios';

const API_URL = 'http://localhost:8080/materias';

export const obtenerMaterias = async () => {
    try {
        const response = await axios.get(`${API_URL}/materias`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener materias', error);
        throw error;
    }
};

export const obtenerMateriaPorId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/traer-materia/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener materia con id ${id}`, error);
        throw error;
    }
};

export const obtenerMateriasPorSemestre = async (semestreId) => {
    try {
        const response = await axios.get(`${API_URL}/por-semestre/${semestreId}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener materias del semestre ${semestreId}`, error);
        throw error;
    }
};

export const crearMateria = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/insertar-materia`, data);
        return response.data;
    } catch (error) {
        console.error('Error al crear materia', error);
        throw error;
    }
};

export const actualizarMateria = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/editar-materia/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar materia con id ${id}`, error);
        throw error;
    }
};

export const eliminarMateria = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/eliminar-materia/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar materia con id ${id}`, error);
        throw error;
    }
};
