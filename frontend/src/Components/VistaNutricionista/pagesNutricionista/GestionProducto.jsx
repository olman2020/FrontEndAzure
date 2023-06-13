/*import React, { useState } from 'react';
import axios from 'axios';
import '../../../styleCss/Cliente/GestionClienteProducto.css'

import { Button } from 'react-bootstrap';


function GestionNutricionistaProducto() {
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
      grasa: data.grasa,
      sodio: data.sodio,
      carbohidratos: data.carbohidrato,
      proteina: data.proteina,
      vitaminas: data.vitamina,
      calcio: data.calcio,
      descripcion: data.descripcion,
      hierro: data.hierro,
      estadoproducto:false,
      idcreador:localStorage.getItem('cedula')
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
  };

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
            <a href="/nutricionista/vistasecundaria">Atras</a>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default GestionNutricionistaProducto;
*/

import React, { useState } from 'react';
import axios from 'axios';
import '../../../styleCss/Cliente/GestionClienteProducto.css';
import { Button, Form, Alert } from 'react-bootstrap';

function GestionNutricionistaProducto() {
  const dataInit = {
    codigoB: '',
    tamano: 0,
    energia: 0,
    grasa: 0,
    sodio: 0,
    carbohidrato: 0,
    proteina: 0,
    vitamina: '',
    calcio: 0,
    descripcion: '',
    hierro: 0,
    nombre: ''
  };

  const [data, setData] = useState(dataInit);
  const [errors, setErrors] = useState({});

  const handlerData = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const validateFields = () => {
    const fieldErrors = {};
    let isValid = true;

    for (const key in data) {
      if (data[key] === '' || data[key] === 0) {
        fieldErrors[key] = 'Este campo es requerido.';
        isValid = false;
      }
    }

    if (
      !Number.isInteger(parseInt(data.tamano)) ||
      !Number.isInteger(parseInt(data.energia)) ||
      !Number.isInteger(parseInt(data.grasa)) ||
      !Number.isInteger(parseInt(data.sodio)) ||
      !Number.isInteger(parseInt(data.carbohidrato)) ||
      !Number.isInteger(parseInt(data.proteina)) ||
      !Number.isInteger(parseInt(data.calcio)) ||
      !Number.isInteger(parseInt(data.hierro))
    ) {
      fieldErrors['integers'] =
        'Los campos "porción, energía, grasa, sodio, carbohidratos, proteína, calcio, hierro" deben ser números enteros.';
      isValid = false;
    }

    setErrors(fieldErrors);
    return isValid;
  };

  const sendInfo = async (event) => {
    event.preventDefault();

    if (!validateFields()) {
      return;
    }

    const url = 'https://apinutritecbd.azurewebsites.net/Externos/crearproducto';

    try {
      const response = await axios.post(url, {
        nombre: data.nombre,
        codigobarra: data.codigoB,
        taman_porcion: data.tamano,
        energia: data.energia,
        grasa: data.grasa,
        sodio: data.sodio,
        carbohidratos: data.carbohidrato,
        proteina: data.proteina,
        vitaminas: data.vitamina,
        calcio: data.calcio,
        descripcion: data.descripcion,
        hierro: data.hierro,
        estadoproducto: false,
        idcreador: localStorage.getItem('cedula')
      });

      alert('Producto registrado con éxito.');
    } catch (error) {
      console.error(error);
      alert('Ha surgido un problema a la hora de guardar el producto.');
    }
  };

  return (
    <div className="productoContainer container-GestionProducto">
      <Form className="div-producto">
        <Form.Group controlId="codigoB">
          <Form.Label>Código de barra</Form.Label>
          <Form.Control type="text" name="codigoB" onChange={handlerData} />
          {errors.codigoB && <Alert variant="danger">{errors.codigoB}</Alert>}
        </Form.Group>

        <Form.Group controlId="nombre">
          <Form.Label>Nombre del Producto</Form.Label>
          <Form.Control type="text" name="nombre" onChange={handlerData} />
          {errors.nombre && <Alert variant="danger">{errors.nombre}</Alert>}
        </Form.Group>

        <Form.Group controlId="tamano">
          <Form.Label>Tamaño de la Porción</Form.Label>
          <Form.Control type="text" name="tamano" onChange={handlerData} />
          {errors.tamano && <Alert variant="danger">{errors.tamano}</Alert>}
        </Form.Group>

        <Form.Group controlId="descripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control type="text" name="descripcion" onChange={handlerData} />
          {errors.descripcion && <Alert variant="danger">{errors.descripcion}</Alert>}
        </Form.Group>

        <Form.Group controlId="energia">
          <Form.Label>Energía (Kcal)</Form.Label>
          <Form.Control type="text" name="energia" onChange={handlerData} />
          {errors.energia && <Alert variant="danger">{errors.energia}</Alert>}
        </Form.Group>

        <Form.Group controlId="grasa">
          <Form.Label>Grasa (g)</Form.Label>
          <Form.Control type="text" name="grasa" onChange={handlerData} />
          {errors.grasa && <Alert variant="danger">{errors.grasa}</Alert>}
        </Form.Group>

        <Form.Group controlId="sodio">
          <Form.Label>Sodio (mg)</Form.Label>
          <Form.Control type="text" name="sodio" onChange={handlerData} />
          {errors.sodio && <Alert variant="danger">{errors.sodio}</Alert>}
        </Form.Group>

        <Form.Group controlId="carbohidrato">
          <Form.Label>Carbohidratos (g)</Form.Label>
          <Form.Control type="text" name="carbohidrato" onChange={handlerData} />
          {errors.carbohidrato && <Alert variant="danger">{errors.carbohidrato}</Alert>}
        </Form.Group>

        <Form.Group controlId="proteina">
          <Form.Label>Proteína (g)</Form.Label>
          <Form.Control type="text" name="proteina" onChange={handlerData} />
          {errors.proteina && <Alert variant="danger">{errors.proteina}</Alert>}
        </Form.Group>

        <Form.Group controlId="vitamina">
          <Form.Label>Vitaminas</Form.Label>
          <Form.Control type="text" name="vitamina" onChange={handlerData} />
          {errors.vitamina && <Alert variant="danger">{errors.vitamina}</Alert>}
        </Form.Group>

        <Form.Group controlId="calcio">
          <Form.Label>Calcio (g)</Form.Label>
          <Form.Control type="text" name="calcio" onChange={handlerData} />
          {errors.calcio && <Alert variant="danger">{errors.calcio}</Alert>}
        </Form.Group>

        <Form.Group controlId="hierro">
          <Form.Label>Hierro (mg)</Form.Label>
          <Form.Control type="text" name="hierro" onChange={handlerData} />
          {errors.hierro && <Alert variant="danger">{errors.hierro}</Alert>}
        </Form.Group>

        {errors.integers && <Alert variant="danger">{errors.integers}</Alert>}

        <div className="boton-agregar">
          <Button variant="success" onClick={sendInfo}>
            Añadir
          </Button>
        </div>

        <div>
          <Button variant="warning">
            <a href="/nutricionista/vistasecundaria">Atrás</a>
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default GestionNutricionistaProducto;
