import React from 'react'
import { useAuth } from './auth'
import { Navigate } from 'react-router-dom'


export default function LoginPage() {
    
    const [username, setUsername] = React.useState('')
    
    const auth = useAuth()

    const login = (e) => {
        e.preventDefault()
        auth.login({username})
    }

    if(auth.user){
        return <Navigate to="/Perfil"/>
    }

  return (
     <>
        <h1>Login</h1>
        <form onSubmit={login}> 
            <label>Ingresa tu nombre usuario</label>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit">Ingresar</button>
        </form>
     </>
  )
}
