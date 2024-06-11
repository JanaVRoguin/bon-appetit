import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import RecipeDetails from "./RecipeDetails";
import NutritionalDetails from "./NutritionalDetails";
import RecipeCalendar from "./RecipeCalendar";
import { ContextGlobal } from "../../Context";
import { ImagesContainer } from "./ImagesContainer";
import { SearchBar } from "../SearchBar";
import { AuthContext } from '../../Context';

export const Detail = () => {
  const { authState: { logged } } = useContext(AuthContext);
  const handleSearch = (term) => {
    console.log('Buscando recetas para:', term); // Aquí puedes implementar la lógica de búsqueda
  };

  const params = useParams();
  const navigate = useNavigate();
  const url = `http://localhost:8080/recetas/${params.id}`;
  const { dispatch, state } = useContext(ContextGlobal);
  const { favs, recipeSelected } = state;
  const { nombre, imagenes, categorías, descripcion, ingredientes, instrucciones, id } = state.recipeSelected;
  const token = JSON.parse(localStorage.getItem('token'));

  const [recipeIds, setRecipeIds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  useEffect(() => {
    if (token) {
      axios(url)
      .then((response) => {
        dispatch({ type: 'GET_SELECTED', payload: response.data });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized. Please check your token.");
          // Aquí puedes redirigir al usuario a la página de inicio de sesión o mostrar un mensaje.
        } else {
          console.error("Error fetching recipe details:", error);
        }
      });

      axios.get('http://localhost:8080/recetas/listar', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        //console.log(response.data);
        setRecipeIds(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized. Please check your token.");
          // Aquí puedes redirigir al usuario a la página de inicio de sesión o mostrar un mensaje.
        } else {
          console.error("Error fetching recipe IDs:", error);
        }
      });
    } else {
      console.error("No token found. Please log in.");
      // Aquí puedes redirigir al usuario a la página de inicio de sesión.
    }
  }, [params.id, token]);

  useEffect(() => {
    if (recipeIds.length > 0) {
      const currentIndex = recipeIds.indexOf(parseInt(params.id));
      setCurrentIndex(currentIndex);
    }
  }, [params.id, recipeIds]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const previousId = recipeIds[currentIndex - 1];
      navigate(`/recetas/${previousId}`);
    }
  };

  const handleNext = () => {
    if (currentIndex < recipeIds.length - 1) {
      const nextId = recipeIds[currentIndex + 1];
      navigate(`/recetas/${nextId}`);
    }
  };

  const addFav = () => {
    dispatch({type: 'ADD_FAV', payload: state.recipeSelected});
    alert(`Se agregó la receta ${nombre} a favoritos`);
  }
  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(state.favs));
  }, [state.favs])
  console.log(state);
  const removeFav = () => {
      dispatch({ type: 'REMOVE_FAVORITE', payload: id })
      alert(`Se eliminó la receta ${nombre} de favoritos`);
  }
  const includesArray = favs.map(item => item.id).includes(recipeSelected.id);
  return (
    <>
      <div className="detail">
        <SearchBar onSearch={handleSearch} />
        <div className="name-container">
          <h1>{nombre}</h1>
          <button className="button-back" onClick={() => navigate(-1)}>
            <i className="fas fa-reply"></i> VOLVER A LA CARTA
          </button>
          {logged && (
            <>
              {
                includesArray ?
                  <button className="button-back" onClick={removeFav}>
                    <i className="fa-solid fa-heart"></i> FAVORITOS
                  </button>
                :
                  <button className="button-back" onClick={addFav}>
                      <i class="fa-regular fa-heart"></i> FAVORITOS
                  </button>
              }
            </>
          )}
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

        <div className="navigation-buttons">
            <button className="nav-button" onClick={handlePrevious} disabled={currentIndex <= 0}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="nav-button" onClick={() => navigate('/')}>
              Volver al Menú Principal
            </button>
            <button className="nav-button" onClick={handleNext} disabled={currentIndex >= recipeIds.length - 1}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
    </>
  );
};
