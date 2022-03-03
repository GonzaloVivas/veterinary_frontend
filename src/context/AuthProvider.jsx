import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axios'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(true)
  const [auth, setAuth] = useState({})

  useEffect(() => {
    const userAuthenticate = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      try {
        
        const { data } = await axiosClient.get('/veterinarios/perfil', config)

        setAuth(data)

      } catch (error) {
        console.log(error.responde.data.message)
        setAuth({})
      }

      setLoading(false)

    }
    userAuthenticate()
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setAuth({})
    window.reload()
  }

  const updateProfile = async profileData => {

    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    try {
      
      const url = `/veterinarios/perfil/${profileData._id}`
      const { data } = await axiosClient.put(url, profileData, config)

      return {
        message: 'Perfil actualizado correctamente'
      }

    } catch (error) {
      return {
        message: error.response.data.message,
        error: true
      }
    }

  }

  const updatePassword = async (passwordData) => {

    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    try {
      
      const url = '/veterinarios/actualizar-password'
      const { data } = await axiosClient.put(url, passwordData, config)

      return {
        message: data.message,
      }
    } catch (error) {
      return {
        message: error.response.data.message,
        error: true
      }
    }

  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        logout,
        updateProfile,
        updatePassword
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}

export {
  AuthProvider,
}

export default AuthContext