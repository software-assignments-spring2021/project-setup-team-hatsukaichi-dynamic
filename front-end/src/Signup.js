import './Signup.css';
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Hamburger from './Hamburger';
import Footer from './Footer'



export default function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleChange(e) {
        e.preventDefault();
    }

    function submit(e) {
        
    }

    function Signup() {
        return(

            <div>
                <Hamburger pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />  


                <div className="login">
                    <div className="form">
                        <form className="register-form" onSubmit={(e) => {submit();  e.preventDefault(); }}>
                            <br />
                            <input type="email" name="email" placeholder="email" value={email} onChange={ (e) => setEmail(e.target.value)} required />
                            <input type="password" name="password" placeholder="create a password" value={password} onChange={ (e) => setPassword(e.target.value)} required />
                            <input type="password" name="passwordconfirm" placeholder="confirm password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <button type="submit">create account</button>
                            <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
                        </form>
                    </div>
                </div>
            <Footer/> 

            </div>
        );
    }


}