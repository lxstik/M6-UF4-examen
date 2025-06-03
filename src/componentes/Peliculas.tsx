//el componente se ejecuta en el cliente, para poder usar hooks
"use client";

import { useEffect, useState } from "react";

export default function Peliculas() {
  //defino el estado de las peliculas para que sea un array vacío al principio, luego se llenará con las peliculas de la API
  const [movies, setMovies] = useState([]);

  //utilizo useEffect para que se ejecute nada más al cargar el componente
  useEffect(() => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  //hago la petición a la API obteniendo las peliculas populares
  fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    .then(function(respuesta) {
      //al obtener la respuesta la convierto a JSON para poder trabajar con esos datos
      return respuesta.json();
    })
    .then(function(datos) {
      // guardo los resultados en el estado
      setMovies(datos.results);
    });
}, []);

  
   return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap]">
        {movies.map((movie) => (
          <div key={movie.id} style={{padding: "0px 0px 20px 0px"}}>
            <img
            //utilizo la url de la imagen de la api de la pelicula, lo mismo saco con los datos de votos y nombre
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="w-full h-100 object-cover"
            />
            <div className="font-bold">
              <p>{movie.title}</p>
              <p>
                Valoración:⭐ {movie.vote_average} / 10
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}