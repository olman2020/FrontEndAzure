
import React, { useState } from "react";
import "../../../styleCss/Cliente/Alert.css"; // Archivo de estilos CSS para el alert

const Alert = () => {
  const [showAlert, setShowAlert] = useState(true);

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <div>
      {showAlert && (
        <div className="alert">
          <span className="closebtn" onClick={closeAlert}>&times;</span>
          <strong>¡Alerta!</strong> Esto es un mensaje de alerta personalizado.
        </div>
      )}
    </div>
  );
};

export default Alert;







