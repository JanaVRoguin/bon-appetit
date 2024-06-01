import React, { useEffect, useState } from "react";
import {
  fetchCategories,
  deleteCategory,
  updateCategory,
  createCategory,
} from "../../../api/api";
import "./ListarCategorias.css";

const ListarCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [showEditarCategoria, setShowEditarCategoria] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    getCategorias();
  }, []);

  const getCategorias = async () => {
    try {
      const data = await fetchCategories();
      if (data) {
        setCategorias(data);
      } else {
        alert("Error al cargar categorías.");
      }
    } catch (error) {
      alert("Error al cargar categorías.");
    }
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const borrarCategoria = async (id) => {
    if (window.confirm("¿Estás seguro que deseas eliminar esta categoría?")) {
      try {
        const success = await deleteCategory(id);
        if (success) {
          getCategorias();
        } else {
          alert("Error al eliminar la categoría.");
        }
      } catch (error) {
        alert("Error al eliminar la categoría.");
      }
    }
  };

  const agregarCategoria = async (categoria) => {
    try {
      const success = await createCategory(categoria);
      if (success) {
        getCategorias();
      } else {
        alert("Error al agregar la categoría.");
      }
    } catch (error) {
      alert("Error al agregar la categoría.");
    }
  };

  return (
    <div className="listar-categorias-container">
      <div className="listar-categorias-header">
        <h1 className="listar-categorias-title">Lista de Categorías</h1>
        <button
          className="listar-categorias-add-btn"
          onClick={() => setShowEditarCategoria(true)}
        >
          Agregar Categoría
        </button>
      </div>

      <div className="listar-categorias-filters">
        <div className="listar-categorias-search">
          <input
            type="text"
            placeholder="Buscar categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="listar-categorias-sort">
          <label>Ordenar por ID:</label>
          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
      </div>

      <table className="listar-categorias-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {categorias
            .filter((categoria) =>
              categoria.categorias?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id))
            .map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.categorias}</td>
                <td className="listar-categorias-action-buttons">
                  <button
                    type="button"
                    className="listar-categorias-btn listar-categorias-edit-btn"
                    onClick={() => {
                      setSelectedCategoryId(categoria.id);
                      setShowEditarCategoria(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="listar-categorias-btn listar-categorias-delete-btn"
                    onClick={() => borrarCategoria(categoria.id)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {showEditarCategoria && (
        <div className="listar-categorias-modal">
          <div className="listar-categorias-modal-content">
            <EditarCategoria
              closeModal={() => setShowEditarCategoria(false)}
              fetchCategories={getCategorias}
              categoryId={selectedCategoryId}
              updateCategory={updateCategory}
              initialCategory={categorias.find(
                (categoria) => categoria.id === selectedCategoryId
              )}
              createCategory={agregarCategoria}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListarCategorias;
