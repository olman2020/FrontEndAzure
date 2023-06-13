import React, { useState } from 'react';
import axios from 'axios';
import '../../../styleCss/Cliente/GestionClienteProducto.css'

import { Button } from 'react-bootstrap';


function GestionClienteProducto() {
  const dataInit = {
    codigoB: '',
    tamano: 0,
    energia: 0,
    grasa: 0,
    sodio: 0,
    carbohidrato: 0,
    proteina: 0,
    vitamina: "",
    calcio: 0,
    descripcion: '',
    hierro: 0,
    nombre:""
  };

  const [data, setData] = useState(dataInit);

  const handlerData = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const sendInfo = async (event) => {
    event.preventDefault();
    const url = 'https://apinutritecbd.azurewebsites.net/Externos/crearproducto';
    try{const response = await axios.post(url, {
     nombre:data.nombre,
      codigobarra: data.codigoB,
      taman_porcion: data.tamano,
      energia: data.energia,
      Grasa: data.grasa,
      Sodio: data.sodio,
      carbohidratos: data.carbohidrato,
      proteina: data.proteina,
      vitaminas: data.vitamina,
      calcio: data.calcio,
      descripcion: data.descripcion,
      hierro: data.hierro,
      estadoproducto:false,
      idcreador:localStorage.getItem('cliente')
    });
    alert('Producto registrado con exito')}
    catch(error){
        console.error(error)
    }
  };

  /*const validateFields = () => {
    for (const key in data) {
      if (data[key] === '' || data[key]===0) {
        return false;
      }
    }
    return true;
  };*/

  return (
    <div className="productoContainer container-GestionProducto">
      <form className="div-producto">
        <label>Codigo de barra</label>
        <input type="text" name="codigoB" onChange={handlerData} />

        <label>Nombre del Producto</label> 
        <input type="text" name="nombre" onChange={handlerData} />

        <label>Tamaño de la Porcion</label>
        <input type="text" name="tamano" onChange={handlerData} />

        <label>Descripcion</label>
        <input type="text" name="descripcion" onChange={handlerData} />

        <label>{'Energia(Kcal)'}</label>
        <input type="text" name="energia" onChange={handlerData} />

        <label>{'Grasa(g)'}</label>
        <input type="text" name="grasa" onChange={handlerData} />

        <label>{'Sodio(mg)'}</label>
        <input type="text" name="sodio" onChange={handlerData} />

        <label>{'Carbohidratos(g)'}</label>
        <input type="text" name="carbohidrato" onChange={handlerData} />

        <label>{'Proteina(g)'}</label>
        <input type="text" name="proteina" onChange={handlerData} />

        <label>Vitaminas</label>
        <input type="text" name="vitamina" onChange={handlerData} />

        <label>{'Calcio(g)'}</label>
        <input type="text" name="calcio" onChange={handlerData} />

        <label>{"Hierro(mg)"}</label>
        <input type="text" name="hierro" onChange={handlerData} />

        <div className="boton-agregar">
          <Button variant="success" onClick={ sendInfo }>
            Añadir
          </Button>
        </div>
        <div>
          <Button variant="warning">
            <a href="/cliente/productos">Atras</a>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default GestionClienteProducto;
