import { useState } from 'react';
import axios from 'axios';
import '../styles/MovieForm.css';

const MovieForm = () => {
  const [form, setForm] = useState({
    title: '', description: '', releaseYear: '', genre: '',
    director: '', rating: '', image: null
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => data.append(key, value));

    try {
      await axios.post('https://movie-app-1-8ppw.onrender.com/movies', data, {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Movie added!");
      setForm({
        title: '', description: '', releaseYear: '', genre: '',
        director: '', rating: '', image: null
      });
    } catch {
      alert("Failed to add movie");
    }
  };

  return (
    <div className="movie-form-container">
      <div className="movie-form-header">
        <button className="back-button" onClick={() => window.history.back()}>
          <span className="button-icon">🔙</span>
          Back
        </button>
        <h2>Add New Movie</h2>
      </div>
      
      <form className="movie-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Movie Title</label>
          <input 
            id="title"
            name="title" 
            value={form.title}
            placeholder="Enter movie title" 
            onChange={handleChange} 
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description"
            name="description" 
            value={form.description}
            placeholder="Enter movie description" 
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="releaseYear">Release Year</label>
            <input 
              id="releaseYear"
              name="releaseYear" 
              value={form.releaseYear}
              placeholder="YYYY" 
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input 
              id="genre"
              name="genre" 
              value={form.genre}
              placeholder="Movie genre" 
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="director">Director</label>
            <input 
              id="director"
              name="director" 
              value={form.director}
              placeholder="Movie director" 
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <input 
              id="rating"
              name="rating" 
              value={form.rating}
              type="number" 
              min="0" 
              max="10" 
              step="0.1"
              placeholder="0-10" 
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="image">Movie Poster</label>
          <input 
            id="image"
            name="image" 
            type="file" 
            onChange={handleChange}
            accept="image/*"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
