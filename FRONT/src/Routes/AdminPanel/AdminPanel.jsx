import React, { useEffect, useState } from "react";
import "./AdminPanel.css";
import ListarRecetas from "./gestionRecetas/ListarRecetas";
import CrearReceta from "./gestionRecetas/CrearReceta";
import ListUsers from "./gestionUsuarios/ListUsers";
import { fetchRecipes } from "../../api/api";

export const AdminPanel = () => {
  const [showRecetas, setShowRecetas] = useState(false);
  const [showCrearReceta, setShowCrearReceta] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showCategorias, setShowCategorias] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchRecipesData = async () => {
    const data = await fetchRecipes();
    if (data) {
      setRecipes(data);
    }
  };

  useEffect(() => {
    if (showRecetas) {
      fetchRecipesData();
    }
  }, [showRecetas]);

  const handleShowRecetas = () => {
    setShowRecetas((prev) => !prev);
    setShowCrearReceta(false);
    setShowUsers(false);
    setShowCategorias(false);
  };

  const handleShowCrearReceta = () => {
    setShowCrearReceta((prev) => !prev);
    setShowUsers(false);
    setShowRecetas(false);
    setShowCategorias(false);
  };

  const handleShowUsers = () => {
    setShowUsers((prev) => !prev);
    setShowRecetas(false);
    setShowCrearReceta(false);
    setShowCategorias(false);
  };

  const handleShowCategorias = () => {
    setShowCategorias((prev) => !prev);
    setShowRecetas(false);
    setShowCrearReceta(false);
    setShowUsers(false);
  };

  if (isMobile) {
    return (
      <div className="admin-panel-container">
        <h2 className="title">Panel de administración</h2>
        <p className="mobile-message">
          El panel de administración no está disponible en dispositivos móviles.
        </p>
      </div>
    );
  }

  return (
    <div className="admin-panel-container">
      <h2 className="title">Panel de administración</h2>
      <div className="actions">
        <button
          type="button"
          className={`btn refresh-btn ${showRecetas ? "active" : ""}`}
          onClick={handleShowRecetas}
        >
          {showRecetas ? "Ocultar lista de recetas" : "Lista de recetas"}
        </button>
        <button
          type="button"
          className={`btn create-btn ${showCrearReceta ? "active" : ""}`}
          onClick={handleShowCrearReceta}
        >
          {showCrearReceta ? "Ocultar formulario" : "Agregar Receta"}
        </button>
        <button
          type="button"
          className={`btn create-btn ${showUsers ? "active" : ""}`}
          onClick={handleShowUsers}
        >
          {showUsers ? "Ocultar usuarios" : "Administrar Usuarios"}
        </button>
        <button
          type="button"
          className={`btn create-btn ${showCategorias ? "active" : ""}`}
          onClick={handleShowCategorias}
        >
          {showCategorias ? "Ocultar categorías" : "Administrar Categorías"}
        </button>
      </div>
      {showRecetas && (
        <ListarRecetas recipes={recipes} fetchRecipes={fetchRecipesData} />
      )}
      {showCrearReceta && (
        <div className="modal">
          <div className="modal-content">
            <CrearReceta
              closeModal={() => setShowCrearReceta(false)}
              fetchRecipes={fetchRecipesData}
            />
          </div>
        </div>
      )}
      {showUsers && <ListUsers />}
      {showCategorias && <ListarCategorias />}
    </div>
  );
};

export default AdminPanel;
