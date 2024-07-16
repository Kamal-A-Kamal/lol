import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";

import auth from "../services/authServices";
import http from "../services/httpServices";

import HalfPage from "../components/ui/HalfPage";
import LoadingIcon from "../components/ui/LoadingIcon";

import registerPicture from "../assets/register.jpeg";

const TeacherLogout = () => {
    const navigate = useNavigate();

    const { setTeacher } = useContext(AuthContext);

    const redirect = () => {
        navigate("/");
    };

    const logout = async () => {
        const token = auth.getTeacherToken();
        const config = auth.getTeacherAuthConfig(token);
        let res = await http.post("/api/auth/teacher/logout", {}, config);
        auth.teacherLogout();
        setTeacher({});
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

export default TeacherLogout;
