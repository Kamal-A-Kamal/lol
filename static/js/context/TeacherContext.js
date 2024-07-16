import React, { createContext, useState } from "react";

const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {
    const [teacher, setTeacher] = useState({});

    return (
        <TeacherContext.Provider
            value={{
                teacher,
                setTeacher,
            }}
        >
            {children}
        </TeacherContext.Provider>
    );
};

export default TeacherContext;
