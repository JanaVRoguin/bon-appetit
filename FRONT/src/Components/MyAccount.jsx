import React from 'react'

const MyAccount = () => {
    const userHardcodeado = {
        nombre: 'Wilfren',
        apellido: 'Pereira',
        correo: 'hola@gmail.com'
    }
    const {nombre, apellido, correo} = userHardcodeado;
  return (
    <div>
        <p>Nombre:</p>
        <h3>{`${nombre} ${apellido}`}</h3>
        <p>Correo:</p>
        <h3>{`${correo}`}</h3>
    </div>
  )
}

export default MyAccount