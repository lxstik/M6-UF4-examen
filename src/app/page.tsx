'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
const IMAGE_SIZE = 'w500';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('https://api.themoviedb.org/3/movie/popular', {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        if (!Array.isArray(data.results)) {
          console.error('Formato inesperado de respuesta:', data);
          return;
        }

        setMovies(data.results.slice(0, 2));
      } catch (error) {
        console.error('Error al obtener películas:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <main className="grid gap-6 p-6 md:grid-cols-2">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="rounded-2xl shadow-md overflow-hidden border border-gray-200"
        >
          <Image
            src={`${BASE_IMAGE_URL}${IMAGE_SIZE}${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="w-full object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
            <p className="text-sm text-gray-600 line-clamp-3">
              {movie.overview}
            </p>
          </div>
        </div>
      ))}
    </main>
  );
}
