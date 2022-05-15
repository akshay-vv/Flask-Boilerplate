import { React, useContext } from 'react'
import { Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AuthContext from '../auth/AuthContext';

export default function Avatar() {
    const authContext = useContext(AuthContext);
    const user = authContext.auth.user
    if (user) {
        return (
            <IconButton color="inherit">
                {/* <Badge badgeContent={4} color="secondary"> */}
                    <AccountCircleIcon />
                {/* </Badge> */}
            </IconButton>)
    } else {
        return (
            <Link color="inherit" component={RouterLink} to="login">Login</Link>
        )
    }
}