import Table from 'react-bootstrap/Table';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css'

function Tabla({lista}) {
  
    const [listaP,setListaP]=useState(lista)
    const añadir=(event)=>{
        event.preventDefault()
    

    }
    const eliminar=()=>{
            
        }

    
  return (
   
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Codigo de Barra</th>
          <th>Descripcion</th>
          <th>Tamaño Porcion</th>
          <th>Energia</th>
          <th>Grasa</th>
          <th>Sodio</th>
          <th>Carbohidratos</th>
          <th>Proteina</th>
          <th>Vitaminas</th>
          <th>Calcio</th>
          <th>Hierro</th>
       
          
        </tr>
      </thead>
      <tbody>
        {
  
    
        listaP.map(index=>{
            console.log("index",listaP)
             return( <tr>
               <td>2</td>
               <td>{index.codigo}</td>
               <td>{index.des}</td>
               <td>{index.tam}</td>
               <td>{index.energia}</td>
               <td>{index.grasa}</td>
               <td>{index.sodio}</td>
               <td>{index.carbohidratos}</td>
               <td>{index.prote}</td>
               <td>{index.vitaminas}</td>
               <td>{index.calcio}</td>
               <td>{index.hierro}</td>
               <td>
                 <a href="/nutricionista/editar">
                 <i class="fa-sharp fa-regular fa-pen-to-square"></i>
                 </a>
        
                 <a href="/nutricionista/eliminar">
                 <i class="fa-sharp fa-solid fa-trash"></i>
                </a></td>             
             </tr>)
        

            
        })
        }


      </tbody>
    </Table>
  );
}

export default Tabla;