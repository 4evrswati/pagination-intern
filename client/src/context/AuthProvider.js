import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState();
    const [fetchAgain, setFetchAgain] = useState(false);

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo')

        if(userInfo) {
            setUser(JSON.parse(userInfo))
        }
    },[])

    return (
        <AuthContext.Provider value={{user, setUser, fetchAgain, setFetchAgain}}>
            {children}
        </AuthContext.Provider>
    )
}

const AuthState = () => useContext(AuthContext)

export {AuthState, AuthProvider}