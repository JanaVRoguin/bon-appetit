import { Route, Routes } from "react-router-dom"
import { routes } from "../utils/routes"
import { PublicRoute } from "./PublicRoute"
import { PrivateRoute } from "./PrivateRoute"
import { Home } from "../Layouts"
import { Almuerzo, Cena, Desayuno, Detail, Login, Mediatarde, Register } from "../Components"
import AdminPanel from "./AdminPanel/AdminPanel"
import CrearReceta from "./AdminPanel/gestionRecetas/CrearReceta"
import MyAccount from "../Components/MyAccount"

export const AppRouter = () => {
  return (
    <div className="content"> {/* El contenedor principal para el contenido */}
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.desayuno} element={<Desayuno />} />
        <Route path={routes.almuerzo} element={<Almuerzo />} />
        <Route path={routes.mediatarde} element={<Mediatarde />} /> 
        <Route path={routes.cena} element={<Cena />} />
        <Route path={routes.detail} element={<Detail />} />
        <Route path={routes.myAccount} element={<MyAccount/>} />
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
        }/>

        <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }>
        </Route>
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </div>
  )
}
