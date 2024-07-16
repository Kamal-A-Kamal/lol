import React from "react";
import auth from "../services/authServices";
import { Navigate } from "react-router-dom";
import { teachersubadminPath } from "../services/defaultSettings";

const NotTeacher = ({ children }) => {
    const authToken = auth.getTeacherToken() ? true : false;

    return !authToken ? (
        <>{children}</>
    ) : (
        <>
            <Navigate to={`/${teachersubadminPath + "/panel/home"}`} replace />
        </>
    );
};

export default NotTeacher;
