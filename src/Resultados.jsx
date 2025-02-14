import React from "react";
import Tarjeta from "./Tarjeta";
import "./Resultados.css";

// Componente que muestra los resultados de la consulta a la API
export default function Resultados({ numitems, datos }) {
  // Seleccionar los días a mostrar en función del número de elementos a mostrar
  const forecastDaysToShow = datos.forecast.forecastday.slice(0, numitems);

  return (
    //Muestra parte de los datos obtenidos de la API
    <div id="resultados">
      <div id="timezone">Timezone: {datos.location.tz_id}</div>
      <div id="country">País: {datos.location.country}</div>
      <div id="city">Ciudad: {datos.location.name}</div>
      <div id="infoMessage">El tiempo en los próximos días será:</div>

      {/* Muestra los datos de los días seleccionados creando las tarjetas como componene reusable */}
      <div className="resultados-container">
        {forecastDaysToShow.map((days, index) => (
          <Tarjeta key={index} days={days} />
        ))}
      </div>
    </div>
  );
}
