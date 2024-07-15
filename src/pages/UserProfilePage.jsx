import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Post from '../components/post/Post.jsx'
import PageHeader from '../components/page-header/PageHeader.jsx'
import UserProfileHeader from '../components/user-profile/UserProfileHeader.jsx'
import { useAxios } from '../hooks/AxiosInterceptor.jsx'
import '../styles/pages/UserProfilePage.css'
const UserProfilePage = () => {

    const [profile, setProfile] = useState(null)
    const [searchParams] = useSearchParams()
    const username = searchParams.get('username')
    const axiosInstance = useAxios()

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get(`http://localhost:5000/profile?username=${username}`)
                
                response.data.profile.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                setProfile(response.data.profile)
            }
            catch (error) {
                console.error('Error fetching profile:', error)
            }
        }
        fetchProfile()
    }, [username])

    const handlePostDelete = (postId) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            posts: prevProfile.posts.filter(post => post._id !== postId)
        }));
    };

    return (
        <div className="user--profile--page">
            <PageHeader />
            {profile ? <>
                <UserProfileHeader userInfo={profile.userInfo}/>
                <div className="home--page--body">
                        {profile.posts.map((post) => (
                            <Post 
                                postID={post._id}
                                key={post.createdAt}
                                username={profile.userInfo.username}
                                userProfPic={profile.userInfo.profilePic}
                                image={post.image}
                                caption={post.caption}
                                likes={post.likes}
                                comments={post.comments}
                                deletePost={handlePostDelete}
                            />
                        ))}
                </div>
            </>
            :
            <h3>Loading...</h3>
            }   
        </div> 
    )
}

export default UserProfilePage