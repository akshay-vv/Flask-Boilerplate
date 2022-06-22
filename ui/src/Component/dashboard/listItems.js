import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import BarChartIcon from '@mui/icons-material/BarChart';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export const mainListItems = (
  <React.Fragment>
    <Link color="inherit" component={RouterLink} to="/">
      <ListItemButton>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link color="inherit" component={RouterLink} to="/waz">
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Waz Spread" />
      </ListItemButton>
    </Link>
    <Link color="inherit" component={RouterLink} to="/portfolio">
      <ListItemButton>
        <ListItemIcon>
          <CurrencyBitcoinIcon />
        </ListItemIcon>
        <ListItemText primary="Portfolio" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Gossip
    </ListSubheader>
    <Link color="inherit" component={RouterLink} to="/chatroom">
      <ListItemButton>
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        <ListItemText primary="Waz Spread" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
