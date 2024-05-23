import React, { useEffect, useState } from "react";
import EditarReceta from "./EditarReceta";
import {
  fetchCategories,
  fetchRecipes,
  deleteRecipe,
  updateRecipe,
} from "../../../api/api";


const ListarRecetas = ({ recipes, fetchRecipes }) => {
  const [categorias, setCategorias] = useState([]);
  const [showEditarReceta, setShowEditarReceta] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("Mostrar todas");

  useEffect(() => {
    fetchRecipes();
    getCategorias();
  }, []);

  const getCategorias = async () => {
    const data = await fetchCategories();
    if (data) {
      setCategorias(data);
    } else {
      alert("Error al cargar categorías.");
    }
  };

  const borrarReceta = async (id) => {
    if (window.confirm("¿Estás seguro que deseas eliminar esta receta?")) {
      const success = await deleteRecipe(id);
      if (success) {
        fetchRecipes();
      } else {
        alert("Error al eliminar la receta.");
      }
    }
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

  const sortedRecipes = recipes.slice().sort((a, b) => b.id - a.id);

  const filteredRecipes =
    selectedCategory === "Mostrar todas"
      ? sortedRecipes
      : sortedRecipes.filter((recipe) =>
          recipe.categorias.some((cat) => cat.categorias === selectedCategory)
        );

  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredRecipes.length / recipesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when changing category
  };

  return (
    <>
      <div className="categorias-container">
        <div className="categorias-title">
          <h3>Categorías</h3>
        </div>
        <div className="categorias">
          {categorias.map((categoria, index) => (
            <div
              key={index}
              className={`categoria-card ${
                selectedCategory === categoria.categorias ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(categoria.categorias)}
            >
              {categoria.categorias}
            </div>
          ))}
          <div
            className={`categoria-card ${
              selectedCategory === "Mostrar todas" ? "active" : ""
            }`}
            onClick={() => handleCategoryClick("Mostrar todas")}
          >
            Mostrar todas
          </div>
        </div>
      </div>

      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`page-number ${number === currentPage ? "active" : ""}`}
          >
            {number}
          </button>
        ))}
      </div>

      <table className="recetas-table">
        <thead>
          <tr>
            <td colSpan="7">Filtrado por: {selectedCategory}</td>
          </tr>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Ingredientes</th>
            <th>Modo de preparación</th>
            <th>Categoría</th>
            <th>Imágenes</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {currentRecipes.map((receta, index) => (
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
                    setSelectedRecipeId(receta.id);
                    setShowEditarReceta(true);
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

      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`page-number ${number === currentPage ? "active" : ""}`}
          >
            {number}
          </button>
        ))}
      </div>

      {showEditarReceta && (
        <div className="modal">
          <div className="modal-content">
            <EditarReceta
              closeModal={() => setShowEditarReceta(false)}
              fetchRecipes={fetchRecipes}
              recipeId={selectedRecipeId}
              updateRecipe={updateRecipe}
              initialRecipe={recipes.find(
                (recipe) => recipe.id === selectedRecipeId
              )}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ListarRecetas;
