import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import auth from "../../../services/authServices";
import http from "../../../services/httpServices";
import { useLocation } from "react-router-dom";
import { adminPath } from "../../../services/defaultSettings";
import CenterIcon from "../../../components/ui/CenterIcon";
import bg from "../../../assets/bg.png";

const GlobalNotifications = () => {
    const { token } = useContext(AuthContext);

    const [notifications, setNotifications] = useState([]);

    const [isHidden, setIsHidden] = useState(false);

    const [className, setClassName] = useState("");

    const getNotifications = async () => {
        const token = auth.getToken();
        const config = auth.getAuthConfig(token);

        const { data } = await http.get(`/api/fetch_global_notification`, config);
        setNotifications(data);
    };

    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes(adminPath)) {
            setClassName(" !hidden");
        } else {
            setClassName("");
        }
    }, [location]);

    useEffect(() => {
        if (token) {
            getNotifications();
        }
    }, [token]);

    return (
        <>
            {notifications.length > 0 ? (
                <div
                    className={`absolute w-full top-[5rem] right-0 left-0 px-2 py-2 ${className} ${
                        isHidden ? "!hidden" : ""
                    }`}
                >
                    <div className="relative rounded-md bg-rose-700 dark:bg-rose-500 smooth text-white p-5 text-center">
                        <div className="flex-center-both flex-col space-y-2">
                            <div className="font-w-bold font-h2 underline">
                                {notifications[0].name}
                            </div>
                            <div className="font-h3">{notifications[0].description}</div>
                        </div>
                        <div className="absolute inset-0 w-full h-full">
                            <div
                                className="w-auto h-full md:w-full opacity-20 relative mr-auto transform "
                                style={{
                                    backgroundImage: "url(" + bg + ")",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center top",
                                }}
                            ></div>
                        </div>
                        <button
                            className="absolute left-2 top-2 pt-0.5 flex-center-both rounded-md  bg-rose-800 font-h1 hover-shadow smooth"
                            onClick={() => setIsHidden(true)}
                        >
                            <CenterIcon icon="uil:x" />
                        </button>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default GlobalNotifications;
