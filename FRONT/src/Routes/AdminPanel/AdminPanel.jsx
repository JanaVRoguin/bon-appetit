import React, { useEffect, useState } from "react";
import "./AdminPanel.css";
import ListarRecetas from "./gestionRecetas/ListarRecetas";
import CrearReceta from "./gestionRecetas/CrearReceta";
import ListUsers from "./gestionUsuarios/ListUsers"; // Importa ListUsers
import { fetchRecipes } from "../../api/api";

export const AdminPanel = () => {
  const [showRecetas, setShowRecetas] = useState(false);
  const [showCrearReceta, setShowCrearReceta] = useState(false);
  const [showUsers, setShowUsers] = useState(false); // Estado para mostrar ListUsers
  const [isMobile, setIsMobile] = useState(false);
  const [recipes, setRecipes] = useState([]); // Estado para almacenar la lista de recetas

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
          className="btn refresh-btn"
          onClick={() => setShowRecetas(!showRecetas)}
        >
          {showRecetas ? "Ocultar lista de recetas" : "Lista de recetas"}
        </button>

        <button
          type="button"
          className="btn create-btn"
          onClick={() => setShowCrearReceta(true)}
        >
          Agregar Receta
        </button>
        <button
          type="button"
          className="btn create-btn"
          onClick={() => setShowUsers(!showUsers)}
        >
          {showUsers ? "Ocultar usuarios" : "Administrar Usuarios"}
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
      {showUsers && <ListUsers />} {/* Muestra el componente ListUsers */}
    </div>
  );
};

export default AdminPanel;
