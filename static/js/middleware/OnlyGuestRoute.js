import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import auth from "../services/authServices";

const OnlyGuestRoute = ({ children }) => {
    const location = useLocation();

    const authToken = auth.getToken() ? true : false;

    return !authToken ? (
        <>{children}</>
    ) : (
        <>
            <Navigate to="/home" replace state={{ from: location }} />
        </>
    );
};

export default OnlyGuestRoute;
