import React from 'react';
import { getRandomElements } from '../Components/utils/randomElements'; // Función para elegir aleatoriamente
import Card from './Card'; // Componente para mostrar cada tarjeta
import { useContextGlobal } from '../Components/global.context'

const Recomendados = () => {
  
  const {state} = useContextGlobal()
  const randomRecipes = getRandomElements(state.data, 10);

  return (
    <>
    
    <div className="recommended-section">
      <h1 className="titulo-recomendados">RECETAS RECOMENDADAS</h1>
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
