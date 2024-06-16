import React from 'react'
import LoginForm from "../components/logged-out-forms/LoginForm"
import {Link} from "react-router-dom"
import '../styles/pages/LoginPage.css'
import '../styles/logged-out-forms/RegisterForm.css'

const LoginPage = () => {
    return ( 
        <div className="login--page">
            <img 
                className = "page--logo" 
                src = "https://storage.googleapis.com/spatakioutis_app_img/logo%20white.png" 
                alt = "logo"
            />
            <LoginForm />
            <a 
                className="reset-password--link" 
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
                target="_blank"
            >
                Forgot password?
            </a>
            <h4>
                You don't have an account? 
                <Link 
                    className="register--link" 
                    to="/register"
                >
                {' Register'}
                </Link>
            </h4>
        </div>
    )
}

export default LoginPage