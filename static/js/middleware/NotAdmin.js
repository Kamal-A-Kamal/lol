import React from "react";
import { Navigate } from "react-router-dom";

import auth from "../services/authServices";
import { adminPath } from "../services/defaultSettings";

const NotAdmin = ({ children }) => {
    const authToken = auth.getAdminToken() ? true : false;

    return !authToken ? (
        <>{children}</>
    ) : (
        <>
            <Navigate to={`/${adminPath + "/panel/home"}`} replace />
        </>
    );
};

export default NotAdmin;
