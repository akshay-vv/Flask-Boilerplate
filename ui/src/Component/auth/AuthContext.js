import {createContext, React} from 'react'
import {me} from '../../Services/LoginService'
const AuthContext = createContext();
export default AuthContext
// export default function AuthContext({children}) {

//     return ()
// }

export const defaultAuthContext = {
    user: false
}