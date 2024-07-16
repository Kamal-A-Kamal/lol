import React, { useEffect, useState } from "react";
import InputField from "../../components/form/elements/InputField";
import InputIcon from "../../components/form/elements/InputIcon";
import http from "../../services/httpServices";
import auth from "../../services/authServices";
import modal from "../../services/modalServices";
import AdminContainer from "../../components/ui/AdminContainer";
import {
    handleFormErrors,
    handleFormSubmit,
    handleInputChange as handleChange,
} from "../../services/formServices";
import AdminForm from "../../components/ui/AdminForm";
import SubscriptionResult from "./SubscriptionResult";
import LoadingIcon from "../../components/ui/LoadingIcon";
import { printUnit } from "../../utils/ar";

const initialState = {
    admin_id: "",
    quantity: 0,
    start_from: "older",
};

const DivideAdminUsers = () => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [isAdminUsersDataLoading, setIsAdminUsersDataLoading] = useState(true);

    const [inputFields, setInputFields] = useState([]);

    const [admins, setAdmins] = useState([]);
    const [adminsData, setAdminData] = useState(null);
    const getAdminsData = async () => {
        setIsAdminUsersDataLoading(true);
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/users/get_admin_users_info`, config);
        setAdminData(response);
        setIsAdminUsersDataLoading(false);
    };
    const getAdmins = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);
        const { data: response } = await http.get(`/api/admins`, config);

        let adminOptions = response.map((user) => {
            return { value: user.id, text: user.full_name + ` (@${user.email})` };
        });
        setAdmins(adminOptions);
    };

    useEffect(() => {
        getAdminsData();
        getAdmins();
    }, []);

    useEffect(() => {
        let fields = [
            {
                id: "admin_id",
                placeholder: "اختر الادمن",
                type: "select",
                options: admins,
            },
        ];
        fields = [
            ...fields,
            {
                id: "quantity",
                placeholder: "عدد الطلبة المضافة",
                type: "number",
                icon: <InputIcon icon="la:users-cog" />,
            },
            {
                id: "start_from",
                placeholder: "اختر نوع الطلبة",
                type: "select",
                options: [
                    { value: "older", text: "من الطلبة الأقدم" },
                    { value: "newer", text: "من الطلبة الأحدث" },
                    { value: "random", text: "عشوائي" },
                ],
            },
        ];
        setInputFields(fields);
    }, [admins]);

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            divideUsers();
        });
    };
    const divideUsers = async () => {
        try {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);

            const toSendData = { ...data };
            const { data: response } = await http.post(
                "/api/users/divide_admin_users",
                toSendData,
                config
            );

            modal.message({
                title: "تم تنفيذ طلبك بنجاح",
                text: response.message,
                callback: () => {
                    getAdminsData();
                },
            });
            setIsLoading(false);
        } catch ({ response }) {
            handleFormErrors(response, setIsLoading, setErrors);
        }
    };

    return (
        <div className="space-y-10">
            <AdminContainer>
                <AdminForm onSubmit={handleSubmit} isLoading={isLoading} buttonText="تفعيل">
                    {isAdminUsersDataLoading ? (
                        <div className="flex-center-both">
                            <span className="flex-center-both font-h1 text-blue-500">
                                <LoadingIcon />
                            </span>
                            <span>يتم الآن تحميل بيانات المستخدمين</span>
                        </div>
                    ) : (
                        <div className="-my-8 font-small space-y-3">
                            <div className="flex-center-both space-x-3 space-x-reverse">
                                <div className="font-w-bold underline">
                                    عددد المستخدمين بدون ادمن :
                                </div>
                                <div className="px-3 rounded-full bg-yellow-600 text-white">
                                    {printUnit(adminsData["not_attached_users_count"], "طالب")}
                                </div>
                            </div>
                            <div className="w-full rounded-full h-1 bg-secondary-container"></div>
                            {adminsData.admins.map((admin) => (
                                <React.Fragment key={admin.id}>
                                    <div className="flex-center-both space-x-3 space-x-reverse">
                                        <div className="font-w-bold underline">
                                            عدد المستخدين مع{" "}
                                            {admin.full_name + ` (@${admin.email})`} :
                                        </div>
                                        <div className="px-3 rounded-full bg-blue-600 text-white">
                                            {printUnit(admin["users_count"], "طالب")}
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    )}

                    {inputFields.map((input, key) => (
                        <InputField
                            key={key}
                            onChange={handleChange}
                            data={data}
                            setData={setData}
                            errors={errors}
                            {...input}
                        />
                    ))}
                </AdminForm>
            </AdminContainer>
        </div>
    );
};

export default DivideAdminUsers;
