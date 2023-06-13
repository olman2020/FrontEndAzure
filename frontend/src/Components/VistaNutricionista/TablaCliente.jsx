import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

function TablaCliente({clientes})
{  const [pacientes,setpacientes]=useState(clientes)

    return(
        <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Apellido1</th>
          <th>Apellido2</th>
          <th>Pais</th>
          <th>Peso</th>
          <th>correo</th>  
        </tr>
      </thead>
      <tbody>
        {
  

        pacientes.map(index=>{
         
             return( <tr>
               <td>2</td>
               <td>{index.Nombre}</td>
               <td>{index.Apellido1}</td>
               <td>{index.Apellido2}</td>
               <td>{index.Pais}</td>
               <td>{index.Peso}</td>
               <td>{index.Correo}</td>
               
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
    )
}

export default TablaCliente