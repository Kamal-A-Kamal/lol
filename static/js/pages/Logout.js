import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";

import auth from "../services/authServices";
import http from "../services/httpServices";

import HalfPage from "../components/ui/HalfPage";
import LoadingIcon from "../components/ui/LoadingIcon";

import registerPicture from "../assets/register.jpeg";
import a from "../services/analyticsServices";

const Logout = () => {
    const navigate = useNavigate();

    const { setUser } = useContext(AuthContext);

    const { state } = useLocation();

    const redirect = () => {
        if (!state) {
            navigate("/home");
        } else {
            navigate(state.prevPath);
        }
    };

    const token = auth.getToken();

    const logout = async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        const visitorVisitId = a.getVisitorVisit();
        http.post("/api/auth/logout", { visitor_visit_id: visitorVisitId }, config);
        auth.logout();
        setUser({});
        auth.setPrepaidCoursesStoreSeen(false);
        redirect();
    };

    useEffect(() => {
        try {
            logout();
        } catch (error) {}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <HalfPage picture={registerPicture}>
            <div>
                <div className="h-screen negative-nav-margin flex-center-both font-h1 font-w-bold">
                    <div className="flex flex-row space-x-3 space-x-reverse">
                        <LoadingIcon className={"font-big text-teal-500"} />
                        <span>يتم الآن تسجيل خروجك ...</span>
                    </div>
                </div>
            </div>
        </HalfPage>
    );
};

export default Logout;
