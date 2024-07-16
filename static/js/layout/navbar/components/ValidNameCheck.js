import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import auth from "../../../services/authServices";
import { autoChangeRandomNames } from "../../../services/defaultSettings";
import http from "../../../services/httpServices";

const ValidNameCheck = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { isCheckedInvalidName, setIsCheckedInvalidName, isValidName, setIsValidName } =
        useContext(AuthContext);

    const checkIfValidUsername = async () => {
        try {
            const token = auth.getToken();
            const config = auth.getAuthConfig(token);
            const { data: result } = await http.get("/api/user", config);
            // console.log(result.user.full_name);
            const { user: userData } = result;
            if (
                userData.full_name === "random name" ||
                userData.first_name === "random" ||
                userData.last_name === "name"
            ) {
                setIsCheckedInvalidName(true);
                navigate("/edit_my_name");
            } else {
                setIsValidName(true);
            }
        } catch (e) {}
    };
    useEffect(() => {
        const token = auth.getToken();
        if (
            autoChangeRandomNames &&
            !isValidName &&
            !location.pathname.includes("edit_my_name") &&
            token
        ) {
            if (isCheckedInvalidName) {
                navigate("/edit_my_name");
            } else {
                checkIfValidUsername();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, isValidName]);
    return <></>;
};

export default ValidNameCheck;
