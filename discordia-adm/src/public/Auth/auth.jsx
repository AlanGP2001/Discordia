import React, { useContext, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth as authFirebase } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext()
const adminList = ['Aldair','elDani','Admin'];


function AuthProvider({ children }) {
    
    useEffect(() => {
       console.log("Se monto el componente AuthProvider")
       console.log("contador", 1)
       restoreSession()

    }, [])
    
    const navigate = useNavigate() /* Hook de navegacion */

    /* Creamos  nuevos estados */
    const [user, setUser] = React.useState({
        uid: null,
        jwt: null,
    })

    const restoreSession = async () => {
        try {
            const getDatos = await AsyncStorage.getItem("dataSession");
            if(getDatos != null){
                const datos = JSON.parse(getDatos)
                setUser({
                    uid: datos.uid,
                    jwt: datos.jwt,
                })
            }
            console.log("datos session", getDatos)
        } catch (e) {
            console.log("Error al obtener los datos de la sesion", e)
        }
    }
    
    const startSession = async (uid, jwt) => {
        try {
            await AsyncStorage.setItem("dataSession",JSON.stringify({
                uid: uid,
                jwt: jwt,
               
            }));
        } catch (e) {
            // saving error
        }
    }

    const singIn = async (email, password) => {
        await signInWithEmailAndPassword(authFirebase, email, password)
        .then((userCredential) => { 
            setUser({
                uid: userCredential.user.uid,
                jwt: userCredential.user.accessToken,
            })
            startSession(userCredential.user.uid, userCredential.user.accessToken)
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

    const signUp = async (email, password) => {
        await createUserWithEmailAndPassword(authFirebase, email, password)
        .then((userCredential) => { 
            // console.log("userCredential", userCredential)
            // console.log("userCredential.user", userCredential.user)
            //console.log("userCredential.user.uid", userCredential.user.uid)
            //console.log("userCredential.user.accessToken", userCredential.user.accessToken)
            setUser({
                uid: userCredential.user.uid,
                jwt: userCredential.user.accessToken,
            })
            startSession(userCredential.user.uid, userCredential.user.accessToken)
            toast("Usuario registrado correctamente");
          })
          .catch((error) => {
            toast(error.message + " " + error.code);
          });
    }

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
