import { HashRouter, Routes, Route } from "react-router-dom"
import HomePage from "./components/Home/HomePage"
import { Menu } from "./components/Menu/Menu"
import Proyectos from "./components/Publicaciones/PublicacionesPage"
import { Perfil } from "./components/Perfil/Perfil"
import PublicacionesPage from "./components/Publicaciones/PublicacionesPage"
import { PublicacionesPost } from "./components/Publicaciones/PublicacionesPost"
import LogoutPage from "./public/Auth/LogoutPage"
import LoginPage from "./public/Auth/LoginPage"
import { AuthProvider, AuthRoute } from "./public/Auth/auth"




function App() {
 

  return (
    <>
      <HashRouter>
        <AuthProvider>
        <Menu/>

          <Routes>
              <Route path="/" element={<HomePage/>} />

              <Route 
                path="/Perfil" 
                element={
                  <AuthRoute>
                    <Perfil/>
                  </AuthRoute>
                } 
              />

              <Route 
                  path="/Publicaciones"   
                  element={
                    <AuthRoute>
                      <PublicacionesPage/>
                    </AuthRoute>
                  } >
                      <Route 
                        path=":slug"    
                        element={
                          <AuthRoute>
                            <PublicacionesPost/>
                          </AuthRoute>
                        }  
                      />
              </Route>

              <Route path="/Proyectos"     element={<Proyectos/>} />

              <Route path="/login"     element={<LoginPage/>} />

              <Route 
                path="/logout"
                element={
                  <AuthRoute>
                    <LogoutPage/>
                  </AuthRoute>
                }  
              />

              <Route path="*" element={
                  <AuthRoute>
                      <p>No encontrado</p>
                  </AuthRoute>
                } />

          </Routes>
        </AuthProvider>
      </HashRouter>
    </>
  )
}

export default App
