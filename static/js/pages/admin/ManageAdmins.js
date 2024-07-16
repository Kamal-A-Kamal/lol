import React, { useEffect, useState } from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import AdminForm from "../../components/ui/AdminForm";
import InputIcon from "../../components/form/elements/InputIcon";

import {
    handleCrud,
    handleFormSubmit,
    handleInputChange as handleChange,
    renderInputFields,
} from "../../services/formServices";
import auth from "../../services/authServices";

import { submitTypes } from "../../services/adminServices";
import { adminPages } from "../../services/adminServices";
import http from "../../services/httpServices";

const initialState = {
    admin_id: "",
    first_name: "",
    last_name: "",
    email: "",
    change_password: 0,
    password: "",
    super_admin: 0,
    pages: [],
    submit_type: "",
    admin_selected: "",
};

const ManageAdmins = () => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [inputFields, setInputFields] = useState([]);

    const [pages, setPages] = useState([]);
    const [admins, setAdmins] = useState([]);

    const getPages = () => {
        let filterPages = [];
        let option = { value: "", text: "" };
        adminPages.map((p) => {
            if (!p.available && p.type == "page") {
                option.value = p.to;
                option.text = p.text;
                filterPages.push({ ...option });
            }
        });
        setPages(filterPages);
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

    const getAdminData = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);
        const { data: response } = await http.get(`/api/admins/${data.admin_id}`, config);

        let result = {};
        Object.keys(response).forEach((element) => {
            if (["first_name", "last_name", "email", "pages", "super_admin"].includes(element)) {
                result[element] = response[element];
            }
        });
        setData({ ...data, ...result, change_password: 0 });
    };

    useEffect(() => {
        getPages();
    }, []);

    useEffect(() => {
        if (data.admin_id > 0 && data.submit_type && data.submit_type === "update") {
            getAdminData();
        }
        if (data.submit_type !== "update") {
            setData({ ...data, pages: [] });
        }
    }, [data.admin_id, data.submit_type]);

    useEffect(() => {
        if (data.submit_type && data.submit_type !== "store") {
            getAdmins();
        }
    }, [data.submit_type]);

    useEffect(() => {
        let fields = [
            {
                id: "submit_type",
                placeholder: "هتعمل ايه دلوقتي",
                type: "select",
                options: submitTypes,
            },
        ];

        if (data.submit_type) {
            if (data.submit_type && data.submit_type !== "store") {
                fields = [
                    ...fields,
                    {
                        id: "admin_id",
                        placeholder: "اختر الحساب",
                        type: "select",
                        options: admins,
                    },
                ];
                if (data.submit_type === "update" && data.admin_id > 0) {
                    fields = [
                        ...fields,
                        {
                            id: "first_name",
                            placeholder: "الاسم الأول",
                            icon: <InputIcon icon="fluent:app-title-24-filled" />,
                        },
                        {
                            id: "last_name",
                            placeholder: "الاسم الأخير",
                            icon: <InputIcon icon="fluent:app-title-24-filled" />,
                        },
                        {
                            id: "email",
                            placeholder: "الايميل",
                            icon: <InputIcon icon="fluent:app-title-24-filled" />,
                        },
                        {
                            id: "change_password",
                            placeholder: "تغيير كلمة السر",
                            type: "switch",
                        },
                        {
                            id: "password",
                            placeholder: "كلمة السر",
                            isDisabled: !data.change_password,
                            icon: <InputIcon icon="fluent:app-title-24-filled" />,
                        },
                        {
                            id: "super_admin",
                            placeholder: "تعيين كـ سوبر ادمن",
                            type: "switch",
                        },
                        {
                            id: "pages",
                            placeholder: "الصلاحيات",
                            multiple: true,
                            isDisabled: data.super_admin,
                            options: pages,
                            type: "select",
                        },
                    ];
                }
            }

            if (data.submit_type && data.submit_type === "store") {
                fields = [
                    ...fields,
                    {
                        id: "first_name",
                        placeholder: "الاسم الأول",
                        icon: <InputIcon icon="fluent:app-title-24-filled" />,
                    },
                    {
                        id: "last_name",
                        placeholder: "الاسم الأخير",
                        icon: <InputIcon icon="fluent:app-title-24-filled" />,
                    },
                    {
                        id: "email",
                        placeholder: "الايميل",
                        icon: <InputIcon icon="fluent:app-title-24-filled" />,
                    },
                    {
                        id: "password",
                        placeholder: "كلمة السر",
                        icon: <InputIcon icon="fluent:app-title-24-filled" />,
                    },
                    {
                        id: "super_admin",
                        placeholder: "تعيين كـ سوبر ادمن",
                        type: "switch",
                    },
                    {
                        id: "pages",
                        placeholder: "الصلاحيات",
                        multiple: true,
                        isDisabled: data.super_admin,
                        options: pages,
                        type: "select",
                    },
                ];
            }
        }
        setInputFields(fields);
    }, [data.submit_type, admins, data.change_password, data.admin_id, data.super_admin, pages]);
    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);
            const crudApiEndPoint = "/api/admins";
            const crudItemName = "الحساب";
            handleCrud(
                config,
                data,
                crudApiEndPoint,
                crudItemName,
                setIsLoading,
                setErrors,
                setData,
                initialState,
                data.admin_id
            );
        });
    };
    return (
        <AdminContainer>
            <AdminForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                buttonText="auto"
                submitType={data.submit_type}
            >
                {inputFields.map((input, key) =>
                    renderInputFields(
                        key,
                        input.handleChange ? input.handleChange : handleChange,
                        data,
                        setData,
                        errors,
                        input
                    )
                )}
            </AdminForm>
        </AdminContainer>
    );
};

export default ManageAdmins;
