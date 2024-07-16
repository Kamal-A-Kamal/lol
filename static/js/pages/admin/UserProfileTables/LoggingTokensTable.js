import React, { useEffect, useState } from "react";
import LogOutData from "../../../components/ui/LogOutData";
import LoginDataTable from "../../../components/ui/LoginDataTable";
import LogoutTable from "../../../components/ui/LogoutTable";
import auth from "../../../services/authServices";
import http from "../../../services/httpServices";
import LoadingIcon from "../../../components/ui/LoadingIcon";

const LoggingTokensTable = ({ user }) => {
    const token = auth.getAdminToken();
    const config = auth.getAdminAuthConfig(token);

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const getLoggingData = async () => {
        try {
            const { data } = await http.get(`/api/users/${user.id}/tokens`, config);
            setData(data);
            setLoading(false);
        } catch (error) {}
    };

    useEffect(() => {
        getLoggingData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {!loading ? (
                <>
                    <LogOutData
                        deleted_today={data.deleted_today}
                        deleted_this_week={data.deleted_this_week}
                    />
                    <LoginDataTable isAdmin={config} data={data.tokens} />
                    <LogoutTable data={data.deleted_tokens} />
                </>
            ) : (
                <div className="font-h1 flex-center-both">
                    <LoadingIcon />
                </div>
            )}
        </>
    );
};

export default LoggingTokensTable;
