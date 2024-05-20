import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../Components/utils/config";

const ListarRecetas = ({ recipes, fetchRecipes }) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetchRecipes();
    getCategorias();
  }, []);

  const getCategorias = () => {
    fetch(`${BASE_URL}categorias/listar`)
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
  };

  const borrarReceta = (id) => {
    if (window.confirm("¿Estás seguro que deseas eliminar esta receta?")) {
      fetch(`${BASE_URL}recetas/eliminar/`+ id, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }
          fetchRecipes(); // Actualizar la lista después de eliminar
        })
        .catch((error) => {
          alert("Error al eliminar la receta.");
        });
    }
  };

  return (
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
          {recipes
            .slice()
            .reverse()
            .map((receta, index) => (
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
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ListarRecetas;
