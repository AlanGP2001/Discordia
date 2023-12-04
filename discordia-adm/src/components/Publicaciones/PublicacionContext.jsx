import React, { createContext, useContext, useEffect, useState } from 'react';
import { crearPublicacion, obtenerPublicaciones } from '../../API/publicaciones/apiPublicaciones';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../public/Auth/auth';




const PostContext = createContext();


const DataProvider = ({ children }) => {
    const { user } =useAuth()
    const jwt = user.jwt
    const navigate = useNavigate() 
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
          try {
            const publicaciones = await obtenerPublicaciones(jwt);
            console.log("publicaciones", publicaciones)
            
            setPosts(publicaciones);
          } catch (error) {
            console.error('Error al obtener publicaciones:', error);
          }
        };
    
        obtenerDatos();
      }, [])

    const deletePost = (slug, navigate) => {
        const updatedPosts = posts.filter((item) => item.slug !== slug);
        setPosts(updatedPosts);
        navigate('/Publicaciones');
    };
    
    const existPost = (slug) => {
        
        const post = posts.find((item) => item.slug === slug);
        if(post == undefined){
            
            navigate('/Publicaciones');
        }

        
    };

    const createPost = async (data) => {
        await crearPublicacion(data)
        const newPublicaciones = await obtenerPublicaciones(data.jwt)
        setPosts(newPublicaciones);
        navigate('/Publicaciones');
    };

    const data ={
        posts,
        deletePost,
        createPost,
        existPost
    }

    return (
        <PostContext.Provider value={data}>
            {children}
        </PostContext.Provider>
    );
};

const useData = () => {
    const context = useContext(PostContext);
    return context;
};

export { DataProvider, useData };
