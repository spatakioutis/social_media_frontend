import * as React from 'react'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'

import '../../styles/header/HeaderDropdown.css'

const DropdownMenu = (props) => {
    return (
        <div className='dropdown--menu'>
            <Paper sx={{ 
                width: 150, 
                maxWidth: '100%', 
                backgroundColor: '#303030',
                color: 'white' }}>
                <MenuList>
                    <MenuItem>
                        <ListItemIcon>
                            <AccountCircleIcon  
                                        fontSize="small" 
                                        sx={{color: 'white'}}
                            />
                        </ListItemIcon>
                        <ListItemText>
                            Profile
                        </ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <SettingsIcon 
                                    fontSize="small" 
                                    sx={{color: 'white'}}
                            />
                        </ListItemIcon>
                        <ListItemText>
                            Settings
                        </ListItemText>
                    </MenuItem>
                    <MenuItem onClick={props.logOut}>
                        <ListItemIcon>
                            <LogoutIcon 
                                    fontSize="small" 
                                    sx={{color: 'white'}}
                            />
                        </ListItemIcon>
                        <ListItemText>
                            Log Out
                        </ListItemText>
                    </MenuItem>
                </MenuList>
            </Paper>
        </div>
    )
}

export default DropdownMenu