import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from '../utlis/Firebase'
import Background from '../components/Background'
import Header from '../components/Header'
import './page.css'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, password);
        } catch (error) {
            console.log(error.code);
        }
    }

    onAuthStateChanged(firebaseAuth,(currentUser)=>{
        if(currentUser){
            navigate("/")
        }
    })

    return (
        <div className="login">
            <Background />
            <div className="login-content">
                <Header />
                <div className="login-body">
                    <div className="login-form">
                        <div className="log-title">
                            <h3>Log in</h3>
                        </div>
                        <div className="login-con">
                            <input
                                type="text"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <button onClick={handleLogin}>Login to your account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
