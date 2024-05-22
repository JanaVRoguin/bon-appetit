import React, { useEffect, useState } from "react";
import EditarReceta from "./EditarReceta";
import {
  fetchCategories,
  fetchRecipes,
  deleteRecipe,
  updateRecipe,
} from "../../../api/api"; // Importa las funciones del API

const ListarRecetas = ({ recipes, fetchRecipes }) => {
  const [categorias, setCategorias] = useState([]);
  const [showEditarReceta, setShowEditarReceta] = useState(false); // Estado para controlar el modal EditarReceta
  const [selectedRecipeId, setSelectedRecipeId] = useState(null); // Estado para almacenar el ID de la receta seleccionada

  useEffect(() => {
    fetchRecipes();
    getCategorias();
  }, []);

  const getCategorias = async () => {
    // Función asíncrona para obtener las categorías
    const data = await fetchCategories(); // Utiliza la función fetchCategories del API
    if (data) {
      setCategorias(data);
    } else {
      alert("Error al cargar categorías.");
    }
  };

  const borrarReceta = async (id) => {
    // Función asíncrona para borrar una receta
    if (window.confirm("¿Estás seguro que deseas eliminar esta receta?")) {
      const success = await deleteRecipe(id); // Utiliza la función deleteRecipe del API
      if (success) {
        fetchRecipes(); // Actualizar la lista después de eliminar
      } else {
        alert("Error al eliminar la receta.");
      }
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
            <th>Acción</th> {/* Corregido "Accion" a "Acción" */}
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
                  <button
                    type="button"
                    className="btn edit-btn"
                    onClick={() => {
                      setSelectedRecipeId(receta.id); // Establecer el ID de la receta seleccionada
                      setShowEditarReceta(true); // Mostrar el modal EditarReceta
                    }}
                  >
                    Editar
                  </button>
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

      {showEditarReceta && (
        <div className="modal">
          <div className="modal-content">
            <EditarReceta
              closeModal={() => setShowEditarReceta(false)}
              fetchRecipes={fetchRecipes}
              recipeId={selectedRecipeId} // Pasar el ID de la receta seleccionada al componente EditarReceta
              updateRecipe={updateRecipe} // Pasar la función updateRecipe del API
              initialRecipe={recipes.find(
                (recipe) => recipe.id === selectedRecipeId
              )} // Pasar datos iniciales de la receta seleccionada
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ListarRecetas;
