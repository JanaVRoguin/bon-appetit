import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../utils/routes";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { Home } from "../Layouts";
import { Detail, Login, Register } from "../Components";  // Importar los componentes necesarios
import AdminPanel from "../Layouts/AdminPanel";
import CrearReceta from "../Components/AdminPanel/gestionRecetas/CrearReceta";
import MyAccount from "../Components/MyAccount";
import Favs from "../Layouts/Favs";
import Planner from "../Layouts/Planner";
import { UserRoute } from "./UserRoute";
import { Categoria } from "../Layouts/Categoria";
import { ContextGlobal } from "../Context";  // Asegúrate de importar tu contexto

export const AppRouter = () => {
  const { state } = useContext(ContextGlobal);  // Usar el contexto global para acceder a los datos

  // Obtener todas las categorías únicas de las recetas
  const categorias = [...new Set(state.data.flatMap(recipe => recipe.categorias.map(cat => cat.categorias)))];

  return (
    <div className="content"> {/* El contenedor principal para el contenido */}
      <Routes>
        <Route path={routes.home} element={<Home />} />
        {
          categorias.map((categoria, i) =>
            <Route key={i} path={categoria.toLowerCase()} element={<Categoria categoriaNombre={categoria} />} />
          )
        }
        <Route path={routes.detail} element={<Detail />} />
        <Route path={routes.myAccount} element={
          <UserRoute>
            <MyAccount />
          </UserRoute>
        } />
        <Route path={routes.favs} element={
          <UserRoute>
            <Favs />
          </UserRoute>
        } />
        <Route path={routes.adminPanel} element={
          <PrivateRoute>
            <AdminPanel />
          </PrivateRoute>
        } /> {/* Página panel de admin */}
        <Route path={routes.crearReceta} element={
          <PrivateRoute>
            <CrearReceta />
          </PrivateRoute>
        } /> {/* Página para crear comida */}
        <Route path={routes.register} element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path={routes.planner} element={<Planner />} />
      </Routes>
    </div>
  );
};
