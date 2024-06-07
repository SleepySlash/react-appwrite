import React from 'react'
import { account } from '../appwriteConfig';
import { useContext, useState, useEffect, createContext } from 'react'
const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        checkUserStatus();
    },[])

    const loginUser = async (userInfo)=> {
        setLoading(true);
        try{
            let response = await account.createEmailPasswordSession( userInfo.email, userInfo.password);
            let accountDetails = await account.get();
            console.log("accountDetails",accountDetails);
            setUser(accountDetails);
        }catch(error){
            console.error(error);
        }
        setLoading(false);
    };

    const logoutUser =()=> {
        account.deleteSession('current');
        setUser(null);
    }
    
    const registerUser =(userInfo)=> {}

    const checkUserStatus = async() => {
        setLoading(true);
        try{
            let accountDetails = account.get();
            setUser(accountDetails);
        }catch(error){
            console.log(error);
        }
        setLoading(false);
    }

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
