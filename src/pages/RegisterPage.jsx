import RegisterForm from "../components/logged-out-forms/RegisterForm"
import {Link} from "react-router-dom"
import '../styles/Register.css'

const RegisterPage = () => {
    return (
        <div className="register--page">
            <img 
                className="page--logo" 
                src="https://storage.googleapis.com/spatakioutis_app_img/logo%20white.png" 
                alt="logo"
            />
            <RegisterForm />
            <h4>
                You already have an account?  
                <Link 
                    className="login--link" 
                    to="/login"
                > 
                {' Log in'}
                </Link>
            </h4>
        </div>
    )
}

export default RegisterPage