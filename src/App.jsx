import { useState } from "react";
import CONFIG from "./config/config";
import "./App.css";
import Header from "./Header";
import Resultados from "./Resultados";
import Error from "./Error.jsx";
import { mock1 } from "./constants/mock.js";

function App() {
  const [lat, setLatitud] = useState(CONFIG.default_lat);
  const [lon, setLongitud] = useState(CONFIG.default_lon);
  const [weatherData, setData] = useState("");
  const [error, setError] = useState({ message: "", code: "" });

  // Llamada a la API para obtener los datos
  const fetchWeatherData = async (event) => {
    try {
      //Prevenir el comportamiento por defecto del formulario para que no se recargue la página
      event.preventDefault();

      console.log(
        "Los valores se han actualizado correctamente a : " + lat + " " + lon
      );

      // Si en el archivo de confguracion se ha establecido que se use el servidor, se hace la llamada a la API
      if (CONFIG.use_server) {
        const response = await fetch(
          `${CONFIG.server_url}?key=${CONFIG.api_key}&q=${lat},${lon}&days=${CONFIG.num_items_query}&aqi=no&alerts=no`
        );

        console.log("Código de respuesta:" + response.status);

        // Se comprueba si se fuerza un error del servidor o si la respuesta es correcta
        if (CONFIG.force_error) {
          setError({ message: "Este error ha sido forzado", code: "666" });

          // Si la respuesta es correcta, se obtiene el JSON y se establece la variable 'weatherData' con los datos
        } else if (response.status === 200) {
          const data = await response.json();
          setData(data);

          // Si la respuesta es exitosa, se restablece la variable 'error' a vacío
          setError(" ");

          // Si no se ha recibido una respuesta exitosa, se restablece la variable 'weatherData' a vacío y se muestra un mensaje de error
        } else {
          setData("");

          // Se obtiene el mensaje de error y el código de error de la respuesta y se establecen en la variable 'error' para mostrarlos en el componente 'Error'
          const errorData = await response.json();
          console.log(errorData);
          const errorMessage = response.statusText;
          const errorMessage2 = errorData.error.message;
          const errorCode = response.status;
          setError({
            message: errorMessage + ": " + errorMessage2,
            code: errorCode,
          });
        }

        // Si en el archivo de configuración se ha establecido que no se use el servidor, se establece la variable 'weatherData' con los datos del mock
      } else {
        setData(mock1);
      }
    } catch (error) {
      console.error("Ha habido un error: ", error);
    }
  };

  return (
    <>
      {/* Componente de cabecera */}
      <Header />
      <h2 id="titulo">El tiempo</h2>

      {/* Formulario para ingresar latitud y longitud */}
      <form onSubmit={fetchWeatherData}>
        <label htmlFor="latitud">Latitud:</label>
        <input
          id="latitud"
          type="number"
          name="lat"
          placeholder="Introduce la latitud"
          value={lat}
          onChange={(e) => setLatitud(e.target.value)}
          required
        />

        <label htmlFor="longitud">Longitud:</label>
        <input
          id="longitud"
          type="number"
          name="lon"
          placeholder="Introduce la longitud"
          value={lon}
          onChange={(e) => setLongitud(e.target.value)}
          required
        />

        <button id="buscar" type="submit">
          Buscar
        </button>
      </form>

      {/* Mostrar componente de error si hay un mensaje de error */}
      {error.message && (
        <>
          <Error message={error.message} code={error.code} />
        </>
      )}

      {/* Mostrar el componente Resultados si hay datos disponibles */}
      {weatherData && (
        <>
          <Resultados numitems={CONFIG.num_items_show} datos={weatherData} />
        </>
      )}
    </>
  );
}

export default App;
