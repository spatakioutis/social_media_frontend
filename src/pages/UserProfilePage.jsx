import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import PageHeader from '../components/pageHeader/PageHeader.jsx'
import UserProfileHeader from '../components/userProfile/UserProfileHeader.jsx'
import { useAxios } from '../hooks/AxiosInterceptor.jsx'
import '../styles/pages/UserProfilePage.css'


const UserProfilePage = () => {

    const [profile, setProfile] = useState(null)
    const location = useLocation()
    const {username} = location.state
    const axiosInstance = useAxios()

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get(`http://localhost:5000/profile?username=${username}`)
                setProfile(response.data.profile)
            }
            catch (error) {
                console.error('Error fetching profile:', error)
            }
        }
        fetchProfile()
    }, [])


    return (
        <div className="user--profile--page">
            <PageHeader />
            {profile ? 
                <UserProfileHeader userInfo={profile.userInfo}/>
            :
            <h3>Loading...</h3>
            }   
        </div> 
    )
}

export default UserProfilePage