import { useEffect, useState } from 'react';
import {
  getIngenieros,
  createIngeniero,
  updateIngeniero,
  deleteIngeniero
} from '../service/ingenieroService';

export default function IngenierosPage() {
  const [ingenieros, setIngenieros] = useState([]);
  const [form, setForm] = useState({ namIng: '', carIng: '', espIng: '' });
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({}); // NUEVO

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    const res = await getIngenieros();
    setIngenieros(res.data);
  };

  const validate = () => {
    const errs = {};
    // Solo letras y espacios para el nombre
    if (
      !form.namIng ||
      form.namIng.trim().length < 3 ||
      form.namIng.trim().length > 50 ||
      !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(form.namIng.trim())
    ) {
      errs.namIng = 'El nombre debe tener entre 3 y 50 caracteres y solo letras y espacios';
    }
    // Solo letras y espacios para el cargo
    if (
      !form.carIng ||
      form.carIng.trim().length < 3 ||
      form.carIng.trim().length > 50 ||
      !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(form.carIng.trim())
    ) {
      errs.carIng = 'El cargo debe tener entre 3 y 50 caracteres y solo letras y espacios';
    }
    // Solo letras y espacios para la especialidad
    if (
      !form.espIng ||
      form.espIng.trim().length < 3 ||
      form.espIng.trim().length > 50 ||
      !/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(form.espIng.trim())
    ) {
      errs.espIng = 'La especialidad debe tener entre 3 y 50 caracteres y solo letras y espacios';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    if (editingId) {
      await updateIngeniero(editingId, form);
    } else {
      await createIngeniero(form);
    }
    setForm({ namIng: '', carIng: '', espIng: '' });
    setEditingId(null);
    refresh();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.idIng);
  };

  const handleDelete = async (id) => {
    await deleteIngeniero(id);
    refresh();
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Gestión de Ingenieros</h2>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-4">
        {/* Resumen de advertencias generales (opcional) */}
        {Object.values(errors).length > 1 && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 rounded mb-2">
            <ul className="list-disc list-inside text-sm">
              {Object.values(errors).map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <input
            id='ing-nombre' //
            data-test="input-nombre"
            type="text"
            placeholder="Nombre"
            value={form.namIng}
            onChange={(e) => setForm({ ...form, namIng: e.target.value })}
            className={`border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.namIng ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'
            }`}
            required
          />
          {errors.namIng && (
            <span className="block text-yellow-700 text-xs mt-1">{errors.namIng}</span>
          )}
        </div>
        <div>
          <input
            id='ing-cargo' //
            data-test="input-cargo"
            type="text"
            placeholder="Cargo"
            value={form.carIng}
            onChange={(e) => setForm({ ...form, carIng: e.target.value })}
            className={`border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.carIng ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'
            }`}
            required
          />
          {errors.carIng && (
            <span className="block text-yellow-700 text-xs mt-1">{errors.carIng}</span>
          )}
        </div>
        <div>
          <input
            id='ing-especialidad' //
            data-test="input-especialidad"
            type="text"
            placeholder="Especialidad"
            value={form.espIng}
            onChange={(e) => setForm({ ...form, espIng: e.target.value })}
            className={`border p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.espIng ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'
            }`}
            required
          />
          {errors.espIng && (
            <span className="block text-yellow-700 text-xs mt-1">{errors.espIng}</span>
          )}
        </div>
        <button
         id='ing-submit' //
          data-test="btn-submit"
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? 'Actualizar' : 'Crear'}
        </button>
      </form>

      <ul className="space-y-4">
        {ingenieros.map((i) => (
          <li key={i.idIng} className="bg-gray-100 p-4 rounded shadow flex justify-between items-start">
            <div>
              <p><span className="font-semibold">Nombre:</span> {i.namIng}</p>
              <p><span className="font-semibold">Cargo:</span> {i.carIng}</p>
              <p><span className="font-semibold">Especialidad:</span> {i.espIng}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button
              id='btn-edit-${i.idIng}' //
              data-test="btn-edit"
                onClick={() => handleEdit(i)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Editar
              </button>
              <button
              id='btn-del-${i.idIng}' //
              data-test="btn-delete"
                onClick={() => handleDelete(i.idIng)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
