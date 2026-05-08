import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Get the stored user string
        const storedUser = localStorage.getItem("userInfo");
        
        if (storedUser) {
            try {
                // 2. Parse the FULL object (which contains name, email, token)
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Failed to parse userInfo:", error);
                localStorage.removeItem("userInfo");
                localStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        // userData should look like: { name: "John", email: "...", token: "..." }
        // 3. Save the WHOLE object so name persists on refresh
        localStorage.setItem("userInfo", JSON.stringify(userData));
        localStorage.setItem("token", userData.token); // Optional: for easier access in api.js
        
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;