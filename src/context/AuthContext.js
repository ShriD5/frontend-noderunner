import React, { createContext, useContext, useState } from 'react';
import { login } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);

    const authenticate = async (email, password) => {
        try {
            const { userId } = await login(email, password);
            console.log({"user id in context" : userId })
            setUserId(userId);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ userId, authenticate }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
