import React, { useEffect, useState } from "react";
import { fetchCategories, createCategory } from "../../../api/api";

const CrearCategoria = ({
  closeModal,
  fetchCategories: fetchCategoriesParent,
}) => {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const getCategorias = async () => {
      try {
        const data = await fetchCategories();
        if (data) {
          setCategorias(data);
        } else {
          alert("Error al cargar categorías.");
        }
      } catch (error) {
        alert("Error al conectar con el servidor para cargar categorías.");
      }
    };
    getCategorias();
  }, []);

  const handleChange = (e) => {
    setNombre(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar si la categoría ya existe
    if (
      categorias.some(
        (categoria) =>
          categoria.categorias &&
          categoria.categorias.toLowerCase() === nombre.toLowerCase()
      )
    ) {
      setValidationError("Categoría ya existente.");
      return;
    }

    // Crear la nueva categoría
    try {
      const success = await createCategory({ categorias: nombre });
      if (success) {
        alert("Categoría creada exitosamente.");
        closeModal();
        fetchCategoriesParent(); // Actualizar la lista de categorías
      } else {
        alert("No se pudo crear la categoría.");
      }
    } catch (error) {
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="listar-recetas-modal">
      <div className="listar-recetas-modal-content">
        <div className="form-wrapper">
          <h2 className="title">Agregar Categoría</h2>
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
                Crear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearCategoria;
