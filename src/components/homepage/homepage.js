import React from "react"
import "./homepage.css"
import { googleLogout } from '@react-oauth/google';
import LogoutButton from "../logout/logout"
googleLogout();
console.log("hi");
const Homepage = ({setLoginUser}) => {
    return (
        <div className="homepage">
            <h1>HomePage</h1>
            <h3>This is the basic set-up, rest features are not implemented yet .</h3>
            <LogoutButton setLoginUser={setLoginUser} />
        </div>
    )
}

export default Homepage