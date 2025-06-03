"use client";

import { useState } from "react";
import Peliculas from "@/componentes/Peliculas";
import Detalle from "@/componentes/Detalle";

export default function MovieExplorer() {

    //defino el estado de la pelicula seleccionada, por defecto eta vacio
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  //funcion para seleccionar la pelicula, recibe el id de la pelicula seleccionada para guardarla en el estado
  const seleccionarPelicula = (id: number) => {
    setSelectedMovieId(id);
  };

  return (
    <div className="flex mx-auto">
      <div className="max-w-[900px] w-2/5">
        <Peliculas onSelectMovie={seleccionarPelicula} />
      </div>
      <div className="max-w-[900px] w-3/5">
        <Detalle movieId={selectedMovieId} />
      </div>
    </div>
  );
}
