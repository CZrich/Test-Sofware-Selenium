// 📁 src/services/proyectoService.js
import axios from 'axios';

const API = 'http://localhost:8080/proyectos';

export const getProyectos = () => axios.get(API);
export const createProyecto = (data) => axios.post(API, data);
export const updateProyecto = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteProyecto = (id) => axios.delete(`${API}/${id}`);
export const getIngenierosByProyecto = (id) => axios.get(`${API}/${id}/ingenieros`);
export const   getProyectoDetail = (id) => axios.get(`${API}/${id}`);