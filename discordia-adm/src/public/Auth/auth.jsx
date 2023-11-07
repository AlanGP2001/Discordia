import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const AuthContext = React.createContext()
const adminList = ['Aldair','elDani','Admin'];


function AuthProvider({ children }) {
    
    const navigate = useNavigate() /* Hook de navegacion */

    /* Creamos  nuevos estados */
    const [user, setUser] = React.useState(null)

    const login = ({ username }) => { /* Metodo login */
        const isAdmin = adminList.find( admin => admin === username); /* Buscamos si el usuario es admin */
        setUser({username, isAdmin})
        navigate('/Perfil')
    }

    const logout = () => { /* Metodo logout */
        setUser(null)
        navigate('/')
    }
   

    const auth ={ /* Metodos y propiedades para auth */
       user, /* Propiedad user */
       login, /* Metodo login */
       logout, /* Metodo logout */

    }

    return (
            <AuthContext.Provider value={auth}>
            {children}
            </AuthContext.Provider>
    );
}

function useAuth (){
    const auth = React.useContext(AuthContext)
    return auth;
}
function AuthRoute(props){ /* Metodo AuthRoute */
    const auth = useAuth();
    if(!auth.user){
        return <Navigate to="/login"/>
    }
    return props.children; /* Si esta logueado retorna los hijos */
}

export  {
    AuthProvider,
    useAuth,
    AuthRoute
};
