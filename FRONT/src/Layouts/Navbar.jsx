import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../utils/routes'
import { AuthContext } from '../Context';

export const Navbar = () => {
  const { authState: { logged, user }, logout } = useContext(AuthContext);
  const [showCalendar, setShowCalendar] = useState(false); // Estado para mostrar el div del calendario

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  const handleLogout = () => {
    const confirmed = window.confirm('¿Estás seguro de que deseas cerrar sesión?');
    if (confirmed) {
      logout();
    }
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const closeCalendar = () => {
    setShowCalendar(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-left">
        <img className='navbar-logo' src="/Images/Logo.png" alt="Logo Marca" />
        <h2 className="navbar-heading">BonAppetit</h2>
      </Link>

      <ul className='nav-list'>
        <Link to="/" className='nav-item'><li>Inicio</li></Link>
        <Link to="/" className='nav-item'><li>Contacto</li></Link>
        <Link to="/" className='nav-item'><li>Sobre Nosotros</li></Link>
        { user?.role === 'ADMIN' && 
            <Link to={routes.adminPanel} className='nav-item'>
              <li>Panel de administrador</li>
            </Link> 
        }
        {logged && (
          <>
            
          </>
        )}
      </ul>

      <div className="navbar-right">
        {logged ? (
          <div className="avatar-container">
            <div className="avatar" onClick={toggleCalendar}>
              {getInitial(user.name)}
              {showCalendar && (
                <div className="calendar-dropdown">
                  <Link to={routes.planner} onClick={closeCalendar}>Mi Calendario</Link>
                  <Link to={routes.favs} onClick={closeCalendar}>Favoritos</Link>
                  <Link to={routes.myAccount} onClick={closeCalendar}>Mi Cuenta</Link>
                </div>
              )}
            </div>
            <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        ) : (
          <>
            <Link to={routes.login}><button className="navbar-button btn-login">Iniciar sesión</button></Link>
            <Link to={routes.register}><button className="navbar-button btn-register">Crear Cuenta</button></Link>
          </>
        )}
      </div>

      <div className='menu-hamburguesa'>
        {/* Código del menú hamburguesa omitido por brevedad */}
      </div>

    </nav>
  );
};
