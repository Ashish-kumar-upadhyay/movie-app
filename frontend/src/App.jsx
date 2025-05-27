import { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div>
      {!token ? (
        <>
          <Signup />
          <Login setToken={setToken} />
        </>
      ) : (
        <>
          <MovieForm />
          <MovieList />
        </>
      )}
    </div>
  );
}

export default App;
