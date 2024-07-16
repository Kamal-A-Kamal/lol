/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import AdminForm from "../../components/ui/AdminForm";
import InputIcon from "../../components/form/elements/InputIcon";
import {
    isMultiYear,
    isCouponable,
    isPrepaidSystem,
    isSubjectSubscriptionable,
    isCategories,
    isCourseRenamedToMonthlySubscriptions,
    isCenterApi,
} from "../../services/defaultSettings";
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
import ShowImage from "./../../components/form/elements/ShowImage";

const initialState = {
    name: "",
    description: "",
    price: 0,
    picture: "",
    prepaidable: 0,
    is_couponable: 1,
    year: 3,
    teacher_id: 0,
    subject_id: 0,
    is_subject_subscriptionable: 0,
    sellable: 1,
    visible_alone: 1,
    have_certificate: 0,
    submit_type: 0,
    course_id: 0,
    to_edit_picture: 0,
    choosen_year: 3,
    category_id: 0,
    is_course_renamed: isCourseRenamedToMonthlySubscriptions ? 1 : 0,
    is_enabled_for_center_api: 0,
};

const CourseEditing = () => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [coursePicture, setCoursePicutre] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [inputFields, setInputFields] = useState([]);

    const [courses, setCourses] = useState([]);
    const [categoties, setCategoties] = useState([]);

    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const getCourses = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/years/${data.choosen_year}/courses/options`,
            config
        );
        setCourses(response);
    };

    const getCategories = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);
        const { data: response } = await http.get(`/api/categories`, config);
        setCategoties(response);
    };

    useEffect(() => {
        if (isCategories) {
            getCategories();
        }
    }, []);

    const getTeachers = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/admin/teachers/options`, config);
        setTeachers(response);
    };

    const getCourseInfo = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/courses/${data.course_id}`, config);
        let result = {};
        Object.keys(response).forEach((element) => {
            if (
                [
                    "name",
                    "description",
                    "price",
                    "teacher_id",
                    "is_subject_subscriptionable",
                    "sellable",
                    "visible_alone",
                    "prepaidable",
                    "category_id",
                    "is_course_renamed",
                    "is_enabled_for_center_api",
                ].includes(element)
            ) {
                result[element] = response[element];
            }
        });

        setCoursePicutre(response.picture);
        setData({ ...data, ...result, picture: "", to_edit_picture: 0 });
    };

    useEffect(() => {
        if (data.submit_type && data.submit_type !== "store") {
            getCourses();
        }
    }, [data.choosen_year, data.submit_type]);

    useEffect(() => {
        if (isSubjectSubscriptionable) {
            getTeachers();
        }
    }, []);

    const getSubjects = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/admin/withyears/teachers/${data.teacher_id}/subjects/options`,
            config
        );
        setSubjects([]);
        setSubjects(response);
    };

    useEffect(() => {
        setData({ ...data, subject_id: 0 });
        if (data.teacher_id > 0) {
            getSubjects();
        }
    }, [data.teacher_id]);

    useEffect(() => {
        if (data.course_id > 0 && data.submit_type && data.submit_type !== "store") {
            getCourseInfo();
        }
        setData({ ...data, picture: "", to_edit_picture: 0 });
    }, [data.course_id, data.submit_type, data.choosen_year]);

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
                if (isMultiYear) {
                    fields = [
                        ...fields,
                        {
                            id: "choosen_year",
                            placeholder: "اختر الصف الدراسي",
                            type: "select",
                            options: years,
                        },
                    ];
                } else {
                    fields = [
                        ...fields,
                        {
                            id: "choosen_year",
                            placeholder: "نوع الكورس",
                            type: "select",
                            options: [
                                {
                                    value: "3",
                                    text: "الكورسات",
                                },
                                {
                                    value: "4",
                                    text: "كورسات المحاضرات",
                                },
                            ],
                        },
                    ];
                }
                fields = [
                    ...fields,
                    {
                        id: "course_id",
                        placeholder: "اختر الكورس",
                        type: "select",
                        options: courses,
                    },
                ];
                if (data.submit_type === "update") {
                    if (data.course_id > 0) {
                        // console.log(coursePicture);
                        fields = [
                            ...fields,
                            {
                                element: "html",
                                input: <ShowImage path={coursePicture} isPath={true} />,
                            },
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
                        if (isCourseRenamedToMonthlySubscriptions) {
                            fields = [
                                ...fields,
                                {
                                    id: "is_course_renamed",
                                    placeholder: "يكون اسمه اشتراك شهري",
                                    type: "switch",
                                },
                            ];
                        }
                        fields = [
                            ...fields,
                            {
                                id: "to_edit_picture",
                                placeholder: "تعديل الصورة",
                                type: "switch",
                            },
                            {
                                id: "picture",
                                placeholder: "الصورة",
                                type: "file",
                                isDisabled: !data.to_edit_picture,
                            },
                            {
                                id: "price",
                                placeholder: "السعر",
                                type: "number",
                                icon: <InputIcon icon="ic:twotone-price-change" />,
                            },
                        ];
                        if (isCategories && data.year == 3) {
                            fields = [
                                ...fields,
                                {
                                    id: "category_id",
                                    placeholder: "الفئه",
                                    type: "select",
                                    options: categoties,
                                    icon: <InputIcon icon="ic:twotone-price-change" />,
                                },
                            ];
                        }
                        if (isSubjectSubscriptionable) {
                            fields = [
                                ...fields,
                                {
                                    id: "teacher_id",
                                    placeholder: "المدرس",
                                    options: teachers,
                                    type: "select",
                                },
                                {
                                    id: "subject_id",
                                    placeholder: "المادة",
                                    options: subjects,
                                    type: "select",
                                },
                                {
                                    id: "is_subject_subscriptionable",
                                    placeholder: "قابل للإشتراك الشهري بالمواد",
                                    type: "switch",
                                },
                            ];
                        }
                        fields = [
                            ...fields,
                            {
                                id: "sellable",
                                placeholder: "قابل للبيع",
                                type: "switch",
                            },
                            {
                                id: "visible_alone",
                                placeholder: "ظاهر في الصفحة الرئيسية",
                                type: "switch",
                            },
                        ];
                        if (isCenterApi) {
                            fields = [
                                ...fields,
                                {
                                    id: "is_enabled_for_center_api",
                                    placeholder: "كورس سنتر",
                                    type: "switch",
                                },
                            ];
                        }
                        if (isPrepaidSystem) {
                            fields = [
                                ...fields,
                                {
                                    id: "prepaidable",
                                    placeholder: "قابل للدفع المسبق (اكواد)",
                                    type: "switch",
                                },
                            ];
                        }
                        if (isCouponable) {
                            fields = [
                                ...fields,
                                {
                                    id: "is_couponable",
                                    placeholder: "تفعيل الكوبونات",
                                    type: "switch",
                                },
                            ];
                        }
                    }
                }
            }

            if (data.submit_type && data.submit_type === "store") {
                if (isMultiYear) {
                    fields = [
                        ...fields,
                        {
                            id: "year",
                            placeholder: "اختر الصف الدراسي",
                            type: "select",
                            options: years,
                        },
                    ];
                } else {
                    fields = [
                        ...fields,
                        {
                            id: "year",
                            placeholder: "نوع الكورس",
                            type: "select",
                            options: [
                                {
                                    value: "3",
                                    text: "الكورسات",
                                },
                                {
                                    value: "4",
                                    text: "كورسات المحاضرات",
                                },
                            ],
                        },
                    ];
                }
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
                if (isCourseRenamedToMonthlySubscriptions) {
                    fields = [
                        ...fields,
                        {
                            id: "is_course_renamed",
                            placeholder: "يكون اسمه اشتراك شهري",
                            type: "switch",
                        },
                    ];
                }
                fields = [
                    ...fields,
                    {
                        id: "picture",
                        placeholder: "الصورة",
                        type: "file",
                    },
                    {
                        id: "price",
                        placeholder: "السعر",
                        type: "number",
                        icon: <InputIcon icon="ic:twotone-price-change" />,
                    },
                ];
                if (isCategories && data.year == 3) {
                    fields = [
                        ...fields,
                        {
                            id: "category_id",
                            placeholder: "الفئه",
                            type: "select",
                            options: categoties,
                            icon: <InputIcon icon="ic:twotone-price-change" />,
                        },
                    ];
                }
                if (isSubjectSubscriptionable) {
                    fields = [
                        ...fields,
                        {
                            id: "teacher_id",
                            placeholder: "المدرس",
                            options: teachers,
                            type: "select",
                        },
                        {
                            id: "subject_id",
                            placeholder: "المادة",
                            options: subjects,
                            type: "select",
                        },
                        {
                            id: "is_subject_subscriptionable",
                            placeholder: "قابل للإشتراك الشهري بالمواد",
                            type: "switch",
                        },
                    ];
                }
                fields = [
                    ...fields,
                    {
                        id: "sellable",
                        placeholder: "قابل للبيع",
                        type: "switch",
                    },
                    {
                        id: "visible_alone",
                        placeholder: "ظاهر في الصفحة الرئيسية",
                        type: "switch",
                    },
                ];
                if (isCenterApi) {
                    fields = [
                        ...fields,
                        {
                            id: "is_enabled_for_center_api",
                            placeholder: "كورس سنتر",
                            type: "switch",
                        },
                    ];
                }
                if (isPrepaidSystem) {
                    fields = [
                        ...fields,
                        {
                            id: "prepaidable",
                            placeholder: "قابل للدفع المسبق (اكواد)",
                            type: "switch",
                        },
                    ];
                }
                if (isCouponable) {
                    fields = [
                        ...fields,
                        {
                            id: "is_couponable",
                            placeholder: "تفعيل الكوبونات",
                            type: "switch",
                        },
                    ];
                }
            }
        }
        setInputFields(fields);
    }, [
        data.submit_type,
        courses,
        data.course_id,
        data.submit_type,
        data.choosen_year,
        coursePicture,
        data.to_edit_picture,
        categoties,
        data.year,
        data.subject_id,
        teachers,
        subjects,
    ]);

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);
            const crudApiEndPoint = "/api/courses";
            const crudItemName = "الكورس";

            handleCrud(
                config,
                data,
                crudApiEndPoint,
                crudItemName,
                setIsLoading,
                setErrors,
                setData,
                initialState,
                data.course_id
            );
            // addCourse();
        });
    };

    // const addCourse = async () => {
    //     try {
    //         const adminToken = auth.getAdminToken();
    //         const config = auth.getAdminAuthConfig(adminToken);

    //         const formData = new FormData();

    //         Object.keys(data).forEach((index) => {
    //             formData.append(index, data[index]);
    //         });

    //         const { data: response } = await http.post("/api/courses", formData, config);

    //         modal.message({
    //             title: "تم تنفيذ طلبك بنجاح",
    //             text: response.message,
    //         });
    //         setIsLoading(false);
    //     } catch ({ response }) {
    //         handleFormErrors(response, setIsLoading, setErrors);
    //     }
    // };

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

export default CourseEditing;
