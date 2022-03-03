import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alert from '../components/Alert'
import axiosClient from '../config/axios'

const updatePassword = () => {

  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({})
  const [validToken, setValidToken] = useState(false)
  const [passwordUpdated, setPasswordUpdated] = useState(false)

  const params = useParams()
  const { token } = params

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axiosClient(`veterinarios/recuperar-password/${token}`)
        setAlert({ message: 'Coloca tu nuevo password' })
        setValidToken(true)
      } catch (error) {
        setAlert({ message: 'Hubo un error con el enlace', error: true })
      }
    }
    checkToken()
  }, [])

  const handleSubmit = async e => {

    e.preventDefault()

    if (password.length < 6) {
      setAlert({
        message: 'El password debe tener al menos 6 caracteres',
        error: true
      })      
      return
    }

    const url = `/veterinarios/recuperar-password/${token}`
    const { data } = await axiosClient.post(url, { password })
    setAlert({ message: data.message })
    setPasswordUpdated(true)
    try {
      
    } catch (error) {
      setAlert({ message: error.response.data.message, error: true })
    }

  }

  const { message } = alert

  return (
    <>

      <div>
        <h1 className='text-indigo-600 font-black text-5xl'>
          Restablece tu contraseña y no pierdas a acceso a tus{""}
          <span className="text-black"> Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        { message &&
          <Alert
            alert={alert}
          />
        }
        
        { validToken && (
          <>
            <form onSubmit={handleSubmit}>

              <div className="my-5">
                <label className='uppercase text-gray-600 font-bold block text-xl'>Nueva Contraseña:</label>
                <input
                  type='password'
                  placeholder="Nueva Contraseña:"
                  className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <input type="submit" value="Cambiar Contraseña" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 lg:w-auto" />

            </form>
          
          </>
        )}

        { passwordUpdated &&
          <Link className="block text-center my-5 text-gray-500" to="/">Inicia Sesión</Link>
        }
        

      </div>
    
    </>
  )

}

export default updatePassword