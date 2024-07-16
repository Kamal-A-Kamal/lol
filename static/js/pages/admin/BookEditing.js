/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import AdminForm from "../../components/ui/AdminForm";
import InputIcon from "../../components/form/elements/InputIcon";
import { isMultiYear } from "../../services/defaultSettings";
import { years } from "../../services/yearSevices";
import {
    handleCrud,
    handleFormErrors,
    handleFormSubmit,
    handleInputChange as handleChange,
    renderInputFields,
} from "../../services/formServices";
import auth from "../../services/authServices";
import http from "../../services/httpServices";

import { submitTypes } from "../../services/adminServices";
import { printDateTime } from "../../utils/time";
import modal from "../../services/modalServices";

const now = printDateTime();
const oneYear = printDateTime(new Date().setFullYear(new Date().getFullYear() + 1));
const initialState = {
    name: "",
    description: "",
    source: "",
    division_id: 0,
    year: 3,

    visible_from: now,
    visible_to: oneYear,

    add_to_course: 1,
    course_id: 0,
    section_id: 0,
    division_name: "",
    section_name: " ",
    section_description: " ",
    submit_type: 0,
    choosen_year: 3,
    book_id: 0,
};

const BookEditing = () => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [divisions, setDivisions] = useState([]);
    const [courses, setCourses] = useState([]);
    const [sections, setSections] = useState([]);

    const [divisionFormLoading, setDivisionFormLoading] = useState(false);

    const [sectionFormLoading, setSectionFormLoading] = useState(false);

    const [inputFields, setInputFields] = useState([]);

    const [books, setBooks] = useState([]);

    const handleDivisionAdd = async (e, id, data, setData) => {
        setDivisionFormLoading(true);
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        try {
            const { data: response } = await http.post(
                `/api/divisions`,
                { year: data.year, division_name: data.division_name },
                config
            );
            getDivisions();
            setData({ ...data, division_id: response.division.id });

            setDivisionFormLoading(false);
        } catch ({ response }) {
            handleFormErrors(response, setDivisionFormLoading, setErrors, false);
        }
    };

    const handleSectionAdd = async (e, id, data, setData) => {
        setErrors({});
        setSectionFormLoading(true);
        modal.message({
            title: "هل انت متأكد من اضافة المجموعة؟",
            icon: "info",
            buttons: {
                confirm: "اضافة",
                cancel: "إلغاء",
            },
            callback: async (e) => {
                if (e && e !== "cancel") {
                    const token = auth.getAdminToken();
                    const config = auth.getAdminAuthConfig(token);
                    try {
                        const { data: response } = await http.post(
                            `/api/sections`,
                            {
                                section_name: data.section_name,
                                section_description: data.section_description,
                                course_id: data.course_id,
                            },
                            config
                        );
                        getSections();
                        modal.message({
                            title: "تمت اضافة المجموعة و اختيارها",
                            callback: () => {
                                setData({
                                    ...data,
                                    section_name: " ",
                                    section_description: " ",
                                    section_id: response.section.id,
                                });
                                setSectionFormLoading(false);
                            },
                        });
                    } catch ({ response }) {
                        handleFormErrors(response, setSectionFormLoading, setErrors, false);
                    }
                } else {
                    setSectionFormLoading(false);
                }
            },
        });
    };

    const getDivisions = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/years/${data.year}/divisions/options`,
            config
        );

        setDivisions(response);
    };

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

    const getBooks = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/years/${data.choosen_year}/books/options`,
            config
        );

        setBooks(response);
    };
    const getBookData = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/books/${data.book_id}`, config);

        let result = {};
        Object.keys(response).forEach((element) => {
            if (["name", "description", "division_id"].includes(element)) {
                result[element] = response[element];
            }
        });

        setData({ ...data, ...result });
    };
    useEffect(() => {
        getDivisions();
        setData({ ...data, course_id: 0, division_id: 0 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.year, data.choosen_year]);

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
                }
                fields = [
                    ...fields,
                    {
                        id: "book_id",
                        placeholder: "اختر المذكرة",
                        type: "select",
                        options: books,
                    },
                ];

                if (data.submit_type === "update") {
                    if (data.book_id > 0) {
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
                                id: "division_id",
                                placeholder: "اختر قسم الموقع",
                                type: "select",
                                options: divisions,
                            },
                        ];
                    }
                }
            }
            if (data.submit_type === "store") {
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
                        id: "source",
                        // placeholder: "اسم الملف / رقم الفيديو التعريفي",
                        // icon: <InputIcon icon="ph:path-bold" />,
                        type: "file",
                    },
                    {
                        id: "division_id",
                        placeholder: "اختر قسم الموقع",
                        type: "select",
                        options: divisions,
                    },
                ];
                if (divisions.length > 0) {
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
                            options: sections,
                            type: "select",
                        },
                        {
                            id: "visible_from",
                            placeholder: "ظاهر من",
                            type: "datetime",
                        },
                        {
                            id: "visible_to",
                            placeholder: "ظاهر إلى",
                            type: "datetime",
                        },
                    ];
                }

                if (divisions.length < 1) {
                    fields = [
                        ...fields,
                        {
                            id: "division_name",
                            placeholder: "اضافة قسم",
                            icon: <InputIcon icon="fluent:app-title-24-filled" />,
                        },
                        {
                            id: "division_add_button",
                            isLoading: divisionFormLoading,
                            onClick: handleDivisionAdd,
                            element: "button",
                            placeholder: "اضافة القسم",
                        },
                    ];
                }

                // if (sections.length < 1 && data.course_id > 0) {
                if (data.course_id > 0) {
                    fields = [
                        ...fields,
                        {
                            id: "section_name",
                            placeholder: "اضافة مجموعة",
                            icon: <InputIcon icon="fluent:app-title-24-filled" />,
                        },
                        {
                            id: "section_description",
                            placeholder: "وصف المجموعة",
                            type: "textarea",
                            icon: <InputIcon icon="ant-design:info-circle-twotone" />,
                        },
                        {
                            id: "section_add_button",
                            isLoading: sectionFormLoading,
                            onClick: handleSectionAdd,
                            element: "button",
                            placeholder: "اضافة المجموعة",
                        },
                    ];
                }

                if (sections.length < 1) {
                    setData({ ...data, section_id: 0 });
                }
            }
        }

        setInputFields(fields);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        divisions,
        courses,
        sections,
        data.course_id,
        data.book_id,
        books,
        sectionFormLoading,
        divisionFormLoading,
    ]);

    useEffect(() => {
        if (data.submit_type !== "store" && data.submit_type) {
            getBooks();
        }
    }, [data.choosen_year, data.submit_type]);
    useEffect(() => {
        if (data.book_id > 0) {
            getBookData();
        }
    }, [data.book_id, data.submit_type, data.choosen_year]);

    useEffect(() => {
        if (data.submit_type === "store") {
            getCourses();
        }
        if (data.course_id > 0) {
            getSections();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.division_id, data.year, data.course_id, data.submit_type]);

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);
            const crudApiEndPoint = "/api/books";
            const crudItemName = "المذكرة";
            handleCrud(
                config,
                data,
                crudApiEndPoint,
                crudItemName,
                setIsLoading,
                setErrors,
                setData,
                initialState,
                data.book_id
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

export default BookEditing;
