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
  const [x, setX] = useState(0); // Use state to control the conditional rendering

  return (
    <div className="App">
      <Router className="hi">
        <Routes>
          {x === 0 && (
            <Route path="/" element={<Login setLoginUser={setLoginUser} />} />
          )}
          {x === 1 && (
            <Route path="/" element={<Homepage setLoginUser={setLoginUser} />}

            />)}
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>

      <GoogleOAuthProvider clientId="986082076902-n1r1qdrd2bec8p0sefdutur0rtarcp0b.apps.googleusercontent.com">
        <div className="signIn">
          <h1 className='or'> OR </h1>
          <GoogleLogin
            onSuccess={credentialResponse => {
              setX(1); // Update the value of x when login is successful
              console.log(credentialResponse);
              console.log(x);

            }}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap
          />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
