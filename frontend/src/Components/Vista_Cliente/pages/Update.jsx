import React, { useState } from 'react';
import axios from 'axios';
import '../../../styleCss/Cliente/GestionClienteProducto.css'

import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

   
function UpdateClienteProducto({id,fun}) {

    const dataInit={
        nombre:id.nombre,
        codigoBarra: id.codigoBarra,
        tamanPorcion: id.tamanPorcion,
        energia: id.energia,
        grasa: id.grasa,
        sodio: id.sodio,
        carbohidratos: id.carbohidratos,
        proteina: id.proteina,
        vitaminas: id.vitaminas,
        calcio: id.calcio,
        descripcion: id.descripcion,
        hierro: id.hierro,
        estadoproducto:false,
        idcreador:localStorage.getItem('cliente')
      }
    const [data, setData] = useState(dataInit);
    const navigate=useNavigate()

   

  const handlerData = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const sendInfo = async (event) => {
    event.preventDefault();
    const url = 'https://apinutritecbd.azurewebsites.net/Externos/actualizarproducto';
    const datainfo={
        nombre:data.nombre,
        codigoBarra: id.codigoBarra,
        tamanPorcion: data.tamanPorcion,
        energia: data.energia,
        grasa: data.grasa,
        sodio: data.sodio,
        carbohidratos: data.carbohidratos,
        proteina: data.proteina,
        vitaminas: data.vitaminas,
        calcio: data.calcio,
        descripcion: data.descripcion,
        hierro: data.hierro,
        estadoproducto:false,
        idcreador:localStorage.getItem('cliente')
      }
      console.log(datainfo)
    try{const response = await axios.put(url, datainfo);
    alert("el producto se actualizo correctamente")
    navigate('/cliente/productosagregados')
    fun(false)
    console.log(response);}
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
        <input type="text" value={data.codigoBarra} name="codigoB" onChange={handlerData} />

        <label>Nombre del Producto</label> 
        <input type="text" value={data.nombre} name="nombre" />

        <label>Tamaño de la Porcion</label>
        <input type="text" value={data.tamanPorcion}  name="tamanPorcion" onChange={handlerData} />

        <label>Descripcion</label>
        <input type="text" value={data.descripcion} name="descripcion" onChange={handlerData} />

        <label>{'Energia(Kcal)'}</label>
        <input type="text" value={data.energia} name="energia" onChange={handlerData} />

        <label>{'Grasa(g)'}</label>
        <input type="text" value={data.grasa} name="grasa" onChange={handlerData} />

        <label>{'Sodio(mg)'}</label>
        <input type="text" value={data.sodio} name="sodio" onChange={handlerData} />

        <label>{'Carbohidratos(g)'}</label>
        <input type="text" value={data.carbohidratos} name="carbohidratos" onChange={handlerData} />

        <label>{'Proteina(g)'}</label>
        <input type="text" value={data.proteina} name="proteina" onChange={handlerData} />

        <label>Vitaminas</label>
        <input type="text" value={data.vitaminas} name="vitaminas" onChange={handlerData} />

        <label>{'Calcio(g)'}</label>
        <input type="text" value={data.calcio} name="calcio" onChange={handlerData} />

        <label>{"Hierro(mg)"}</label>
        <input type="text" value={data.hierro} name="hierro" onChange={handlerData} />

        <div className="boton-agregar">
          <Button variant="success" onClick={ sendInfo }>
            Actualizar
          </Button>
        </div>
        <div>
          <Button variant="warning">
            <a href="/nutricionista/productos">Atras</a>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateClienteProducto;
