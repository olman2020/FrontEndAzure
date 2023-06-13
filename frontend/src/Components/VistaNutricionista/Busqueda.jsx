 import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Client from './Client'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
//do a get for client
function Buscador(){

   const [cliente,setcliente]=useState("")
   const[clientes,setClientes]=useState([])
   useEffect(()=>{
    handlerClients()
   },[]) 
    const handlerClients=async (event)=>{
        event.preventDefault()
        const url=""
        const response=axios.get(url)
        setClientes(response.data)
    }
    const changeClient=(event)=>{
        setcliente(event.target.value)
    }
    return (
    <div className='div-buscador'>
    <nav className="navbar navbar-light bg-light ">

    <form class="form-inline">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={changeClient}/>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={handlerClients   }>Search</button>
       </form>
   </nav>
   <div className='clientes'>
        {clientes.map((index)=>{
           return <Client/>
        })}
   </div>


   </div>


   )
    
}

export default Buscador