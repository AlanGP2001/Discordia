import { HashRouter, Routes, Route } from "react-router-dom"
import HomePage from "./components/Home/HomePage"
import {Menu} from "./components/Menu/Menu"
import Proyectos from "./components/Proyectos/Proyectos"
import Colaboradores from "./components/Colaboradores/Colaboradores"


function App() {
 

  return (
    <>
      <HashRouter>
        <Menu/>

          <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/Colaboradores" element={<Colaboradores/>} />
              <Route path="/Actividades"   element={<HomePage/>} />
              <Route path="/Proyectos"     element={<Proyectos/>} />
              <Route path="*" element={<p>No encontrado</p>}/>
          </Routes>
      </HashRouter>
    </>
  )
}

export default App
