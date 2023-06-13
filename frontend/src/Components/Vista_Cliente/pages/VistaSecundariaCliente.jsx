import React from 'react'
import Card from '../../templates/Card'
import '../../../styleCss/Cliente/VistaMainCliente.css'
import AfterShow from './vistaAfter'
function VistaSecundariaCliente(){
    return(
       
        <div className='VistaMainCliente'>
            <div className='vista-after'>
                <AfterShow/>
            </div>
            <div className='container-card'>
              <Card title='Registro Consumo' url='/cliente/consumo' imageUrl={'https://img.freepik.com/vector-gratis/ilustracion-concepto-caza-productos_114360-791.jpg?size=626&ext=jpg&ga=GA1.1.1762212929.1685554050&semt=robertav1_2_sidr'}/>
               <Card title='Gestion Producto' url='/cliente/productos' imageUrl={'https://img.freepik.com/vector-gratis/productos-alimenticios-cotidianos-comunes-conjunto-imagenes-predisenadas-dibujos-animados-queso-pescado-salchichas-leche_1284-42699.jpg?size=626&ext=jpg&ga=GA1.1.1762212929.1685554050&semt=robertav1_2_sidr'}/>
               <Card title='Gestion receta' url={'/cliente/receta'} imageUrl={'https://img.freepik.com/vector-gratis/concepto-culinario-ilustracion-restaurante-negocios_81522-1043.jpg?size=626&ext=jpg&ga=GA1.1.1762212929.1685554050&semt=robertav1_2_sidr'}/>
              <Card title='Reporte de Avance' url={'/cliente/reporte'} imageUrl={'https://img.freepik.com/vector-gratis/hombre-negocios-documento_23-2147519967.jpg?size=626&ext=jpg&ga=GA1.1.1762212929.1685554050&semt=robertav1_2_sidr'}/>
              <Card title='Registro de medidas' url={'/cliente/medidas'} imageUrl={'https://img.freepik.com/iconos-gratis/gobernante_318-476945.jpg?size=626&ext=jpg&ga=GA1.2.1762212929.1685554050&semt=robertav1_2_sidr'}/>
              <Card title='Productos Agregados' url={'/cliente/productosagregados'}  imageUrl={'https://img.freepik.com/foto-gratis/divertida-ilustracion-dibujos-animados-3d-hombre-negocios-indio_183364-114494.jpg?size=626&ext=jpg&ga=GA1.1.1762212929.1685554050&semt=ais'}/>
              <Card title='Ver Recetas' url={'/cliente/verreceta'}  imageUrl={'https://img.freepik.com/vector-gratis/ilustracion-sopa-calabaza-diseno-plano_23-2149316022.jpg?size=626&ext=jpg&ga=GA1.2.1762212929.1685554050&semt=sph'}/>
            </div>
           
        </div>
        )
}

export default VistaSecundariaCliente