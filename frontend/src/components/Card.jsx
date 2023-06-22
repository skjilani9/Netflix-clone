import React, { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {IoMdPlayCircle} from 'react-icons/io'
import {RiThumbUpFill,RiThumbDownFill} from 'react-icons/ri'
import {AiOutlinePlus} from 'react-icons/ai'
import {BsCheck} from 'react-icons/bs'
import {BiChevronDown} from 'react-icons/bi'
import './style.css'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../utlis/Firebase'
import axios from 'axios'
import { removeMovieFromLiked } from '../store/store'
import video from '../assets/video.mp4'

const Card = ({ moviedata, isliked }) => {
    const navigate = useNavigate();
    const [ishovered, setIshovered] = useState(false)
    const dispatch = useDispatch()
    const [email , setEmail] = useState("")

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
          setEmail(currentUser.email);
        } else navigate("/login");
    });

    const addtolist = async()=>{
        try {
            await axios.post("https://net-nxoa.onrender.com/api/user/add",{email,data:moviedata})
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className='movie-box' onMouseEnter={() => setIshovered(true)} onMouseLeave={() => setIshovered(false)}>
            <img src={`https://image.tmdb.org/t/p/w500${moviedata.image}`} alt="card" onClick={()=>navigate("/player")} />
            {ishovered && (
                <div className="hover">
                    <div className="image-video">
                        <img src={`https://image.tmdb.org/t/p/w500${moviedata.image}`} alt="card" onClick={()=>navigate("/player")} />
                        <video src={video} loop autoPlay controls muted  onClick={()=>navigate("/player")} />
                    </div>
                    <div className="info-cont">
                        <h3 className='info-name' onClick={() => navigate("/player")}>{moviedata.name}</h3>
                        <div className="info-icons">
                            <div className="info-controls">
                                <IoMdPlayCircle
                                    title="Play"
                                    onClick={() => navigate("/player")}
                                />
                                <RiThumbUpFill title="Like" />
                                <RiThumbDownFill title="Dislike" />
                                {isliked ? (<BsCheck title="Remove from List" onClick={()=>dispatch(removeMovieFromLiked({movieId:moviedata.id,email}))} />) :(<AiOutlinePlus title="Add to my list" onClick={addtolist} />)}
                            </div>
                            <div className="info-more">
                                <BiChevronDown title="More Info" />
                            </div>
                        </div>
                        <div className="info-gener">
                            <ul>
                                {!moviedata.genres ? null : moviedata.genres.map((gener)=>(
                                    <li key={gener}>{gener}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default memo(Card)
