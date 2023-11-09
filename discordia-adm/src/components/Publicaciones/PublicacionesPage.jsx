import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import { useData } from './PublicacionContext';

export default function Publicaciones() {

  const {posts} = useData();
  
  return (
    <>
      <h1>Publicaciones</h1>
      
      <Outlet/>

      <ul>
        {posts.map(post => (
          <PublicacionLink key={post.slug} post={post}/>
         ))}
      </ul>

     <Link to={`/crearPublicacion/`}>Crear post</Link>

    </>
  )
}

function PublicacionLink( {post} ){
  return(
    <li>
      <Link to={`/Publicaciones/${post.slug}`}>{post.titulo}</Link>
    </li>
  )
}

