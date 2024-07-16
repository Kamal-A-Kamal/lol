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
    section_name: "",
    section_description: "",
    name: "",
    description: "",

    year: 3,
    add_to_course: 1,
    course_id: 0,
    section_id: 0,
    submit_type: 0,
};

const SectionEditing = () => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [courses, setCourses] = useState([]);

    const [inputFields, setInputFields] = useState([]);

    const [sections, setSections] = useState([]);

    const getCourses = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/years/${data.year}/courses/options`,
            config
        );
        setCourses(response);
    };

    const getSections = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/courses/${data.course_id}/sections/options`,
            config
        );

        setSections(response);
    };

    const getSectionData = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/sections/${data.section_id}`, config);

        let result = {};
        Object.keys(response).forEach((element) => {
            if (["name", "description"].includes(element)) {
                result[element] = response[element];
            }
        });

        setData({ ...data, ...result });
    };

    useEffect(() => {
        getCourses();
        setData({ ...data, course_id: 0, division_id: 0 });
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
            }
            if (data.submit_type !== "store" && data.submit_type) {
                fields = [
                    ...fields,
                    {
                        id: "course_id",
                        placeholder: "اختر الكورس",
                        options: courses,
                        type: "select",
                    },
                    {
                        id: "section_id",
                        placeholder: "اختر المجموعة",
                        type: "select",
                        options: sections,
                    },
                ];

                if (data.submit_type === "update") {
                    if (data.section_id > 0) {
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
                    }
                }
            }
            if (data.submit_type === "store") {
                fields = [
                    ...fields,
                    {
                        id: "section_name",
                        placeholder: "العنوان",
                        icon: <InputIcon icon="fluent:app-title-24-filled" />,
                    },
                    {
                        id: "section_description",
                        placeholder: "الوصف",
                        type: "textarea",
                        icon: <InputIcon icon="ant-design:info-circle-twotone" />,
                    },
                ];
                fields = [
                    ...fields,
                    {
                        id: "course_id",
                        placeholder: "اختر الكورس",
                        options: courses,
                        type: "select",
                    },
                ];
            }
        }

        setInputFields(fields);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courses, sections, data.course_id, data.section_id, data.submit_type]);

    useEffect(() => {
        if (data.course_id > 0 && data.submit_type !== "store" && data.submit_type) {
            getSections();
        }
    }, [data.course_id, data.submit_type]);

    useEffect(() => {
        if (data.section_id > 0 && data.submit_type === "update") {
            getSectionData();
        }
    }, [data.section_id, data.submit_type, data.year]);

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);
            const crudApiEndPoint = "/api/sections";
            const crudItemName = "المجموعة";
            handleCrud(
                config,
                data,
                crudApiEndPoint,
                crudItemName,
                setIsLoading,
                setErrors,
                setData,
                initialState,
                data.section_id
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

export default SectionEditing;
