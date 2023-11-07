import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { dataPublicaciones } from '../../API/publicaciones/apiPublicaciones';

export function PublicacionesPost() {

    const { slug } = useParams();

    const post = dataPublicaciones.find(post => post.slug === slug);

  return (
    <>
      <h2>{post.titulo}</h2>
      <p>{post.content}</p>
      <p>{post.author}</p>

    </>
  )
}
