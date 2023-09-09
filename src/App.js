import './App.css';
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

function App() {
  console.log("hello");
  const [user, setLoginUser] = useState({});
  // const [x, setX] = useState(0); // Use state to control the conditional rendering

  return (
    <div className="App">
      <Router className="hi">
        <Routes>
          <Route path="/" element=
          {
            user && user._id ? <Homepage setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />
          }
          />
          <Route path="/h" element={<Homepage setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>

      
    </div>
  );
}

export default App;
