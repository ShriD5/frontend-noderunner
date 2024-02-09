// App.js
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Login from '../src/components/Auth/Login';
import Signup from '../src/components/Auth/Signup';
import Sandbox from '../src/components/Sandbox/Sandbox';
import Dashboard from "./components/Home/dashboard";

function App() {
  return (
      <ChakraProvider>
        <Router>
            <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />}/>
    <Route path="/home" element={<Dashboard />} />
                <Route path="/sandbox/:sandboxId" element={<Sandbox />} />
         </Routes>
        </Router>
      </ChakraProvider>
  );
}

export default App;
