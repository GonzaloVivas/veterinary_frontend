import { useEffect, useState } from 'react'
import AdminNav from '../components/AdminNav'
import Alert from '../components/Alert'
import useAuth from '../hooks/useAuth'

const EditProfile = () => {

  const { auth, updateProfile } = useAuth()
  const [profile, setProfile] = useState({})
  const [alert, setAlert] = useState({})

  useEffect(() => {
    setProfile(auth)
  }, [auth])

  const handleSubmit = async e => {

    e.preventDefault()

    const { name, email } = profile
    if ([name, email].includes('')) {
      setAlert({
        message: 'El nombre y el email son obligatorios',
        error: true
      })
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return
    }

    const res = await updateProfile(profile)
    setAlert(res)

  }

  const { message } = alert

  return (
    <>
      
      <AdminNav />

      <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">Modifica tu <span className="text-indigo-600 font-bold">Perfil</span></p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 shadow-lg rounded p-5">

          {message && <Alert alert={alert} />}

          <form onSubmit={handleSubmit}>
            
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Nombre:
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="name"
                value={profile.name || ''}
                onChange={ e => setProfile({
                  ...profile, [e.target.name]: e.target.value 
                }) }
              />
            </div>
            
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Web:
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="web"
                value={profile.web || ''}
                onChange={e => setProfile({
                  ...profile, [e.target.name]: e.target.value
                })}
              />
            </div>
            
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Teléfono:
              </label>
              <input
                type="text"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="telephone"
                value={profile.telephone || ''}
                onChange={e => setProfile({
                  ...profile, [e.target.name]: e.target.value
                })}
              />
            </div>
            
            <div className="my-3">
              <label className="uppercase font-bold text-gray-600">
                Email:
              </label>
              <input
                type="email"
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                name="email"
                value={profile.email || ''}
                onChange={e => setProfile({
                  ...profile, [e.target.name]: e.target.value
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

export default EditProfile