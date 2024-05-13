import React, { useState } from 'react';



const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value); // Actualiza el estado con el valor del campo de entrada
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm); // Llama a la función `onSearch` con el término de búsqueda
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Realiza la búsqueda al presionar enter
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm} // Valor del campo de entrada
        onChange={handleInputChange} // Evento para cambiar el valor
        onKeyDown={handleKeyPress} // Evento para presionar teclas
        placeholder="Buscar recetas..." // Texto de placeholder
      />
      <button onClick={handleSearch}> {/* Botón con ícono de lupa */}
        Buscar 🔍 {/* Ícono de lupa */}
      </button>
    </div>
  );
};

export default SearchBar;
