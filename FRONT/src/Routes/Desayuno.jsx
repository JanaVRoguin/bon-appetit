import Card from '../Components/Card';
import CardCategoria from '../Components/CardCategoria';
import { useContextGlobal } from '../Components/global.context'

export const Desayuno = () => {

  const { state } = useContextGlobal();

  const desayunoRecipes = state.data.filter(recipe =>
    recipe.categorias.some(category => category.categorias === 'Desayuno')
  );

  return (
    <div className="category-recipes"> {/* Contenedor para las tarjetas */}
      {desayunoRecipes.map(recipe => (
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

export default Desayuno;
