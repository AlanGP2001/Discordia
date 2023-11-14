import React, { createContext, useContext, useState } from 'react';
import { dataPublicaciones } from '../../API/publicaciones/apiPublicaciones';
import { useNavigate } from 'react-router-dom';


const PostContext = createContext();

const DataProvider = ({ children }) => {
    const navigate = useNavigate() 
    const [posts, setPosts] = useState(dataPublicaciones);

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

    const createPost = (data) => {
        const temp = [...posts];
    
        temp.push(data);
        setPosts(temp);
        console.log("Se creo el post", temp)
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
