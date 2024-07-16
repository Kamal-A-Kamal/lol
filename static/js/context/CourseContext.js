import React, { createContext, useState } from "react";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const [course, setCourse] = useState({});
    const [sections, setSections] = useState([]);
    const [auth, setAuth] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false);

    return (
        <CourseContext.Provider
            value={{
                course,
                setCourse,
                auth,
                setAuth,
                setIsRefresh,
                isRefresh,
                sections,
                setSections,
            }}
        >
            {children}
        </CourseContext.Provider>
    );
};

export default CourseContext;
