import React, { createContext, useState } from "react";

const SubjectContext = createContext();

export const SubjectProvider = ({ children }) => {
    const [subject, setSubject] = useState({});

    return (
        <SubjectContext.Provider
            value={{
                subject,
                setSubject,
            }}
        >
            {children}
        </SubjectContext.Provider>
    );
};

export default SubjectContext;
