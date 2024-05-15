import { Link } from 'react-router-dom'
import { routes } from './utils/routes'

const Navbar = () => {
  return (
    <nav className="navbar">

      <Link to="/" className="navbar-left"> {/* Navega a Home */}
        <img className='navbar-logo' src="/Images/Logo-generico.jpg" alt="Logo Marca" />
        <h2 className="navbar-heading">BonAppetit</h2>
      </Link>
      <ul className='nav-list'>
        <Link to="/"><li className='nav-item'>Inicio</li></Link> {/* Navega a Home */}
        <li className='nav-item'>Contacto</li>
        <li className='nav-item'>Sobre Nosotros</li>
        <li className='nav-item'><Link to={routes.adminPanel}>Panel de administrador</Link></li>
      </ul>
      <div className="navbar-right">
        <button className="navbar-button">Crear Cuenta</button>
        <button className="navbar-button">Iniciar sesión</button>
      </div>
    </nav>
  )
}

export default Navbar
