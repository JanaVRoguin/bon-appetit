import { BASE_URL } from "../Components/utils/config";

// Listar recetas
export const fetchRecipes = async () => {
  try {
    const response = await fetch(`${BASE_URL}recetas/listar`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error al obtener las recetas:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener las recetas:", error.message);
    return null;
  }
};

// Función para crear una nueva receta
export const createRecipe = async (receta) => {
  try {
    const response = await fetch(`${BASE_URL}recetas/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(receta),
    });

    if (!response.ok) {
      if (response.status === 400) {
        return await response.json(); // Devuelve errores de validación
      }
      throw new Error("Error al crear receta.");
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error };
  }
};

// Listar categorias
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}categorias/listar`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error al obtener las categorías:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener las categorías:", error.message);
    return null;
  }
};

// Eliminar receta
export const deleteRecipe = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}recetas/eliminar/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return true;
    } else {
      console.error("Error al eliminar la receta:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error al eliminar la receta:", error.message);
    return false;
  }
};

// Actualizar receta
export const updateRecipe = async (recipeId, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}recetas/actualizar/${recipeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (response.ok) {
      return true;
    } else {
      console.error("Error al actualizar la receta:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error al actualizar la receta:", error.message);
    return false;
  }
};
