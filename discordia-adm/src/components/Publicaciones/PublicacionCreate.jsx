import React, { useState } from 'react'
import { useData } from './PublicacionContext'
import { useAuth } from '../../public/Auth/auth';

export default function PublicacionCreate() {
  const { createPost } = useData();
  const { user  } = useAuth();

  const [post, setPost] = useState({
    titulo: "",
    slug: "",
    content: "",
    author: user?.username,
  });

  const handleForm = (e) => {
    e.preventDefault();
    createPost(post);
  };

  return (
    <>
      <h3>Crear post</h3>
      <form onSubmit={handleForm}>
      <input
          value={post.titulo}
          type="text"
          placeholder="Titulo del post" 
          onChange={(e) => {
            setPost({
              ...post,
              titulo: e.target.value,
              slug: e.target.value.toLowerCase().split(" ").join("-"),
            });
          }}
        />
        <input
          value={post.content}
          type="text"
          placeholder="Contenido del post" 
          onChange={(e) => {
            setPost({
              ...post,
              content: e.target.value,
             
            });
          }}
        />
         <button type="submit">Publicar</button>
      </form>
    
    </>
  )
}
