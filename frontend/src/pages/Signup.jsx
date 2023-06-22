import React, { useState } from 'react'
import Background from '../components/Background'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import {firebaseAuth} from '../utlis/Firebase'
import './page.css'

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleSignIn = async () => {
        try {
            const { email, password } = formValues;
            await createUserWithEmailAndPassword(firebaseAuth, email, password)
        } catch (error) {
            console.log(error);
        }
    };
    const handleclick = ()=>{
        if(formValues.email.length!==0){
            setShowPassword(true)
        }
    }

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) navigate("/");
    });
    return (
        <div className="signup">
            <Background />
            <div className="content">
                <Header login />
                <div className="content-body">
                    <div className="content-text">
                        <h1>Unlimited movies, TV shows and more.</h1>
                        <h4>Watch anywhere. Cancel anytime.</h4>
                        <h6>Ready to watch? Enter your email to create or restart membership.</h6>
                    </div>
                    <div className="form" style={{gridTemplateColumns:showPassword ? "1fr 1fr" : "2fr 1fr"}}>
                        <input
                            type="email"
                            placeholder="Email address"
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            name="email"
                            value={formValues.email}
                        />
                        {showPassword && (
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) =>
                                    setFormValues({
                                        ...formValues,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                                name="password"
                                value={formValues.password}
                            />
                        )}
                        {!showPassword && (
                            <button onClick={handleclick}>Get Started</button>
                        )}
                    </div>
                    {showPassword && <button onClick={handleSignIn}>Sign up</button>}
                </div>
            </div>
        </div>
    )
}

export default Signup
