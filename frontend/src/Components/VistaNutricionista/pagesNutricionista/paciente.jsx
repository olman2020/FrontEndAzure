import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styleCss/Nutricionista/paciente.css';
import axios from 'axios';

const Paciente = () => {
  const [feedback, setFeedback] = useState('');
  const [fecha, setFecha] = useState('');

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFechaChange = (e) => {
    setFecha(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ClienteID: localStorage.getItem('user'),
    NutricionistaID: localStorage.getItem('cedula'),
    FechaRetroalimentacion: fecha,
    Retroalimentacion_Nutricionista: feedback
  })
   try{ await axios.post('https://apimongodbnutritec.azurewebsites.net/api/retroalimentacion', {
      ClienteID: localStorage.getItem('user'),
      NutricionistaID: localStorage.getItem('cedula'),
      FechaRetroalimentacion: fecha,
      Retroalimentacion_Nutricionista: feedback
    });
      alert("Dato guardado")
   }
    catch(error){
      alert("Error")
      console.error(error)
    }

    setFeedback('');
    setFecha('');
  };

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Retroalimentación del nutricionista</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          value={feedback}
          onChange={handleFeedbackChange}
          placeholder="Ingrese su retroalimentación..."
          rows={4}
        ></textarea>
        <input
          type="date"
          className="form-control mt-3"
          value={fecha}
          onChange={handleFechaChange}
        />
        <button type="submit" className="btn btn-primary mt-3">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Paciente;

