import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Header = () => {

  const { logout } = useAuth()

  return (
    <header className="py-10 bg-indigo-600">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        
        <h1 className="font-black text-2xl text-indigo-200 text-center">Administrador de Pacientes de <span className="text-white">Veterinaria</span></h1>

        <nav className="flex flex-col md:flex-row gap-6 uppercase font-bold mt-5 lg:mt-0 items-center">
        
          <Link to="/admin" className="text-white text-sm">Pacientes</Link>  
          <Link to="/admin/perfil" className="text-white text-sm">Perfil</Link>  

          <button onClick={ logout } type="button" className="text-white text-sm uppercase font-bold">Cerrar Sesión</button>

        </nav>

      </div>
    </header>
  )
}

export default Header