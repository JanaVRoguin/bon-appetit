import { BASE_URL } from "../utils/config";

const token = JSON.parse( localStorage.getItem('token') );

//CRUD RECETAS
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

// CRUD USUARIOS
export const fetchUsers = async () => {
  const token = JSON.parse(localStorage.getItem("token"));

  // Check if token is available
  if (!token) {
    console.error("No se encontró el token en el localStorage");
    throw new Error("Token de autenticación faltante.");
  }

  try {
    const response = await fetch(`${BASE_URL}usuarios/listar`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Check for specific error messages
      const errorMessage = await response.text();
      console.error("Error de respuesta de servidor:", errorMessage);
      throw new Error(`Error al obtener los usuarios: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error buscando usuarios:", error);
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

//CATEGORIAS 


// CRUD Categorías

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
// Crear una nueva categoría
export const createCategory = async (newCategory) => {
  try {
    const response = await fetch(`${BASE_URL}categorias/crear`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCategory),
    });
    if (!response.ok) {
      throw new Error("Error al crear la categoría.");
    }
    return "Categoría creada";
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Actualizar una categoría
export const updateCategory = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}categorias/actualizar`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(category),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar la categoría');
    }
    return 'Categoría actualizada';
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Eliminar una categoría
export const deleteCategory = async (categoryId) => {
  try {
    const response = await fetch(`${BASE_URL}categorias/eliminar/${categoryId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Error al eliminar la categoría');
    }
    return 'Categoría eliminada';
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Buscar categoría por ID
export const getCategoryById = async (categoryId) => {
  try {
    const response = await fetch(`${BASE_URL}categorias/${categoryId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error al obtener la categoría:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener la categoría:", error.message);
    return null;
  }
};


