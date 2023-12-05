import React, { useEffect, useState } from 'react';
import { useAuth } from '../../public/Auth/auth';
import { useData } from '../Publicaciones/PublicacionContext';
import {Textarea, Button} from "@nextui-org/react";

export function Perfil() {
  const auth = useAuth();
  const { getPost } = useData();
  const [imagenAleatoria, setImagenAleatoria] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
   const fetchData = async () => {
     try {
       const publicaciones = await getPost();
       setPosts(publicaciones.count);
       
     } catch (error) {
       console.error("Error al obtener publicaciones:", error);
     }
   };

   fetchData();
 }, []); // El array vacío significa que este efecto solo se ejecutará una vez después de que el componente se monte.


 const imagenes = [
   'https://wallpapercave.com/wp/wp8608440.jpg',
   'https://www.seekpng.com/png/full/10-103647_minecraft-creeper-face-icons-png-minecraft-creeper-head.png',
   'https://www.fractalcamo.com/uploads/5/9/0/2/5902948/s189772745713394276_p7007_i154_w1500.jpeg',
   'https://i.pinimg.com/originals/d0/57/f6/d057f68ea8045b4cfe004ad4b79cc8a2.png',
   'https://mystickermania.com/cdn/stickers/anime/demon-slayer-nezuko-kamado-512x512.png'
 ];

 useEffect(() => {
   // Función para seleccionar una imagen aleatoria del arreglo
   const seleccionarImagenAleatoria = () => {
     const indiceAleatorio = Math.floor(Math.random() * imagenes.length);
     const nuevaImagen = imagenes[indiceAleatorio];
     setImagenAleatoria(nuevaImagen);
   };

   // Llamar a la función al montar el componente
   seleccionarImagenAleatoria();
 }, []);
 
 const [informacion, setInformacion] = useState();

 const actualizarPerfil = async() =>{
  if(!informacion){
    console.log("No hay informacion");
    alert("No hay informacion");
  }else{
    
  }

 }





  return (
    <>
     
          <div className="flex flex-col justify-center items-center h-[100vh]">
            <div className="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
              <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
                <img
                  src='https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png'
                  className="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
                  alt=""
                />
                <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                  <img
                    className="h-full w-full rounded-full"
                    src={imagenAleatoria}
                    //src='https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar11.1060b63041fdffa5f8ef.png'
                    alt=""
                  />
                </div>
              </div>
              <div className="mt-16 flex flex-col justify-center items-center text-center">
                  <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                      ¡Bienvenido!
                  </h4>
                  <p className="text-base font-normal text-gray-600"> @{auth.user?.nombre}</p>
                  <Textarea
                      label="🚀Comparte tus ideas y explora nuestra comunidad❤️"
                      labelPlacement="outside"
                      placeholder="Comparte aqui tus ideas"
                      className="max-w-xs"
                      value={informacion}
                      onChange={(e) => setInformacion(e.target.value)}
                  />
                  <Button  onClick={actualizarPerfil} color="danger">
                    Actualizar información
                  </Button> 
              </div>


              <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
                <div className="flex flex-col items-center justify-center">
                  
                  <p className="text-2xl font-bold text-navy-700 dark:text-white">{posts}</p>
                  <p className="text-sm font-normal text-gray-600">Posts</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-navy-700 dark:text-white">
                    9.7K
                  </p>
                  <p className="text-sm font-normal text-gray-600">Followers</p>
                </div>
               
              </div>
            </div>
            
          </div>
     
    </>
  );
}
