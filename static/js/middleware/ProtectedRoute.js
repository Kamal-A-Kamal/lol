import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../services/authServices";

const ProtectedRoute = ({ children, replace = true }) => {
    const authToken = auth.getToken() ? true : false;
    let location = useLocation();
    return authToken ? (
        <>{children}</>
    ) : (
        <>
            <Navigate to="/login" state={{ prevPath: location.pathname }} replace={replace} />
        </>
    );
};

export default ProtectedRoute;
