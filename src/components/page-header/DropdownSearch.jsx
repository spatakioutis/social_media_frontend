import * as React from 'react'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import { useNavigate } from 'react-router-dom'
import '../../styles/header/DropdownSearch.css'

const DropdownSearch = (props) => {

    const navigate = useNavigate()

    const handleClick = (user) => {
        props.setDropdownActive(false)
        navigate(`/user?username=${user.username}`)
    }

    const dropdownItems = props.users.map(user => {
        return (
            <MenuItem 
                onClick={() => handleClick(user)} 
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