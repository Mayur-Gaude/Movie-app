import React from 'react';
import { Routes,Route } from 'react-router-dom';
import MovieCard from './components/MovieCard';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import NavBar from './components/NavBar';
import './css/App.css';
import { MovieProvider } from './contexts/MoviesContext';

function App() {

  return (
    <MovieProvider>
      <NavBar/>
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
        </Routes>
      </main>
    </MovieProvider>
  )
}

export default App
