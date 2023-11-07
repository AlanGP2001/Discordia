import { HashRouter, Routes, Route } from "react-router-dom"
import HomePage from "./components/Home/HomePage"
import {Menu} from "./components/Menu/Menu"
import Proyectos from "./components/Publicaciones/PublicacionesPage"
import Perfil from "./components/Perfil/Perfil"
import PublicacionesPage from "./components/Publicaciones/PublicacionesPage"
import { PublicacionesPost } from "./components/Publicaciones/PublicacionesPost"


function App() {
 

  return (
    <>
      <HashRouter>
        <Menu/>

          <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/Perfil" element={<Perfil/>} />
              <Route path="/Publicaciones"   element={<PublicacionesPage/>} />
              <Route path="/Publicaciones/:slug"   element={<PublicacionesPost/>} />
              <Route path="/Proyectos"     element={<Proyectos/>} />
              <Route path="*" element={<p>No encontrado</p>}/>
          </Routes>
      </HashRouter>
    </>
  )
}

export default App
