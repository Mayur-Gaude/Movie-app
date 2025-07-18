import React from 'react'
import '../css/Favorites.css'
import { useMovieContext } from '../contexts/MoviesContext';
import { useState } from 'react';
import MovieCard from '../components/MovieCard';

function Favorites() {

  const { favorites } = useMovieContext();

  if(favorites){
    return(
      <div className='favorites'>
        <h2>Your Favorite Movies</h2>
        <div className="movie-grid">
          {favorites.map((movie) => 
            <MovieCard movie={movie} key={movie.id} />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className='favorites-empty'>
        <h2>NO favorite movies yet</h2>
        <p>Start adding to your favorites and they will appear here</p>
      
    </div>
  )
}

export default Favorites
