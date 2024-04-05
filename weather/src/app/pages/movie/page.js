"use client"
import { useState, useEffect } from 'react';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Get search term from localStorage
    const storedSearchTerm = localStorage.getItem('weatherDescription');
    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    }
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=9baae4da8a1781958898000d9e78aae7&query=${searchTerm}`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    if (searchTerm) {
      fetchMovies();
    }
  }, [searchTerm]);

  useEffect(() => {
    if (movies.length > 0) {
      setSelectedMovie(movies[0]); // Select the first movie item
    }
  }, [movies]);

  const handleSearchTermChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    // Store search term in localStorage
    localStorage.setItem('searchTerm', term);
  };

  return (
    <div class="flex justify-center items-center h-full">
  <input
    type="text"
    value={searchTerm}
    onChange={handleSearchTermChange}
    placeholder="Enter search term"
    class="p-2 border border-gray-300 rounded-md mr-2"
  />
  {selectedMovie && (
    <div class="max-w-500px">
      <h2 class="text-xl font-bold mb-2">{selectedMovie.title}</h2>
      {selectedMovie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
          alt={selectedMovie.title}
          class="max-w-full h-auto"
        />
      )}
      <p class="mt-2">{selectedMovie.overview}</p>
    </div>
  )}
</div>

  
  );
};

export default MovieSearch;
