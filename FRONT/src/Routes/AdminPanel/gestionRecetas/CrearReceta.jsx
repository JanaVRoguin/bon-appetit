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
    const receta = Object.fromEntries(formData.entries());

    if (
      !receta.nombre ||
      !receta.descripcion ||
      !receta.ingredientes ||
      !receta.instrucciones ||
      !receta.categoria ||
      !receta.imagen
    ) {
      alert("Por favor ingrese todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/recetas/crear", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        navigate(routes.adminPanel);
      } else if (response.status === 400) {
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
            <span className="error-text">{validationErrors.nombre}</span>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn submit-btn">
              Submit
            </button>
            <Link
              className="btn cancel-btn"
              to={routes.adminPanel}
              role="button"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearReceta;
