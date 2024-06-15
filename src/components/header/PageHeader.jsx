import { FaHome } from "react-icons/fa"
import { useState } from "react"

import DropdownMenu from "./DropdownMenu"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/AuthProvider"
import '../../styles/PageHeader.css'

const PageHeader = () => {

    const auth = useAuth()
    const navigate = useNavigate()
    const [dropdownActive, setDropdownActive] = useState(false)

    return (
        <>  
            <div className="page--header">
                <img 
                    src="https://storage.googleapis.com/spatakioutis_app_img/header-logo.png" 
                    alt="logo" 
                    className="header--logo"
                />
                <div className="header--options">
                    <FaHome 
                        className="header--home--button"
                        onClick={() => {navigate('/home')}}
                    />
                    <img 
                        src={auth.user && auth.user.profilePic} 
                        alt="avatar" 
                        className="logged--user--button"
                        onClick={() => {setDropdownActive(prevState => !prevState)}}
                    />
                </div>
            </div>
            {dropdownActive && <DropdownMenu/>}
        </>
    )
}

export default PageHeader