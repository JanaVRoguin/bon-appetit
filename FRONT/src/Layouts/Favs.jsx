import { useContext } from "react";
import { ContextGlobal } from "../Context";
import { CardCategoria } from '../Components/CardCategoria';

const Favs = () => {
    const { state } = useContext(ContextGlobal);
    const { favs } = state;
  return (
    <>    
        <div className="favoritos-title">
            {favs.length == 0 ? 
                <h3>Tu colección de recetas favoritas está vacía por ahora. ¡Vamos a llenarla con algunas delicias!</h3>
                :
                <>
                    <h3>Favoritos</h3>
                    <div className="category-recipes">
                        {favs.map(recipe => (
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
                </>
            }
        </div>
    </>
  )
}

export default Favs