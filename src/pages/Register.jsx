import { useState } from 'react'
import { Link } from "react-router-dom"
import axiosClient from '../config/axios';
import Alert from '../components/Alert'

const Register = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cPassword, setCPassword] = useState('')

  const [alert, setAlert] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    
    if ([name, email, password, cPassword].includes('')) {
      setAlert({ message: 'Hay campos vacios', error: true })
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return
    }

    if ( password !== cPassword ) {
      setAlert({ message: 'Las contraseñas no coinciden', error: true })
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return
    }
    
    if ( password.length < 6 ) {
      setAlert({ message: 'La contraseña debe tener al menos 6 caracteres', error: true })
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return
    }

    setAlert({})

    try {
      await axiosClient.post('/veterinarios', { name, email, password })
      
      setAlert({ 
        message: 'Usuario creado correctamente. Revisa tu email',
        error: false
      })
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      setAlert({
        message: error.response.data.message,
        error: true
      })
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

  }

  const { message } = alert

  return (
    <>

      <div>
        <h1 className='text-indigo-600 font-black text-5xl'>
          Crea tu cuenta y Administra tus {""}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        
        { message &&
          <Alert 
            alert={ alert }
          />        
        }

        <form onSubmit={ handleSubmit }>

          <div className="my-5">
            <label className='uppercase text-gray-600 font-bold block text-xl'>Nombre:</label>
            <input 
              type='text'
              placeholder="Tu Nombre:" 
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' 
              value={name}
              onChange={ e => setName(e.target.value )}
            />
          </div>

          <div className="my-5">
            <label className='uppercase text-gray-600 font-bold block text-xl'>Email:</label>
            <input
              type='email'
              placeholder="Email:"
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label className='uppercase text-gray-600 font-bold block text-xl'>Contraseña:</label>
            <input
              type='password'
              placeholder="Contraseña:"
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={password}
              onChange={e => setPassword(e.target.value)}  
            />
          </div>

          <div className="my-5">
            <label className='uppercase text-gray-600 font-bold block text-xl'>Repite tu Contraseña:</label>
            <input
              type='password'
              placeholder="Repite tu Contraseña:"
              className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
              value={cPassword}
              onChange={e => setCPassword(e.target.value)}  
            />
          </div>

          <input type="submit" value="Iniciar Sesión" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 lg:w-auto" />

        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">Ya tienes una cuenta? Inicia Sesión</Link>
          <Link className="block text-center my-5 text-gray-500" to="/recuperar-contrasena">Olvidé mi contraseña</Link>
        </nav>

      </div>

    </>
  )
}

export default Register