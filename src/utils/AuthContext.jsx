import React from 'react'
import { useContext, useState, useEffect, createContext } from 'react'
const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(false);
    },[])
    
    const loginUser =(userInfo)=> {}

    const logoutUser =()=> {}
    
    const registerUser =(userInfo)=> {}

    const checkUserStatus = () => {}

    const contextData = {
        user,
        loginUser,
        logoutUser,
        registerUser,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading? <p>Loading...</p> : children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> {return useContext(AuthContext)}
export default AuthContext
