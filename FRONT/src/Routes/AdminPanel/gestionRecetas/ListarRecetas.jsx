import React, { useEffect, useState } from "react";
import EditarReceta from "./EditarReceta";
import {
  fetchCategories,
  fetchRecipes,
  deleteRecipe,
  updateRecipe,
} from "../../../api/api";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ListarRecetas.css"; // Importar el CSS dedicado

const ListarRecetas = ({ recipes, fetchRecipes }) => {
  const [categorias, setCategorias] = useState([]);
  const [showEditarReceta, setShowEditarReceta] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(10);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [imageLoadError, setImageLoadError] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

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

  const handleImageError = (recipeId, imgIndex) => {
    setImageLoadError((prevErrors) => ({
      ...prevErrors,
      [recipeId]: { ...prevErrors[recipeId], [imgIndex]: true },
    }));
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

  const sortedRecipes = recipes
    .slice()
    .sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id));

  const filteredRecipes =
    selectedCategories.length === 0
      ? sortedRecipes
      : sortedRecipes.filter((recipe) =>
          selectedCategories.some((cat) =>
            recipe.categorias.map((c) => c.categorias).includes(cat)
          )
        );

  const searchedRecipes = filteredRecipes.filter((recipe) =>
    recipe.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentRecipes = searchedRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(searchedRecipes.length / recipesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const handleCategoryClick = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    setCurrentPage(1); // Resetear a la primera página al cambiar la selección de categoría
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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
                selectedCategories.includes(categoria.categorias)
                  ? "active"
                  : ""
              }`}
              onClick={() => handleCategoryClick(categoria.categorias)}
            >
              {categoria.categorias}
            </div>
          ))}
          
        </div>
      </div>

      <div className="filters-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar receta..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="sort-container">
          <label>Ordenar por ID:</label>
          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
      </div>

      <table className="recetas-table">
        <thead>
          <tr>
            <td colSpan="7">
              Filtrado por:{" "}
              {selectedCategories.length === 0
                ? "Mostrar todas"
                : selectedCategories.join(", ")}
            </td>
          </tr>
          <tr></tr>
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
              <td className="imagenes-column">
                <div className="carousel-container">
                  <Carousel showThumbs={false}>
                    {receta.imagenes.map((imagen, imgIndex) => (
                      <div key={imgIndex} className="carousel-slide">
                        {imageLoadError[receta.id] &&
                        imageLoadError[receta.id][imgIndex] ? (
                          <div className="no-image-placeholder">
                            🚫 Imagen no disponible
                          </div>
                        ) : (
                          <img
                            src={imagen.urlImg}
                            alt={`Imagen ${imgIndex}`}
                            className="carousel-image"
                            onError={() =>
                              handleImageError(receta.id, imgIndex)
                            }
                          />
                        )}
                      </div>
                    ))}
                  </Carousel>
                </div>
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
