import React from 'react'
import {BsArrowLeft} from 'react-icons/bs'
import {useNavigate} from 'react-router-dom'
import './page.css'
import video from '../assets/video.mp4'

const Player = () => {
    const navigate = useNavigate();
  return (
    <div>
      <div className="player">
        <div className="play-back">
            <BsArrowLeft onClick={()=>navigate(-1)}  />
        </div>
        <video src={video} controls autoPlay muted loop></video>
      </div>
    </div>
  )
}

export default Player
