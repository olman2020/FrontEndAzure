import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import generatePDF from 'pdf-generator';
import axios from 'axios';
import { DatePicker } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../../../styleCss/Cliente/Reporte.css';

function Reporte() {
  const pdfref = useRef();
  const [medidas, setMedidas] = useState([]);
  const [fechaI, setFechaI] = useState(null);
  const [fechaF, setFechaF] = useState(null);

  const changeFechaI = (e) => {
    setFechaI(e.target.value);
  };

  const changeFechaF = (e) => {
    setFechaF(e.target.value);
  };

  const obtenerMedidasRegistradas = async () => {
    try {
      const url = 'https://apinutritecbd.azurewebsites.net/Cliente/Consulta_por_Periodo_medidas';
      const response = await axios.post(url, {
        correocliente: localStorage.getItem('cliente'),
        fechainicio: fechaI,
        fechafinal: fechaF,
      });

      setMedidas(response.data);
      console.log('data', response.data);
    } catch (error) {
      console.error('Error al obtener las medidas registradas:', error);
    }
  };

  const downloadReportePDF = () => {
    if (medidas.length > 0) {
      const input = pdfref.current;
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4', true);
        const pdfwidth = pdf.internal.pageSize.getWidth();
        const pdfheight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgheight = canvas.height;
        const ratio = Math.min(pdfwidth / imgWidth, pdfheight / imgheight);
        const imgx = (pdfwidth - imgWidth * ratio) / 2;
        const imgy = 30;
        pdf.addImage(imgData, 'PNG', imgx, imgy, imgWidth * ratio, imgheight * ratio);
        pdf.save('medidas.pdf');
      });
    } else {
      console.log('No hay medidas disponibles');
    }
  };

  return (
    <div className="container" ref={pdfref}>
      <div className="row">
        <div className="col-md-6">
          <label className="form-label">Fecha Inicio:</label>
          <input type="date" className="form-control" onChange={changeFechaI} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Fecha Final:</label>
          <input type="date" className="form-control" onChange={changeFechaF} />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-6">
          <button className="btn btn-success" onClick={obtenerMedidasRegistradas}>
            Obtener Medidas Registradas
          </button>
        </div>
        <div className="col-md-6">
          <button className="btn btn-primary" onClick={downloadReportePDF}>
            Generar Reporte PDF
          </button>
        </div>
      </div>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Cintura  cm </th>
            <th>Cuello cm</th>
            <th>Caderas cm</th>
            <th>% de Musculo</th>
            <th>% de Grasa</th>
            <th>fecha</th>
          </tr>
        </thead>
        <tbody>
          {medidas.map((index) => {
            return (
              <tr key={index.id}>
                <td>{index.cintura}</td>
                <td>{index.cuello}</td>
                <td>{index.caderas}</td>
                <td>{index.porcentajemusculo}</td>
                <td>{index.porcentajegrasa}</td>
                <td>{index.fecha}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Reporte;
