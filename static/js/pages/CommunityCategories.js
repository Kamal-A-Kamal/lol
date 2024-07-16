import React, { useContext, useEffect, useState } from "react";
import auth from "../services/authServices";
import http from "../services/httpServices";
import LoadingIcon from "../components/ui/LoadingIcon";
import CenterIcon from "../components/ui/CenterIcon";
import CommunityCategoryCard from "./CommunityCategoryCard";
import AuthContext from "../context/AuthContext";

const CommunityCategories = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [categories, setCategories] = useState([]);

    const { adminToken, token } = useContext(AuthContext);

    const getCategories = async () => {
        let config = {};
        if (adminToken) {
            config = auth.getAuthConfig(adminToken);
        } else {
            const token = auth.getToken();
            config = auth.getAuthConfig(token);
        }

        // const { data } = http.get("/");
        try {
            const { data } = await http.get(
                `/api/${adminToken ? "admin/" : ""}visible/community_categories`,
                config
            );
            setCategories({});
            setCategories(data);
            setIsLoading(false);
        } catch (error) {
            setIsError(true);
        }
    };
    useEffect(() => {
        getCategories();
    }, []);
    return (
        <>
            {isLoading ? (
                <div className="flex-center-both py-10">
                    <div
                        className={`${
                            isError ? "bg-rose-500" : "bg-cyan-500"
                        } rounded-md py-10 px-5 flex-center-both space-x-3 space-x-reverse font-h3 text-slate-50`}
                    >
                        {isError ? (
                            <>
                                <CenterIcon icon="ic:twotone-error" className="font-h1 pt-1" />
                                <span>حدث خطأ</span>
                            </>
                        ) : (
                            <>
                                <LoadingIcon className="font-h1" />
                                <span>يتم الآن تحميل المجموعات...</span>
                            </>
                        )}
                    </div>
                </div>
            ) : categories.length < 1 ? (
                <div className="flex-center-both py-10">
                    <div
                        className={`bg-yellow-600 rounded-md py-10 px-5 flex-center-both space-x-3 space-x-reverse font-h3 text-slate-50`}
                    >
                        <>
                            <CenterIcon icon="carbon:error" className="font-h1 pt-1" />
                            <span>سيتم اضافة المجموعات قريبًا</span>
                        </>
                    </div>
                </div>
            ) : (
                <>
                    {adminToken ? (
                        <div className="text-center p-10 font-h2 font-w-bold">
                            <div>هذه هي المجموعات المتاحة لحساب المسئول الخاص بك</div>
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="flex flex-col w-full space-y-5 py-5 md:px-5">
                        {categories.map((category) => (
                            <CommunityCategoryCard category={category} />
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default CommunityCategories;
