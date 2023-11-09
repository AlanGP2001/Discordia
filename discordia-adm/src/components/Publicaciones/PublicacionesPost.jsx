import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../../public/Auth/auth';
import { useData } from './PublicacionContext';


export function PublicacionesPost() {
    /*Hooks*/


    const navigate = useNavigate();
    const { slug } = useParams();
    const auth = useAuth();
    const { posts, deletePost } = useData();

    const post = posts.find(post => post.slug === slug); 
  

    const canDelete = auth.user?.isAdmin || auth.user?.username === post.author;

    const backPublicaciones = () => {
        navigate('/Publicaciones');
    }

    const deletepost = (slug) => {
        deletePost(slug);
    }

  return (
    <>
    
      <button onClick={backPublicaciones}>Volver</button>
      <h2>Titulo:{post.titulo}</h2>
      <p>{post.content}</p>
      <p>Author: {post.author}</p>

      {canDelete && ( 
        
        <button onClick={() => deletepost(post.slug)}>Eliminar</button>
      
      )}

    </>
  )
}
