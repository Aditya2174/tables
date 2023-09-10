import React, { useState } from "react"
import "./login.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode"

const Login = ({ setLoginUser }) => {

    const history = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:9002/login", user)
            .then((res) => {
                console.log(res);
                alert(res.data.message);
                setLoginUser(res.data.user);
                history("/h");
            })
            .catch((error) => {
                console.error("Axios error:", error);
                alert(error.response.data.message)
                // Handle the error, e.g., show an error message to the user
            });
    }
    console.log(user);

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" onClick={() => history("/register")}>Register</div>
            <div className="google-button-container">
                <GoogleOAuthProvider className="google" clientId="986082076902-n1r1qdrd2bec8p0sefdutur0rtarcp0b.apps.googleusercontent.com">
                    <div className="signIn">
                        <h1 className='or'> OR </h1>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                const data = jwt_decode(credentialResponse.credential)
                                // setLoginUser(data.name)
                                axios
                                    .post("http://localhost:9002/store-user", data)
                                    .then((res) => {
                                        // Handle the response as needed (e.g., show a success message)
                                        console.log("User data stored successfully:", res.data.message);

                                        // Redirect the user to the desired page
                                        history("/h");
                                    })
                                    .catch((error) => {
                                        console.error("Axios error:", error);

                                        // Handle the error, e.g., show an error message to the user
                                    });
                                console.log(data);
                                console.log(user);
                                history("/h")
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            useOneTap
                        />
                    </div>
                </GoogleOAuthProvider>
            </div>
        </div>
    )
}

export default Login