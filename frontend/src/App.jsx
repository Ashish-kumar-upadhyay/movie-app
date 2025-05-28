import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  if (!token) {
    return (
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <div>
      <nav style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => navigate('/add-movie')}>🎬 Add Movie</button>
        <button onClick={() => navigate('/movies')}>📃 List Movies</button>
        <button onClick={handleLogout}>🚪 Logout</button>
      </nav>

      <Routes>
        <Route path="/add-movie" element={<MovieForm />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="*" element={<Navigate to="/movies" replace />} />
      </Routes>
    </div>
  );
}

export default App;
