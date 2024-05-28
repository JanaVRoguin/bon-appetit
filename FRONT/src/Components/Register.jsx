import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/Auth/AuthContext';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contraseña: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (formData.nombre.length < 4) {
      errors.nombre = 'El nombre debe tener al menos 4 caracteres';
    }

    if (formData.apellido.length < 4) {
      errors.apellido = 'El apellido debe tener al menos 4 caracteres';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      errors.correo = 'El formato del email es inválido';
    }

    if (!/[A-Z]/.test(formData.contraseña)) {
      errors.contraseña = 'La contraseña debe tener al menos una letra mayúscula';
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
        const response = await axios.post('http://localhost:8080/auth/registro', formData);
        console.log('Registro exitoso', response.data);

        try {
          const loginResponse = await axios.post('http://localhost:8080/auth/login', {
            correo: formData.correo,
            contraseña: formData.contraseña,
          });
          console.log('Inicio de sesión exitoso', loginResponse.data);
          
          // Guardar token en localStorage
          localStorage.setItem('token', loginResponse.data.token);
          
          // Loguear al usuario
          login(loginResponse.data);
          navigate('/');
        } catch (loginError) {
          console.error('Error en el inicio de sesión:', loginError);
        }

        login(response.data); // Loguear al usuario
        navigate('/');
      } catch (error) {
        console.error('Error en el registro:', error);
      }
    }
  };

  const handleCancel = () => {
    navigate('/'); // Cambia la ruta según sea necesario
  };

  return (
    <div className="register">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={errors.nombre ? 'input-error' : ''}
          />
          {errors.nombre && <p className="error-message">{errors.nombre}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className={errors.apellido ? 'input-error' : ''}
          />
          {errors.apellido && <p className="error-message">{errors.apellido}</p>}
        </div>
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
          <button type="submit" className="register-button">Registrarse</button>
          <button type="button" className="cancel-button" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
