import React, { useEffect, useState } from "react";
import { IMG_CDN, IMG_CDN_ORG, OPTIONS } from "../utils/constants";

const HeroSection = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/movie?page=1`,
        OPTIONS
      );
      const json = await data.json();
    //   console.log(json.results);
    const randomIndex = Math.floor(Math.random() * 20)
    const randomMovie = json?.results?.[randomIndex]
      setMovies(randomMovie);
      console.log(randomMovie);
    } catch (error) {
      console.log("error occurred while fetching: ", error);
    }
  };
  return (
    <>
      <div className="w-screen h-screen text-white bg-[#04152D] ">
        <img className="w-screen  opacity-60 object-cover h-[700px]" src={IMG_CDN_ORG + movies.backdrop_path} alt="" />
      </div>
    </>
  );
};

export default HeroSection;
