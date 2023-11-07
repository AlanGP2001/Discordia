import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { dataPublicaciones } from '../../API/publicaciones/apiPublicaciones';

export default function Publicaciones() {


  return (
    <>
      <h1>Publicaciones</h1>
      
      <Outlet/>

      <ul>
        {dataPublicaciones.map(post => (
          <PublicacionLink key={post.slug} post={post}/>
         ))}
      </ul>

    </>
  )
}

function PublicacionLink( {post}){
  return(
    <li>
      <Link to={`/Publicaciones/${post.slug}`}>{post.titulo}</Link>
    </li>
  )
}
