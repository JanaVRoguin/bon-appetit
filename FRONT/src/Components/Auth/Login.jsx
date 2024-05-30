import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    correo: '',
    contraseña: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      errors.correo = 'El formato del email es inválido';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
    try {
          const response = await axios.post('http://localhost:8080/auth/login', formData);
          // console.log('Inicio de sesión exitoso', response.data);
          // localStorage.setItem('token', JSON.stringify(response.data.token) );
          login(response.data); // Loguear al usuario
          // navigate('/');
      } catch (error) {
          console.error('Error en el inicio de sesión:', error);
      }
    }
  };

  const handleCancel = () => {
    navigate('/'); // Cambia la ruta según sea necesario
  };

  return (
    <div className="login">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="correo">Email</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className={errors.correo ? 'input-error' : ''}
          />
          {errors.correo && <p className="error-message">{errors.correo}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            className={errors.contraseña ? 'input-error' : ''}
          />
          {errors.contraseña && <p className="error-message">{errors.contraseña}</p>}
        </div>
        <div className="form-buttons">
          <button type="submit" className="login-button">Iniciar sesión</button>
          <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};
