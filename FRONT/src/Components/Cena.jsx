import { useContext } from 'react';
import { ContextGlobal } from '../Context';
// import Card from './Card';
import { CardCategoria } from './CardCategoria';

export const Cena = () => {
  const { state } = useContext(ContextGlobal);

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
