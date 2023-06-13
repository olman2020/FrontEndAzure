import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
const ReporteCobro = () => {
  const [reportData, setReportData] = useState(false);
  const[dataReporte,setDataReporte]=useState([])
  const pdfref=useRef()


      const Generar_reporte=async()=>{
          try{const response=await axios.get('https://apinutritecbd.azurewebsites.net/Administrador')
          setReportData(true)
          setDataReporte(response.data)    
        } 
          catch(error){
            console.error(error)
          }
        }
    

  const downloadReportePDF = () => {
    
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
  
    
  };

 
  return (
    <div ref={pdfref}>
      <h1 style={{textAlign:'center', marginTop:'50px'}}>Reporte de Cobro</h1>
      <button style={{marginLeft:'50px'}} onClick={Generar_reporte}>Generar Reporte</button>
      {reportData && (
        <>
          <table className='table' style={{margin:'50px'}}>
            <thead>
              <tr>
                <th>cedula</th>
                <th>Tipo de cobro</th>
                <th>Nombre</th>
                <th>Apellido1</th>
                <th>Apellido2|</th>
                <th>Numero de tarjeta credito</th>
                <th>Monto total</th>
                <th>Descuento</th>
                <th>Monto a cobrar</th>
              </tr>
            </thead>
            <tbody>
              {dataReporte.map((item, index) => (
                <tr key={index}>
                  <td>{item.NutricionistaID}</td>
                  <td>{item.TipoCobro}</td>
                  <td>{item.Nombre}</td>
                  <td>{item.Apellido1}</td>
                  <td>{item.Apellido2}</td>
                  <td>{item.NumTarjetaCredito}</td>
                  <td>{item.MontoTotal}</td>
                  <td>{item.Descuento}</td>
                  <td>{item.MontoCobrar}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button style={{marginLeft:'50px'}} onClick={downloadReportePDF}>Exportar a PDF</button>
        </>
      )}
    </div>
  );
};

export default ReporteCobro
