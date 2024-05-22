import React, { useEffect, useState } from "react";
import "./CrearReceta.css";
import { fetchCategories, createRecipe } from "../../../api/api";

const CrearReceta = ({ closeModal, fetchRecipes }) => {
  const [categorias, setCategorias] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    // Obtener categorías desde la API
    const getCategorias = async () => {
      const data = await fetchCategories();
      if (data) {
        setCategorias(data);
      } else {
        alert("Error al cargar categorías.");
      }
    };
    getCategorias();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const nombre = formData.get("nombre");
    const descripcion = formData.get("descripcion");
    const ingredientes = formData.get("ingredientes");
    const instrucciones = formData.get("instrucciones");
    const categorias = formData.getAll("categorias");
    const imagenes = formData.getAll("imagenes");

    if (
      !nombre ||
      !descripcion ||
      !ingredientes ||
      !instrucciones ||
      categorias.length === 0 ||
      imagenes.length === 0
    ) {
      alert("Por favor ingrese todos los campos.");
      return;
    }

    try {
      const receta = {
        nombre,
        descripcion,
        ingredientes,
        instrucciones,
        categorias: categorias.map((category) => parseInt(category)),
        imagenes: imagenes.map((image) => image.trim()),
      };

      const createResponse = await createRecipe(receta);

      if (createResponse.success) {
        alert("Receta creada exitosamente.");
        closeModal();
        fetchRecipes(); // Actualizar la lista de recetas
      } else if (createResponse.error) {
        alert("No se pudo cargar la receta.");
      } else {
        setValidationErrors(createResponse);
      }
    } catch (error) {
      alert("No se pudo conectar con el servidor.");
    }
  }

  return (
    <div className="modal">
      <div className="modal-content crear-receta-container">
        <div className="form-wrapper">
          <h2 className="title">Agregar Receta</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre</label>
              <input className="form-control" name="nombre" />
              <span className="error-text">{validationErrors.nombre}</span>
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea className="form-control" name="descripcion" rows="4" />
              <span className="error-text">{validationErrors.descripcion}</span>
            </div>

            <div className="form-group">
              <label>Ingredientes</label>
              <input className="form-control" name="ingredientes" />
              <span className="error-text">
                {validationErrors.ingredientes}
              </span>
            </div>

            <div className="form-group">
              <label>Instrucciones</label>
              <textarea
                className="form-control"
                name="instrucciones"
                rows="4"
              />
              <span className="error-text">
                {validationErrors.instrucciones}
              </span>
            </div>

            <div className="form-group">
              <label>Categoría</label>
              <select className="form-control" name="categorias" multiple>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.categorias}
                  </option>
                ))}
              </select>
              <span className="error-text">{validationErrors.categoria}</span>
            </div>

            <div className="form-group">
              <label>Imágenes</label>
              <input className="form-control" name="imagenes" />
              <span className="error-text">{validationErrors.imagenes}</span>
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

export default CrearReceta;
