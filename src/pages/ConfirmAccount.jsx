import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axiosClient from '../config/axios';
import Alert from '../components/Alert'

const ConfirmAccount = () => {

  const params = useParams()
  const { token } = params

  const [confirmedAccount, setConfirmedAccount] = useState(false)
  const [loading, setLoading] = useState(true)
  const [alert, setAlert] = useState({})

  useEffect( () => {
    const confirmAccount = async () => {
      try {
        
        const { data } = await axiosClient.get(`/veterinarios/confirmar/${token}`)

        setConfirmedAccount(true)
        setAlert({
          message: data.message,
          error: false
        })

      } catch (error) {
        setAlert({ message: error.response.data.message, error: true })
      }

      setLoading(false)
    }
    confirmAccount()
  }, [])
  

  return (
    <>

      <div>
        <h1 className='text-indigo-600 font-black text-5xl'>
          Confirma tu cuenta y Comienza a Administrar tus {""}
          <span className="text-black">Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!loading &&
          <Alert
            alert={alert}
          />
        }

        {confirmedAccount && (
          <Link className="block text-center my-5 text-gray-500" to="/">
            Iniciar Sesión
          </Link>
        )}
      </div>

    </>
  )
}

export default ConfirmAccount