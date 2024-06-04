import React, { useEffect, useState } from "react";
import { getCategoryById, updateCategory } from "../../../api/api";

const EditarCategoria = ({
  closeModal,
  id,
  fetchCategories: fetchCategoriesParent,
}) => {
  const [nombre, setNombre] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const getCategoria = async () => {
      try {
        const data = await getCategoryById(id);
        if (data) {
          setNombre(data.categorias);
        } else {
          alert("Error al cargar la categoría.");
        }
      } catch (error) {
        alert("Error al conectar con el servidor para cargar la categoría.");
      }
    };
    getCategoria();
  }, [id]);

  const handleChange = (e) => {
    setNombre(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar si el nombre de la categoría no está vacío
    if (!nombre.trim()) {
      setValidationError("El nombre de la categoría no puede estar vacío.");
      return;
    }

    // Actualizar la categoría existente
    try {
      const success = await updateCategory(id, { categorias: nombre });
      if (success) {
        alert("Categoría actualizada exitosamente.");
        closeModal();
        fetchCategoriesParent(); // Actualizar la lista de categorías
      } else {
        alert("No se pudo actualizar la categoría.");
      }
    } catch (error) {
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="listar-recetas-modal">
      <div className="listar-recetas-modal-content">
        <div className="form-wrapper">
          <h2 className="title">Editar Categoría</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre</label>
              <input
                className="form-control"
                name="nombre"
                value={nombre}
                onChange={handleChange}
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
      </div>
    </div>
  );
};

export default EditarCategoria;
