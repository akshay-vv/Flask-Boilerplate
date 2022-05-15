import { React, useContext } from 'react'
import { Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// import Badge from '@mui/material/Badge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AuthContext from '../auth/AuthContext';
import { logout } from '../../Services/LoginService';

export default function Avatar() {
    const authContext = useContext(AuthContext);
    const user = authContext.auth.user

    const handleLogout = async e => {
        await logout();
        localStorage.removeItem('auth')
        localStorage.removeItem('user')
        authContext.setAuth({ user: false })
    }
    if (user) {
        return (
            <Tooltip title="Logout" >
                <IconButton color="inherit" onClick={handleLogout} >
                    {/* <Badge badgeContent={4} color="secondary"> */}
                    <AccountCircleIcon />
                    <span style={{fontSize: '.5em'}}>{user.first_name} </span>
                    {/* </Badge> */}
                </IconButton>
            </Tooltip>)
    } else {
        return (
            <Link color="inherit" component={RouterLink} to="login">Login</Link>
        )
    }
}