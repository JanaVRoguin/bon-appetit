import React from 'react';
import { useContextGlobal } from '../Components/global.context'
import Card from '../Components/Card';

const Almuerzo = () => {
  const { state } = useContextGlobal();

  const almuerzoRecipes = state.data.filter(recipe =>
    recipe.categorias.some(category => category.categorias === 'Almuerzo')
  );

  return (
    <div>
      <div className="category-recipes">
        {almuerzoRecipes.map(recipe => (
          <Card 
            key={recipe.id}
            title={recipe.nombre}
            image={recipe.imagenes}
            description={recipe.descripcion}
            category={recipe.categorias} // Pasa la prop 'category' al componente Card
          />
        ))}
      </div>
    </div>
  );
};

export default Almuerzo;