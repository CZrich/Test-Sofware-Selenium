// 📁 src/services/departamentoService.js
import axios from 'axios';

const API = 'http://localhost:8080/departamentos';

export const getDepartamentos = () => axios.get(API);
export const getDepartamentoById = (id) => axios.get(`${API}/${id}`);
export const createDepartamento = (data) => axios.post(API, data);
export const updateDepartamento = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteDepartamento = (id) => axios.delete(`${API}/${id}`);

//export const getProyectosByDepartamento = (id) => axios.get(`${API}/${id}/proyectos`);
//export const getIngenierosByDepartamento = (id) => axios.get(`${API}/${id}/ingenieros`);