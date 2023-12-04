import React from 'react'
import { useAuth } from './auth'
import { Navigate, useNavigate } from 'react-router-dom'
import logo from "../../assets/icons8-discord-200.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPage() {
    const navigate = useNavigate()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [gamerTag, setGamerTag] = React.useState('')
    const auth = useAuth()
    
    const registrar = async(e) => {
        e.preventDefault()
        try {
            response = await auth.signUp(email, password, gamerTag)
            console.log("response", response)
           // navigate('/Login')

        } catch (error) {
          
        }
    }

    if(auth.user.uid){
        return <Navigate to="/Perfil"/>
    }

  return (
     <>
     <ToastContainer />
       <div className="overflow-y-auto flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-60 w-auto "
            src={logo}
            alt="Your Company"
          />
          <h2 className="p-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Registro
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={registrar}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                GamerTag
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  value={gamerTag}
                  onChange={(e) => setGamerTag(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

        

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="text"
                  autoComplete="email"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar
              </button>
            </div>
          </form>

         
        </div>
      </div>
     </>
  )
}
