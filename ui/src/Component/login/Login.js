import { React, useState, useContext } from "react";
import { login } from "../../Services/LoginService";
import { getUser } from "../../Services/UserService";
import AuthContext from "../auth/AuthContext"
import { useNavigate } from "react-router-dom";

export default function Login() {
    let navigate = useNavigate();

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [failureMessage, setFailureMessage] = useState();
    const authContext = useContext(AuthContext);

    const handleLogin = async e => {
        e.preventDefault()
        const result = await login({
            username,
            password
        });
        if (result.success) {
            console.log(result.data.access_token)
            localStorage.auth = result.data.access_token
            setFailureMessage(null)

            const response = await getUser()
            localStorage.user = JSON.stringify(response.data)
            authContext.setAuth({ 'user': response.data })
            navigate("/", {replace: true});
        } else {
            console.log(result.data)
            localStorage.auth = null
            localStorage.user = null
            setFailureMessage(result.data)
            setPassword(null)
        }
    }

    const cancelLogin = e => {
        navigate("/");
    }

    let failure = failureMessage ? <div> {failureMessage.detail} </div> : null
    return (
        <div className="login-wrapper">
            <h1>Please LogIn</h1>
            <form onSubmit={handleLogin}>
                <label>
                    <p>Username:</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password:</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Login</button>
                </div>
                <div>
                    <button type="button" onClick={e => cancelLogin(e.target.value)}>Cancel</button>
                </div>
                {failure}
            </form>
        </div>
    )
}