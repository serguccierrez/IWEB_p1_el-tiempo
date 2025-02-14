import React from "react";
import "./Tarjeta.css";

// Componente que muestra los datos de un día concreto de la consulta a la API
export default function Tarjeta(props) {
  // Formatear la fecha a un formato más legible para el usuario
  const date = new Date(props.days.date_epoch * 1000).toLocaleDateString(
    "es-ES"
  );

  return (
    <div className="tarjeta">
      <div id="date">{date}</div>
      <img className="tiempoimg" src={props.days.day.condition.icon}></img>
      <div id="temperatura">Temp: {props.days.day.avgtemp_c}ºC</div>
      <div id="humedad">Humedad: {props.days.day.avghumidity}%</div>
      <div id="viento">Viento: {props.days.day.maxwind_kph}m/s</div>
    </div>
  );
}
