import { Link } from "react-router-dom"

const InfoModal = ({textInfo, link}) => {

    return (
    <div className="modal--bg">
        <div className="info--modal">
            <h3>
                {textInfo}
            </h3>
            {link && 
            <Link 
                className="login--modal--link" 
                to="/login"
            > 
            {link}
            </Link>
            }
        </div>
        
    </div>
    )
}


export default InfoModal