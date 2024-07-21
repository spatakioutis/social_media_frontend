import * as React from 'react'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import TagIcon from '@mui/icons-material/Tag';
import { useNavigate } from 'react-router-dom'
import '../../styles/header/DropdownSearch.css'

const DropdownSearch = (props) => {

    const navigate = useNavigate()

    const handleClick = (query) => {
        props.setDropdownActive(false)
        query.user ? navigate(`/user?username=${query.user.username}`) : navigate(`/hashtag?tag=${query.hashtag}`)
    }

    let dropdownItems = []

    if (props.users.length > 0) {
        dropdownItems = props.users.map(user => {
            return (
                <MenuItem 
                    onClick={() => handleClick({user})} 
                    key={user.userID}
                    className="dropdown--item"
                >
                    <ListItemIcon className="dropdown--item--icon">
                        <img 
                            src={user.profilePic}
                        />
                    </ListItemIcon>
                    <ListItemText 
                        className="dropdown--item--text"
                    >
                        {user.username}
                    </ListItemText>
                </MenuItem>
            )
        })
    }
    else {
        dropdownItems = props.hashtags.map(hashtag => {
            return (
                <MenuItem 
                    onClick={() => handleClick({hashtag: hashtag.tag})} 
                    key={hashtag.hashtagID}
                    className="dropdown--item"
                >
                    <ListItemIcon className="dropdown--item--icon">
                        <TagIcon
                            sx={{color: 'white'}} 
                        />
                    </ListItemIcon>
                    <ListItemText 
                        className="dropdown--item--text"
                    >
                        {hashtag.tag}
                    </ListItemText>
                </MenuItem>
            )
        })
    }

    return (
        <> {
            <div className='dropdown--search'>
                <Paper sx={{ 
                    width: "100%", 
                    backgroundColor: '#303030',
                    color: 'white' }}
                >
                    <MenuList>
                        {dropdownItems}
                    </MenuList>
                </Paper>
            </div>
        }
        </>
        
    )
}

export default DropdownSearch