import React, { useState } from 'react'

const Form = () => {
    const [showForm, setShowForm] = useState(true);
    const [inputsForm, setInputsForm] = useState({
        nombre: '',
        apellido: '',
        email: '',
        contrasenia: ''
    })
    const [showError, setShowError] = useState(false);
    // Desestructurar el objeto Input
    const {nombre, apellido, email, contrasenia} = inputsForm;

    //VALIDACIONES

    const emailValidation = (texto) => {
        let respuesta = true;
        let regEspacios = /\s/;
        if (regEspacios.test(texto)) {
          respuesta = false;
        }
        if (texto[0] == " " || texto[texto.length - 1] == " ") {
          console.log("trim: " + "false")
          respuesta = false;
        }
        let regFormatoEmail = /\S+@\S+\.\S+/;
        if(!regFormatoEmail.test(texto)){
          respuesta = false;
        }
        return respuesta;
      }

      const textValidation = (texto) => {
        let respuesta = true;
        if (texto.length < 4) { //COLOCAR LA CANTIDAD DE CARACTERES MÍNIMA, LE PUSE 4 POR PONER MODIFICAR
            respuesta = false;
        }
        if (texto.trim() !== texto) {
            respuesta = false;
        }
        let caracteresEspeciales = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
        if (caracteresEspeciales.test(texto)) {
            respuesta = false;
        }
        return respuesta;
      }

      const passValidation = (texto) => {
        let respuesta = true;
        
        if (texto.length < 7 || texto.length > 12) {
            respuesta = false;
        }

        
        const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(texto);
        if (!tieneCaracterEspecial) {
            respuesta = false;
        }

        
        const tieneMayuscula = /[A-Z]/.test(texto);
        if (!tieneMayuscula) {
            respuesta = false;
        }

        
        const tieneMinuscula = /[a-z]/.test(texto);
        if (!tieneMinuscula) {
            respuesta = false;
        }

        
        if (texto.startsWith(' ') || texto.endsWith(' ')) {
            respuesta = false;
        }

        
        if (/\s/.test(texto)) {
            respuesta = false;
        }

        return respuesta;
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        if(textValidation(nombre) && textValidation(apellido) && emailValidation(email) && passValidation(contrasenia)){
        setShowForm(false);
        setShowError(false);
        //AQUI SE HACE EL POST A LA API
        } else {
        setShowForm(true);
        setShowError(true);
        }   
      }
      //console.log(inputsForm);
  return (
    <div>
        {showForm ? 
            <form>
                <input type="text" placeholder='Nombre' onChange={(event) => setInputsForm({...inputsForm, nombre: event.target.value})} />
                <input type="text" placeholder='Apellido' onChange={(event) => setInputsForm({...inputsForm, apellido: event.target.value})} />
                <input type="text" placeholder='Email' onChange={(event) => setInputsForm({...inputsForm, email: event.target.value})} />
                <input type="password" placeholder='Contraseña' onChange={(event) => setInputsForm({...inputsForm, contrasenia: event.target.value})} />
                <button onClick={handleSubmit}>Enviar</button>
            </form> : <h3>Se Registró el usuario</h3>
        }
        {showError && <h3>Por favor verifique su información nuevamente</h3>}
    </div>
  )
}

export default Form