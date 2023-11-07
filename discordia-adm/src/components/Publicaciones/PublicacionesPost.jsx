import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { dataPublicaciones } from '../../API/publicaciones/apiPublicaciones';
import { useAuth } from '../../public/Auth/auth';

export function PublicacionesPost() {
    /*Hooks*/
    const navigate = useNavigate();
    const { slug } = useParams();
    const auth = useAuth();

    const post = dataPublicaciones.find(post => post.slug === slug);

    const canDelete = auth.user?.isAdmin || auth.user?.username === post.author;

    const backPublicaciones = () => {
        navigate('/Publicaciones');
    }

  return (
    <>
    
      <button onClick={backPublicaciones}>Volver</button>
      <h2>Titulo:{post.titulo}</h2>
      <p>{post.content}</p>
      <p>Author: {post.author}</p>

      {canDelete && ( 
        
        <button>Eliminar</button>
      
      )}

    </>
  )
}
