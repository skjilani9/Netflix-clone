import React from 'react'
import background from "../assets/login.jpg";
import './style.css'

const Background = () => {
  return (
    <div className='backimg'>
      <img src={background} alt="background" />
    </div>
  )
}

export default Background
