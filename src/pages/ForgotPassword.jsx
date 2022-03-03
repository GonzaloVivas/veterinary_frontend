import { useState } from 'react'
import { Link } from "react-router-dom"
import Alert from '../components/Alert'
import axiosClient from '../config/axios'

const ForgotPassword = () => {

  const [email, setEmail] = useState('')
  const [alert, setAlert] = useState({})

  const handleSubmit = async e => {

    e.preventDefault()

    if (email === '' || email.length < 6) {
      setAlert({ message: 'Ingrese un email válido', error: true })
      return
    }

    try {
      
      const { data } = await axiosClient.post('/veterinarios/recuperar-password', { email })
      
      setAlert({ message: data.message, error: false })

    } catch (error) {
      setAlert({ message: error.response.data.message, error: true})
    }



  }

  const { message } = alert

  return (

    <>
      <div>
        <h1 className='text-indigo-600 font-black text-5xl'>
          Recupera tu acceso y no pierdas tus {""}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        
        {message &&
          <Alert
            alert={alert}
          />
        }

        <form
          onSubmit={handleSubmit}
        >

          <div className="my-5">
            <label className='uppercase text-gray-600 font-bold block text-xl'>Email:</label>
            <input
              type='email'
              placeholder="Email:"
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={ email }  
              onChange={ e => setEmail(e.target.value) }
            />
          </div>

          <input type="submit" value="Recuperar Contraseña" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 lg:w-auto" />

        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">Ya tienes una cuenta? Inicia Sesión</Link>
          <Link className="block text-center my-5 text-gray-500" to="/registro">¿No tienes una cuenta? Regístrate</Link>
        </nav>
        
      </div>
    
    </>

  )
}

export default ForgotPassword