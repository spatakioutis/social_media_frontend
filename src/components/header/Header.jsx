import '../../styles/Header.css'
import { FaHome } from "react-icons/fa";

function Header() {
    return (
        <div className="page--header">
            <img src="./images/header-logo.png" alt="logo" className="header--logo" />
            <div className="header--options">
                <FaHome className="header--home--button"/>
                <img src="./images/softex.jpg" alt="avatar" className="logged--user--button" />
            </div>
        </div>
    )
}

export default Header