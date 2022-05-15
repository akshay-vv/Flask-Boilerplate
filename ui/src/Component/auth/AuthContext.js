import {createContext, React} from 'react'

const AuthContext = createContext();
export default AuthContext
// export default function AuthContext({children}) {

//     return ()
// }

export const defaultAuthContext = {
    user: localStorage.user ? JSON.parse(localStorage.user) : false
}