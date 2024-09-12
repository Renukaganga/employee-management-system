// import React, { createContext, useContext, useState } from 'react';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//     const [userData, setUserData] = useState(null); // Initialize as null or empty object

//     const updateUser = (data) => {
//         setUserData(data);
//     };

//     return (
//         <UserContext.Provider value={{ userData, updateUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export const useUserContext = () => useContext(UserContext);


// import React, { createContext, useContext, useState } from 'react';
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(); // Create the context

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({}); // Define state for user data

    const updateUser = (newUserData) => {
        setUserData(newUserData); // Update user data
    };

    return (
        <UserContext.Provider value={{ userData, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext); // Custom hook to access user context
};