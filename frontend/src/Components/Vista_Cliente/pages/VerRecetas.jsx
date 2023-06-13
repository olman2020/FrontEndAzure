import React, { useEffect, useState } from 'react'
import axios from 'axios'
function VerReceta2(){
    const [receta,setReceta]=useState([])

    const peticionRecetas=async()=>{
        const url='https://apinutritecbd.azurewebsites.net/Externos/RecetasDisponibles'
        try {const response=await axios.get(url)
          setReceta(response.data)
        }
        catch(error){
            console.error(error)
        }
        
    }
  useEffect(()=>{
    peticionRecetas()
  })
    const eliminarReceta=async(id)=>{
        const url=`https://apinutritecbd.azurewebsites.net/Externos/eliminarreceta/${id}`
        await axios.delete(url)

    }
    return(
        <div>
          
              {/* Tabla de la lista de receta */}
      <h2 style={{color:'black'}}>Lista de Receta:  {'ih'}</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            
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
            <tr>
              <td>{producto.nombre}</td>
              
              <td>{producto.taman_porcion}</td>
              <td>{producto.energia}</td>
              <td>{producto.grasa}</td>
              <td>{producto.sodio}</td>
              <td>{producto.carbohidratos}</td>
              <td>{producto.proteina}</td>
              <td>{producto.vitaminas}</td>
              <td>{producto.calcio}</td>
              <td>{producto.hierro}</td>
              <button className="btn btn-danger" onClick={() => eliminarReceta(producto.nombre)}>
                  Eliminar
                </button>
            </tr>
          ))}
        </tbody>
      </table>

        </div>
    )
}

export default VerReceta2