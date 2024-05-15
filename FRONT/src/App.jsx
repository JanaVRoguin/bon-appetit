import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import {Route, Routes,   } from 'react-router-dom';
import { routes } from './Components/utils/routes';
import Home from './Routes/Home';
import Desayuno from './Routes/Desayuno';
import Almuerzo from './Routes/Almuerzo';
import Mediatarde from './Routes/Mediatarde';
import Cena from './Routes/Cena';
import Detail from './Routes/Detail';
import AdminPanel from './Routes/AdminPanel/AdminPanel';
import CrearReceta from './Routes/AdminPanel/gestionRecetas/CrearReceta';

import AdminPanel from './Routes/AdminPanel/AdminPanel';
import './App.css'
import CrearReceta from './Routes/AdminPanel/gestionRecetas/CrearReceta';


function App() {
  
  return (
  
     
        <div>
           <Navbar/>
           <div className="content"> {/* El contenedor principal para el contenido */}

          <Routes>
            <Route path={routes.home} element={<Home />} /> {/* Página de inicio */}
            <Route path={routes.desayuno} element={<Desayuno />} /> {/* Página de desayuno */}
            <Route path={routes.almuerzo} element={<Almuerzo />} /> {/* Página de almuerzo */}
            <Route path={routes.mediatarde} element={<Mediatarde />} /> {/* Página de mediatarde */}
            <Route path={routes.cena} element={<Cena />} /> {/* Página de cena */}
            <Route path={routes.detail} element={<Detail/>} /> {/* Página de detalle */}
          </Routes>
        </div>
           <Footer/>
        </div>
   
  )
}

export default App
