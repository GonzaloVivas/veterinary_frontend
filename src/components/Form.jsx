import { useState, useEffect } from 'react'
import Alert from './Alert'
import usePatients from '../hooks/usePatients'

const Form = () => {

  const [name, setName] = useState('')
  const [owner, setOwner] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [symptoms, setSymptoms] = useState('')
  const [id, setId] = useState(null)

  const [alert, setAlert] = useState({})

  const { savePatient, patient } = usePatients()

  useEffect(() => {
    if (patient?.name) {
      setName(patient.name)
      setOwner(patient.owner)
      setEmail(patient.email)
      setDate(patient.date)
      setSymptoms(patient.symptoms)
      setId(patient._id)
    }
  }, [patient])

  const handleSubmit = e => {
    
    e.preventDefault()

    if ([name, owner, email, date, symptoms].includes('')) {
      setAlert({
        message: 'Todos los campos son obligatorios',
        error: true
      })
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return
    }

    savePatient({ name, owner, email, date, symptoms, id })

    setName('')
    setOwner('')
    setEmail('')
    setDate(new Date().toISOString().split('T')[0])
    setSymptoms('')
    setId('')

    setAlert({ message: 'Paciente guardado correctamente'})
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }

  const { message } = alert

  return (
    
    <>

      <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>

      <p className="text-xl text-center mb-10">
        Añade tus pacientes y <span className="text-indigo-600 font-bold">adminístralos</span>
      </p>

      { message && <Alert alert={alert} /> }

      <form onSubmit={ handleSubmit } className="bg-white py-10 px-5 nb-10 lg:mb-0 shadow-md rounded-md">

        <div className="mb-5">
          <label className="text-gray-700 uppercase font-bold" htmlFor="name">Nombre de la Mascota:</label>
          <input
            type="text"
            id="name"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={name}
            onChange={ e => setName(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label className="text-gray-700 uppercase font-bold" htmlFor="owner">Nombre del Propietario:</label>
          <input 
            type="text"
            id="owner" 
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={owner}
            onChange={e => setOwner(e.target.value)}
          />
        </div>   

        <div className="mb-5">
          <label className="text-gray-700 uppercase font-bold" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="text-gray-700 uppercase font-bold" htmlFor="date">Fecha de Alta:</label>
          <input
            type="date"
            id="email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="text-gray-700 uppercase font-bold" htmlFor="symptoms">Síntomas:</label>
          <textarea
            id="symptoms"
            placeholder="Describe los síntomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={symptoms}
            onChange={e => setSymptoms(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 text-white w-full p-3 uppercase font-bold rounded-lg hover:bg-indigo-800 cursor-pointer transition-colors"
          value={ id ? 'Guardar Cambios' : 'Agregar Paciente'}
        />

      </form>

    </>    

  )
}

export default Form