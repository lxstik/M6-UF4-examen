"use client";

import { useEffect, useState } from "react";

// defino la interfaz de pelicula
interface Movie {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
}

//defino las propiedades de los props, por defecto no tiene pelicula seleccionada. esto me sirve para pasar la id de la pelicula seleccionada
interface PeliculasProps {
  onSelectMovie: (id: number) => void;
}

//cuando se hace click en una pelicula, lleno el prop con su id
export default function Peliculas({ onSelectMovie }: PeliculasProps) {
  // defino el estado de las peliculas para que sea un array vacío al principio, luego se llenará con las peliculas de la API
  const [movies, setMovies] = useState<Movie[]>([]);
  // utilizo useEffect para que se ejecute nada más al cargar el componente
  useEffect(() => {
    const API_KEY = "cfe82ea0a8a3a995d5a87aa74dd5e4e8";
    const BASE_URL = "https://api.themoviedb.org/3";

    // hago la petición a la api obteniendo las peliculas populares
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
      .then(function (respuesta) {
        // al obtener la respuesta la convierto a JSON para poder trabajar con esos datos
        return respuesta.json();
      })
      .then(function (datos) {
        // guardo los resultados en el estado
        setMovies(datos.results);
      });
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-3">
        {movies.map((movie) => (
          <div
            key={movie.id}
            // para mostrar el id por consola (depuracion)
            onClick={() => onSelectMovie(movie.id)} // función pasada desde el padre
            className="cursor-pointer hover:opacity-80 transition p-2"
          >
            <img
              // utilizo la url de la imagen de la api de la pelicula, lo mismo saco con los datos de votos y nombre
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-100 object-cover"
            />
            <div className="font-bold mt-2">
              <p>{movie.title}</p>
              <p>Valoración:⭐ {movie.vote_average} / 10</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
