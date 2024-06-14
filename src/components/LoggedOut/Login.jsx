import React from 'react'
import LoginForm from "./LoginForm"
import {Link} from "react-router-dom"
import '../../styles/Login.css'

function Login() {
    return ( 
        <div className="login--page">
            <img className="page--logo" src="./images/logo white.png" alt="logo"/>
            <LoginForm />
            <a className="reset-password--link" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">Forgot password?</a>
            <h4>
                You don't have an account? 
                <Link className="register--link" 
                      to="/register"
                >
                {' Register'}
                </Link>
            </h4>
        </div>
    )
}

export default Login