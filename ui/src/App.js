import {useState} from 'react';
import './App.css';
import { Box } from '@material-ui/core';
import Dashboard from './Component/dashboard/Dashboard'
import { BrowserRouter } from 'react-router-dom';
import AuthContext, {defaultAuthContext} from './Component/auth/AuthContext';

function App() {
  const [authContext, setAuthContext] = useState(defaultAuthContext)

  return (
    <BrowserRouter>
    <AuthContext.Provider value={{'auth': authContext, 'setAuth': setAuthContext}}> 
      <Box>
        <Dashboard />
      </Box>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
