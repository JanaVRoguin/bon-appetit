import { useParams } from "react-router-dom"
import { fakeRecipes } from "../Components/utils/fakeData";
import { useContextGlobal } from "../Components/global.context";
import { useEffect } from "react";
import Card from "../Components/Card";


export const Detail = () => {
    const params = useParams();
    const url = `${fakeRecipes}/${params.id}`;
    const {dispatch, state} = useContextGlobal();
    const {recipeSelected} = state;
    useEffect(() => {
        dispatch({type: 'GET_SELECTED', payload: url})
    }, [])
    console.log(`Detail - ${recipeSelected}`);
  return (
    <Card
        key={recipeSelected.id}
        title={recipeSelected.title}
        image={recipeSelected.image}
        description={recipeSelected.description}
    />
  )
}

export default Detail