import { useState } from 'react';
import axios from 'axios';

const MovieForm = () => {
  const [form, setForm] = useState({
    title: '', description: '', releaseYear: '', genre: '', director: '', rating: '', image: null
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const data = new FormData();

    for (let key in form) {
      data.append(key, form[key]);
    }

    try {
      await axios.post('http://localhost:5000/movies', data, {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Movie added!");
    } catch {
      alert("Failed to add movie");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title"   placeholder="Title" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="releaseYear" placeholder="Year" onChange={handleChange} />
      <input name="genre" placeholder="Genre" onChange={handleChange} />
      <input name="director" placeholder="Director" onChange={handleChange} />
      <input name="rating" type='number' placeholder="Rating" onChange={handleChange} />
      <input name="image" type="file" onChange={handleChange} />
      <button>Submit</button>
    </form>
  );
};

export default MovieForm;
