import React, { useEffect, useState } from "react";
import "../Components/AdminPanel/AdminPanel.css";
import ListarRecetas from "../Components/AdminPanel/gestionRecetas/ListarRecetas";
import ListUsers from "../Components/AdminPanel/gestionUsuarios/ListUsers";
import ListarCategorias from "../Components/AdminPanel/gestionCategorias/ListarCategorias";
import { fetchRecipes } from "../api/api";

export const AdminPanel = () => {
  const [showRecetas, setShowRecetas] = useState(false);
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
    setShowUsers(false);
    setShowCategorias(false);
  };

  const handleShowUsers = () => {
    setShowUsers((prev) => !prev);
    setShowRecetas(false);
    setShowCategorias(false);
  };

  const handleShowCategorias = () => {
    setShowCategorias((prev) => !prev);
    setShowRecetas(false);
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
          className={`btn create-btn ${showRecetas ? "active" : ""}`}
          onClick={handleShowRecetas}
        >
          {showRecetas ? "Ocultar lista de recetas" : "Administrar Recetas"}
        </button>
        <button
          type="button"
          className={`btn create-btn ${showCategorias ? "active" : ""}`}
          onClick={handleShowCategorias}
        >
          {showCategorias ? "Ocultar categorías" : "Administrar Categorías"}
        </button>
        <button
          type="button"
          className={`btn create-btn ${showUsers ? "active" : ""}`}
          onClick={handleShowUsers}
        >
          {showUsers ? "Ocultar usuarios" : "Administrar Usuarios"}
        </button>
      </div>

      {showRecetas && (
        <ListarRecetas recipes={recipes} fetchRecipes={fetchRecipesData} />
      )}
      {showUsers && <ListUsers />}
      {showCategorias && <ListarCategorias />}
    </div>
  );
};

export default AdminPanel;
