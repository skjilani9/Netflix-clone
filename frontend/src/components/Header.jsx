import React from 'react'
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import './style.css'

const Header = (props) => {
    const navigate = useNavigate()
  return (
    <div className='head'>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Log In" : "Sign In"}
      </button>
    </div>
  )
}

export default Header
