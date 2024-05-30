import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { reducer } from "./reducer"

export const ContextGlobal = createContext()

const initialState = {theme: false, 
                        data: [], 
                        favs: [], 
                        recipeSelected: {}};


export const ContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    //Petición a la API
    const url = `http://localhost:8080/recetas/listar`

    useEffect(() => {
        axios(url)
        .then(res => {
            dispatch({type: 'GET_LIST', payload: res.data})
        })
    }, []);
    // console.log(state);
    
return (
    <ContextGlobal.Provider value={{state,dispatch}}>
        { children }
    </ContextGlobal.Provider>
)
}

export const useContextGlobal = () => useContext(ContextGlobal);