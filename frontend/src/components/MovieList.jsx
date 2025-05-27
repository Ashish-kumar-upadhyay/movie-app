import { useEffect, useState } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/movies')
      .then(res => setMovies(res.data))
      .catch(err => console.error("Failed to fetch movies"));
  }, []);

  return (
    <div>
      {movies.map(movie => (
        <div key={movie._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <img src={`http://localhost:5000/uploads/${movie.image}`} alt={movie.title} width={150} />
          <h3>{movie.title}</h3>
          <p>{movie.description}</p>
          <p><b>Year:</b> {movie.releaseYear} | <b>Genre:</b> {movie.genre}</p>
          <p><b>Director:</b> {movie.director} | <b>Rating:</b> {movie.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
