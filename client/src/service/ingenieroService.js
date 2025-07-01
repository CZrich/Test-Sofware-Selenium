// 📁 src/services/ingenieroService.js
import axios from 'axios';

const API = 'http://localhost:8080/ingenieros';

export const getIngenieros = () => axios.get(API);
export const createIngeniero = (data) => axios.post(API, data);
export const updateIngeniero = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteIngeniero = (id) => axios.delete(`${API}/${id}`);