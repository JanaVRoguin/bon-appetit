import React, { useEffect, useState } from "react";
import {
  fetchUsers,
  deleteUser,
  grantAdminRole,
  revokeAdminRole,
} from "../../../api/api";


const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
        console.log(usersData);
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

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="title">Lista de Usuarios</h2>
      <table className="recetas-table">
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
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre} {user.apellido}</td>
              <td>{user.correo}</td>
              <td>{user.role}</td>
              <td className="action-buttons">
                <button
                  type="button"
                  className="btn delete-btn"
                  onClick={() => handleDelete(user.id)}
                >
                  Eliminar
                </button>
                {user.role === "USER" ? (
                  <button
                    type="button"
                    className="btn edit-btn"
                    onClick={() => handleGrantAdminRole(user.id)}
                  >
                    Asignar Admin
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn edit-btn"
                    onClick={() => handleRevokeAdminRole(user.id)}
                  >
                    Revocar Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUsers;
