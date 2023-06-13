import React, { useState } from 'react'
import axios from 'axios'
function RegistroAdmi(){
    const [password,setPassword]=useState("")
    const [gmail,setGmail]=useState("")
    const changePassword=(event)=>{
        setPassword(event.target.value)

    }
    const changeGmail=(event)=>{
        setGmail(event.target.value)
    }
    const peticion =async(e)=>{
        e.preventDefault()
        try {await axios.post("https://apinutritecbd.azurewebsites.net/Administrador/registrarcliente",{
            correoelectronico:gmail,
            contrasena:password,
            id:50
        })}
        catch(error){
            console.log(error)
        }

    }
    return(
        <div>
           <form>
           <label htmlFor="">Correo</label>
            <input type="gmail" onChange={changeGmail}/>
            <label htmlFor="">password</label>
            <input type="gmail" onChange={changePassword}/>
            <button onClick={peticion}>Enviar</button>
            </form> 

            
        </div>
    )
}

export default RegistroAdmi