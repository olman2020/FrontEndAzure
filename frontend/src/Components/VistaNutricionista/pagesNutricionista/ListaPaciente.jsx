import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
function ListaPaciente() {
   const [clientes,setclientes]=useState([])
   
   const navigate=useNavigate()
   //carga los pacientes a la hora de visualizar la pagina
    useEffect(()=>{
      getInfopatient()
   },[]) 
   //obtiene los pacientes del nutricionista
   const getInfopatient=async()=>{
      const url=`https://apinutritecbd.azurewebsites.net/Nutricionista/ObtenerPacientesPorCedula/${localStorage.getItem('cedula')}`
        try{const response= await axios.get(url)
        const data=response.data
        console.log(data)
        setclientes(data)}
        catch(error){
          console.log(error)
        }
    }
  
    
    
    
    /*const deletePatient=async(id)=>{
       const url='http://localhost:2000/clientes'
      try{ await axios.delete(`${url}${id}`)
       getInfoClient()
       }
       catch(error){
        console.log(error)
       }

    }*/
    const revisar=(user)=>{
      localStorage.setItem('user',user)
      navigate('/nutricionista/paciente')
    }
    
    return (
      <>
      <h1 style={{textAlign:'center'}}>Pacientes </h1>
      <Table striped bordered hover size="sm" style={{padding:'20px', margin:'50px'}}>
        
        <thead>
          <tr>
        
            <th>Nombre</th>
            <th>Correo</th>
          
            
          </tr>
        </thead>
        <tbody>
          {
             clientes.map(index=>{
         
              return( <tr>
                
                <td>{index.nombre}</td>
                <td>{index.correoElectronico}</td>
                <button className='btn btn-success' onClick={()=> revisar(index.correoElectronico)}>Revisar</button>
                         
              </tr>)
         
 
             
         })
         }
        </tbody>
      </Table>
      </>
    );
  }
  
  export default ListaPaciente;