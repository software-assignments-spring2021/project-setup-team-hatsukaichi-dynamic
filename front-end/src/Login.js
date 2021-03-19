import './Login.css';
import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Login extends Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.flash = true;
        this.state = {
            username: "",
            password: "",
            errorMsg: ""
        }
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value })
    }

    submit() {
   
    }

    render() {
        return (
            <div>
                
                <div className="login">
                    <div className="form">
                        <form className="login-form" onSubmit={(e) => { this.submit(); e.preventDefault(); }}>
                            <img id="logo" src="/logo192.png" />
                            <div className="error">{this.state.errorMsg}</div>
                            <input autoFocus={true} type="email" name="username" placeholder="email" value={this.state.email} onChange={this.handleChange} required/>
                            <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} required />
                            <button type="submit">login</button>
                            <p className="message">Not registered? <Link to="/register">Create an account</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;