import React, { useEffect, useState } from "react";
import "./CrearReceta.css"; // Importa CrearReceta.css para el estilo
import { fetchCategories, updateRecipe } from "../../../api/api"; // Importa funciones del API

const EditarReceta = ({
  closeModal,
  fetchRecipes,
  recipeId,
  initialRecipe,
}) => {
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    ingredientes: "",
    instrucciones: "",
    categorias: [],
    imagenes: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    // Función para obtener categorías y establecer datos iniciales de la receta
    const initializeForm = async () => {
      await getCategorias();
      if (initialRecipe) {
        setFormData({
          nombre: initialRecipe.nombre || "",
          descripcion: initialRecipe.descripcion || "",
          ingredientes: initialRecipe.ingredientes || "",
          instrucciones: initialRecipe.instrucciones || "",
          categorias: initialRecipe.categorias.map((cat) => cat.id) || [],
          imagenes:
            initialRecipe.imagenes.map((img) => img.urlImg).join(", ") || "",
        });
      }
    };
    initializeForm();
  }, [recipeId, initialRecipe]);

  const getCategorias = async () => {
    // Función asíncrona para obtener las categorías
    const data = await fetchCategories();
    if (data) {
      setCategorias(data);
    } else {
      alert("Error al cargar categorías.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === "select-multiple") {
      const values = Array.from(selectedOptions).map((option) => option.value);
      setFormData({
        ...formData,
        [name]: values,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      nombre,
      descripcion,
      ingredientes,
      instrucciones,
      categorias,
      imagenes,
    } = formData;

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

    const updatedRecipe = {
      nombre,
      descripcion,
      ingredientes,
      instrucciones,
      categorias: categorias.map((category) => parseInt(category)),
      imagenes: imagenes.split(",").map((image) => image.trim()), // Convertir la cadena de URLs a un array
    };

    const success = await updateRecipe(recipeId, updatedRecipe);
    if (success) {
      fetchRecipes();
      closeModal();
    } else {
      alert("Error al actualizar la receta.");
    }
  };

  return (
    <div className="crear-receta-container">
      <div className="form-wrapper">
        <h2 className="title">Editar Receta</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="form-control"
              rows="4"
            ></textarea>
          </div>
          <div className="form-group">
            <label>Ingredientes</label>
            <input
              type="text"
              name="ingredientes"
              value={formData.ingredientes}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Instrucciones</label>
            <textarea
              name="instrucciones"
              value={formData.instrucciones}
              onChange={handleChange}
              className="form-control"
              rows="4"
            ></textarea>
          </div>
          <div className="form-group">
            <label>Categorías</label>
            <select
              name="categorias"
              multiple
              value={formData.categorias}
              onChange={handleChange}
              className="form-control"
            >
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.categorias}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Imágenes</label>
            <input
              type="text"
              name="imagenes"
              value={formData.imagenes}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn submit-btn">
              Guardar cambios
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="btn cancel-btn"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarReceta;
