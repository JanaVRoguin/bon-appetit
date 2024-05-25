import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/Auth/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (formData.name.length < 4) {
      errors.name = 'El nombre debe tener al menos 4 caracteres';
    }

    if (formData.lastName.length < 4) {
      errors.lastName = 'El apellido debe tener al menos 4 caracteres';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'El formato del email es inválido';
    }

    if (!/[A-Z]/.test(formData.password)) {
      errors.password = 'La contraseña debe tener al menos una letra mayúscula';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Registro exitoso', formData);
      login(formData); // Loguear al usuario
      
      //*QUITAR COMENTARIOS PARA PROBAR BACKEND */
     
      // try {
      //   const response = await axios.post('http://localhost:8080/auth/login', formData);
      //   console.log('Registro exitoso', response.data);
      //   login(response.data); // Loguear al usuario
      //   navigate('/');
      // } catch (error) {
      //   console.error('Error en el registro:', error);
      // }
      navigate('/');
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
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'input-error' : ''}
          />
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
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
