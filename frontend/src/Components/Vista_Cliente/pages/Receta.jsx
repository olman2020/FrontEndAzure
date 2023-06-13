import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Receta = () => {
  const [productos, setProductos] = useState([]);
  const [receta, setReceta] = useState([]);
  const [nombreReceta, setNombreReceta] = useState('');
  const [puedeEnviarReceta, setPuedeEnviarReceta] = useState(false);

  useEffect(() => {
    ObtenerProductos();
  }, []);

  // Función para simular la obtención de los productos desde la API
   const ObtenerProductos = async() => {
    // Datos estáticos de ejemplo
   try{ const response=await axios.get("https://apinutritecbd.azurewebsites.net/Externos/VisualizarProductosDisponibles")
    setProductos(response.data);
  }
    catch(error){
      console.error(error)
    }
  };

  // Función para agregar un producto a la receta
  const agregarProductoReceta = (producto) => {
    setReceta([...receta, producto]);
    setPuedeEnviarReceta(true);
  };

  // Función para manejar el cambio en el nombre de la receta
  const handleNombreRecetaChange = (e) => {
    setNombreReceta(e.target.value);
    setPuedeEnviarReceta(false);
  };

  // Función para enviar la receta a la API
  const enviarReceta = () => {
    if (nombreReceta !== '' && receta.length > 0) {
      const recetaData = {
        nombre: nombreReceta,
        productos: receta
      };
      console.log(recetaData)

      axios.post('https://apinutritecbd.azurewebsites.net/Externos/crearreceta', recetaData)
        .then((response) => {
          // Manejar la respuesta de la API si es necesario
         alert('su receta fue registrada correctamente')
        })
        .catch((error) => {
        alert('su receta no se ha podido registrar')
          console.error(error);
        });
    }
  };
  const eliminarElemento = async (lista, elemento,setlista) => {
  
      alert("Se eliminó el producto exitosamente");
      const nuevaLista = lista.filter((index) => {
        return index.codigobarra !== elemento.codigobarra;
      })
        setlista(nuevaLista)
      };

  return (
    <div className="container mt-4">
      <h1>Receta</h1>

      {/* Formulario para el nombre de la receta */}
      <form>
        <div className="mb-3">
          <label htmlFor="nombreReceta" className="form-label">Nombre de la Receta:</label>
          <input
            type="text"
            className="form-control"
            id="nombreReceta"
            value={nombreReceta}
            onChange={handleNombreRecetaChange}
          />
        </div>
      </form>

      {/* Tabla de productos */}
      <h2 style={{color:'black'}}>Productos:</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Código de barras único</th>
            <th>Descripción</th>
            <th>Tamaño de la porción (g/ml)</th>
            <th>Energía (Kcal)</th>
            <th>Grasa (g)</th>
            <th>Sodio (mg)</th>
            <th>Carbohidratos (g)</th>
            <th>Proteína (g)</th>
            <th>Vitaminas</th>
            <th>Calcio (mg)</th>
            <th>Hierro (mg)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.codigobarra}>
              <td>{producto.nombre}</td>
              <td>{producto.codigobarra}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.taman_porcion}</td>
              <td>{producto.energia}</td>
              <td>{producto.grasa}</td>
              <td>{producto.sodio}</td>
              <td>{producto.carbohidratos}</td>
              <td>{producto.proteina}</td>
              <td>{producto.vitaminas}</td>
              <td>{producto.calcio}</td>
              <td>{producto.hierro}</td>
              <td>
                <button className="btn btn-primary" onClick={() => agregarProductoReceta(producto)}>
                  Agregar a la receta
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tabla de la lista de receta */}
      <h2 style={{color:'black'}}>Lista de Receta:  {nombreReceta}</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Código de barras único</th>
            <th>Descripción</th>
            <th>Tamaño de la porción (g/ml)</th>
            <th>Energía (Kcal)</th>
            <th>Grasa (g)</th>
            <th>Sodio (mg)</th>
            <th>Carbohidratos (g)</th>
            <th>Proteína (g)</th>
            <th>Vitaminas</th>
            <th>Calcio (mg)</th>
            <th>Hierro (mg)</th>
          </tr>
        </thead>
        <tbody>
          {receta.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.codigoBarras}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.taman_porcion}</td>
              <td>{producto.energia}</td>
              <td>{producto.grasa}</td>
              <td>{producto.sodio}</td>
              <td>{producto.carbohidratos}</td>
              <td>{producto.proteina}</td>
              <td>{producto.vitaminas}</td>
              <td>{producto.calcio}</td>
              <td>{producto.hierro}</td>
              <button className="btn btn-danger" onClick={() => eliminarElemento(receta,producto,setReceta)}>
                  Eliminar
                </button>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para enviar la receta */}
      <button
        className="btn btn-primary"
        onClick={enviarReceta}
        disabled={!puedeEnviarReceta}
      >
        Enviar Receta
      </button>
    </div>
  );
};

export default Receta;

