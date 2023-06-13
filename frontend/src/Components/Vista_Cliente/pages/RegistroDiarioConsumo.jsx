import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../../../styleCss/Cliente/RegistroDC.css'

function RegistroDiarioDeConsumo() {
  const [alimentos,setalimentos]=useState([])
  const [desayuno, setDesayuno] = useState([]);
  const [meriendaManana, setMeriendaManana] = useState([]);
  const [almuerzo, setAlmuerzo] = useState([]);
  const [meriendaTarde, setMeriendaTarde] = useState([]);
  const [cena, setCena] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('');
  const [alimentosEncontrados, setAlimentosEncontrados] = useState([]);
  const [productos,setProductos]=useState([])
  const [fechaRegistro, setFechaRegistro] = useState('');
 

  const buscarAlimento = () => {
    try{
    const alimentosEncontrados = filtro === 'nombre'
      ? productos.filter(alimento => alimento.nombre.toLowerCase().includes(busqueda.toLowerCase()))
      : productos.filter(alimento => alimento.codigo === busqueda);
  
    setAlimentosEncontrados(alimentosEncontrados);}
    catch(error){
      console.log(error)
    }
  };
  //funcionalidad para eliminar productos de un tiempo de comida
 const eliminarElemento = (lista, elemento) => {
    const nuevaLista = lista.filter(index => {
      return index.alimento.codigobarra !== elemento.alimento.codigobarra;
    });
    return nuevaLista;
  };
   //Esta funcion trae todos los productos para poder realizar el consumo diario
  const requestProduct=async()=>{
     //se realiza la peticion para cargar los productos 
    const url="https://apinutritecbd.azurewebsites.net/Externos/VisualizarProductosDisponibles"
    try{
      const response=await axios.get(url)
    setProductos(response.data)
     }
     catch(error){
        console.log(error)
     }

     
  }
  useEffect(()=>{
    requestProduct()
   
  },[])
  
  const agregarAlimento = (alimento, tiempoComida) => {
    
    if (fechaRegistro) {
       const registro={alimento}
  
      switch (tiempoComida) {
        case 'desayuno':
          setDesayuno([...desayuno, registro]);
          break;
        case 'meriendaManana':
          setMeriendaManana([...meriendaManana, registro]);
          break;
        case 'almuerzo':
          setAlmuerzo([...almuerzo, registro]);
          break;
        case 'meriendaTarde':
          setMeriendaTarde([...meriendaTarde, registro]);
          break;
        case 'cena':
          setCena([...cena, registro]);
          break;
        default:
          break;
      }
    } else {
      alert('Selecciona una fecha para agregar alimentos.');
    }
  };
  
 
  
  const eliminarAlimento = (alimento, tiempoComida) => {
    let listaActual = [];
    
    switch (tiempoComida) {
      case 'desayuno':
        listaActual = eliminarElemento(desayuno, alimento);
        setDesayuno(listaActual);
        break;
      case 'meriendaManana':
        listaActual = eliminarElemento(meriendaManana, alimento);
        setMeriendaManana(listaActual);
        break;
      case 'almuerzo':
        listaActual = eliminarElemento(almuerzo, alimento);
        setAlmuerzo(listaActual);
        break;
      case 'meriendaTarde':
        listaActual = eliminarElemento(meriendaTarde, alimento);
        setMeriendaTarde(listaActual);
        break;
      case 'cena':
        listaActual = eliminarElemento(cena, alimento);
        setCena(listaActual);
        break;
      default:
        break;
    }
  };

  const guardarRegistro = () => {
    const idCliente=localStorage.getItem("cliente")
    const registroDiario = {idCliente:idCliente , desayuno, meriendaManana, almuerzo, meriendaTarde, cena };
    console.log("registro Diario",registroDiario)
    const url='https://apinutritecbd.azurewebsites.net/Cliente/ingresarregistrodiario'
    const url2='http://localhost:8000/Cliente/plan'
    // Envio del registro del consumo diario al backend
     axios.post(url2, registroDiario)
     .then(response => {
         console.log('Registro guardado exitosamente');
         alert("Registro se realizo correctamente")
       
       })
       .catch(error => {
        alert("el registro no se puedo realizar")
         console.error('Error al guardar el registro', error);
        
      });
    console.log(registroDiario);
  };

  return (
    <div className="container mt-4 registro-container">
      <h2>Registro Diario de Consumo</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="fechaRegistro" className="form-label">Fecha de Registro</label>
            <input type="date" className="form-control" id="fechaRegistro" value={fechaRegistro} onChange={e => setFechaRegistro(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="busqueda" className="form-label">Buscar Alimento</label>
            <div className="input-group">
              <input type="text" className="form-control" id="busqueda" value={busqueda} onChange={e => setBusqueda(e.target.value)} />
              <select className="form-select" onChange={e => setFiltro(e.target.value)}>
              <option value="">Seleccione el metodo de busca </option>
                <option value="nombre">Nombre</option>
                <option value="codigo">Código de Barras</option>
              </select>
              <button className="btn btn-primary" onClick={buscarAlimento}>Buscar</button>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          {alimentosEncontrados.length > 0 && (
            <div className="mt-4">
              <h4>Alimentos encontrados:</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Código de Barras</th>
                    <th>Descripción</th>
                    <th>Tamaño porción</th>
                    <th>Energía</th>
                    <th>Grasa</th>
                    <th>Sodio</th>
                    <th>Carbohidratos</th>
                    <th>Proteína</th>
                    <th>Vitaminas</th>
                    <th>Calcio</th>
                    <th>Hierro</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {alimentosEncontrados.map((alimento, index) => (
                    <tr key={index}>
                      <td>{alimento.nombre}</td>
                      <td>{alimento.codigobarra}</td>
                      <td>{alimento.descripcion}</td>
                      <td>{alimento.taman_porcion}</td>
                      <td>{alimento.energia}</td>
                      <td>{alimento.grasa}</td>
                      <td>{alimento.sodio}</td>
                      <td>{alimento.carbohidratos}</td>
                      <td>{alimento.proteina}</td>
                      <td>{alimento.vitaminas}</td>
                      <td>{alimento.calcio}</td>
                      <td>{alimento.hierro}</td>
                      <td>
                        <button className="btn btn-sm btn-success" onClick={() => agregarAlimento(alimento, 'desayuno')}>Desayuno</button>
                        <button className="btn btn-sm btn-success" onClick={() => agregarAlimento(alimento, 'meriendaManana')}>Merienda Mañana</button>
                        <button className="btn btn-sm btn-success" onClick={() => agregarAlimento(alimento, 'almuerzo')}>Almuerzo</button>
                        <button className="btn btn-sm btn-success" onClick={() => agregarAlimento(alimento, 'meriendaTarde')}>Merienda Tarde</button>
                        <button className="btn btn-sm btn-success" onClick={() => agregarAlimento(alimento, 'cena')}>Cena</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-4">
            <h4>Registro Diario de Consumo</h4>
            {desayuno.length > 0 && (
              <div>
                <h5>Desayuno</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Código de Barras</th>
                      <th>Descripción</th>
                      <th>Tamaño porción</th>
                      <th>Energía</th>
                      <th>Grasa</th>
                      <th>Sodio</th>
                      <th>Carbohidratos</th>
                      <th>Proteína</th>
                      <th>Vitaminas</th>
                      <th>Calcio</th>
                      <th>Hierro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {desayuno.map((alimento, index) => (
                      <tr key={index}>
                        <td>{alimento.alimento.nombre}</td>
                        <td>{alimento.alimento.codigobarra}</td>
                        <td>{alimento.alimento.descripcion}</td>
                        <td>{alimento.alimento.taman_porcion}</td>
                        <td>{alimento.alimento.energia}</td>
                        <td>{alimento.alimento.grasa}</td>
                        <td>{alimento.alimento.sodio}</td>
                        <td>{alimento.alimento.carbohidratos}</td>
                        <td>{alimento.alimento.proteina}</td>
                        <td>{alimento.alimento.vitaminas}</td>
                        <td>{alimento.alimento.calcio}</td>
                        <td>{alimento.alimento.hierro}</td>
                        <button className="btn btn-danger" onClick={() => eliminarAlimento(alimento, 'desayuno')}>Eliminar</button>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {meriendaManana.length > 0 && (
              <div>
                <h5>Merienda Mañana</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Código de Barras</th>
                      <th>Descripción</th>
                      <th>Tamaño porción</th>
                      <th>Energía</th>
                      <th>Grasa</th>
                      <th>Sodio</th>
                      <th>Carbohidratos</th>
                      <th>Proteína</th>
                      <th>Vitaminas</th>
                      <th>Calcio</th>
                      <th>Hierro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meriendaManana.map((alimento, index) => (
                      <tr key={index}>
                        <td>{alimento.alimento.nombre}</td>
                        <td>{alimento.alimento.codigobarra}</td>
                        <td>{alimento.alimento.descripcion}</td>
                        <td>{alimento.alimento.taman_porcion}</td>
                        <td>{alimento.alimento.energia}</td>
                        <td>{alimento.alimento.grasa}</td>
                        <td>{alimento.alimento.sodio}</td>
                        <td>{alimento.alimento.carbohidratos}</td>
                        <td>{alimento.alimento.proteina}</td>
                        <td>{alimento.alimento.vitaminas}</td>
                        <td>{alimento.alimento.calcio}</td>
                        <td>{alimento.alimento.hierro}</td>
                        <button className="btn btn-danger" onClick={() => eliminarAlimento(alimento, 'meriendaManana')}>Eliminar</button>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {almuerzo.length > 0 && (
              <div>
                <h5>Almuerzo</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Código de Barras</th>
                      <th>Descripción</th>
                      <th>Tamaño porción</th>
                      <th>Energía</th>
                      <th>Grasa</th>
                      <th>Sodio</th>
                      <th>Carbohidratos</th>
                      <th>Proteína</th>
                      <th>Vitaminas</th>
                      <th>Calcio</th>
                      <th>Hierro</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {almuerzo.map((alimento, index) => (
                      <tr key={index}>
                        <td>{alimento.alimento.nombre}</td>
                        <td>{alimento.alimento.codigobarra}</td>
                        <td>{alimento.alimento.descripcion}</td>
                        <td>{alimento.alimento.taman_porcion}</td>
                        <td>{alimento.alimento.energia}</td>
                        <td>{alimento.alimento.grasa}</td>
                        <td>{alimento.alimento.sodio}</td>
                        <td>{alimento.alimento.carbohidratos}</td>
                        <td>{alimento.alimento.proteina}</td>
                        <td>{alimento.alimento.vitaminas}</td>
                        <td>{alimento.alimento.calcio}</td>
                        <td>{alimento.alimento.hierro}</td>
                        <button className="btn btn-danger" onClick={() => eliminarAlimento(alimento, 'almuerzo')}>Eliminar</button>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {meriendaTarde.length > 0 && (
              <div>
                <h5>Merienda Tarde</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Código de Barras</th>
                      <th>Descripción</th>
                      <th>Tamaño porción</th>
                      <th>Energía</th>
                      <th>Grasa</th>
                      <th>Sodio</th>
                      <th>Carbohidratos</th>
                      <th>Proteína</th>
                      <th>Vitaminas</th>
                      <th>Calcio</th>
                      <th>Hierro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meriendaTarde.map((alimento, index) => (
                      <tr key={index}>
                        <td>{alimento.nombre}</td>
                        <td>{alimento.codigobarra}</td>
                        <td>{alimento.descripcion}</td>
                        <td>{alimento.taman_porcion}</td>
                        <td>{alimento.energia}</td>
                        <td>{alimento.grasa}</td>
                        <td>{alimento.sodio}</td>
                        <td>{alimento.carbohidratos}</td>
                        <td>{alimento.proteina}</td>
                        <td>{alimento.vitaminas}</td>
                        <td>{alimento.calcio}</td>
                        <td>{alimento.hierro}</td>
                        <button className="btn btn-danger" onClick={() => eliminarAlimento(alimento, 'meriendaTarde')}>Eliminar</button>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {cena.length > 0 && (
              <div>
                <h5>Cena</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Código de Barras</th>
                      <th>Descripción</th>
                      <th>Tamaño porción</th>
                      <th>Energía</th>
                      <th>Grasa</th>
                      <th>Sodio</th>
                      <th>Carbohidratos</th>
                      <th>Proteína</th>
                      <th>Vitaminas</th>
                      <th>Calcio</th>
                      <th>Hierro</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cena.map((alimento, index) => (
                      <tr key={index}>
                        <td>{alimento.alimento.nombre}</td>
                        <td>{alimento.alimento.codigobarra}</td>
                        <td>{alimento.alimento.descripcion}</td>
                        <td>{alimento.alimento.taman_porcion}</td>
                        <td>{alimento.alimento.energia}</td>
                        <td>{alimento.alimento.grasa}</td>
                        <td>{alimento.alimento.sodio}</td>
                        <td>{alimento.alimento.carbohidratos}</td>
                        <td>{alimento.alimento.proteina}</td>
                        <td>{alimento.alimento.vitaminas}</td>
                        <td>{alimento.alimento.calcio}</td>
                        <td>{alimento.alimento.hierro}</td>
                        <button className="btn btn-danger" onClick={() => eliminarAlimento(alimento, 'cena')}>Eliminar</button>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {fechaRegistro && (
            <div className="mt-4">
              <button className="btn btn-primary " onClick={guardarRegistro}>Guardar Registro</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegistroDiarioDeConsumo;
/*


import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../../../styleCss/Cliente/RegistroDC.css';

function RegistroDiarioDeConsumo() {
  const [desayuno, setDesayuno] = useState([]);
  const [meriendaManana, setMeriendaManana] = useState([]);
  const [almuerzo, setAlmuerzo] = useState([]);
  const [meriendaTarde, setMeriendaTarde] = useState([]);
  const [cena, setCena] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState('nombre');
  const [alimentosEncontrados, setAlimentosEncontrados] = useState([]);
  const [productos, setProductos] = useState([]);
  const [fechaRegistro, setFechaRegistro] = useState('');

  const buscarAlimento = () => {
    try {
      const alimentosEncontrados = filtro === 'nombre'
        ? productos.filter(alimento => alimento.nombre.toLowerCase().includes(busqueda.toLowerCase()))
        : productos.filter(alimento => alimento.codigo === busqueda);

      setAlimentosEncontrados(alimentosEncontrados);
    } catch (error) {
      console.log(error);
    }
  };

  const requestProduct = async () => {
    const url = 'https://apinutritecbd.azurewebsites.net/Externos/VisualizarProductosDisponibles';
    try {
      const response = await axios.get(url);
      setProductos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requestProduct();
  }, []);

  const agregarAlimento = (alimento, tiempoComida) => {
    if (fechaRegistro) {
      const registro = { alimento, tiempoComida, fecha: fechaRegistro };

      switch (tiempoComida) {
        case 'desayuno':
          setDesayuno([...desayuno, registro]);
          break;
        case 'meriendaManana':
          setMeriendaManana([...meriendaManana, registro]);
          break;
        case 'almuerzo':
          setAlmuerzo([...almuerzo, registro]);
          break;
        case 'meriendaTarde':
          setMeriendaTarde([...meriendaTarde, registro]);
          break;
        case 'cena':
          setCena([...cena, registro]);
          break;
        default:
          break;
      }
    } else {
      alert('Selecciona una fecha para agregar alimentos.');
    }
  };

 

  const eliminarAlimento = (alimento, tiempoComida) => {
    let listaActual = [];
    switch (tiempoComida) {
      case 'desayuno':
        listaActual = eliminarElemento(desayuno, alimento);
        setDesayuno(listaActual);
        break;
      case 'meriendaManana':
        listaActual = eliminarElemento(meriendaManana, alimento);
        setMeriendaManana(listaActual);
        break;
      case 'almuerzo':
        listaActual = eliminarElemento(almuerzo, alimento);
        setAlmuerzo(listaActual);
        break;
      case 'meriendaTarde':
        listaActual = eliminarElemento(meriendaTarde, alimento);
        setMeriendaTarde(listaActual);
        break;
      case 'cena':
        listaActual = eliminarElemento(cena, alimento);
        setCena(listaActual);
        break;
      default:
        break;
    }
  };

  const handleFechaRegistro = (event) => {
    setFechaRegistro(event.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>Registro Diario de Consumo</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <label htmlFor="fechaRegistro">Fecha de Registro:</label>
          <input type="date" id="fechaRegistro" className="form-control" value={fechaRegistro} onChange={handleFechaRegistro} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <label htmlFor="busqueda">Búsqueda:</label>
          <div className="input-group">
            <input type="text" id="busqueda" className="form-control" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
            <div className="input-group-append">
              <button className="btn btn-primary" onClick={buscarAlimento}>Buscar</button>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="filtro">Filtrar por:</label>
          <select id="filtro" className="form-control" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="nombre">Nombre</option>
            <option value="codigo">Código</option>
          </select>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <h2>Alimentos Encontrados:</h2>
          <ul className="list-group">
            {alimentosEncontrados.map((alimento) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={alimento.codigo}>
                {alimento.nombre} - Código: {alimento.codigo}
                <button className="btn btn-success" onClick={() => agregarAlimento(alimento)}>Agregar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="tiempo-comida">
            <h3>Desayuno</h3>
            <ul className="list-group">
              {desayuno.map((item) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={item.alimento.codigo}>
                  {item.alimento.nombre} - Código: {item.alimento.codigo}
                  <button className="btn btn-danger" onClick={() => eliminarAlimento(item, 'desayuno')}>Eliminar</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="tiempo-comida">
            <h3>Merienda Mañana</h3>
            <ul className="list-group">
              {meriendaManana.map((item) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={item.alimento.codigo}>
                  {item.alimento.nombre} - Código: {item.alimento.codigo}
                  <button className="btn btn-danger" onClick={() => eliminarAlimento(item, 'meriendaManana')}>Eliminar</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="tiempo-comida">
            <h3>Almuerzo</h3>
            <ul className="list-group">
              {almuerzo.map((item) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={item.alimento.codigo}>
                  {item.alimento.nombre} - Código: {item.alimento.codigo}
                  <button className="btn btn-danger" onClick={() => eliminarAlimento(item, 'almuerzo')}>Eliminar</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="tiempo-comida">
            <h3>Merienda Tarde</h3>
            <ul className="list-group">
              {meriendaTarde.map((item) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={item.alimento.codigo}>
                  {item.alimento.nombre} - Código: {item.alimento.codigo}
                  <button className="btn btn-danger" onClick={() => eliminarAlimento(item, 'meriendaTarde')}>Eliminar</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="tiempo-comida">
            <h3>Cena</h3>
            <ul className="list-group">
              {cena.map((item) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={item.alimento.codigo}>
                  {item.alimento.nombre} - Código: {item.alimento.codigo}
                  <button className="btn btn-danger" onClick={() => eliminarAlimento(item, 'cena')}>Eliminar</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistroDiarioDeConsumo;
*/