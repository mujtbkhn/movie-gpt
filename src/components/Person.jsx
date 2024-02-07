import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN, OPTIONS } from "../utils/constants";
import MovieCard from "./MovieCard";

const Person = () => {
  const [details, setDetails] = useState([]);
  const [credits, setCredits] = useState([]);
  const { personId } = useParams();

  useEffect(() => {
    fetchPersonDetails();
    fetchPersonCredits();
  }, [personId]);

  const fetchPersonDetails = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/person/${personId}`,
      OPTIONS
    );
    const json = await data.json();
    // console.log(json);
    setDetails(json);
  };

  const fetchPersonCredits = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/person/${personId}/movie_credits`,
      OPTIONS
    );
    const json = await data.json();
    // console.log(json);
    setCredits(json.cast);
  };

  return (
    <div>
      <div className="md:flex">
        <div className="w-screen m-4 md:p-5 md:m-5 md:flex">
          <img src={IMG_CDN + details.profile_path} />
        </div>
        <div className="flex flex-col gap-5 p-3 m-3 md:p-5 md:m-5">
          <h1 className="text-3xl italic font-semi-bold">{details.name}</h1>
          <p className="text-sm md:text-md">{details.biography}</p>
          <p className="font-bold">{details.place_of_birth}</p>
          <p className="text-xl">Birthday: {details.birthday}</p>
          <h1 className="text-xl">Popularity: {details.popularity}</h1>
        </div>
      </div>
      <h1 className="flex justify-center p-4 text-2xl font-bold md:text-3xl">Movies {details.name} has worked in: </h1>
      <div className="flex flex-wrap justify-center gap-5 p-3">
        {credits.map((movie) => (
          <MovieCard
            className="flex flex-row p-5 m-5"
            key={movie.id}
            posterPath={movie?.poster_path}
            id={movie.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Person;