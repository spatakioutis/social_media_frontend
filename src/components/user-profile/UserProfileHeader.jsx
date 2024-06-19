import '../../styles/userProfile/userProfileHeader.css'

const UserProfileHeader = (props) => {
    return (
        <div className="userProfile--header">
            <img 
                src={props.userInfo.profilePic}
                alt="Profile Pic" 
                className="user--profile--pic"
            />
            <div className="user--main--info">
                <h1 className="full--name">
                    {props.userInfo.firstName + " " + props.userInfo.lastName}
                </h1>
                <h3 className="username">
                    {"@" + props.userInfo.username}
                </h3>
            </div>
        </div>
    )
}

export default UserProfileHeader