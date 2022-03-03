import { createContext, useState, useEffect } from 'react'
import axiosClient from '../config/axios'

const PatientsContext = createContext()

export const PatientsProvider = ({ children }) => {

  const [patients, setPatients] = useState([])
  const [patient, setPatient] = useState([])

  const loadPatients = async () => {

    try {

      const token = localStorage.getItem('token')
      if (!token) return

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await axiosClient.get('pacientes', config)
      setPatients(data)

    } catch (error) {
      console.log(error)
    }

  }

  const savePatient = async (patient) => {


    const token = localStorage.getItem('token')
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    if (patient.id) {

      try {
        
        const { data } = await axiosClient.put(`/pacientes/${patient.id}`, patient, config)

        const updatedPatients = patients.map( patientState => patientState._id === data._id ? data : patientState )

        setPatients(updatedPatients)

      } catch (error) {
        console.log(error.response.data.message)
      }

    } else {

      try {
  
        const { data } = await axiosClient.post('/pacientes', patient, config)
        
        const { createdAt, updatedAt, __v, ...savedPatient } = data
  
        setPatients([savedPatient, ...patients])

      } catch (error) {
        console.log(error.response.data.message)
      }

    }


  }

  const setPatientEdit = (patient) => {
    setPatient(patient)
  }

  const deletePatient = async (id) => {
    const deleteConfirm = confirm('Estás seguro de eliminar el paciente seleccionado?')

    if (deleteConfirm) {
      try {
        
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }

        const { data } = await axiosClient.delete(`/pacientes/${id}`, config)
        
        const updatedPatients = patients.filter( patientsState => patientsState._id !== id)
        setPatients(updatedPatients)

      } catch (error) {
        console.log(error)
      }
    }
  }

  const cleanPatients = () => {
    setPatients({})
  }

  return (
    <PatientsContext.Provider value={{ patients, loadPatients, savePatient, setPatientEdit, patient, deletePatient, cleanPatients }}>
      {children}
    </PatientsContext.Provider>
  )

}

export default PatientsContext