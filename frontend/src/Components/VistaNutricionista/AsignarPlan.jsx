/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AsignacionPlan = () => {
  const [pacientes, setPacientes] = useState([]);
  const [planesAlimentacion, setPlanesAlimentacion] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  let nutricionista = localStorage.getItem('cedula');
  //peticion asincrona de los planes
  const cargarPlanes = async () => {
    const url = `https://apinutritecbd.azurewebsites.net/Nutricionista/planes/${nutricionista}`;
    try {
      const response = await axios.get(url);
      console.log(response.data)
      setPlanesAlimentacion(response.data);
    } catch (error) {
      console.error(error);
    }
  };
// peticion asincrona de los pacientes
  const cargarPacientes = async () => {
    const url = `https://apinutritecbd.azurewebsites.net/Nutricionista/ObtenerPacientesPorCedula/${nutricionista}`;
    try {
      const response = await axios.get(url);
      console.log(response.data)
      setPacientes(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // se cargan apenas inicial la pagina
  useEffect(() => {
    cargarPacientes();//consulta sobre los pacientes para cargarlos en pantalla
  }, []);

  useEffect(() => {
    cargarPlanes(); // consulta sobre los planes para cargarlos en pantalla
  }, []);

  const handlePacienteChange = event => {
    setSelectedPaciente(event.target.value);
  };
  //captura el nombre del plan
  const handlePlanChange = event => {
    setSelectedPlan(event.target.value);
  };
  //Funcion que realiza el envio de los dato para ser almacenados en la base de datos
  const handleFormSubmit = async event => {
    event.preventDefault();

    const url = "https://apinutritecbd.azurewebsites.net/Nutricionista/AsosiarPacienteaPlan";
    const data={
      pacienteid: selectedPaciente.correoElectronico,
      nutricionistaid: localStorage.getItem('cedula'),
      planid: selectedPlan,
      fechainicio: selectedStartDate,
      fechafinalizacion: selectedEndDate,
    }
    console.log(data)
     try{ await axios.post(url,data);
        alert("La asignacion se realizo correctamente")
   }

    catch(error){
      console.error(error)
      alert("No fue posible realizar la signacion, por favor intenta de nuevo")
    }

    
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-4" style={{color:'black', textAlign:'center'}}>Asignación de Plan de Alimentación</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="paciente">Paciente:</label>
          <select
            className="form-control"
            id="paciente"
            value={selectedPaciente}
            onChange={handlePacienteChange}
          >
            <option value="">Seleccione un paciente</option>
            {pacientes.map(paciente => (
              <option key={paciente.nombre} value={paciente.nombre}>
                {paciente.nombre} {paciente.correoElectronico}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="plan">Plan de Alimentación:</label>
          <select
            className="form-control"
            id="plan"
            value={selectedPlan}
            onChange={handlePlanChange}
          >
            <option value="">Seleccione un plan de alimentación</option>
            {planesAlimentacion.map(plan => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Fecha de inicio:</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={selectedStartDate}
            onChange={event => setSelectedStartDate(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">Fecha de finalización:</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={selectedEndDate}
            onChange={event => setSelectedEndDate(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Asignar Plan
        </button>
      </form>
      {selectedPaciente && (
  <div className="mt-4">
    <h3>Información del Paciente:</h3>
    <p>
      <strong>Nombre:</strong>{' '}
      {pacientes.find(paciente => paciente.nombre === selectedPaciente).nombre}
    </p>
    <p>
      <strong>Correo Electrónico:</strong>{' '}
      {pacientes.find(paciente => paciente.nombre === selectedPaciente).correoElectronico}
    </p>
  </div>
)}
</div>
  );
};

export default AsignacionPlan;
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AsignacionPlan = () => {
  const [pacientes, setPacientes] = useState([]);
  const [planesAlimentacion, setPlanesAlimentacion] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  let nutricionista = localStorage.getItem('cedula');

  const cargarPlanes = async () => {
    const url = `https://apinutritecbd.azurewebsites.net/Nutricionista/planes/${nutricionista}`;
    try {
      const response = await axios.get(url);
      setPlanesAlimentacion(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarPacientes = async () => {
    const url = `https://apinutritecbd.azurewebsites.net/Nutricionista/ObtenerPacientesPorCedula/${nutricionista}`;
    try {
      const response = await axios.get(url);
      setPacientes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarPacientes();
    cargarPlanes();
  }, []);

  const handlePacienteChange = event => {
    setSelectedPaciente(event.target.value);
  };

  const handlePlanChange = event => {
    setSelectedPlan(event.target.value);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    const url = "https://apinutritecbd.azurewebsites.net/Nutricionista/AsosiarPacienteaPlan";
    const data = {
      pacienteid: selectedPaciente,
      nutricionistaid: nutricionista,
      planid: selectedPlan,
      fechainicio: selectedStartDate,
      fechafinalizacion: selectedEndDate,
    };

    try {
      await axios.post(url, data);
      alert("La asignación se realizó correctamente");
    } catch (error) {
      console.error(error);
      alert("No fue posible realizar la asignación, por favor intenta de nuevo");
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-4" style={{ color: 'black', textAlign: 'center' }}>
        Asignación de Plan de Alimentación
      </h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="paciente">Paciente:</label>
          <select
            className="form-control"
            id="paciente"
            value={selectedPaciente}
            onChange={handlePacienteChange}
          >
            <option value="">Seleccione un paciente</option>
            {pacientes.map(paciente => (
              <option key={paciente.correoElectronico} value={paciente.correoElectronico}>
                {paciente.nombre} {paciente.correoElectronico}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="plan">Plan de Alimentación:</label>
          <select
            className="form-control"
            id="plan"
            value={selectedPlan}
            onChange={handlePlanChange}
          >
            <option value="">Seleccione un plan de alimentación</option>
            {planesAlimentacion.map(plan => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Fecha de inicio:</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={selectedStartDate}
            onChange={event => setSelectedStartDate(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">Fecha de finalización:</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={selectedEndDate}
            onChange={event => setSelectedEndDate(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Asignar Plan
        </button>
      </form>
      {selectedPaciente && (
        <div className="mt-4">
          <h3>Información del Paciente:</h3>
          <p>
            <strong>Nombre:</strong>{' '}
            {pacientes.find(paciente => paciente.correoElectronico === selectedPaciente).nombre}
          </p>
          <p>
            <strong>Correo Electrónico:</strong>{' '}
            {selectedPaciente}
          </p>
        </div>
      )}
    </div>
  );
};

export default AsignacionPlan;


