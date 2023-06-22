import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utlis/Firebase';
import { getUsersLikedMovies } from '../store/store';
import './page.css'

const Mylist = () => {
    const movies = useSelector((state) => state.netflix.movies);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [email, setEmail] = useState(undefined);

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setEmail(currentUser.email);
        else navigate("/login");
    });
    
    useEffect(() => {
        if (email) {
          dispatch(getUsersLikedMovies(email));
        }
    }, [dispatch,email]);
    
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

  return (
    <div>
        <Navbar isScrolled={isScrolled} />
        <div className="mylist-cont">
            <h1>My List</h1>
            <div className="mylist-box">
                {movies.map((movies,index)=>{
                    return(
                        <Card moviedata={movies} isliked={true} key={index} index={index} />
                    )
                })}
            </div>
        </div>
      
    </div>
  )
}

export default Mylist
