import React from 'react';
import { fakeRecipes } from '../Components/utils/fakeData';
import Card from '../Components/Card';
import { useContextGlobal } from '../Components/global.context'
import CardCategoria from '../Components/CardCategoria';

export const Cena = () => {
  const { state } = useContextGlobal();

  const cenaRecipes = state.data.filter(recipe =>
    recipe.categorias.some(category => category.categorias === 'Cena')
  );

  return (
    <div className="category-recipes"> {/* Contenedor para las tarjetas */}
        {cenaRecipes.map(recipe => (
          <CardCategoria 
            key={recipe.id}
            title={recipe.nombre}
            image={recipe.imagenes}
            description={recipe.descripcion}
            category={recipe.categorias} // Pasa la prop 'category' al componente Card
            id={recipe.id}
          />
        ))}
    </div>
  );
};

export default Cena;
