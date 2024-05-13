import Card from '../Components/Card';
import { useContextGlobal } from '../Components/global.context'

export const Desayuno = () => {

  const { state } = useContextGlobal();

  const desayunoRecipes = state.data.filter(recipe =>
    recipe.categorias.some(category => category.categorias === 'Desayuno')
  );

  return (
    <div className="category-recipes"> {/* Contenedor para las tarjetas */}
      {desayunoRecipes.map(recipe => (
          <Card 
            key={recipe.id}
            title={recipe.nombre}
            image={recipe.imagenes}
            description={recipe.descripcion}
            category={recipe.categorias} // Pasa la prop 'category' al componente Card
          />
        ))}
    </div>
  );
};

export default Desayuno;
