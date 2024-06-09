import RegisterForm from "./RegisterForm"
import {Link} from "react-router-dom"
import '../../styles/Register.css'

function Register() {
    return (
        <div className="register--page">
            <img className="page--logo" src="./images/logo white.png" alt="logo"/>
            <RegisterForm />
            <h4>
                You already have an account?  
                <Link className="login--link" 
                      to="/login"
                > 
                {' Log in'}
                </Link>
            </h4>
        </div>
    )
}

export default Register