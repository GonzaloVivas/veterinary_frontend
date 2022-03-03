import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import AdminLayout from './layout/AdminLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ConfirmAccount from './pages/ConfirmAccount'
import UpdatePassword from './pages/UpdatePassword'
import Patients from './pages/Patients'
import EditProfile from './pages/EditProfile'
import ChangePassword from './pages/ChangePassword'

import { AuthProvider } from './context/AuthProvider'
import { PatientsProvider } from './context/PatientsProvider'

function App() {

  return (

    <BrowserRouter>
    
      <AuthProvider>
        
        <PatientsProvider>
          
          <Routes>
            
            <Route path='/' element={ <AuthLayout /> }>
              <Route index element={ <Login /> } /> // antes exact
              <Route path='/registro' element={ <Register /> } />
              <Route path='/recuperar-contrasena' element={ <ForgotPassword /> } />
              <Route path='/recuperar-contrasena/:token' element={ <UpdatePassword /> } />
              <Route path='/confirmar/:token' element={ <ConfirmAccount /> } />
            </Route>
            
            <Route path='/admin' element={ <AdminLayout /> }>
              <Route index element={ <Patients /> } />
              <Route path='perfil' element={ <EditProfile /> } />
              <Route path='cambiar-contrasena' element={ <ChangePassword /> } />
            </Route>

          </Routes>

        </PatientsProvider>

      </AuthProvider>

    </BrowserRouter>

  )
}

export default App
