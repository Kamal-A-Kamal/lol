import React, { useEffect, useState } from "react";
import LoadingIcon from "../../components/ui/LoadingIcon";
import auth from "../../services/authServices";
import http from "../../services/httpServices";
import LoginDataTable from "../../components/ui/LoginDataTable";
import LogOutData from "../../components/ui/LogOutData";
const LoginData = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const getTokens = async () => {
        const token = auth.getToken();
        const config = auth.getAuthConfig(token);

        try {
            const { data } = await http.get("/api/user/get_login_data", config);
            setData(data);
            setLoading(false);
        } catch (error) {}
    };
    useEffect(() => {
        getTokens();
    }, []);
    return (
        <>
            {loading ? (
                <div>
                    <div className="flex-center-both font-h1 space-x-2 space-x-reverse">
                        <LoadingIcon>dsd</LoadingIcon>
                        <div>يتم التحميل</div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex-center-both py-5">
                        <LogOutData
                            deleted_today={data.deleted_today}
                            deleted_this_week={data.deleted_this_week}
                        />
                    </div>
                    <div className="flex overflow-auto w-full">
                        <LoginDataTable data={data.tokens} />
                    </div>
                </>
            )}
        </>
    );
};

export default LoginData;
