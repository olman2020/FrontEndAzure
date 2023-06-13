import axios from "axios";
import React from "react";
function VerReceta(){

    const peticion=async()=>{
        const url=''
        try {const response=await axios.get(url)
        }catch(error){
            console.error(error)
        }
    }
    return (
        <div>

        </div>
    )
}

export default VerReceta