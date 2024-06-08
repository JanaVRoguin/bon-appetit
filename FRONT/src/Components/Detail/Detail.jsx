import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import RecipeDetails from "./RecipeDetails";
import NutritionalDetails from "./NutritionalDetails";
import RecipeCalendar from "./RecipeCalendar";
import { ContextGlobal } from "../../Context";
import { ImagesContainer } from "./ImagesContainer";
import { SearchBar } from "../SearchBar";


export const Detail = () => {
  const handleSearch = (term) => {
    console.log('Buscando recetas para:', term); // Aquí puedes implementar la lógica de búsqueda
  };
    const params = useParams();
    const navigate = useNavigate()
    const url = `http://localhost:8080/recetas/${params.id}`;
    const {dispatch, state} = useContext( ContextGlobal );
    const {nombre, imagenes, categorías, descripcion, ingredientes, instrucciones} = state.recipeSelected;
    const token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
      axios(url, { headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        dispatch({type: 'GET_SELECTED', payload: response.data})
      })
    }, [])

    return (
      <>
        <div className="detail">
          <SearchBar onSearch={handleSearch} />
          <div className="name-container">
            <h1>{nombre}</h1>
            <button className="button-back" onClick={() => navigate(-1)}>VOLVER</button>
          </div>
  
          <ImagesContainer imagenes={imagenes} />
  
          <div className="details-container">
            <div className="main-details">
              <div className="ingredientes">
                <h1>Ingredientes:</h1>
                <RecipeDetails
                  categorías={categorías}
                  descripcion={null}
                  ingredientes={ingredientes}
                  instrucciones={null} // Solo mostramos los ingredientes aquí
                />
              </div>
              <div className="side-details-container">
                <NutritionalDetails />
                <div className="separator"></div>
                <RecipeCalendar />
              </div>
            </div>
            <div className="instructions-container">
              <h1>Modo de preparación:</h1>
              <RecipeDetails
                categorías={categorías}
                descripcion={null} // No mostramos la descripción aquí
                ingredientes={null} // No mostramos los ingredientes aquí
                instrucciones={instrucciones}
              />
            </div>
          </div>
        </div>
      </>
    )
}