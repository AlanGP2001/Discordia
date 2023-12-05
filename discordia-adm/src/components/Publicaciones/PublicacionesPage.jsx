import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useData } from './PublicacionContext';
import {Card, CardHeader, CardBody, CardFooter, Image} from "@nextui-org/react";
import {Button,Divider} from "@nextui-org/react";

export default function Publicaciones() {
 
  const { posts } = useData();
  console.log("SOY POSTOTOSOTSSTST",posts)
  const navigate = useNavigate();

  return (
    <>
     <div className="overflow-y-auto flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    
        <div className='grid justify-items-center flex-col'>
          <div className="max-w-md">
            <div className="space-y-1 flex items-center justify-center">
              <h4 className="text-black/90 font-medium text-xl">¡Comparte con la comunidad ❤️!</h4>
              <p className="text-small text-default-400">Publica eventos, videojuegos, actualizaciones y más.</p>
            </div>

            <Divider className="my-4" />
            <div className="flex h-5 items-center justify-center space-x-4 text-small">
              <div> 📅 Eventos </div>
              <Divider orientation="vertical" />
              <div> 🎮 Videojuegos </div>
              <Divider orientation="vertical" />
              <div> 🚀 Actualizaciones </div>
            </div>
          </div>


         <br></br>
          <Button 
            onClick={() => navigate('/crearPublicacion/')}
            color="success" className="w-[200px]">
                <p className="text-tiny text-white/100 uppercase font-bold">Crear post</p>
          </Button>
        </div>
       
      
        
        <Outlet/>


        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3  justify-items-center '>
          {posts.map(post => 
          (
            <PublicacionLink key={post.id} post={post}/>
          ))}
        </div>

   
     </div>
     
    </>
  )
}

const  PublicacionLink = ( {post} ) =>{
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Manejar el desplazamiento y mostrar/ocultar el botón según sea necesario
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const showButtonThreshold = 200; // Cambia esto según tu preferencia

    setShowScrollButton(scrollY > showButtonThreshold);
  };

  // Agregar un event listener al montar el componente
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Limpiar el event listener al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Función para desplazar la pantalla hacia arriba
  const scrollToTop = () => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  return(
    
  <Card className="w-[300px] mt-10">
    <CardHeader className="flex gap-3">
      <Image
        alt="nextui logo"
        height={40}
        radius="sm"
        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
        width={40}
      />
      <div className="flex flex-col">
        <p className="text-md">{post.titulo}</p>
        <p className="text-small text-default-500">Author: {post.autor}</p>
        <p className="text-small text-default-500">@{post.tipo}</p>
      </div>
    </CardHeader>
    <Divider />
    <Divider />
      <CardFooter>
      
      <Link onClick={scrollToTop} to={`/Publicaciones/${post.id}`}>
            Ver publicación
      </Link>
      </CardFooter>
  </Card>
  
  )
}

