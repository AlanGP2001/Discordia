  import React, { useEffect } from 'react'
  import { Link, useNavigate, useParams } from 'react-router-dom';

  import { useAuth } from '../../public/Auth/auth';
  import { useData } from './PublicacionContext';
  import {Card, CardHeader, CardBody, CardFooter, Image} from "@nextui-org/react";
  import {Button} from "@nextui-org/react";

  export function PublicacionesPost() {
      /*Hooks*/
    

      const navigate = useNavigate();
      const { slug } = useParams();
      const   auth   = useAuth(); 
      const { posts, deletePost } = useData();
      
      let post =  posts.find(post => post.slug === slug)

      if (!post) {
        post ={
          author: "Publicacion no encontrada",
          titulo: "Publicacion no encontrada",
          content: "Publicacion no encontrada",
          slug: false,
        }
      }

      useEffect(() => {
          if (post.slug === false) {
            navigate('/Publicaciones');
          }
      }
      ,[post])
      
      
      const canDelete = auth.user?.isAdmin || auth.user?.username === post.author;

      // const backPublicaciones = () => {
      //     navigate('/Publicaciones');
      // }

      const deletePostHandler = (slug) => {
        deletePost(slug, navigate);
      };
    

    return (
      <>
    
      <br></br>
      <br></br>
    
      <Card isFooterBlurred className="w-full h-[400px] col-span-12 sm:col-span-7">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">@Evento</p>
          <h4 className="text-white/90 font-medium text-xl">{post.titulo}</h4>
          <br></br>
          <p className="text-tiny text-white/60 uppercase font-bold">{post.content}</p>
        
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src="../../../src/assets/3053381.jpg"
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <Image
              alt="Breathing app icon"
              className="rounded-full w-10 h-11 bg-black"
              src="../../../src/assets/3053381.jpg"
            />
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">Publicado: #####</p>
              <p className="text-tiny text-white/60">{post.author}</p>
            </div>
          </div>
        
          
          {canDelete ? (
            <Button onClick={() => deletePostHandler(post.slug)} color="danger" variant="bordered">
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
