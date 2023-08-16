// AuthContext.js
import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    const login = (accessToken, refreshToken, userId) => {
        setAuth({ accessToken, refreshToken, userId });
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
