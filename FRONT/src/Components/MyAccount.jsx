import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/config';
import axios from 'axios';

const MyAccount = () => {
    const userHardcodeado = {
        nombre: 'Wilfren',
        apellido: 'Pereira',
        correo: JSON.parse(localStorage.getItem('email'))
    }
    const {nombre, apellido, correo} = userHardcodeado;
    const url = `${BASE_URL}usuarios/buscar/${correo}`;
    // console.log(JSON.parse(localStorage.getItem('email')));
    
    useEffect(() => {
      axios(url)
      .then((response) => {
        console.log(response.data);
      })
    }, []) // Preguntarle a Fran
    
  return (
    <>
      <div className='root-myAccount'>
        <h2>Mis datos</h2>
        <div>
            <h3>Nombre:</h3>
            <p>{`${nombre} ${apellido}`}</p>
            <h3>Correo:</h3>
            <p>{`${correo}`}</p>
        </div>
      </div>
    </>
  )
}

export default MyAccount