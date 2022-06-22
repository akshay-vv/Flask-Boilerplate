import {useState, useEffect} from 'react';
import './App.css';
import { Box } from '@material-ui/core';
import Dashboard from './Component/dashboard/Dashboard'
import { BrowserRouter } from 'react-router-dom';
import AuthContext, {defaultAuthContext} from './Component/auth/AuthContext';
import {me} from './Services/LoginService'
function App() {
  const [authContext, setAuthContext] = useState(defaultAuthContext)

  useEffect(() => {
    async function loggedIn() {
        const response = await me()
        if (response.status === 200) {
          setAuthContext({
            user: JSON.parse(localStorage.user)
          })
        }
    }
    loggedIn();
  }, [])

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
