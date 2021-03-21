import './Login.css';
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Hamburger from './Hamburger';
import Footer from './Footer'


    export default function Login(){

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

    function handleChange(e) {
    }

    function submit() {
   
    }

    function Login() {
        return (
            <div>
                <Hamburger pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />  
                <div className="login">
                    <div className="form">
                        <form className="login-form" onSubmit={(e) => { submit(); e.preventDefault(); }}>
                            <img id="logo" src="/logo.svg" />
                            <input autoFocus={true} type="email" name="username" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <button type="submit">login</button>
                            <p className="message">Not registered? <Link to="/Signup">Create an account</Link></p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />

        );
    }
}