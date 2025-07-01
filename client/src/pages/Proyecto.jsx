// 📁 src/pages/ProyectosPage.jsx
import { useState, useEffect } from 'react';
import {
  getProyectos,
  createProyecto,
  updateProyecto,
  deleteProyecto,
  getIngenierosByProyecto,
  getProyectoDetail
} from '../service/proyectoService';
import { getDepartamentos } from '../service/departamentoService';
import { getIngenieros } from '../service/ingenieroService';

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [ingenieros, setIngenieros] = useState([]);
  const [form, setForm] = useState({
    nomProy: '',
    iniFechProy: '',
    terFechProy: '',
    departamento: { idDep: '' },
    ingenieros: []
  });
  const [editingId, setEditingId] = useState(null);
  const [modalProy, setModalProy] = useState(null);
  const [modalIng, setModalIng] = useState([]);
  const [ingenieroSeleccionado, setIngenieroSeleccionado] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (
      !form.nomProy ||
      form.nomProy.trim().length < 3 ||
      form.nomProy.trim().length > 50 ||
      !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(form.nomProy.trim())
    ) {
      errs.nomProy = 'El nombre debe tener entre 3 y 50 caracteres y solo letras y espacios';
    }
    if (!form.departamento.idDep) {
      errs.departamento = 'Debe seleccionar un departamento';
    }
    if (!form.iniFechProy) {
      errs.iniFechProy = 'Debe ingresar la fecha de inicio';
    }
    if (!form.terFechProy) {
      errs.terFechProy = 'Debe ingresar la fecha de fin';
    }
    if (
      form.iniFechProy &&
      form.terFechProy &&
      new Date(form.iniFechProy) > new Date(form.terFechProy)
    ) {
      errs.fechas = 'La fecha de inicio no puede ser posterior a la fecha de fin';
    }
    return errs;
  };

  useEffect(() => {
    refresh();
    getDepartamentos().then(res => setDepartamentos(res.data));
    getIngenieros().then(res => setIngenieros(res.data));
  }, []);

  const refresh = async () => {
    const res = await getProyectos();
    setProyectos(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    const payload = {
      nomProy: form.nomProy,
      iniFechProy: form.iniFechProy,
      terFechProy: form.terFechProy,
      idDep: form.departamento.idDep,
      ingenieroIds: form.ingenieros
    };
    if (editingId) {
      await updateProyecto(editingId, payload);
    } else {
      await createProyecto(payload);
    }
    setForm({ nomProy: '', iniFechProy: '', terFechProy: '', departamento: { idDep: '' }, ingenieros: [] });
    setIngenieroSeleccionado('');
    setEditingId(null);
    refresh();
  };

  const handleEdit = async (p) => {
    try {
      const ingenieroRes = await getIngenierosByProyecto(p.idProy);
      const ingenieroIds = ingenieroRes.data?.map(i => parseInt(i.idIng)) || [];
      
      let departamentoId = '';
      try {
        const proyectoDetail = await getProyectoDetail(p.idProy);
        if (proyectoDetail.data.nomDep) {
          const dept = departamentos.find(d => d.nomDep === proyectoDetail.data.nomDep);
          departamentoId = dept?.idDep || '';
        }
      } catch (error) {
        departamentoId = p.departamento?.idDep || '';
      }
      
      setForm({
        nomProy: p.nomProy,
        iniFechProy: p.iniFechProy,
        terFechProy: p.terFechProy,
        departamento: { idDep: departamentoId },
        ingenieros: ingenieroIds
      });

      setIngenieroSeleccionado('');
      setEditingId(p.idProy);
      setErrors({});
      
    } catch (error) {
      console.error('Error al cargar datos para edición:', error);
      setForm({
        nomProy: p.nomProy,
        iniFechProy: p.iniFechProy,
        terFechProy: p.terFechProy,
        departamento: { idDep: '' },
        ingenieros: []
      });
      setEditingId(p.idProy);
    }
  };

  const handleDelete = async (id) => {
    await deleteProyecto(id);
    refresh();
  };

  const openIngenieros = async (idProy) => {
    const res = await getIngenierosByProyecto(idProy);
    setModalIng(res.data);
    setModalProy(idProy);
  };

  const addIngeniero = () => {
    const id = parseInt(ingenieroSeleccionado);
    if (ingenieroSeleccionado && !form.ingenieros.includes(id)) {
      setForm({
        ...form,
        ingenieros: [...form.ingenieros, id]
      });
      setIngenieroSeleccionado('');
    }
  };

  const removeIngeniero = (id) => {
    setForm({
      ...form,
      ingenieros: form.ingenieros.filter(i => i !== id)
    });
  };

  const cancelEdit = () => {
    setForm({ nomProy: '', iniFechProy: '', terFechProy: '', departamento: { idDep: '' }, ingenieros: [] });
    setEditingId(null);
    setIngenieroSeleccionado('');
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Gestión de Proyectos</h2>

        {/* Formulario */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Resumen de advertencias generales (opcional, si hay más de un error) */}
            {Object.values(errors).length > 1 && (
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 rounded mb-2">
                <ul className="list-disc list-inside text-sm">
                  {Object.values(errors).map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  className={`border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.nomProy ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'
                  }`}
                  placeholder="Nombre del proyecto"
                  value={form.nomProy}
                  onChange={e => setForm({ ...form, nomProy: e.target.value })}
                  required
                />
                {errors.nomProy && (
                  <span className="block text-yellow-700 text-xs mt-1">{errors.nomProy}</span>
                )}
              </div>
              <div>
                <select
                  className={`border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.departamento ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'
                  }`}
                  value={form.departamento.idDep}
                  onChange={e => setForm({ ...form, departamento: { idDep: e.target.value } })}
                  required
                >
                  <option value="">Seleccione Departamento</option>
                  {departamentos.map(dep => (
                    <option key={dep.idDep} value={dep.idDep}>{dep.nomDep}</option>
                  ))}
                </select>
                {errors.departamento && (
                  <span className="block text-yellow-700 text-xs mt-1">{errors.departamento}</span>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Fecha de Inicio</label>
                <input
                  className={`border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.iniFechProy ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'
                  }`}
                  type="date"
                  value={form.iniFechProy}
                  onChange={e => {
                    setForm({ ...form, iniFechProy: e.target.value });
                    if (errors.fechas) setErrors({ ...errors, fechas: null });
                  }}
                  required
                />
                {errors.iniFechProy && (
                  <span className="block text-yellow-700 text-xs mt-1">{errors.iniFechProy}</span>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Fecha de Fin</label>
                <input
                  className={`border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.terFechProy ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'
                  }`}
                  type="date"
                  value={form.terFechProy}
                  onChange={e => {
                    setForm({ ...form, terFechProy: e.target.value });
                    if (errors.fechas) setErrors({ ...errors, fechas: null });
                  }}
                  required
                />
                {errors.terFechProy && (
                  <span className="block text-yellow-700 text-xs mt-1">{errors.terFechProy}</span>
                )}
              </div>
            </div>

            {errors.fechas && (
              <div className="text-yellow-700 text-xs bg-yellow-100 border-l-4 border-yellow-500 p-2 rounded mb-2">
                {errors.fechas}
              </div>
            )}

            {/* Sección de Ingenieros */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3 text-gray-700">Asignar Ingenieros</h4>
              
              <div className="flex gap-2 mb-3">
                <select
                  className="border border-gray-300 p-2 rounded-md flex-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={ingenieroSeleccionado}
                  onChange={e => setIngenieroSeleccionado(e.target.value)}
                >
                  <option value="">Seleccione Ingeniero</option>
                  {ingenieros
                    .filter(ing => !form.ingenieros.includes(parseInt(ing.idIng)))
                    .map(ing => (
                      <option key={ing.idIng} value={ing.idIng}>
                        {ing.namIng} - {ing.espIng}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  onClick={addIngeniero}
                >
                  Añadir
                </button>
              </div>

              {/* Lista de ingenieros asignados */}
              <div className="max-h-32 overflow-y-auto">
                {form.ingenieros.length > 0 ? (
                  <div className="space-y-1">
                    {form.ingenieros.map(id => {
                      const ing = ingenieros.find(i => parseInt(i.idIng) === id);
                      if (!ing) return null;
                      return (
                        <div key={ing.idIng} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                          <span className="text-sm">{ing.namIng} - {ing.espIng}</span>
                          <button
                            type="button"
                            onClick={() => removeIngeniero(id)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors"
                          >
                            Quitar
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm text-center py-2">No hay ingenieros asignados</p>
                )}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button 
                type="submit" 
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                {editingId ? 'Actualizar' : 'Crear'}
              </button>
              
              {editingId && (
                <button 
                  type="button"
                  onClick={cancelEdit}
                  className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista de Proyectos */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Lista de Proyectos</h3>
          </div>
          
          <div className="divide-y">
            {proyectos.map(p => (
              <div key={p.idProy} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{p.nomProy}</h4>
                    <div className="text-sm text-gray-600 mt-1">
                      <span> {p.iniFechProy} - {p.terFechProy}</span>
                      {p.departamento && (
                        <span className="ml-4"> {p.departamento.nomDep}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 ml-4">
                    <button 
                      onClick={() => handleEdit(p)} 
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(p.idProy)} 
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      Eliminar
                    </button>
                    <button 
                      onClick={() => openIngenieros(p.idProy)} 
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
                    >
                      Ver Ingenieros
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {proyectos.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No hay proyectos registrados
              </div>
            )}
          </div>
        </div>

        {/* Modal de Ingenieros */}
        {modalProy && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96 max-h-96 overflow-y-auto">
              <h3 className="text-lg font-bold mb-4 text-gray-800">Ingenieros del Proyecto</h3>
              <div className="space-y-2 mb-4">
                {modalIng.length > 0 ? (
                  modalIng.map(i => (
                    <div key={i.idIng} className="border-b pb-2">
                      <div className="font-medium">{i.namIng}</div>
                      <div className="text-sm text-gray-600">{i.espIng}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-4">No hay ingenieros asignados</div>
                )}
              </div>
              <button
                onClick={() => setModalProy(null)}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}