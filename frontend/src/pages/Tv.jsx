import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store/store';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import Notavailable from '../components/Notavailable';
import Selectgenre from '../components/Selectgenre';
import './page.css'
import { firebaseAuth } from '../utlis/Firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Tv = () => {
    const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "tv" }));
    }
  }, [dispatch,genresLoaded ,genres]);


  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });


  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  
  return (
    <div className="movies">
        <div className="navbar">
            <Navbar isScrolled={isScrolled} />
        </div>
        <div className="movie-data">
            <Selectgenre genres={genres} type="tv" />
            {movies.length ? <Slider movies={movies} />:<Notavailable />}
        </div>
    </div>
  )
}

export default Tv