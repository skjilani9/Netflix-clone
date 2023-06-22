import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from 'react-icons/fa'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import './page.css'
import { fetchMovies, getGenres } from '../store/store';
import Slider from '../components/Slider';
import { firebaseAuth } from '../utlis/Firebase';
import { onAuthStateChanged } from 'firebase/auth';


const Netflix = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.netflix.movies)
  const genres = useSelector((state) => state.netflix.genres)
  const genresLoaded = useDispatch((state)=>state.netflix.genresLoaded)

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])


  useEffect(() => {
    if(genresLoaded){
      dispatch(fetchMovies({genres,type:"all"}))
    }
  }, [dispatch,genresLoaded,genres])

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });
  


  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className="background-image"
        />
        <div className="conta">
          <div className="log">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons">
            <button
              onClick={() => navigate("/player")}
              className="btn"
            >
              <FaPlay />
              Play
            </button>
            <button className="btns">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </div>
  )
}

export default Netflix
