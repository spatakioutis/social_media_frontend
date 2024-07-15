import { FaHome } from "react-icons/fa"
import { useState } from "react"
import DropdownMenu from "./DropdownMenu.jsx"
import SearchBar from "./SearchBar.jsx"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/AuthProvider.jsx"
import '../../styles/header/PageHeader.css'

const PageHeader = () => {

    const auth = useAuth()
    const navigate = useNavigate()
    const [dropdownMenuActive, setDropdownMenuActive] = useState(false)

    return (
        <>  
            <div className="page--header">
                <img 
                    src="https://storage.googleapis.com/spatakioutis_app_img/header-logo.png" 
                    alt="logo" 
                    className="header--logo"
                />
                <SearchBar />
                <div className="header--options">
                    <FaHome 
                        className="header--home--button"
                        onClick={() => {navigate('/home')}}
                    />
                    <img 
                        src={auth.user && auth.user.profilePic} 
                        alt="avatar" 
                        className="logged--user--button"
                        onClick={() => {setDropdownMenuActive(prevState => !prevState)}}
                    />
                </div>
            </div>
            {dropdownMenuActive && 
                <DropdownMenu 
                    logOut={auth.logOut}
                    user={auth.user.username}
                />
            }
        </>
    )
}

export default PageHeader