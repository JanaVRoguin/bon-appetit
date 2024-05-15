import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../Components/utils/routes";
import "./AdminPanel.css";

export const AdminPanel = () => {
  const [recetas, setRecetas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [showRecetas, setShowRecetas] = useState(false); // Estado para controlar la visibilidad de la lista de recetas

  // GET - Listado de recetas
  function getRecetas() {
    fetch("http://localhost:8080/recetas/listar")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((data) => {
        setRecetas(data);
      })
      .catch((error) => {
        alert("Error al cargar datos.");
      });
  }

  // GET - Listado de categorias
  function getCategorias() {
    fetch("http://localhost:8080/categorias/listar")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((data) => {
        setCategorias(data);
      })
      .catch((error) => {
        alert("Error al cargar categorías.");
      });
  }

  // RENDER Inicial
  useEffect(() => {
    getRecetas();
    getCategorias();
  }, []);

  // BORRAR Receta
  function borrarReceta(id) {
    if (window.confirm("¿Estás seguro que deseas eliminar esta receta?")) {
      fetch("http://localhost:8080/recetas/eliminar/" + id, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }
          // Actualizar la lista después de eliminar
          getRecetas();
        })
        .catch((error) => {
          alert("Error al eliminar la receta.");
        });
    }
  }

  return (
    <div className="admin-panel-container">
      <h2 className="title">Panel de administración</h2>

      <div className="actions">
        <button
          type="button"
          className="btn refresh-btn"
          onClick={() => setShowRecetas(!showRecetas)}
        >
          {showRecetas ? "Ocultar lista de recetas" : "Lista de recetas"}
        </button>
        <Link className="btn create-btn" to={routes.crearReceta} role="button">
          Agregar Receta
        </Link>
      </div>

      {showRecetas && (
        <>
          <div className="categorias-container">
            <div className="categorias-title">
              <h3>Categorías</h3>
            </div>
            <div className="categorias">
              {categorias.map((categoria, index) => (
                <div key={index} className="categoria-card">
                  {categoria.categorias}
                </div>
              ))}
              <div className="categoria-card mostrar-todas">Mostrar todas</div>
            </div>
          </div>

          <table className="recetas-table">
            <thead>
              <tr>
                <td colSpan="7">Filtrado por:</td>
              </tr>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Ingredientes</th>
                <th>Modo de preparación</th>
                <th>Categoria</th>
                <th>Imagenes</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {recetas.map((receta, index) => {
                return (
                  <tr key={index}>
                    <td>{receta.id}</td>
                    <td>{receta.nombre}</td>
                    <td>{receta.ingredientes}</td>
                    <td>{receta.instrucciones}</td>
                    <td>
                      {receta.categorias
                        .map((categoria) => categoria.categorias)
                        .join(", ")}
                    </td>
                    <td>
                      {receta.imagenes.map((imagen, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={imagen.urlImg}
                          width="100"
                          alt="Receta"
                        />
                      ))}
                    </td>
                    <td className="action-buttons">
                      <Link
                        className="btn edit-btn"
                        to={`/administracion/recetas/editar/${receta.id}`}
                      >
                        Editar
                      </Link>
                      <button
                        type="button"
                        className="btn delete-btn"
                        onClick={() => borrarReceta(receta.id)}
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
