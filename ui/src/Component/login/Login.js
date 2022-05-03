import {React, useState} from "react";
import {login} from "../../Services/LoginService";

export default function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleLogin = async e => {
        e.preventDefault()
        const token = await login({
            username,
            password
        });
        console.log(token)
    }
    return (
        <div className="login-wrapper">
            <h1>Please LogIn</h1>
            <form onSubmit={handleLogin}>
                <label>
                    <p>Username:</p>
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                </label>
                <label>
                    <p>Password:</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>

                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}