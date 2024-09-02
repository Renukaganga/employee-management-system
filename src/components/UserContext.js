import React, { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({}); // State for user data

    // Function to update user data
    const updateUser = (newUserData) => {
        setUserData(newUserData);
    };

    return (
        <UserContext.Provider value={{ userData, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
    return useContext(UserContext);
};
