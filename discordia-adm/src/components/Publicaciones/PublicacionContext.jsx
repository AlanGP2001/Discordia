import React, { createContext, useContext, useState } from 'react';
import { dataPublicaciones } from '../../API/publicaciones/apiPublicaciones';


const PostContext = createContext();

const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState(dataPublicaciones);

    const deletePost = (slug) => {
        setPosts(posts.filter((item) => item.slug !== slug));
    };

    const data ={
        posts,
        deletePost,
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
