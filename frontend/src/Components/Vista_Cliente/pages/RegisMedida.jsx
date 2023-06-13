import React, { useState } from 'react';
import axios from 'axios';
import '../../../styleCss/Cliente/Medidas.css'

const RegistroMedidas = () => {
  const [fecha, setFecha] = useState('');
  const [cintura, setCintura] = useState(null);
  const [cuello, setCuello] = useState(null);
  const [caderas, setCaderas] = useState(null);
  const [porcentajeMusculo, setPorcentajeMusculo] = useState(null);
  const [porcentajeGrasa, setPorcentajeGrasa] = useState(null);
  const [pesoactual, setPesoactual] = useState(null);

  const handleRegistro = async() => {
    // Aquí puedes implementar la lógica para guardar los datos en la base de datos o hacer cualquier otra operación necesaria
   
   
   const url='https://apinutritecbd.azurewebsites.net/Cliente/registrarmedidas'
   console.log("correo cliente",localStorage.getItem('cliente'))
   try{const response=await axios.post(url,{
    clienteid:localStorage.getItem('cliente'),
    fecha,
    cintura,
    cuello,
    caderas,
    porcentajemusculo:porcentajeMusculo,
    porcentajegrasa:porcentajeGrasa,
    pesoactual

   })
   console.log(response.data) 
   alert('Su registro de medida ha sido exitosamente almacenado')
   }
   catch(error){
    console.error(error)
   }
   

  };

  return (
    <div className="container">
      <h2 className='form-label'>Registro de Medidas</h2>
      <div className='container-medidas'>
      <form>
        <div className="mb-3">
          <label className="form-label">Fecha:</label>
          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cintura:</label>
          <input
            type="number"
            className="form-control"
            value={cintura}
            onChange={(e) => setCintura(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cuello:</label>
          <input
            type="number"
            className="form-control"
            value={cuello}
            onChange={(e) => setCuello(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Caderas:</label>
          <input
            type="number"
            className="form-control"
            value={caderas}
            onChange={(e) => setCaderas(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Porcentaje de Músculo:</label>
          <input
            type="number"
            className="form-control"
            value={porcentajeMusculo}
            onChange={(e) => setPorcentajeMusculo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Porcentaje de Grasa:</label>
          <input
            type="number"
            className="form-control"
            value={porcentajeGrasa}
            onChange={(e) => setPorcentajeGrasa(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Peso actual</label>
          <input
            type="number"
            className="form-control"
            value={pesoactual}
            onChange={(e) => setPesoactual(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleRegistro}
        >
          Registrar
        </button>
      </form>

      </div>
          </div>
  );
};

export default RegistroMedidas;
 