import React from 'react'
import { useAuth} from '../../public/Auth/auth'

export function Perfil() {
  const auth = useAuth()
  return (
     <>
        <h1>Hola: {auth.user?.username}</h1>
     </>
  )
}
