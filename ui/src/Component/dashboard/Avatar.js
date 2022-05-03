import { React } from 'react'
import { Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Avatar({ user }) {
    if (user) {
        return (
            <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>)
    } else {
        return (
            <Link color="inherit" component={RouterLink} to="login">Login</Link>
        )
    }
}