import { Navigate, Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import useAuth from '../hooks/useAuth'

const AdminLayout = () => {

  const { auth, loading } = useAuth()

  if (loading) return 'Cargando..'

  return (
    <>
    
     <Header />

     { auth?._id ? (
       <main className="container mx-auto my-10">
        <Outlet />
       </main>
      ) : <Navigate to="/" />}
    
      <Footer />

    </>
  )
}

export default AdminLayout