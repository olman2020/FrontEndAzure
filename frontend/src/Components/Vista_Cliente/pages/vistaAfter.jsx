import React, { useEffect,useState } from 'react'
import axios from 'axios';
function AfterShow(){
  const [planNombre, setPlanNombre] = useState('');
  const [productos, setProductos] = useState([]);
  const [nutricionista,setNutricionista]=useState("")
  const [fechaI,setFechaI]=useState("")
  const [fechaF,setFechaF]=useState('')
  // estados iniciales

  //busca los planes asignados para el cliente
  const peticionPlanes=async()=>{
    const url=`https://apinutritecbd.azurewebsites.net/Cliente/ObtenerPlanCliente${localStorage.getItem('cliente')}`
    try {const response=await axios.get(url)
            setPlanNombre(response.data.planNombre)
            setNutricionista(response.data.nutricionista)
            setFechaI(response.data.fechainicio)
            setFechaF(response.data.fechafinalizacion)
            
    
    }
    catch(error){
        console.error(error)
    }
  }


  useEffect(()=>{
    peticionPlanes()
  },
  [])

    
    return(
        <div>

           <div className='titulo-vista2'><h1>Planes para el usuario de correo {localStorage.getItem('cliente')}</h1></div>
           <table className='table'>
            <thead>
                <tr>
                    <th>
                        Nutricionista
                    </th>
                    <th>
                        Nombre del Plan
                    </th>
                    <th>
                        Fecha de inicio
                    </th>
                    <th>
                        fecha de finalizacin
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {nutricionista}
                    </td>
                    <td>
                        {planNombre}
                    </td>
                    <td>
                        {fechaI}
                    </td>
                    <td>
                        {fechaF}
                    </td>
                </tr>
            </tbody>
           </table>

        </div>
    )
}

export default AfterShow