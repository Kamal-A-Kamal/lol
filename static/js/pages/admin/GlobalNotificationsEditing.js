/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import AdminForm from "../../components/ui/AdminForm";
import InputIcon from "../../components/form/elements/InputIcon";
import { isMultiYear } from "../../services/defaultSettings";
import { years } from "../../services/yearSevices";
import {
    handleCrud,
    handleFormSubmit,
    handleInputChange as handleChange,
    renderInputFields,
} from "../../services/formServices";
import auth from "../../services/authServices";
import http from "../../services/httpServices";

import { submitTypes } from "../../services/adminServices";
const initialState = {
    name: "",
    description: "",
    subscribed_operator_and: 0,
    subscribed_courses: [],
    non_subscribed_operator_and: 0,
    non_subscribed_courses: [],
    is_disabled: 0,
    year: 3,
    submit_type: 0,
    global_notification_id: 0,
};

const toUseYears = years.filter((value, index) => index < 3);

const GlobalNotificationsEditing = () => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [courses, setCourses] = useState([]);

    const [inputFields, setInputFields] = useState([]);

    const [globalNotifications, setGlobalNotifications] = useState([]);

    const getCourses = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/years/${data.year}/courses/options`,
            config
        );
        setCourses(response);
    };

    const getGlobalNotifications = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/global_notifications/options`, config);

        setGlobalNotifications(response);
    };
    const getGlobalNotificationInfo = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/global_notifications/${data.global_notification_id}`,
            config
        );

        let result = { ...response };
        // Object.keys(response).forEach((element) => {
        //     if (["name", "description", "division_id"].includes(element)) {
        //         result[element] = response[element];
        //     }
        // });

        setData({ ...data, ...result });
    };
    useEffect(() => {
        getCourses();
        setData({ ...data, subscribed_courses: [], non_subscribed_courses: [] });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.year]);

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
            if (data.submit_type !== "store" && data.submit_type) {
                fields = [
                    ...fields,
                    {
                        id: "global_notification_id",
                        placeholder: "اختر الإشعار",
                        type: "select",
                        options: globalNotifications,
                    },
                ];

                if (data.submit_type === "update") {
                    if (data.global_notification_id > 0) {
                        fields = [
                            ...fields,
                            {
                                id: "name",
                                placeholder: "العنوان",
                                icon: <InputIcon icon="fluent:app-title-24-filled" />,
                            },
                            {
                                id: "description",
                                placeholder: "الوصف",
                                type: "textarea",
                                icon: <InputIcon icon="ant-design:info-circle-twotone" />,
                            },
                        ];

                        if (isMultiYear) {
                            fields = [
                                ...fields,
                                {
                                    id: "year",
                                    placeholder: "اختر الصف الدراسي",
                                    type: "select",
                                    options: toUseYears,
                                    isDisabled: data.is_free,
                                },
                            ];
                        }

                        fields = [
                            ...fields,
                            {
                                id: "is_disabled",
                                placeholder: "الغاء تفعيل الإشعار",
                                type: "switch",
                            },
                            {
                                id: "subscribed_courses",
                                placeholder: "كورسات مشترك بها الطالب",
                                options: courses,
                                multiple: true,
                                type: "select",
                            },
                            {
                                id: "subscribed_operator_and",
                                placeholder: "يكون مشترك فيهم كلهم مش واحد على الاقل",
                                type: "switch",
                            },
                            {
                                id: "non_subscribed_courses",
                                placeholder: "كورسات غير مشترك بها الطالب",
                                options: courses,
                                multiple: true,
                                type: "select",
                            },
                            {
                                id: "non_subscribed_operator_and",
                                placeholder: "يكون مش مشترك في ولا واحد فيهم مش واحد على الاقل",
                                type: "switch",
                            },
                        ];
                    }
                }
            }
            if (data.submit_type === "store") {
                fields = [
                    ...fields,
                    {
                        id: "name",
                        placeholder: "العنوان",
                        icon: <InputIcon icon="fluent:app-title-24-filled" />,
                    },
                    {
                        id: "description",
                        placeholder: "الوصف",
                        type: "textarea",
                        icon: <InputIcon icon="ant-design:info-circle-twotone" />,
                    },
                ];

                if (isMultiYear) {
                    fields = [
                        ...fields,
                        {
                            id: "year",
                            placeholder: "اختر الصف الدراسي",
                            type: "select",
                            options: toUseYears,
                            isDisabled: data.is_free,
                        },
                    ];
                }

                fields = [
                    ...fields,
                    {
                        id: "is_disabled",
                        placeholder: "الغاء تفعيل الإشعار",
                        type: "switch",
                    },
                    {
                        id: "subscribed_courses",
                        placeholder: "كورسات مشترك بها الطالب",
                        options: courses,
                        multiple: true,
                        type: "select",
                    },
                    {
                        id: "subscribed_operator_and",
                        placeholder: "يكون مشترك فيهم كلهم مش واحد على الاقل",
                        type: "switch",
                    },
                    {
                        id: "non_subscribed_courses",
                        placeholder: "كورسات غير مشترك بها الطالب",
                        options: courses,
                        multiple: true,
                        type: "select",
                    },
                    {
                        id: "non_subscribed_operator_and",
                        placeholder: "يكون مش مشترك في ولا واحد فيهم مش واحد على الاقل",
                        type: "switch",
                    },
                ];
            }
        }

        setInputFields(fields);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        courses,
        // data.courses_id,
        data.submit_type,
        data.subscribed_courses,
        data.non_subscribed_courses,
        data.global_notification_id,
        globalNotifications,
    ]);

    useEffect(() => {
        if (data.submit_type !== "store" && data.submit_type) {
            getGlobalNotifications();
        }
    }, [data.submit_type]);
    useEffect(() => {
        if (data.global_notification_id > 0) {
            getGlobalNotificationInfo();
        }
    }, [data.global_notification_id, data.submit_type]);

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);
            const crudApiEndPoint = "/api/global_notifications";
            const crudItemName = "إشعارات المنصة";
            handleCrud(
                config,
                data,
                crudApiEndPoint,
                crudItemName,
                setIsLoading,
                setErrors,
                setData,
                initialState,
                data.global_notification_id
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

export default GlobalNotificationsEditing;
