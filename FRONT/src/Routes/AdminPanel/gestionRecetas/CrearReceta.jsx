import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../../Components/utils/routes";
import "./CrearReceta.css";

const CrearReceta = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

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

  const receta = {
    nombre,
    descripcion,
    ingredientes,
    instrucciones,
    categorias: categorias.map((category) => parseInt(category)),
    imagenes: imagenes.map((image) => image.trim()),
  };

  try {
    const response = await fetch("http://localhost:8080/recetas/crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(receta),
    });

    if (response.ok) {
      if (response.status === 201) {
        alert("Receta creada exitosamente.");
        navigate(routes.adminPanel);
      }
    } else if (response.status === 400) {
      const data = await response.json();
      setValidationErrors(data);
    } else {
      alert("No se pudo cargar la receta.");
    }
  } catch (error) {
    alert("No se pudo conectar con el servidor.");
  }
}

  return (
    <div className="crear-receta-container">
      <div className="form-wrapper">
        <h2 className="title">Agregar Receta</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input className="form-control" name="nombre" />
            <span className="error-text">{validationErrors.nombre}</span>
          </div>

          <div className="form-group">
            <label>Descripcion</label>
            <textarea className="form-control" name="descripcion" rows="4" />
            <span className="error-text">{validationErrors.descripcion}</span>
          </div>

          <div className="form-group">
            <label>Ingredientes</label>
            <input className="form-control" name="ingredientes" />
            <span className="error-text">{validationErrors.ingredientes}</span>
          </div>

          <div className="form-group">
            <label>Instrucciones</label>
            <textarea className="form-control" name="instrucciones" rows="4" />
            <span className="error-text">{validationErrors.instrucciones}</span>
          </div>

          <div className="form-group">
            <label>Categoria</label>
            <select className="form-control" name="categorias" multiple>
              <option value="1">Desayuno</option>
              <option value="2">Almuerzo</option>
              <option value="3">Merienda</option>
              <option value="4">Cena</option>
            </select>
            <span className="error-text">{validationErrors.categoria}</span>
          </div>

          <div className="form-group">
            <label>Imagenes</label>
            <input className="form-control" name="imagenes" />
            <span className="error-text">{validationErrors.imagenes}</span>
          </div>

          <div className="form-actions">
            <Link
              className="btn cancel-btn"
              to={routes.adminPanel}
              role="button"
            >
              Cancelar
            </Link>
            <button type="submit" className="btn submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearReceta;
