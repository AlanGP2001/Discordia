  import React, { useEffect } from 'react'
  import { Link, useNavigate, useParams } from 'react-router-dom';

  import { useAuth } from '../../public/Auth/auth';
  import { useData } from './PublicacionContext';
  import {Card, CardHeader, CardBody, CardFooter, Image} from "@nextui-org/react";
  import {Button} from "@nextui-org/react";

  export function PublicacionesPost() {
      /*Hooks*/
    

      const navigate = useNavigate();
      const { id } = useParams();
      const   auth   = useAuth(); 
      const { posts, deletePost } = useData();
      
      let post =  posts.find(post => post.id === id)

      if (!post) {
        post ={
          author: "Publicacion no encontrada",
          titulo: "Publicacion no encontrada",
          content: "Publicacion no encontrada",
          id: false,
        }
      }

      useEffect(() => {
          if (post.id === false) {
            navigate('/Publicaciones');
          }
      }
      ,[post])
      
      
      const canDelete = auth.user?.isAdmin || auth.user?.uid === post.author;

      // const backPublicaciones = () => {
      //     navigate('/Publicaciones');
      // }

      const deletePostHandler = (id) => {
        deletePost(id, navigate);
      };
    

    return (
      <>
    
      <br></br>
      <br></br>
    
      <Card isFooterBlurred className="w-full h-[400px] col-span-12 sm:col-span-7">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">@{post.tipo}</p>
          <h4 className="text-white/90 font-medium text-xl">{post.titulo}</h4>
          <br></br>
          <p className="text-tiny text-white/60 uppercase font-bold">{post.contenido}</p>
        
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src="https://kudos.tv/cdn/shop/files/One_Piece_300x.gif?v=1679069497"
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <Image
              alt="Breathing app icon"
              className="rounded-full w-10 h-11 bg-black"
              src="../../../src/assets/3053381.jpg"
            />
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">Publicación REF: #{post.id}</p>
              <p className="text-tiny text-white/60">{post.autor}</p>
            </div>
          </div>
        
          
          {canDelete ? (
            <Button onClick={() => deletePostHandler(post.id)} color="danger" variant="bordered">
              Eliminar post
            </Button>
          ) : (
            <Button color="danger" variant="bordered">
              Like
            </Button>
          )}


        </CardFooter>
      </Card>
    
      
      </>
    )
  }
  {/* <Button color="danger" variant="bordered" startContent={<UserIcon/>}>
  Delete user
  </Button>
  <button >Eliminar</button> */}
