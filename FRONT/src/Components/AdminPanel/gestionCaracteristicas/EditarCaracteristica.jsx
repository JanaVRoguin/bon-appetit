import { useEffect, useState } from 'react'
import { getCaracteristicaById, updateCaracteristica } from '../../../api/api';

export const EditarCaracteristica = ({
  closeModal,
  id,
  fetchCaracteristicas: fetchCaracteristicasParent,
}) => {
  const [nombre, setNombre] = useState("");
  const [icono, setIcono] = useState("");
  const [validationError, setValidationError] = useState("");
  const [data, setData] = useState({
    id: '',
    nombre: '',
    urlImg: '',
  });

  useEffect(() => {
    const getCaracteristica = async () => {
      try {
        const data = await getCaracteristicaById(id);
        if (data) {
          setNombre(data.nombre);
          setIcono(data.urlImg);
          setData(data);
        } else {
          alert("Error al cargar la característica.");
        }
      } catch (error) {
        alert("Error al conectar con el servidor para cargar la característica.");
      }
    };
    getCaracteristica();
  }, [id]);

  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      nombre: nombre,
      urlImg: icono,
    }));
  }, [nombre, icono]);

  const handleChangeNombre = (e) => {
    setNombre(e.target.value);
  };

  const handleChangeIcono = (e) => {
    setIcono(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar si el nombre de la categoría no está vacío
    if (!nombre.trim()) {
      setValidationError("El nombre de la característica no puede estar vacío.");
      return;
    }

    if (!icono.trim()) {
      setValidationError("La imagen para el icono de la característica no puede estar vacío.");
      return;
    }

    // Actualizar la categoría existente
    try {
      const success = await updateCaracteristica(data);
      if (success) {
        alert("Característica actualizada exitosamente.");
        closeModal();
        fetchCaracteristicasParent(); // Actualizar la lista de categorías
      } else {
        alert("No se pudo actualizar la característica.");
      }
    } catch (error) {
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="title">Editar Categoría</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            className="form-control"
            name="nombre"
            value={nombre}
            onChange={handleChangeNombre}
          />
          <span className="error-text">{validationError}</span>
        </div>
        <div className="form-group">
          <label>Imagen</label>
          <input
            className="form-control"
            name="nombre"
            value={icono}
            onChange={handleChangeIcono}
          />
          <span className="error-text">{validationError}</span>
        </div>
        <div className="form-actions">
          <button
            type="button"
            className="btn cancel-btn"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button type="submit" className="btn submit-btn">
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}
