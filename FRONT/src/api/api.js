import { BASE_URL } from "../utils/config";

const token = JSON.parse( localStorage.getItem('token') );
// Listar recetas

export const fetchRecipes = async () => {
  try {
    const response = await fetch(`${BASE_URL}recetas/listar`,
    { headers: {
      'Content-Type': 'application/json'
    }
  });
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
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json"
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
    const response = await fetch(`${BASE_URL}categorias/listar`,
    { headers: {
      'Content-Type': 'application/json'
    }
  }
    );
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
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
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
        'Authorization': `Bearer ${token}`,
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


export const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}usuarios/listar`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener los usuarios");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}usuarios/eliminar/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el usuario");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const grantAdminRole = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}admin/rolAdmin/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error al asignar el rol de admin");
    }
  } catch (error) {
    console.error("Error granting admin role:", error);
    throw error;
  }
};

export const revokeAdminRole = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}admin/revokeRole/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error al revocar el rol de admin");
    }
  } catch (error) {
    console.error("Error revoking admin role:", error);
    throw error;
  }
};

