import '../../styles/PageHeader.css'
import { FaHome } from "react-icons/fa"
import { useState, useEffect, useContext } from 'react'
import { currUserContext } from '../../contexts/CurrUserContext'
import { TokenContext } from '../../contexts/TokenContext.jsx'
import axios from 'axios'

function PageHeader() {
    const {token} = useContext(TokenContext)
    const {currUser} = useContext(currUserContext)
    const [profilePic, setProfilePic] = useState('')

    useEffect(() => {
        const fetchProfilePic = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/profilePic?username=${currUser}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                setProfilePic(response.data.image)
            }
            catch (error) {
                console.error('Error fetching profilePic:', error)
            }
        }
        fetchProfilePic()
    }, [])

    return (
        <div className="page--header">
            <img src="./images/header-logo.png" alt="logo" className="header--logo" />
            <div className="header--options">
                <FaHome className="header--home--button"/>
                <img src={profilePic} alt="avatar" className="logged--user--button" />
            </div>
        </div>
    )
}

export default PageHeader