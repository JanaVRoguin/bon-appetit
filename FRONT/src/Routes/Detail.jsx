import { useNavigate, useParams } from "react-router-dom"
import { useContextGlobal } from "../Components/global.context";
import { useEffect } from "react";
import axios from "axios";
import ImagesContainer from "../Components/Detail/ImagesContainer";
import RecipeDetails from "../Components/Detail/RecipeDetails";
import NutritionalDetails from "../Components/Detail/NutritionalDetails";
import RecipeCalendar from "../Components/Detail/RecipeCalendar";

export const Detail = () => {
    const params = useParams();
    const navigate = useNavigate()
    const url = `http://localhost:8080/recetas/${params.id}`;
    const {dispatch, state} = useContextGlobal();
    const {nombre, imagenes, categorías, descripcion, ingredientes, instrucciones} = state.recipeSelected;
    useEffect(() => {
      axios(url)
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

export default Detail