import React, { useEffect, useState } from "react";
import "./AdminPanel.css";
import ListarRecetas from "./gestionRecetas/ListarRecetas";
import CrearReceta from "./gestionRecetas/CrearReceta";
import { BASE_URL } from "../../Components/utils/config";

export const AdminPanel = () => {
  const [showRecetas, setShowRecetas] = useState(false);
  const [showCrearReceta, setShowCrearReceta] = useState(false);
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

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`${BASE_URL}recetas/listar`);
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      } else {
        console.error("Error al obtener las recetas:", response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener las recetas:", error.message);
    }
  };

  useEffect(() => {
    if (showRecetas) {
      fetchRecipes();
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
      </div>

      {showRecetas && (
        <ListarRecetas recipes={recipes} fetchRecipes={fetchRecipes} />
      )}

      {showCrearReceta && (
        <div className="modal">
          <div className="modal-content">
            <CrearReceta
              closeModal={() => setShowCrearReceta(false)}
              fetchRecipes={fetchRecipes}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
