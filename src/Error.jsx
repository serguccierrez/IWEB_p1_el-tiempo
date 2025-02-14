import React from "react";
import "./Error.css";

// Componente que muestra un mensaje de error en caso de que la llamada a la API no sea exitosa
const ErrorMessage = (props) => {
  return (
    <div id="error">
      <h2>Error</h2>
      <p>{props.message}</p>
      <p>Code: {props.code}</p>
    </div>
  );
};

export default ErrorMessage;
