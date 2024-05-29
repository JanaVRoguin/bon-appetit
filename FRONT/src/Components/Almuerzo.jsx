import { useContext } from 'react';
import { ContextGlobal } from '../Context';
// import Card from './Card';
import { CardCategoria } from './CardCategoria';

export const Almuerzo = (prop) => {
  const { state } = useContext(ContextGlobal);

  const almuerzoRecipes = state.data.filter(recipe =>
    recipe.categorias.some(category => category.categorias === 'Almuerzo')
  );

  return (
    <div>
      <div className="category-recipes">
        {almuerzoRecipes.map(recipe => (
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
    </div>
  );
};

