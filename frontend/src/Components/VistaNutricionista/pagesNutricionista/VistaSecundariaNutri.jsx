import React from 'react';
import Card from '../../templates/Card';
//import '../../../styleCss/Cliente/VistaMainCliente.css';

function VistaSecundariaNutri() {
  //se cargan la vista de opciones que puede escoger realizar el nutricionista
  return (
    <div className='container center' style={{display:'flex'}}>
      <div className='row'  style={{display:'flex'}}  >
      
        <div className='col-md-7'>
          <Card
            title='Agregar cliente'
            url='/nutricionista/agregarcliente'
            imageUrl='https://img.freepik.com/vector-gratis/ilustracion-representante-ventas-diseno-plano-dibujado-mano_23-2149347412.jpg?size=626&ext=jpg&ga=GA1.2.1762212929.1685554050&semt=robertav1_2_sidr'
            className='card'
          />
        </div>
        <div className='col-md-7'>
          <Card
            title='Gestion Producto'
            url='/nutricionista/productos'
            imageUrl='https://img.freepik.com/vector-gratis/productos-alimenticios-cotidianos-comunes-conjunto-imagenes-predisenadas-dibujos-animados-queso-pescado-salchichas-leche_1284-42699.jpg?size=626&ext=jpg&ga=GA1.1.1762212929.1685554050&semt=robertav1_2_sidr'
            className='card'
          />
        </div>
      </div>

      <div className='row'>
      
        <div className='col-md-7'>
          <Card
            title='Gestion de Planes'
            url='/nutricionista/planes'
            imageUrl='https://img.freepik.com/vector-gratis/productos-alimenticios-cotidianos-comunes-conjunto-imagenes-predisenadas-dibujos-animados-queso-pescado-salchichas-leche_1284-42699.jpg?size=626&ext=jpg&ga=GA1.1.1762212929.1685554050&semt=robertav1_2_sidr'
            className='card'
          />
        </div>
        <div className='col-md-7'>
          <Card title='Asignar Plan' url='/nutricionista/asignarplan' className='card' imageUrl={'https://img.freepik.com/vector-gratis/presentacion-nuevo-proyecto-empresarial_1284-3426.jpg?size=626&ext=jpg&ga=GA1.1.1762212929.1685554050&semt=ais'}/>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-7'>
          <Card title='Paciente' url='/nutricionista/paciente' className='card'  imageUrl={'https://img.freepik.com/vector-gratis/ilustracion-evaluacion-fisica_23-2150076865.jpg?size=626&ext=jpg&ga=GA1.1.1762212929.1685554050&semt=ais'}/>
        </div>
        <div className='col-md-7'>
          <Card
            title='Lista de Paciente'
            url='/nutricionista/listapaciente'
            imageUrl='https://img.freepik.com/vector-gratis/encontrar-persona-oportunidad-trabajo_24877-63457.jpg?size=626&ext=jpg&ga=GA1.1.1762212929.1685554050&semt=robertav1_2_sidr'
            className='card'
          />
        </div>
      </div>
    </div>
  );
}

export default VistaSecundariaNutri;
