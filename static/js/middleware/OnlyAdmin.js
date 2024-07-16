import React from "react";
import { Navigate } from "react-router-dom";
import auth from "../services/authServices";
import { adminPath } from "../services/defaultSettings";

const OnlyAdmin = ({ children, replace = true }) => {
    const authToken = auth.getAdminToken() ? true : false;

    return authToken ? (
        <>{children}</>
    ) : (
        <>
            <Navigate to={`/${adminPath + "/login"}`} replace={replace} />
        </>
    );
};

export default OnlyAdmin;
