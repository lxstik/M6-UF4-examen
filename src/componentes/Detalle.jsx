"use client";

import { useEffect, useState } from "react";

export default function Detalle({ movieId }) {
  //defino el estado para guardar la info de la película, por defecto esta vacio
  const [movie, setMovie] = useState(null);


  useEffect(() => {
    const API_KEY = "cfe82ea0a8a3a995d5a87aa74dd5e4e8";
    const BASE_URL = "https://api.themoviedb.org/3";

    //hago la peticion a la api para obtener detalles de la pelicula
    fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
      .then(function (respuesta) {
        //convierto la respuesta a JSON para poder manejar los datos
        return respuesta.json();
      })
      //guardo los datos de la película en el estado
      .then(function (datos) {
        setMovie(datos);
      })
  }, [movieId]);

  //si no hay pelicula seleccionada muestro mensaje
  if (!movieId) {
    return <div>Selecciona una pelicula para ver sus detalles </div>;
  }


  return (
    <div className="p-4">
      
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="mb-4"
      />
      <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
      <p>Fecha de estreno: {movie.release_date}
      </p>
      <p>Valoracion: <br/>⭐ {movie.vote_average} / 10
      </p>
      <p>Sinopsis:</p>
      <p>{movie.overview}</p>
    </div>
  );
}
