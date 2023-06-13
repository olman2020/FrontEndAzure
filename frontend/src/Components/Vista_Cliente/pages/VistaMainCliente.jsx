import React from 'react'
import Card from '../../templates/Card'
import '../../../styleCss/Cliente/VistaMainCliente.css'
import BarraNav from '../../Barra'
function VistaMainCliente(){
    return(
        <>
         <BarraNav/>
        <div style={{display:'flex',justifyContent:'center', alignItems:'center', position:'relative', top:'100px'}}>
            <Card title='Registro' url='cliente/registro' imageUrl={"https://img.freepik.com/vector-gratis/ilustracion-concepto-sesion-movil_114360-135.jpg?size=626&ext=jpg&ga=GA1.1.1762212929.1685554050&semt=robertav1_2_sidr"}/>
            <Card title='Login' url='/cliente/login' imageUrl={'https://img.freepik.com/vector-gratis/ilustracion-icono-avatar-usuario_53876-5907.jpg?size=626&ext=jpg&ga=GA1.2.1762212929.1685554050&semt=robertav1_2_sidr'}/>
        </div>
        </>
        )
}

export default VistaMainCliente