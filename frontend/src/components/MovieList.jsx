import { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/MoviesList.css"
const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('https://movie-app-1-8ppw.onrender.com/movies')
      .then(res => setMovies(res.data))
      .catch(() => alert("Failed to load movies"));
  }, []);

  return (
    <div className="movies-container">
      <div className="movies-header">
        <button className="back-button" onClick={() => window.history.back()}>
          <span className="button-icon">🔙</span>
        
        </button>
        <h2>Movie Collection</h2>
      </div>

      <div className="movies-grid">
        {movies.map(movie => (
          <div key={movie._id} className="movie-card">
            <div className="movie-poster">
              <img src={`https://movie-app-1-8ppw.onrender.com/uploads/${movie.image}`} alt={movie.title} />
            </div>
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p className="movie-description">{movie.description}</p>
              <div className="movie-meta">
                <span className="meta-item">
                  <span className="icon">🎬</span> {movie.genre}
                </span>
                <span className="meta-item">
                  <span className="icon">🎞️</span> {movie.releaseYear}
                </span>
              </div>
              <div className="movie-meta">
                <span className="meta-item">
                  <span className="icon">🎥</span> {movie.director}
                </span>
                <span className="meta-item">
                  <span className="icon">⭐</span> {movie.rating}/10
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
