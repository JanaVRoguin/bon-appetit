import { Link } from 'react-router-dom'
import { routes } from './utils/routes'
import { useState } from 'react'

const Navbar = () => {

  const [toggle, setToggle] = useState(false)
  console.log(toggle)

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
        <Link to={routes.formRegistroUsuario}><button className="navbar-button">Crear Cuenta</button></Link>
        <button className="navbar-button">Iniciar sesión</button>
      </div>

      <div className='menu-hamburguesa'>
        <button onClick={ () => setToggle(!toggle)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
        </button>
      </div>

      {
        toggle && (
          <ul className='mobile-nav-list'>
            <li className='nav-item mobile-item'><Link to="/">Inicio</Link></li> {/* Navega a Home */}
            <li className='nav-item mobile-item'>Contacto</li>
            <li className='nav-item mobile-item'>Sobre Nosotros</li>
            <li className='nav-item mobile-item'><Link to={routes.adminPanel}>Panel de administrador</Link></li>
          </ul>
        )
      }
    </nav>
  )
}

export default Navbar
