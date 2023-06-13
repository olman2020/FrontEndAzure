import React, { useState } from 'react'
import axios from 'axios'
import '../../styleCss/Templates/Producto.css'
import { Button } from 'react-bootstrap'
function Producto(){
    const dataInit={
      codigoB:"",
      tamano:"",
      energia:"",
      grasa:"",
      sodio:"",
      carbohidrato:"",
      proteina:"",
      vitamina:"",
      calcio:"",
      descripcion:"",
      hierro:""

    }
    const [data,setData]=useState(dataInit)
    const handlerData=(event)=>{
      setData({...data,[event.target.name]:event.target.value})
    }
    const sendInfo=async(event)=>{
      event.prevenDefault()
      const url=""
     const response= await axios.put(url,{
    
      CodigoB:data.codigoB,
      Tamano:data.tamano,
      Energia:data.energia,
      Grasa:data.grasa,
      Sodio:data.sodio,
      Carbohidrato:data.carbohidrato,
      Proteina:data.proteina,
      Vitamina:data.vitamina,
      Calcio:data.calcio,
      Descripcion:data.descripcion,
      Hierro:data.hierro
     })
     console.log(response)
    }
    return (
        <div className='productoContainer'>
          <form className='div-producto'> 
              <label>Codigo de barra </label>
              <input type='text'name='codigoB' onChange={handlerData}/>

              <label>Tamaño de la Porcion</label>
              <input type='text'name='tamano' onChange={handlerData}/>

              <label>Descripcion</label>
              <input type='text'name='descripcion'onChange={handlerData}/>
        
              <label>{'Energia(Kcal)'}</label>
              <input type='text' name='energia' onChange={handlerData}/>
        
              <label>{'Grasa(g)'}</label>
              <input type='text' name='grasa' onChange={handlerData}/>
            
              <label>{'Sodio(mg)'}</label>
              <input type='text'name='sodio' onChange={handlerData}/>

              <label>{'Carbohidratos(g)'}</label>
              <input type='text' name='carbohidrato' onChange={handlerData}/>
      
              <label>{'Proteina(g)'}</label>
              <input type='text' name='proteina'onChange={handlerData}/>
    
              <label>Vitaminas</label>
              <input type='text' name='vitamina' onChange={handlerData}/>
      
              <label>{'Calcio(g)'}</label>
              <input type='text' name='calcio' onChange={handlerData}/>
      
              <label>{"Hierro(mg)"}</label>
              <input type='text' name='hierro' onChange={handlerData}/>
           
            <div className="boton-agregar">
              <Button variant="success" onClick={sendInfo}>Añadir</Button>
            </div>
            <div>
             <Button variant="warning"> <a href="/nutricionista/productos">Atras</a></Button>
          </div>
          </form>
          
             
        </div>
    )
    

}

export default Producto