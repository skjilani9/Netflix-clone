import React from 'react'
import {FaPowerOff , FaSearch} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import { signOut } from "firebase/auth";
import {firebaseAuth} from '../utlis/Firebase'
import logo from "../assets/logo.png";
import './style.css'

const Navbar = ({ isScrolled }) => {
    const navigate = useNavigate()
    const links = [
        { name: "Home", link: "/" },
        { name: "TV Shows", link: "/tv" },
        { name: "Movies", link: "/movies" },
        { name: "My List", link: "/mylist" },
    ];
    const handleclick = ()=>{
        navigate("/search")
    }

    return (
        <div className="navbar">
            <nav className={`${isScrolled ? "scrolled" : ""} nav-con`}>
                <div className="left ">
                    <div className="brand">
                        <img src={logo} alt="Logo" />
                    </div>
                    <ul className="links">
                        {links.map(({ name, link }) => {
                            return (
                                <li key={name}>
                                    <Link to={link}>{name}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="right">
                    <div className={`search`}>
                        <button onClick={handleclick}>
                            <FaSearch />
                        </button>
                    </div>
                    <button onClick={() => signOut(firebaseAuth)}>
                        <FaPowerOff />
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
