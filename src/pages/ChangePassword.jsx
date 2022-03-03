import { useState } from 'react'
import AdminNav from '../components/AdminNav'
import Alert from '../components/Alert'
import useAuth from '../hooks/useAuth'

const ChangePassword = () => {

  const { updatePassword } = useAuth()

  const [alert, setAlert] = useState({})
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: ''
  })

  const handleSubmit = async e => {

    e.preventDefault()

    if (Object.values(password).some( value => value === '')) {
      setAlert({ message: 'Todos los campos son obligatorios', error: true })
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return
    }

    if (password.newPassword.length < 6) {
      setAlert({
        message: 'El password debe tener al menos de 6 caracteres',
        error: true
      })
      return
    }

    const res = await updatePassword(password)
    setAlert(res)
    setPassword({
      currentPassword: '',
      newPassword: ''
    })

  }

  const { message } = alert
  return (
    <>
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Cambiar Contraseña</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tu <span className="text-indigo-600 font-bold">Contraseña</span></p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 shadow-lg rounded p-5">

          {message && <Alert alert={alert} />}

          <form onSubmit={handleSubmit}>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Contraseña Actual:
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Contraseña Actual"
                name="currentPassword"
                value={password.currentPassword}
                onChange={ e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Nueva Contraseña:
              </label>
              <input
                type="password"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                placeholder="Nueva Contraseña"
                name="newPassword"
                value={password.newPassword}
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <input
              type="submit"
              value="Guardar Cambios"
              className="bg-indigo-600 hover:bg-indigo-800 px-10 py-3 font-bold rounded-lg uppercase w-full mt-5 text-white cursor-pointer"
            />

          </form>
        </div>
      </div>
      
    </>
  )
}

export default ChangePassword