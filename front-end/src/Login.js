import './Login.css';
import React, { useState } from "react";
import { Link } from 'react-router-dom';


    export default function Login(){

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");

    function handleChange(e) {
        this.setState({[e.target.name]: e.target.value })
    }

    function submit() {
   
    }

    function Login() {
        return (
            <div>
                
                <div className="login">
                    <div className="form">
                        <form className="login-form" onSubmit={(e) => { this.submit(); e.preventDefault(); }}>
                            <img id="logo" src="/logo192.png" />
                            <input autoFocus={true} type="email" name="username" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            <input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <button type="submit">login</button>
                            <p className="message">Not registered? <Link to="/register">Create an account</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}