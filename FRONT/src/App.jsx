import { AppRouter } from './Routes/AppRouter';
import { AuthProvider } from './Context/Auth/AuthContext';
import { ContextProvider } from './Context';
import { Footer, Navbar } from './Layouts';
import './App.css'

function App() {
  return (
    <AuthProvider>
      <ContextProvider>
        <Navbar/>
        <AppRouter/>
        <Footer/>
      </ContextProvider>
    </AuthProvider>
  )
}

export default App
