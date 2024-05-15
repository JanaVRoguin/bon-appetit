import React from 'react';
import { Link } from 'react-router-dom';
import Recomendados from '../Components/Recomendados';
import SearchBar from '../Components/SearchBar';


export const Home = () => {
  const handleSearch = (term) => {
    console.log('Buscando recetas para:', term); // Aquí puedes implementar la lógica de búsqueda
  };
  return (
    
    
    <div className="home">
      <SearchBar onSearch={handleSearch}/>
      <div className="card-container">
          <h2></h2>
          <Link to="/desayuno" className="card"> {/* Navega a la página de desayuno */}
            <h1>Desayuno</h1>
          </Link>
          <Link to="/almuerzo" className="card"> {/* Navega a la página de almuerzo */}
            <h1>Almuerzo</h1>
          </Link>
          <Link to="/mediatarde" className="card"> {/* Navega a la página de mediatarde */}
            <h1>Mediatarde</h1>
          </Link>
          <Link to="/cena" className="card"> {/* Navega a la página de cena */}
            <h1>Cena</h1>
          </Link>

      </div>
      <div>
          
          <Recomendados/>
      </div>
    </div>
  );
};

export default Home;
