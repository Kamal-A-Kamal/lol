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
import { Link } from "react-router-dom";

const now = printDateTime();
const oneYear = printDateTime(new Date().setFullYear(new Date().getFullYear() + 1));

const initialState = {
    name: "",
    description: "",
    type: "",

    partition_id: [],
    quantities: "",
    pass_from: 0,

    duration: 0,
    best_duration: 0,

    visible_from: now,
    visible_to: oneYear,

    is_continuable: 0,
    show_results: 1,
    shuffle_questions: 0,
    shuffle_partitions: 0,
    exam_open_limit: 5,

    division_id: 0,
    year: 3,
    submit_type: 0,
    exam_id: 0,
    add_to_course: 1,
    section_name: " ",
    section_description: " ",
};

const types = [
    { value: "exam", text: "امتحان" },
    { value: "hm", text: "واجب" },
    // { value: "video_exam", text: "كويز فيديو" },
];

const ExamEditing = () => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [inputFields, setInputFields] = useState([]);

    const [partitions, setPartitions] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [courses, setCourses] = useState([]);
    const [sections, setSections] = useState([]);
    const [exams, setExams] = useState([]);

    const [divisionFormLoading, setDivisionFormLoading] = useState(false);

    const [sectionFormLoading, setSectionFormLoading] = useState(false);

    const getPartitions = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/years/${data.year}/partitions/options`,
            config
        );

        setPartitions(response);
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

    const getExams = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/years/${data.year}/exams/options`, config);

        setExams(response);
    };
    const getExamInfo = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/exams/${data.exam_id}`, config);
        let result = {};
        Object.keys(response).forEach((element) => {
            if (
                [
                    "name",
                    "type",
                    "description",
                    "duration",
                    "best_duration",
                    "is_continuable",
                    "show_results",
                    "shuffle_questions",
                    "shuffle_partitions",
                    "partition_id",
                    "quantities",
                    "pass_from",
                ].includes(element)
            ) {
                result[element] = response[element];
            }
        });

        setData({ ...data, ...result });
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

    useEffect(() => {
        const quantities = data.quantities.split(",");
        let total_quantity = 0;
        data.partition_id.forEach((element, index) => {
            total_quantity += parseInt(quantities[index]);
        });
        if (data.pass_from > total_quantity) {
            setErrors({ ...errors, pass_from: "درجة النجاح اعلى من عدد الاسئلة" });
        } else {
            setErrors({ ...errors, pass_from: "" });
        }
    }, [data.pass_from, data.quantities, data.partition_id]);

    useEffect(() => {
        getPartitions();
        if (data.submit_type === "store") {
            getDivisions();

            getCourses();
            if (data.course_id > 0) {
                getSections();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.submit_type, data.year, data.course_id]);
    useEffect(() => {
        if (data.submit_type && data.submit_type !== "store") {
            getExams();
            if (data.exam_id > 0) {
                getExamInfo();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.year, data.submit_type, data.exam_id]);

    useEffect(() => {
        const partitionKeys = [];
        partitions.forEach((value) => {
            partitionKeys[value.value] = value.text;
        });
        const quantities = data.quantities.split(",");
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
                        id: "exam_id",
                        placeholder: "اختر الاختبار",
                        type: "select",
                        options: exams,
                    },
                ];
                if (data.submit_type === "update") {
                    if (data.exam_id > 0) {
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
                                id: "type",
                                placeholder: "نوع الاختبار",
                                type: "select",
                                options: types,
                            },
                            {
                                id: "duration",
                                placeholder: " مدة الإختبار بالدقائق",
                                type: "number",
                                icon: <InputIcon icon="carbon:timer" />,
                            },
                            {
                                id: "partition_id",
                                placeholder: "اختر مجموعات الاسئلة",
                                type: "select",
                                multiple: true,
                                options: partitions,
                            },
                            {
                                placeholder: "اكتب عدد اسئلة كل مجموعة بالترتيب بينهم فاصلة",
                                type: "html",
                                className: "clr-text-secondary",
                            },
                            {
                                id: "quantities",
                                placeholder: "عدد اسئلة كل مجموعة",
                                icon: <InputIcon icon="fluent:document-page-number-24-regular" />,
                            },
                            {
                                placeholder: (
                                    <div>
                                        {data.partition_id.map((value, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex space-x-2 space-x-reverse"
                                                >
                                                    <span className="underline">{`${partitionKeys[value]}: `}</span>
                                                    <span className="clr-text-secondary">
                                                        {quantities[index] ? (
                                                            <span className="flex space-x-2 space-x-reverse">
                                                                <span>
                                                                    {parseInt(quantities[index])}
                                                                </span>
                                                                <span>
                                                                    {parseInt(quantities[index]) <
                                                                    11
                                                                        ? "اسئلة"
                                                                        : "سؤال"}
                                                                </span>
                                                            </span>
                                                        ) : (
                                                            <span className="text-rose-500">
                                                                ------
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ),
                                type: "html",
                            },
                            {
                                id: "pass_from",
                                placeholder: "درجة النجاح",
                                type: "number",
                                icon: <InputIcon icon="icon-park-twotone:degree-hat" />,
                            },
                            {
                                id: "shuffle_partitions",
                                placeholder: "ترتيب عشوائي للمجموعات",
                                type: "switch",
                            },
                            {
                                id: "shuffle_questions",
                                placeholder: "ترتيب عشوائي للأسئلة",
                                type: "switch",
                            },
                            {
                                id: "is_continuable",
                                placeholder: "امكانية الاستكمال",
                                type: "switch",
                            },
                            {
                                id: "show_results",
                                placeholder: "اظهار الاجابات",
                                type: "switch",
                            },
                        ];
                        // if (isMultiYear) {
                        //     fields = [
                        //         ...fields,
                        //         {
                        //             id: "year",
                        //             placeholder: "اختر الصف الدراسي",
                        //             type: "select",
                        //             options: years,
                        //         },
                        //     ];
                        // }
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
                        id: "type",
                        placeholder: "نوع الاختبار",
                        type: "select",
                        options: types,
                    },
                    {
                        id: "duration",
                        placeholder: " مدة الإختبار بالدقائق",
                        type: "number",
                        icon: <InputIcon icon="carbon:timer" />,
                    },
                    {
                        id: "partition_id",
                        placeholder: "اختر مجموعات الاسئلة",
                        type: "select",
                        multiple: true,
                        options: partitions,
                    },
                    {
                        placeholder: "اكتب عدد اسئلة كل مجموعة بالترتيب بينهم فاصلة",
                        type: "html",
                        className: "clr-text-secondary",
                    },
                    {
                        id: "quantities",
                        placeholder: "عدد اسئلة كل مجموعة",
                        icon: <InputIcon icon="fluent:document-page-number-24-regular" />,
                    },
                    {
                        placeholder: (
                            <div>
                                {data.partition_id.map((value, index) => {
                                    return (
                                        <div key={index} className="flex space-x-2 space-x-reverse">
                                            <span className="underline">{`${partitionKeys[value]}: `}</span>
                                            <span className="clr-text-secondary">
                                                {quantities[index] ? (
                                                    <span className="flex space-x-2 space-x-reverse">
                                                        <span>{parseInt(quantities[index])}</span>
                                                        <span>
                                                            {parseInt(quantities[index]) < 11
                                                                ? "اسئلة"
                                                                : "سؤال"}
                                                        </span>
                                                    </span>
                                                ) : (
                                                    <span className="text-rose-500">------</span>
                                                )}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        ),
                        type: "html",
                    },
                    {
                        id: "pass_from",
                        placeholder: "درجة النجاح",
                        type: "number",
                        icon: <InputIcon icon="icon-park-twotone:degree-hat" />,
                    },
                    {
                        id: "shuffle_partitions",
                        placeholder: "ترتيب عشوائي للمجموعات",
                        type: "switch",
                    },
                    {
                        id: "shuffle_questions",
                        placeholder: "ترتيب عشوائي للأسئلة",
                        type: "switch",
                    },
                    {
                        id: "is_continuable",
                        placeholder: "امكانية الاستكمال",
                        type: "switch",
                    },
                    {
                        id: "show_results",
                        placeholder: "اظهار الاجابات",
                        type: "switch",
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
                            id: "exam_open_limit",
                            placeholder: "عدد مرات فتح الاختبار",
                            type: "number",
                            icon: <InputIcon icon="carbon:timer" />,
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
            }
        }
        setInputFields(fields);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        data.submit_type,
        partitions,
        data.year,
        exams,
        divisions,
        data.exam_id,
        sections,
        data.course_id,
        courses,
        data.quantities,
        data.partition_id,
        sectionFormLoading,
        divisionFormLoading,
    ]);

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);
            const crudApiEndPoint = "/api/exams";
            const crudItemName = "الامتحان";

            handleCrud(
                config,
                data,
                crudApiEndPoint,
                crudItemName,
                setIsLoading,
                setErrors,
                setData,
                initialState,
                data.exam_id
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
                <div className="-my-8 clr-text-secondary font-small text-center">
                    لتعديل مواعيد البدء والانتهاء وظهور المحتوى واختفائه قم بالذهاب الى صفحه
                    <br />
                    <Link
                        className="underline hover:text-slate-200 duration-200"
                        to="../course_sections_editing_page"
                    >
                        {" "}
                        تعديل مجموعات الكورس{" "}
                    </Link>
                </div>
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

export default ExamEditing;
