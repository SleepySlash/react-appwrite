import React, { useContext, useState, useEffect, createContext } from 'react';
import { account } from '../appwriteConfig';
import { ID } from 'appwrite'; // helps create a unique id for each user, provided by appwrite

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUserStatus();
    }, []);

    const loginUser = async (userInfo) => {
        setLoading(true);
        try {
            await account.createEmailPasswordSession(userInfo.email, userInfo.password);
            const accountDetails = await account.get();
            setUser(accountDetails);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const logoutUser = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
        } catch (error) {
            console.error(error);
        }
    };

    const registerUser = async (userInfo) => {
        setLoading(true);
        try {
            await account.create(ID.unique(), userInfo.email, userInfo.password1, userInfo.name);
            await account.createEmailPasswordSession(userInfo.email, userInfo.password1);
            const accountDetails = await account.get();
            setUser(accountDetails);
        } catch (error) {
            console.error("error while reg", error);
        }
        setLoading(false);
    };

    const checkUserStatus = async () => {
        setLoading(true);
        try {
            const accountDetails = await account.get();
            setUser(accountDetails);
        } catch (error) {
            console.error(error);
            setUser(null);
        }
        setLoading(false);
    };

    const contextData = {
        user,
        loginUser,
        logoutUser,
        registerUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
