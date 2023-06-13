import React, { useState } from 'react';
import axios from 'axios';
import md5 from 'md5';

function VistaRegistro() {
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    apellido1: '',
    apellido2: '',
    codigobarras: "",
    edad: 0,
    fechanacimiento: '',
    peso: 0,
    direccion: '',
    foto: "",
    numtarjetacredito: 0,
    tipocobroid: 0,
    correoelectronico: '',
    contrasena: '',
    imc: 0,
  });

  const [formErrors, setFormErrors] = useState({});
  
  const handleInputChange = (event) => {
    if (event.target.name === 'foto') {
      
      setFormData({ ...formData, foto: event.target.files[0] });
      
    } else {
      let value = event.target.value;
      if (event.target.name === 'tipocobroid') {
         value=parseInt(value)
      }
      else if (event.target.name === 'peso' || event.target.name === 'imc' || event.target.name === 'edad') {
        value = parseInt(value);
        if (isNaN(value)) {
          value = 0;
        }
      
      }
      else if(event.target.name==='contrasena'){
        value=md5(value)
      }
      
      setFormData({ ...formData, [event.target.name]: value });
    }
  };

  const handleSubmit = (event) => {

    console.log("enviando ...",formData)
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const dataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'contrasena') {
          dataToSend.append(key, md5(value)); // Encriptar la contraseña utilizando md5
        } else {
          dataToSend.append(key, value);
        }
      });
      const url = 'https://apinutritecbd.azurewebsites.net/Nutricionista/RegistarNutricionista';
      const url2='http://localhost:8000/registro'
      console.log("endpoitn")
      console.log("data",dataToSend)
      axios
        .post(url, formData
          )
        .then((response) => {
          // Lógica para manejar la respuesta del servidor
          console.log(response.data);
          alert("se ha registrado correctamente, inicia sesion")
        })
        .catch((error) => {
          // Lógica para manejar el error de la solicitud
          alert("Su solicitud no fue valida")
          console.error(error);
        });
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.cedula) {
      errors.cedula = 'Este campo es requerido';
    }
    if (!formData.nombre) {
      errors.nombre = 'Este campo es requerido';
    }
    if (!formData.apellido1) {
      errors.apellido1 = 'Este campo es requerido';
    }
    if (!formData.apellido2) {
      errors.apellido2 = 'Este campo es requerido';
    }
    if (!formData.codigobarras) {
      errors.codigobarras = 'Este campo es requerido';
    }
    if (!formData.edad) {
      errors.edad = 'Este campo es requerido';
    }
    if (!formData.fechanacimiento) {
      errors.fechanacimiento = 'Este campo es requerido';
    }
    if (!formData.peso) {
      errors.peso = 'Este campo es requerido';
    }
    if (!formData.direccion) {
      errors.direccion = 'Este campo es requerido';
    }
   
    if (!formData.numtarjetacredito) {
      errors.numtarjetacredito = 'Este campo es requerido';
    }
    if (!formData.tipocobroid) {
      errors.tipocobroid = 'Este campo es requerido';
    }
    if (!formData.correoelectronico) {
      errors.correoelectronico = 'Este campo es requerido';
    }
    if (!formData.contrasena) {
      errors.contrasena = 'Este campo es requerido';
    }
    if (!formData.imc) {
      errors.imc = 'Este campo es requerido';
    }
    return errors;
  };

  return (
    <div className="container">
      <h2 style={{color:'black', padding:'5px', textAlign:'center' }}>Registro de Nutricionistas</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Número de cédula</label>
          <input type="text" className="form-control" name="cedula" onChange={handleInputChange} />
          {formErrors.cedula && <span className="text-danger">{formErrors.cedula}</span>}
        </div>

        <div className="form-group">
          <label>Nombre</label>
          <input type="text" className="form-control" name="nombre" onChange={handleInputChange} />
          {formErrors.nombre && <span className="text-danger">{formErrors.nombre}</span>}
        </div>

        <div className="form-group">
          <label>Primer Apellido</label>
          <input type="text" className="form-control" name="apellido1" onChange={handleInputChange} />
          {formErrors.apellido1 && <span className="text-danger">{formErrors.apellido1}</span>}
        </div>

        <div className="form-group">
          <label>Segundo Apellido</label>
          <input type="text" className="form-control" name="apellido2" onChange={handleInputChange} />
          {formErrors.apellido2 && <span className="text-danger">{formErrors.apellido2}</span>}
        </div>

        <div className="form-group">
          <label>Código de barras</label>
          <input type="text" className="form-control" name="codigobarras" onChange={handleInputChange} />
          {formErrors.codigobarras && <span className="text-danger">{formErrors.codigobarras}</span>}
        </div>

        <div className="form-group">
          <label>Edad</label>
          <input type="number" className="form-control" name="edad" onChange={handleInputChange} />
          {formErrors.edad && <span className="text-danger">{formErrors.edad}</span>}
        </div>

        <div className="form-group">
          <label>Fecha de nacimiento</label>
          <input type="date" className="form-control" name="fechanacimiento" onChange={handleInputChange} />
          {formErrors.fechanacimiento && <span className="text-danger">{formErrors.fechanacimiento}</span>}
        </div>

        <div className="form-group">
          <label>Peso</label>
          <input type="number" className="form-control" name="peso" onChange={handleInputChange} />
          {formErrors.peso && <span className="text-danger">{formErrors.peso}</span>}
        </div>

        <div className="form-group">
          <label>Dirección</label>
          <input type="text" className="form-control" name="direccion" onChange={handleInputChange} />
          {formErrors.direccion && <span className="text-danger">{formErrors.direccion}</span>}
        </div>

        <div className="form-group">
          <label>Foto</label>
          <input type="file" className="form-control-file" name="foto" onChange={handleInputChange} />
          {formErrors.foto && <span className="text-danger">{formErrors.foto}</span>}
        </div>

        <div className="form-group">
          <label>Número de tarjeta de crédito</label>
          <input type="text" className="form-control" name="numtarjetacredito" onChange={handleInputChange} />
          {formErrors.numtarjetacredito && (
            <span className="text-danger">{formErrors.numtarjetacredito}</span>
          )}
        </div>

        <div className="form-group">
          <label>Tipo de cobro</label>
          <select className="form-control" name="tipocobroid" onChange={handleInputChange}>
            <option value="">Seleccione una opción</option>
            <option value="1">Semanal</option>
            <option value="2">Mensual</option>
            <option value="3">Anual</option>
          </select>
          {formErrors.tipocobroid && <span className="text-danger">{formErrors.tipocobroid}</span>}
        </div>

        <div className="form-group">
          <label>Correo Electrónico</label>
          <input type="email" className="form-control" name="correoelectronico" onChange={handleInputChange} />
          {formErrors.correoelectronico && (
            <span className="text-danger">{formErrors.correoelectronico}</span>
          )}
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" className="form-control" name="contrasena" onChange={handleInputChange} />
          {formErrors.contrasena && <span className="text-danger">{formErrors.contrasena}</span>}
        </div>

        <div className="form-group">
          <label>Índice de Masa Corporal (IMC)</label>
          <input type="number" className="form-control" name="imc" onChange={handleInputChange} />
          {formErrors.imc && <span className="text-danger">{formErrors.imc}</span>}
        </div>

        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </form>
    </div>
  );
}

export default VistaRegistro;
