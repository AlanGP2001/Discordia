import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../public/Auth/auth';

export function Menu() {
    const auth = useAuth();
  return (
    <nav>
        <ul>
             {routes.map((route) => {

                        if(route.publicOnly && auth.user) return null; 
                        if(route.private && !auth.user) return null;
                    
                    return (
                            <li key={route.to}>
                                <NavLink to={route.to} 
                                style={({isActive})=> isActive ? {color:'blue'} : {color : 'white'}}
                                >{route.text}</NavLink>
                            </li>
                        )}
                )
             } 
        </ul>
    </nav>
  )
}

const routes = [];
routes.push({
    to: '/',
    text: 'Inicio',
    private: false,
    publicOnly: true
})
routes.push({
    to: "/Perfil" ,
    text: 'Perfil',
    private: true
})
routes.push({
    to: "/Colaboradores", 
    text: 'Colaboradores',
    private: true
})
routes.push({
    to: "/Publicaciones", 
    text: 'Publicaciones',
    private: true
})

routes.push({
    to: "/login", 
    text: 'login',
    private: false,
    publicOnly: true
})

routes.push({
    to: "/logout", 
    text: 'logout',
    private: true,
    publicOnly: false
})