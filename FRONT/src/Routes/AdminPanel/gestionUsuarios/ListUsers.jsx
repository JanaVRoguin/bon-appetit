import React, { useEffect, useState } from "react";
import {
  fetchUsers,
  deleteUser,
  grantAdminRole,
  revokeAdminRole,
} from "../../../api/api";
import "./ListUsers.css";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterRole, setFilterRole] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        const transformedUsers = usersData.map((user) => ({
          ...user,
          role: user.roles[0]?.roleEnum,
        }));
        setUsers(transformedUsers);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro que deseas eliminar este usuario?")) {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
      } catch (err) {
        alert("Error al eliminar el usuario.");
      }
    }
  };

  const handleGrantAdminRole = async (userId) => {
    try {
      await grantAdminRole(userId);
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: "ADMIN" } : user
        )
      );
    } catch (err) {
      alert("Error al asignar el rol de admin.");
    }
  };

  const handleRevokeAdminRole = async (userId) => {
    try {
      await revokeAdminRole(userId);
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: "USER" } : user
        )
      );
    } catch (err) {
      alert("Error al revocar el rol de admin.");
    }
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilterRole = (role) => {
    setFilterRole(role);
    setSearchTerm(""); // Resetear el término de búsqueda al cambiar el filtro de rol
  };

  const filteredUsers = users.filter(
    (user) =>
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!filterRole || user.role === filterRole)
  );

  const sortedUsers = filteredUsers.slice().sort((a, b) => {
    if (sortOrder === "asc") {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="listar-recetas-container">
      <div className="listar-recetas-header">
        <div>
          <h1 className="listar-recetas-title">Lista de Usuarios</h1>
          <p className="listar-recetas-total">Total de usuarios: {users.length}</p>
        </div>
      </div>

      <div className="listar-recetas-filters">
        <div className="listar-recetas-search">
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="listar-recetas-category-sort">
          <div
            className={`listar-recetas-categoria-card ${
              filterRole === null ? "active" : ""
            }`}
            onClick={() => handleFilterRole(null)}
          >
            Todos
          </div>
          <div
            className={`listar-recetas-categoria-card ${
              filterRole === "ADMIN" ? "active" : ""
            }`}
            onClick={() => handleFilterRole("ADMIN")}
          >
            Admin
          </div>
          <div
            className={`listar-recetas-categoria-card ${
              filterRole === "USER" ? "active" : ""
            }`}
            onClick={() => handleFilterRole("USER")}
          >
            User
          </div>
        </div>

        <div className="listar-recetas-sort">
          <label>Ordenar por ID:</label>
          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
      </div>

      <table className="listar-recetas-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre y Apellido</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {user.nombre} {user.apellido}
              </td>
              <td>{user.correo}</td>
              <td>{user.role}</td>
              <td className="listar-recetas-action-buttons">
                {user.role === "USER" ? (
                  <button
                    type="button"
                    className="listar-recetas-btn listar-recetas-edit-btn"
                    onClick={() => handleGrantAdminRole(user.id)}
                  >
                    Asignar Admin
                  </button>
                ) : (
                  <button
                    type="button"
                    className="listar-recetas-btn listar-recetas-edit-btn"
                    onClick={() => handleRevokeAdminRole(user.id)}
                  >
                    Revocar Admin
                  </button>
                )}
                <button
                  type="button"
                  className="listar-recetas-btn listar-recetas-delete-btn"
                  onClick={() => handleDelete(user.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUsers;
