import '../../styles/PageHeader.css'
import { FaHome } from "react-icons/fa";

function PageHeader() {
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

export default PageHeader