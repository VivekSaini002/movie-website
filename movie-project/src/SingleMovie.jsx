import React from "react";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "./context.jsx";
import { useNavigate } from "react-router-dom";

export const SingleMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { singleMovie, getSingleMovie, loading, isError } =
    useContext(AppContext);

  useEffect(() => {
    getSingleMovie(id);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-4xl text-white bg-gray-900">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-4xl bg-gray-900">
        {isError}
      </div>
    );
  }

  if (!singleMovie) return null;

  return (
    <section className=" min-h-screen bg-gray-900 text-white">
      {/* 🎥 BANNER */}
      <div className="container max-w-7xl mx-auto px-4 pt-6">
        <div
          className="relative h-[540px] rounded-3xl overflow-hidden bg-cover bg-center shadow-2xl"
          style={{ backgroundImage: `url(${singleMovie.Poster})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

          {/* Banner Content */}
          <div className="relative z-10 h-full flex flex-col justify-end px-10 pb-14">
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-wide mb-5">
              {singleMovie.Title}
            </h1>

            <div className="flex flex-wrap gap-4 text-gray-300 text-xl">
              <span>{singleMovie.Year}</span>
              <span>•</span>
              <span>{singleMovie.Genre}</span>
              <span>•</span>
              <span>{singleMovie.Runtime}</span>
            </div>

            {singleMovie.imdbRating && (
              <div className="mt-6 inline-flex items-center gap-3 bg-yellow-500 text-black px-6 py-3 rounded-2xl text-xl font-bold w-fit shadow-lg">
                ⭐ IMDb {singleMovie.imdbRating}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 📄 DETAILS */}
      <div className="container max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-14">
        {/* Poster */}
        <div className="md:col-span-1 flex justify-center">
          <img
            src={singleMovie.Poster}
            alt={singleMovie.Title}
            className="rounded-3xl shadow-2xl hover:scale-105 transition duration-300"
          />
        </div>

        {/* Story & Info */}
        <div className="md:col-span-2 space-y-10">
          <h2 className="text-4xl font-bold border-b border-gray-700 pb-4">
            Storyline
          </h2>

          <p className="text-3xl text-gray-300 leading-relaxed tracking-wide ">
            {singleMovie.Plot}
          </p>

          <div className="text-2xl grid sm:grid-cols-2 gap-x-12 gap-y-6 pt-5">
            <Info label="Director" value={singleMovie.Director} />
            <Info label="Writer" value={singleMovie.Writer} />
            <Info label="Actors" value={singleMovie.Actors} />
            <Info label="Language" value={singleMovie.Language} />
            <Info label="Country" value={singleMovie.Country} />
            <Info label="Awards" value={singleMovie.Awards} />
          </div>
        </div>
      </div>

      {/* 🔙 GO BACK BUTTON (BOTTOM CENTER) */}
      <div className="flex justify-center pb-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 
                 px-14 py-5
                 text-3xl font-extrabold 
                 bg-red-600 hover:bg-red-700 
                 rounded-full shadow-2xl 
                 transition duration-300"
        >
          ← Go Back
        </button>
      </div>
    </section>
  );
};

/* 🧩 Reusable Info Component */
const Info = ({ label, value }) => (
  <p className="text-gray-300">
    <span className="font-semibold text-white">{label}:</span> {value || "N/A"}
  </p>
);
