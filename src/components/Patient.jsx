import usePatients  from "../hooks/usePatients"

const Patient = ({ patient }) => {

  const { setPatientEdit, deletePatient } = usePatients()

  const { name, owner, email, date, symptoms, _id } = patient

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('es-AR', { dateStyle: 'long' }).format(new Date(date))
  }

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-md">

      <p className="font-bold uppercase text-indigo-700 my-2">Nombre: <span className="text-black font-normal normal-case">{name}</span></p>

      <p className="font-bold uppercase text-indigo-700 my-2">Propietario: <span className="text-black font-normal normal-case">{owner}</span></p>

      <p className="font-bold uppercase text-indigo-700 my-2">Email: <span className="text-black font-normal normal-case">{email}</span></p>

      <p className="font-bold uppercase text-indigo-700 my-2">Fecha de alta: <span 
        className="text-black font-normal normal-case">{formatDate(date)}</span></p>

      <p className="font-bold uppercase text-indigo-700 my-2">Síntomas: <span className="text-black font-normal normal-case">{symptoms}</span></p>

      <div className="flex justify-between lg:justify-start my-5">
        <button
          type="button"
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-800 text-white uppercase font-bold rounded-lg lg:mr-5"
          onClick={() => setPatientEdit(patient)}
        >
         Editar
        </button>

        <button
          type="button"
          className="py-2 px-10 bg-red-600 hover:bg-red-800 text-white uppercase font-bold rounded-lg"
          onClick={() => deletePatient(_id)}
        >
          Eliminar
        </button>
      </div>

    </div>
  )
}

export default Patient