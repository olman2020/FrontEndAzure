import React from 'react';
import Card from '../../../templates/Card';
import '../../../../styleCss/Templates/Card.css';

function VistaSecundariaAdm() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <Card
            title="Productos"
            url="/administrador/productos"
            imageUrl="https://img.freepik.com/vector-gratis/productos-alimenticios-cotidianos-comunes-conjunto-imagenes-predisenadas-dibujos-animados-queso-pescado-salchichas-leche_1284-42699.jpg?size=626&ext=jpg&ga=GA1.1.1762212929.1685554050&semt=robertav1_2_sidr"
            className="card"
          />
        </div>
        <div className="col-md-6">
          <Card
            title="Reporte"
            url="/administrador/reporte"
            imageUrl="https://img.freepik.com/vector-gratis/doodle-grafico-informe-empresarial_53876-6522.jpg?size=626&ext=jpg&ga=GA1.1.1762212929.1685554050&semt=robertav1_2_sidr"
            className="card"
          />
        </div>
      </div>
    </div>
  );
}

export default VistaSecundariaAdm;
