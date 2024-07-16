import React, { useEffect, useState } from "react";

import http from "../../../services/httpServices";

import LoadingIcon from "../../../components/ui/LoadingIcon";
import auth from "../../../services/authServices";

const NavbarNotification = () => {
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);

    const getNotification = async () => {
        const token = auth.getToken();
        const config = auth.getAuthConfig(token);
        const { data } = await http.get("/api/notifications/latest/10", config);
        setNotifications(data);
        setLoading(false);
    };
    useEffect(() => {
        getNotification();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const notifictionHtml = (
        <>{notifications.length < 1 && <div className="text-center"> لا توجد لديك اشعارات</div>}</>
    );
    return (
        <>
            {loading && <LoadingIcon className="font-h1" />} {!loading && notifictionHtml}
        </>
    );
};

export default NavbarNotification;
