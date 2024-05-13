import React from 'react';
import { getRandomElements } from '../Components/utils/randomElements'; // Función para elegir aleatoriamente
import Card from './Card'; // Componente para mostrar cada tarjeta
import { useContextGlobal } from '../Components/global.context'

const Recomendados = () => {
  // Obtén 3 recetas aleatorios
  const {state} = useContextGlobal()
  const randomRecipes = getRandomElements(state.data, 10);

  return (
    <>
    <h2 className="titulo-recomendados">Recetas Recomendadas</h2>
    <div className="recommended-section">
      
      <div className="recommended-grid">
        {randomRecipes.map((receta) => (
          <Card
            key={receta.id}
            id={receta.id}
            title={receta.nombre}
            image={receta.imagenes}
            description={receta.descripcion}
            category={receta.categorias}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default Recomendados;
