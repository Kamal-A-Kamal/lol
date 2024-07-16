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
    is_visible: 1,
    is_free: 0,
    is_closed: 0,
    has_moderators: 0,
    moderators_id: [],
    is_required_approvment_to_post: 1,
    is_non_subscribed_able_to_view: 0,
    is_non_subscribed_able_to_contribute: 0,
    year: 3,
    courses_id: [],
    submit_type: 0,
    community_category_id: 0,
};

const CommunityCategoryEditing = () => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [courses, setCourses] = useState([]);
    const [admins, setAdmins] = useState([]);

    const [inputFields, setInputFields] = useState([]);

    const [communityCategories, setCommunityCategories] = useState([]);

    const getCourses = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/years/${data.year}/courses/options`,
            config
        );
        setCourses(response);
    };

    const getCommunityCategories = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/community_categories/options`, config);

        setCommunityCategories(response);
    };
    const getCommunityCategoryInfo = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/community_categories/${data.community_category_id}`,
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
        getCourses();
        setData({ ...data, courses_id: [] });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.year]);
    useEffect(() => {
        getAdmins();
    }, []);

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
                        id: "community_category_id",
                        placeholder: "اختر المجموعة",
                        type: "select",
                        options: communityCategories,
                    },
                ];

                if (data.submit_type === "update") {
                    if (data.community_category_id > 0) {
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
                            {
                                id: "is_visible",
                                placeholder: "مجموعة ظاهرة",
                                type: "switch",
                            },
                            {
                                id: "is_closed",
                                placeholder: "مجموعة مغلقة (لا يمكن لأحد المشاركة)",
                                type: "switch",
                            },
                            {
                                id: "has_moderators",
                                placeholder: "مجموعة لمسئول او اكثر فقط",
                                type: "switch",
                            },
                            {
                                id: "moderators_id",
                                placeholder: "اختر المسئول",
                                options: admins,
                                isDisabled: !data.has_moderators,
                                multiple: true,
                                type: "select",
                            },
                            {
                                id: "is_required_approvment_to_post",
                                placeholder: "يجب موافقة الأدمن على البوست",
                                type: "switch",
                            },

                            {
                                id: "is_free",
                                placeholder: "مجموعة مجانية",
                                type: "switch",
                            },
                        ];

                        if (isMultiYear) {
                            fields = [
                                ...fields,
                                {
                                    id: "year",
                                    placeholder: "اختر الصف الدراسي",
                                    type: "select",
                                    options: years,
                                    isDisabled: data.is_free,
                                },
                            ];
                        }

                        fields = [
                            ...fields,
                            {
                                id: "courses_id",
                                placeholder: "اختر الكورس",
                                options: courses,
                                isDisabled: data.is_free,
                                multiple: true,
                                type: "select",
                            },
                            {
                                id: "is_non_subscribed_able_to_view",
                                placeholder: "مجموعة ظاهرة لغير المشتركين",
                                isDisabled: data.is_free,
                                type: "switch",
                            },
                            {
                                id: "is_non_subscribed_able_to_contribute",
                                placeholder: "غير المشتركين قابلين للمشاركة",
                                isDisabled: data.is_free,
                                type: "switch",
                            },
                        ];
                    }
                }
            }
            console.log(admins);
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
                    {
                        id: "is_visible",
                        placeholder: "مجموعة ظاهرة",
                        type: "switch",
                    },
                    {
                        id: "is_closed",
                        placeholder: "مجموعة مغلقة (لا يمكن لأحد المشاركة)",
                        type: "switch",
                    },
                    {
                        id: "has_moderators",
                        placeholder: "مجموعة لمسئول او اكثر فقط",
                        type: "switch",
                    },
                    {
                        id: "moderators_id",
                        placeholder: "اختر المسئول",
                        options: admins,
                        isDisabled: !data.has_moderators,
                        multiple: true,
                        type: "select",
                    },
                    {
                        id: "is_required_approvment_to_post",
                        placeholder: "يجب موافقة الأدمن على البوست",
                        type: "switch",
                    },

                    {
                        id: "is_free",
                        placeholder: "مجموعة مجانية",
                        type: "switch",
                    },
                ];

                if (isMultiYear) {
                    fields = [
                        ...fields,
                        {
                            id: "year",
                            placeholder: "اختر الصف الدراسي",
                            type: "select",
                            options: years,
                            isDisabled: data.is_free,
                        },
                    ];
                }

                fields = [
                    ...fields,
                    {
                        id: "courses_id",
                        placeholder: "اختر الكورس",
                        options: courses,
                        isDisabled: data.is_free,
                        multiple: true,
                        type: "select",
                    },
                    {
                        id: "is_non_subscribed_able_to_view",
                        placeholder: "مجموعة ظاهرة لغير المشتركين",
                        isDisabled: data.is_free,
                        type: "switch",
                    },
                    {
                        id: "is_non_subscribed_able_to_contribute",
                        placeholder: "غير المشتركين قابلين للمشاركة",
                        isDisabled: data.is_free,
                        type: "switch",
                    },
                ];
            }
        }

        setInputFields(fields);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        courses,
        admins,
        // data.courses_id,
        data.submit_type,
        data.community_category_id,
        communityCategories,
        data.is_free,
        data.has_moderators,
    ]);

    useEffect(() => {
        if (data.submit_type !== "store" && data.submit_type) {
            getCommunityCategories();
        }
    }, [data.submit_type]);
    useEffect(() => {
        if (data.community_category_id > 0) {
            getCommunityCategoryInfo();
        }
    }, [data.community_category_id, data.submit_type]);

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);
            const crudApiEndPoint = "/api/community_categories";
            const crudItemName = "مجموعة المنتدى";
            handleCrud(
                config,
                data,
                crudApiEndPoint,
                crudItemName,
                setIsLoading,
                setErrors,
                setData,
                initialState,
                data.community_category_id
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

export default CommunityCategoryEditing;
