import React, { useContext, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth as authFirebase } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext()
const adminList = ['Aldair','elDani','Admin'];


function AuthProvider({ children }) {
    
    useEffect(() => {
       console.log("Se monto el componente AuthProvider")
       restoreSession()
      

    }, [])
    
    const navigate = useNavigate() /* Hook de navegacion */

    /* Creamos  nuevos estados */
    const [user, setUser] = React.useState({
        uid: null,
        jwt: null,
        nombre: null
    })

    const restoreSession = async () => {
        try {
            const getDatos = await AsyncStorage.getItem("dataSession");
            if(getDatos != null){
                const datos = JSON.parse(getDatos)
                setUser({
                    uid: datos.uid,
                    jwt: datos.jwt,
                    nombre: datos.nombre
                })

                console.log("jwt" , datos.jwt)
            }
            console.log("datos session", getDatos)
        } catch (e) {
            console.log("Error al obtener los datos de la sesion", e)
        }
    }
    
    const startSession = async (uid, jwt, nombre) => {
        try {
            await AsyncStorage.setItem("dataSession",JSON.stringify({
                uid: uid,
                jwt: jwt,
                nombre: nombre
            }));

          
        } catch (e) {
            // saving error
        }
    }

    const singIn = async (email, password) => {
        await signInWithEmailAndPassword(authFirebase, email, password)
        .then((userCredential) => { 

            const user = userCredential.user;
            const userName = user.displayName;
            setUser({
                uid: userCredential.user.uid,
                jwt: userCredential.user.accessToken,
                nombre: userName
            })
            startSession(userCredential.user.uid, userCredential.user.accessToken,userName)
             toast("Sesion iniciada correctamente")

          })
          .catch((error) => {
          
            toast(error.message + " " + error.code);
                
           
            
          });
    }


    // const login = ({ username }) => { /* Metodo login */
    //     //const isAdmin = adminList.find( admin => admin === username); /* Buscamos si el usuario es admin */
    //     setUser({username, isAdmin})

    //     SessionJWT(username, isAdmin)
    //     navigate('/Perfil')
    // }

    const signUp = async (email, password, gamerTag) => {
        await createUserWithEmailAndPassword(authFirebase, email, password)
            .then(async (userCredential) => { 
                const user = userCredential.user;
    
                // Agregar información adicional al usuario recién creado (por ejemplo, nombre)
                await updateProfile(user, {
                    displayName: gamerTag
                });
    
                // Obtener el nombre del usuario actualizado
                const userName = user.displayName;
                console.log("Nombre del usuario:", userName);
    
                setUser({
                    uid: user.uid,
                    jwt: user.accessToken,
                    nombre: userName
                });
    
                startSession(user.uid, user.accessToken, userName);
                toast("Usuario registrado correctamente");
            })
            .catch((error) => {
                console.log("error", error);
                toast(error.message + " " + error.code);
            });
    };
    

    const logout = () => { /* Metodo logout */
        setUser({uid: null, jwt: null})
        AsyncStorage.removeItem("dataSession")
        navigate('/')
    }
   

    const auth ={ /* Metodos y propiedades para auth */
       user, /* Propiedad user */
       /* login, Metodo login */
       logout, /* Metodo logout */
       signUp, /* Metodo singUp */
       singIn /* Metodo singIn */

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
    if(!auth.user.uid){
        return <Navigate to="/login"/>
    }
    return props.children; /* Si esta logueado retorna los hijos */
}

export  {
    AuthProvider,
    useAuth,
    AuthRoute
};
