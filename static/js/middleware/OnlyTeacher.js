import React from "react";
import auth from "../services/authServices";
import { Navigate } from "react-router-dom";
import { teachersubadminPath } from "../services/defaultSettings";

const OnlyTeacher = ({ children, replace = true }) => {
    const authToken = auth.getTeacherToken() ? true : false;

    return authToken ? (
        <>{children}</>
    ) : (
        <>
            <Navigate to={`/${teachersubadminPath + "/login"}`} replace={replace} />
        </>
    );
};

export default OnlyTeacher;
