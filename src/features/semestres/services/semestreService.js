import axios from 'axios';

const API_URL = 'http://localhost:8080/semestres';

export const obtenerSemestres = async () => {
    try {
        const response = await axios.get(`${API_URL}/traer-semestres`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener semestres', error);
        throw error;
    }
};

export const obtenerSemestrePorId = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/traer-semestre/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener semestre con id ${id}`, error);
        throw error;
    }
};

export const crearSemestre = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/insertar-semestre`, data);
        return response.data;
    } catch (error) {
        console.error('Error al crear semestre', error);
        throw error;
    }
};

export const actualizarSemestre = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/editar-semestre/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar semestre con id ${id}`, error);
        throw error;
    }
};

export const eliminarSemestre = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/eliminar-semestre/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar semestre con id ${id}`, error);
        throw error;
    }
};
