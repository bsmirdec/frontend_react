import React, { createContext, useContext, useState } from "react";

const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
    const [businessData, setBusinessData] = useState({
        employeeId: "",
        firstName: "",
        lastName: "",
        position: "",
        manager: "",
        permissions: null,
    });

    return (
        <BusinessContext.Provider value={{ businessData, setBusinessData }}>
            {children}
        </BusinessContext.Provider>
    );
};

export const useBusiness = () => {
    return useContext(BusinessContext);
};
