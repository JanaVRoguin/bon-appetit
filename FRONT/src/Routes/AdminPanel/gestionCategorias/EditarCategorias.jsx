import React, { useState, useEffect } from "react";
import {
  listarCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from "./api";

const AdministrarCategorias = () => {
  // Estado para almacenar la lista de categorías
  const [categorias, setCategorias] = useState([]);
  // Estado para almacenar los datos de una nueva categoría o categoría a actualizar
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: "",
    descripcion: "",
  });
  // Estado para almacenar el ID de la categoría a eliminar
  const [idCategoriaEliminar, setIdCategoriaEliminar] = useState(null);

  // Función para cargar las categorías al cargar el componente
  useEffect(() => {
    cargarCategorias();
  }, []);

  // Función para cargar las categorías desde el backend
  const cargarCategorias = async () => {
    try {
      const categoriasData = await listarCategorias();
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Error al cargar las categorías:", error);
    }
  };

  // Función para manejar el cambio en los campos del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNuevaCategoria({ ...nuevaCategoria, [name]: value });
  };

  // Función para enviar el formulario de creación de categoría
  const handleSubmitCrearCategoria = async (event) => {
    event.preventDefault();
    try {
      await crearCategoria(nuevaCategoria);
      setNuevaCategoria({ nombre: "", descripcion: "" });
      cargarCategorias();
    } catch (error) {
      console.error("Error al crear la categoría:", error);
    }
  };

  // Función para enviar el formulario de actualización de categoría
  const handleSubmitActualizarCategoria = async (event) => {
    event.preventDefault();
    try {
      await actualizarCategoria(nuevaCategoria);
      setNuevaCategoria({ nombre: "", descripcion: "" });
      cargarCategorias();
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
    }
  };

  // Función para eliminar una categoría
  const handleEliminarCategoria = async () => {
    try {
      await eliminarCategoria(idCategoriaEliminar);
      setIdCategoriaEliminar(null);
      cargarCategorias();
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  return (
    <div>
      <h2>Administrar Categorías</h2>
      {/* Formulario para crear una nueva categoría */}
      <form onSubmit={handleSubmitCrearCategoria}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la categoría"
          value={nuevaCategoria.nombre}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción de la categoría"
          value={nuevaCategoria.descripcion}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Crear Categoría</button>
      </form>

      {/* Formulario para actualizar una categoría */}
      <form onSubmit={handleSubmitActualizarCategoria}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la categoría"
          value={nuevaCategoria.nombre}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción de la categoría"
          value={nuevaCategoria.descripcion}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Actualizar Categoría</button>
      </form>

      {/* Renderizar la lista de categorías existentes */}
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            <span>{categoria.nombre}</span>
            <span>{categoria.descripcion}</span>
            {/* Botones para actualizar y eliminar categoría */}
            <button onClick={() => setNuevaCategoria(categoria)}>Editar</button>
            <button onClick={() => setIdCategoriaEliminar(categoria.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      {/* Confirmación para eliminar categoría */}
      {idCategoriaEliminar && (
        <div>
          <p>¿Estás seguro de que deseas eliminar esta categoría?</p>
          <button onClick={handleEliminarCategoria}>Sí</button>
          <button onClick={() => setIdCategoriaEliminar(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default AdministrarCategorias;
