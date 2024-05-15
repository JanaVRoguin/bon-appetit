import { useParams } from "react-router-dom"
import { fakeRecipes } from "../Components/utils/fakeData";
import { useContextGlobal } from "../Components/global.context";
import { useEffect } from "react";
import Card from "../Components/Card";
import axios from "axios";


export const Detail = () => {
    const params = useParams();
    const url = `http://localhost:8080/recetas/${params.id}`;
    const {dispatch, state} = useContextGlobal();
    const {recipeSelected} = state;
    useEffect(() => {
      axios(url)
      .then((response) => {
        dispatch({type: 'GET_SELECTED', payload: response.data})
      })
    }, [])

  return (
    <>
    {
    <Card
        key={recipeSelected.id}
        title={recipeSelected.nombre}
        image={recipeSelected.imagenes.urlImg}
        description={recipeSelected.instrucciones}
  />
  
  
  }
    </>
  )
}

export default Detail