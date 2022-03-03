import { useState } from 'react'
import Form from '../components/Form'
import PatientList from '../components/PatientList'

const Patients = () => {

  const [showForm, setShowForm] = useState(false)

  return (
    
    <div className="flex flex-col md:flex-row">

      <button
        onClick={() => setShowForm(!showForm)}
        type="button"
        className="bg-indigo-600 text-white font-bold uppercase p-3 mx-10 rounded-md hover:cursor-pointer mb-5 md:hidden"
      >
        { !showForm ? 'Agregar Paciente' : 'Cancelar' }
      </button>

      <div className={`${showForm ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
        <Form />
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <PatientList />
      </div>
    </div>

  )
}

export default Patients