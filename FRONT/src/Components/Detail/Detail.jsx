import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import RecipeDetails from "./RecipeDetails";
import NutritionalDetails from "./NutritionalDetails";
import RecipeCalendar from "./RecipeCalendar";
import { ContextGlobal } from "../../Context";
import { ImagesContainer } from "./ImagesContainer";

export const Detail = () => {
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
      <div className="name-container">
        <h1>{ nombre }</h1>
        <button onClick={() => navigate(-1)}>volver atrás</button>
      </div>
      
      <ImagesContainer imagenes={imagenes}/>

      <div className="details-container">
        <RecipeDetails 
          categorías={categorías}
          descripcion={descripcion}
          ingredientes={ingredientes}
          instrucciones={instrucciones}
        />

        <div className="side-details-container">
          <NutritionalDetails />
          <RecipeCalendar />
        </div>
      </div>
    </>
  )
}