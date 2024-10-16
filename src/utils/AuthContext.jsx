import { useContext, useState, useEffect, createContext } from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) =>{

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        setLoading(false)
    }, [])

    const loginUser = (userInfo) => {}

    const logoutUser = () => {}

    const registerUser = (userInfo) ={}

    const checkUserStatus = () => {}

    const contextData = {
        user,
        loginUser,
        loginUser,
        registerUser,
    }
    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
        )
}

export default AuthContext