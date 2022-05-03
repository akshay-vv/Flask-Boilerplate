import './App.css';
import { Box } from '@material-ui/core';
import Dashboard from './Component/dashboard/Dashboard'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Box>
        <Dashboard />
      </Box>
    </BrowserRouter>
  );
}

export default App;
