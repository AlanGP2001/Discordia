import { HashRouter, Routes, Route } from "react-router-dom"
import HomePage from "./components/Home/HomePage"
import Proyectos from "./components/Publicaciones/PublicacionesPage"
import { Perfil } from "./components/Perfil/Perfil"
import PublicacionesPage from "./components/Publicaciones/PublicacionesPage"
import { PublicacionesPost } from "./components/Publicaciones/PublicacionesPost"
import LogoutPage from "./public/Auth/LogoutPage"
import LoginPage from "./public/Auth/LoginPage"
import { AuthProvider, AuthRoute } from "./public/Auth/auth"
import PublicacionCreate from "./components/Publicaciones/PublicacionCreate"
import { DataProvider } from "./components/Publicaciones/PublicacionContext"
import Layout from "./components/Layout/Layout"




function App() {
 

  return (
    <>
      <HashRouter>
        <AuthProvider>
      

          <Routes>
              <Route path="/" element={ 
                      <Layout>
                        <HomePage/>
                      </Layout>} />

                <Route 
                  path="/Perfil" 
                  element={
                    <AuthRoute>
                      <Layout>
                        <Perfil/>
                      </Layout>
                    </AuthRoute>
                  } 
                />
             
                <Route 
                    path="/Publicaciones"   
                    element={
                      <AuthRoute>
                         <DataProvider> 
                            <Layout>
                                <PublicacionesPage/>
                            </Layout>
                        </DataProvider>
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
          
              <Route 
                path="/crearPublicacion" 
                element={
                  <AuthRoute>
                     <DataProvider>
                        <Layout>
                          <PublicacionCreate/>
                        </Layout>
                     </DataProvider>
                  </AuthRoute>
                } 
              />

              <Route path="/Proyectos"     element={<Proyectos/>} />

              <Route path="/login"     element={
                <Layout>
                  <LoginPage/>
                </Layout>
              }/>

              <Route 
                path="/logout"
                element={
                  <AuthRoute>
                    <Layout>
                      <LogoutPage/>
                    </Layout>
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
