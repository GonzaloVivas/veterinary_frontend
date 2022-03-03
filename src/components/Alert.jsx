const Alert = ({ alert }) => {
  return (
    <div className={`${alert.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-r text-white text-center font-bold p-3 rounded-xl text-sm uppercase mb-10`}>
      {alert.message}
    </div>
  )
}

export default Alert