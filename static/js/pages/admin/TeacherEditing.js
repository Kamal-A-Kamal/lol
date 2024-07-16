import React, { useEffect, useState } from "react";
import InputIcon from "../../components/form/elements/InputIcon";
import { submitTypes } from "../../services/adminServices";
import auth from "../../services/authServices";
import { isCouponable, isSubscribeBySubjectTeacher } from "../../services/defaultSettings";
import http from "../../services/httpServices";
import {
    handleCrud,
    handleFormSubmit,
    handleInputChange as handleChange,
    renderInputFields,
} from "../../services/formServices";
import AdminContainer from "../../components/ui/AdminContainer";
import AdminForm from "../../components/ui/AdminForm";
import ShowImage from "../../components/form/elements/ShowImage";

const initialState = {
    name: "",
    description: "",
    picture: "",
    visible: 1,
    username: "",
    password: "",
    subjects_id: [],
    submit_type: 0,
    teacher_id: 0,
    to_edit_password: 0,
};

const TeacherEditing = () => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [teacherPicture, setTeacherPicture] = useState("");

    const [inputFields, setInputFields] = useState([]);

    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const getTeachers = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/admin/teachers/options`, config);
        setTeachers(response);
    };

    const getSubjects = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);
        const { data: response } = await http.get(`/api/admin/withyears/subjects/options`, config);
        setSubjects(response);
    };

    const getTeacherInfo = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/teachers/${data.teacher_id}`, config);
        let result = {};
        setTeacherPicture(response.picture);
        Object.keys(response).forEach((element) => {
            if (!["password"].includes(element)) {
                result[element] = response[element];
            }
        });

        let clearingData = {
            ...initialState,
            submit_type: data.submit_type,
            teacher_id: data.teacher_id,
        };
        let settingData = { ...clearingData, ...result, picture: "", to_edit_picture: 0 };

        setData(clearingData);
        setData(settingData);
    };

    useEffect(() => {
        if (data.submit_type && data.submit_type !== "store") {
            getTeachers();
        }
    }, [data.submit_type]);

    useEffect(() => {
        getSubjects();
    }, [data.submit_type]);

    useEffect(() => {
        if (data.teacher_id > 0 && data.submit_type && data.submit_type !== "store") {
            getTeacherInfo();
        }
        setData({ ...data });
    }, [data.teacher_id, data.submit_type]);

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
                        id: "teacher_id",
                        placeholder: "اختر المدرس",
                        type: "select",
                        options: teachers,
                    },
                ];
                if (data.submit_type === "update") {
                    if (data.teacher_id > 0) {
                        fields = [
                            ...fields,
                            {
                                element: "html",
                                input: <ShowImage path={teacherPicture} isPath={true} />,
                            },
                            {
                                id: "name",
                                placeholder: "الاسم",
                                icon: <InputIcon icon="fluent:app-title-24-filled" />,
                            },
                            {
                                id: "description",
                                placeholder: "الوصف",
                                type: "textarea",
                                icon: <InputIcon icon="ant-design:info-circle-twotone" />,
                            },
                            {
                                id: `visible`,
                                placeholder: "اظهار المدرس في الصفحة الرئيسية",
                                type: "switch",
                            },
                            {
                                id: "subjects_id",
                                placeholder: "المواد",
                                multiple: true,
                                options: subjects,
                                type: "select",
                            },
                            {
                                id: "username",
                                placeholder: "اسم المستخدم",
                                icon: <InputIcon icon="fluent:app-title-24-filled" />,
                            },
                        ];
                        if (isSubscribeBySubjectTeacher && data.subjects_id.length > 0) {
                            data.subjects_id.forEach((subject) => {
                                let newData = {
                                    ...data,
                                };
                                newData[`subject_price_${subject}`] =
                                    typeof newData[`subject_price_${subject}`] !== "undefined"
                                        ? newData[`subject_price_${subject}`]
                                        : 0;
                                newData[`subject_sellable_${subject}`] =
                                    typeof newData[`subject_sellable_${subject}`] !== "undefined"
                                        ? newData[`subject_sellable_${subject}`]
                                        : 1;
                                newData[`subject_visible_${subject}`] =
                                    typeof newData[`subject_visible_${subject}`] !== "undefined"
                                        ? newData[`subject_visible_${subject}`]
                                        : 1;
                                newData[`subject_is_couponable_${subject}`] =
                                    typeof newData[`subject_is_couponable_${subject}`] !==
                                    "undefined"
                                        ? newData[`subject_is_couponable_${subject}`]
                                        : 1;
                                setData({
                                    ...newData,
                                });
                                fields = [
                                    ...fields,
                                    {
                                        id: `subject_price_${subject}`,
                                        type: "number",
                                        placeholder: `سعر اشتراك ${
                                            subjects.find((item) => item.value === subject).text
                                        } - ${data.name}`,
                                        icon: <InputIcon icon="solar:euro-bold-duotone" />,
                                    },
                                ];
                                fields = [
                                    ...fields,
                                    {
                                        id: `subject_sellable_${subject}`,
                                        placeholder: "قابل للإشتراك",
                                        type: "switch",
                                    },
                                    {
                                        id: `subject_visible_${subject}`,
                                        placeholder: "اظهر الاشتراك",
                                        type: "switch",
                                    },
                                ];
                                if (isCouponable) {
                                    fields = [
                                        ...fields,
                                        {
                                            id: `subject_is_couponable_${subject}`,
                                            placeholder: "تفعيل الكوبونات",
                                            type: "switch",
                                        },
                                    ];
                                }
                                fields = [
                                    ...fields,
                                    {
                                        element: "html",
                                        input: (
                                            <div className="w-full h-2 bg-text-primary opacity-50 rounded-md"></div>
                                        ),
                                    },
                                ];
                            });
                        }

                        fields = [
                            ...fields,
                            {
                                id: "to_edit_password",
                                placeholder: "تعديل كلمة السر",
                                type: "switch",
                            },
                            {
                                id: "password",
                                placeholder: "كلمة السر",
                                type: "password",
                                icon: <InputIcon icon="solar:lock-password-bold-duotone" />,
                                isDisabled: !data.to_edit_password,
                            },
                        ];
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
                        ];
                    }
                }
            }

            if (data.submit_type && data.submit_type === "store") {
                fields = [
                    ...fields,
                    {
                        id: "name",
                        placeholder: "الاسم",
                        icon: <InputIcon icon="fluent:app-title-24-filled" />,
                    },
                    {
                        id: "description",
                        placeholder: "الوصف",
                        type: "textarea",
                        icon: <InputIcon icon="ant-design:info-circle-twotone" />,
                    },
                    {
                        id: `visible`,
                        placeholder: "اظهار المدرس في الصفحة الرئيسية",
                        type: "switch",
                    },
                    {
                        id: "subjects_id",
                        placeholder: "المواد",
                        multiple: true,
                        options: subjects,
                        type: "select",
                    },
                ];
                if (isSubscribeBySubjectTeacher && data.subjects_id.length > 0) {
                    data.subjects_id.forEach((subject) => {
                        let newData = {
                            ...data,
                        };
                        newData[`subject_price_${subject}`] = 0;
                        newData[`subject_sellable_${subject}`] = 1;
                        newData[`subject_visible_${subject}`] = 1;
                        newData[`subject_is_couponable_${subject}`] = 1;
                        setData({
                            ...newData,
                        });
                        fields = [
                            ...fields,
                            {
                                id: `subject_price_${subject}`,
                                type: "number",
                                placeholder: `سعر اشتراك ${
                                    subjects.find((item) => item.value === subject).text
                                } - ${data.name}`,
                                icon: <InputIcon icon="solar:euro-bold-duotone" />,
                            },
                        ];
                        fields = [
                            ...fields,
                            {
                                id: `subject_sellable_${subject}`,
                                placeholder: "قابل للإشتراك",
                                type: "switch",
                            },
                            {
                                id: `subject_visible_${subject}`,
                                placeholder: "اظهر الاشتراك",
                                type: "switch",
                            },
                        ];
                        if (isCouponable) {
                            fields = [
                                ...fields,
                                {
                                    id: `subject_is_couponable_${subject}`,
                                    placeholder: "تفعيل الكوبونات",
                                    type: "switch",
                                },
                            ];
                        }
                        fields = [
                            ...fields,
                            {
                                element: "html",
                                input: (
                                    <div className="w-full h-2 bg-text-primary opacity-50 rounded-md"></div>
                                ),
                            },
                        ];
                    });
                }

                fields = [
                    ...fields,
                    {
                        id: "username",
                        placeholder: "اسم المستخدم",
                        icon: <InputIcon icon="fluent:app-title-24-filled" />,
                    },
                    {
                        id: "password",
                        placeholder: "كلمة السر",
                        type: "password",
                        icon: <InputIcon icon="solar:lock-password-bold-duotone" />,
                    },
                    {
                        id: "picture",
                        placeholder: "الصورة",
                        type: "file",
                    },
                ];
            }
        }
        setInputFields(fields);
    }, [
        data.submit_type,
        teachers,
        subjects,
        data.teacher_id,
        data.to_edit_picture,
        data.subjects_id,
        data.name,
        teacherPicture,
        data.to_edit_password,
    ]);

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);
            const crudApiEndPoint = "/api/teachers";
            const crudItemName = "مدرس";

            handleCrud(
                config,
                data,
                crudApiEndPoint,
                crudItemName,
                setIsLoading,
                setErrors,
                setData,
                initialState,
                data.teacher_id
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

export default TeacherEditing;
