import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export function Menu() {
  return (
    <nav>
        <ul>

             {routes.map((route, index) => (
                <li key={index}>
                    <NavLink to={route.to} 
                     style={({isActive})=> isActive ? {color:'blue'} : {color : 'white'}}
                    >{route.text}</NavLink>
                </li>
            ))}

            
            {/* <li>
                <Link to="/">Inicio</Link>
            </li>
            <li>
                <Link to="/Actividades">Proyectos</Link>
            </li>
            <li>
                <Link to="/Colaboradores">Colaboradores</Link>
            </li> */}
            {/* <li>
                <NavLink to="/" 
                 style={({isActive})=> isActive ? {color:'blue'} : {color : 'white'}}
                >Inicio</NavLink>
                <NavLink to="/Proyectos" 
                 style={({isActive})=> isActive ? {color:'blue'} : {color : 'white'}}
                >Proyectos</NavLink>
                <NavLink to="/Colaboradores" 
                 style={({isActive})=> isActive ? {color:'blue'} : {color : 'white'}}
                >Colaboradores</NavLink>
            </li> */}
        </ul>
    </nav>
  )
}

const routes = [];
routes.push({
    to: '/',
    text: 'Inicio'
})
routes.push({
    to: "/Proyectos" ,
    text: 'Proyectos'
})
routes.push({
    to: "/Colaboradores", 
    text: 'Colaboradores'
})
