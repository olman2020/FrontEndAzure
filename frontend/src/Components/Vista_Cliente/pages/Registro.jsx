import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import md5 from 'md5';
import '../../../styleCss/Cliente/RegistroC.css'
import { useNavigate } from 'react-router-dom';


function RegistroClient() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isRegistered, setIsRegistered] = useState(false);
  const dataInit={
        id:0,
        nombre: "",
        apellido1: "",
        apellido2: "",
        edad: 0,
        fechanacimiento: "",
        peso:0,
        imc: 0,
        paisresidencia:"",
        cintura: 0,
        cuello: 0,
        caderas: 0,
        porcentajemusculos: 0,
        porcentajegrasa: 0,
        consumodiariocalorias: 0,
        correoelectronico: "",
        contrasena: "",
        pesoactual: 0,
};
const [datos,setDatos]=useState(dataInit);
const navigate=useNavigate()
const handlerData=(event)=>{
     setDatos({...datos,[event.target.name] : event.target.value}) 
    } 



  const onSubmit = async (data) => {
    // Encriptar la contraseña con MD5
    const contrasena = md5(datos.contrasena);
  

    // Realizar la solicitud de registro
    try {
      const url="https://apinutritecbd.azurewebsites.net/Cliente/registrarcliente"
     // const url2='http://localhost:8000/Cliente/registrarcliente'
     const url2="https://apinutritecbd.azurewebsites.net/Cliente/registrarmedidas"
    
      const response = await axios.post(url, {

        nombre: datos.nombre,
        apellido1: datos.apellido1,
        apellido2: datos.apellido2,
        edad: datos.edad,
        fechanacimiento: datos.fechanacimiento,
        peso: datos.peso,
        imc: datos.imc,
        paisresidencia: datos.paisresidencia,
        consumodiariocalorias: datos.consumodiariocalorias,
        correoelectronico: datos.correoelectronico,
        contrasena: contrasena,
       
      });

      try {await axios.post(url2,{
        id:0,
        fecha: datos.fechanacimiento,
        clienteid: datos.correoelectronico,
        cintura: datos.cintura,
        cuello: datos.cuello,
        caderas: datos.caderas,
        porcentajemusculos: datos.porcentajemusculos,
        porcentajegrasa: datos.porcentajegrasa,
        pesoactual:datos.pesoactual
      })
      alert("el usuario se agrego correctamente")
      navigate('/cliente/login')
      }
      
      catch(error){
        console.errror(error)
        alert("el usuario no se ha podido guardar correctamente")
      }
    
      console.log(response);
    } catch (error) {
      console.error(error);
      alert("el usuario no se ha podido guardar correctamente")
    }
  };

  return (
    <div className="registro-cliente">
  
        {!isRegistered ? (
        <form  className='container-registro-cliente'  onSubmit={handleSubmit(onSubmit)}>
          <h2 className='tituloRegistro'>Registro de Cliente</h2>
          <div className="mb-3">
            <label htmlFor="nombre" className="label-login">Nombre</label>
            <input  name='nombre' type="text" className="form-control" {...register('nombre', { required: true })}  onChange={handlerData}  />
            {errors.nombre && <span className="error-message">Nombre es requerido</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="apellido1" className="label-login">Apellido 1</label>
            <input name='apellido1' type="text" className="form-control" {...register('apellido1', { required: true })}  onChange={handlerData}  />
            {errors.apellido1 && <span className="error-message">Apellido 1 es requerido</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="apellido2" className="label-login">Apellido 2</label>
            <input  name='apellido2' type="text" className="form-control" {...register('apellido2', { required: true })}  onChange={handlerData}/>
            {errors.apellido2 && <span className="error-message">Apellido 2 es requerido</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="edad" className="label-login">Edad</label>
            <input  name='edad' type="number" className="form-control" {...register('edad', { required: true })} onChange={handlerData}/>
            {errors.edad && <span className="error-message">Edad es requerida</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="fechanacimiento" className="label-login">Fecha de Nacimiento</label>
            <input name='fechanacimiento' type="date" className="form-control" {...register('fechanacimiento', { required: true })} onChange={handlerData}/>
            {errors.fechanacimiento && <span className="error-message">Fecha de Nacimiento es requerida</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="peso" className="label-login">Peso</label>
            <input name='peso' type="number" className="form-control" {...register('peso', { required: true })} onChange={handlerData} />
          </div>

          <div className="mb-3">
            <label htmlFor="imc" className="label-login">IMC</label>
            <input name='imc' type="number" className="form-control" {...register('imc', { required: true })} onChange={handlerData}/>
            {errors.imc && <span className="error-message">IMC es requerido</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="paisresidencia" className="label-login">País de Residencia</label>
            <input name='paisresidencia'  type="text" className="form-control" {...register('paisresidencia', { required: true })} onChange={handlerData}/>
            {errors.paisresidencia && <span className="error-message">País de Residencia es requerido</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="cintura" className="label-login">Medida de Cintura en cm</label>
            <input name='cintura' type="number" className="form-control" {...register('cintura', { required: true })} onChange={handlerData}/>
            {errors.cintura && <span className="error-message">Medida de Cintura es requerida</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="cuello" className="label-login">Medida de Cuello en cm</label>
            <input name='cuello' type="number" className="form-control" {...register('cuello', { required: true })} onChange={handlerData}/>
            {errors.cuello && <span className="error-message">Medida de Cuello es requerida</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="caderas" className="label-login">Medida de Caderas</label>
            <input  name='caderas' type="number" className="form-control" {...register('caderas', { required: true })} onChange={handlerData}/>
            {errors.caderas && <span className="error-message">Medida de Caderas es requerida</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="porcentajemusculos" className="label-login">% de Músculo</label>
            <input type="porcentajemusculos" name='porcentajemusculos' className="form-control" {...register('porcentajemusculos', { required: true })} onChange={handlerData} />
            {errors.porcentajemusculos && <span className="error-message">% de Músculo es requerido</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="porcentajegrasa" className="label-login">% de Grasa</label>
            <input name='porcentajegrasa' type="number" className="form-control" {...register('porcentajegrasa', { required: true })} onChange={handlerData} />
            {errors.porcentajegrasa && <span className="error-message">% de Grasa es requerido</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="calorias" className="label-login">Consumo Diario Máximo de Calorías</label>
            <input name='consumodiariocalorias' type="number" className="form-control" {...register('consumodiariocalorias', { required: true })} onChange={handlerData} />
            {errors.consumodiariocalorias && <span className="error-message">Consumo Diario Máximo de Calorías es requerido</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="correoorreoelectronico" className="label-login">Correo Electrónico</label>
            <input name='correoelectronico' type="email" className="form-control" {...register('correoelectronico', { required: true })} onChange={handlerData}/>
            {errors.correoelectronico && <span className="error-message">Correo Electrónico es requerido</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="pesoacutal" className="label-login">Peso Actual en kg</label>
            <input type="pesoacutal" className="form-control" {...register('pesoactual', { required: true })} onChange={handlerData} />
            {errors.pesoacutal && <span className="error-message">Peso Actual es requerida</span>}
          </div>
 
          <div className="mb-3">
            <label htmlFor="contrasena" className="label-login">Contraseña</label>
            <input name='contrasena' type="password" className="form-control" {...register('contrasena', { required: true })} onChange={handlerData} />
            {errors.contrasena && <span className="error-message">Contraseña es requerida</span>}
          </div>
          

          <button type="submit" className="btn btn-primary">Registrar</button>
        </form>
      ) : (
        <div className="registro-exitoso">
          <h3>Registro exitoso</h3>
          <p>Tu cuenta ha sido registrada exitosamente.</p>
        </div>
      )}
  
      
    </div>
  );
}

export default RegistroClient;


