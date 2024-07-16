import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";

import auth from "../services/authServices";
import http from "../services/httpServices";

import HalfPage from "../components/ui/HalfPage";
import LoadingIcon from "../components/ui/LoadingIcon";

import registerPicture from "../assets/register.jpeg";

const Logout = () => {
    const navigate = useNavigate();

    const { setAdmin } = useContext(AuthContext);

    const redirect = () => {
        navigate("magdy-mm-admin/panel/login");
    };

    const logout = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);
        let res = await http.post("/api/auth/admin/logout", {}, config);
        auth.adminLogout();
        setAdmin({});
        redirect();
    };

    useEffect(() => {
        try {
            logout();
        } catch (error) {}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div className="h-screen negative-nav-margin flex-center-both font-h1 font-w-bold">
                <div className="flex flex-row space-x-3 space-x-reverse">
                    <LoadingIcon className={"font-big text-teal-500"} />
                    <span>يتم الآن تسجيل خروجك ...</span>
                </div>
            </div>
        </div>
    );
};

export default Logout;
