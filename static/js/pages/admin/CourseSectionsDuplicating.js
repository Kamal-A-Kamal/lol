import React, { useEffect, useState } from "react";
import InputIcon from "../../components/form/elements/InputIcon";
import http from "../../services/httpServices";
import auth from "../../services/authServices";
import modal from "../../services/modalServices";
import AdminContainer from "../../components/ui/AdminContainer";
import {
    getFormData,
    handleFormErrors,
    handleFormSubmit,
    handleInputChange as handleChange,
    renderInputFields,
} from "../../services/formServices";
import AdminForm from "../../components/ui/AdminForm";
import { years } from "../../services/yearSevices";
import { isCouponable, isMultiYear } from "../../services/defaultSettings";
const initialState = {
    from_year: 3,
    from_course_id: 0,
    section_id: 0,
    to_year: 0,
    to_course_id: 0,
    is_new_course_choosen: false,
    name: "",
    description: "",
    price: 0,
    picture: "",
    is_couponable: 1,
    year: 3,
    sellable: 1,
    visible_alone: 1,
    have_certificate: 0,
};

const CourseSectionsDuplicating = () => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [fromCourses, setFromCourses] = useState([]);
    const [toCourses, setToCourses] = useState([]);
    const [sections, setSections] = useState([]);

    const [courseAddLoading, setCourseAddLoading] = useState(false);
    // const [isNewCourseChoosen, setIsNewCourseChoosen] = useState([]);

    const [inputFields, setInputFields] = useState([]);

    useEffect(() => {
        let fields = [];
        if (isMultiYear) {
            fields = [
                ...fields,
                {
                    id: "from_year",
                    placeholder: "اختر الصف الدراسي",
                    type: "select",
                    options: years,
                },
            ];
        } else {
            fields = [
                ...fields,
                {
                    id: "from_year",
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
                id: "from_course_id",
                placeholder: "اختر الكورس المنقول مِنهُ",
                options: fromCourses,
                type: "select",
            },
        ];

        if (data.from_course_id > 0) {
            fields = [
                ...fields,
                {
                    id: "section_id",
                    placeholder: "اختر المجموعة",
                    options: sections,
                    type: "select",
                },
            ];
        }
        if (data.section_id > 0) {
            fields = [
                ...fields,
                {
                    id: "is_new_course_choosen",
                    placeholder: "انشاء كورس جديد",
                    type: "switch",
                },
            ];
            if (!data.is_new_course_choosen) {
                if (isMultiYear) {
                    fields = [
                        ...fields,
                        {
                            id: "to_year",
                            placeholder: "اختر الصف الدراسي",
                            isDisabled: data.is_new_course_choosen,
                            type: "select",
                            options: years,
                        },
                    ];
                } else {
                    fields = [
                        ...fields,
                        {
                            id: "to_year",
                            placeholder: "نوع الكورس",
                            isDisabled: data.is_new_course_choosen,
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
                if (data.to_year > 0) {
                    fields = [
                        ...fields,
                        {
                            id: "to_course_id",
                            placeholder: "اختر الكورس المنقول إِليه",
                            isDisabled: data.is_new_course_choosen,
                            options: toCourses,
                            type: "select",
                        },
                    ];
                }
            } else {
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
                fields = [
                    ...fields,
                    {
                        id: "course_add_button",
                        isLoading: courseAddLoading,
                        onClick: handleCourseAdd,
                        element: "button",
                        placeholder: "اضافة الكورس",
                    },
                ];
            }
        }
        setInputFields(fields);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        fromCourses,
        sections,
        toCourses,
        data,
        data.from_year,
        data.from_course_id,
        data.section_id,
        data.to_year,
        data.to_course_id,
        data.is_new_course_choosen,
        courseAddLoading,
    ]);

    useEffect(() => {
        setData({
            ...data,
            description: data.name,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.name]);

    const handleCourseAdd = async (e, id, data, setData) => {
        setErrors({});
        setCourseAddLoading(true);
        modal.message({
            title: "هل انت متأكد من اضافة الكورس",
            icon: "info",
            buttons: {
                confirm: "اضافة",
                cancel: "إلغاء",
            },
            callback: async (e) => {
                if (e && e !== "cancel") {
                    const token = auth.getAdminToken();
                    const config = auth.getAdminAuthConfig(token);
                    const formData = getFormData(data);
                    try {
                        const { data: response } = await http.post(
                            `/api/courses`,
                            formData,
                            config
                        );
                        getToCourses();
                        modal.message({
                            title: "تمت اضافة الكورس و اختياره",
                            callback: () => {
                                setData({
                                    ...initialState,
                                    from_year: data.from_year,
                                    from_course_id: data.from_course_id,
                                    section_id: data.section_id,
                                    to_year: data.year,
                                    to_course_id: response.id,
                                });
                                setCourseAddLoading(false);
                            },
                        });
                    } catch ({ response }) {
                        handleFormErrors(response, setCourseAddLoading, setErrors, false);
                    }
                } else {
                    setCourseAddLoading(false);
                }
            },
        });
    };

    const getFromCourses = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/years/${data.from_year}/courses/options`,
            config
        );
        setFromCourses(response);
    };
    const getToCourses = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/years/${data.to_year}/courses/options`,
            config
        );
        setToCourses(response);
    };

    const getSections = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/courses/${data.from_course_id}/sections/options`,
            config
        );

        setSections(response);
    };

    useEffect(() => {
        getFromCourses();

        setData({
            ...initialState,
            from_year: data.from_year,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.from_year]);
    useEffect(() => {
        setData({
            ...initialState,
            from_year: data.from_year,
            from_course_id: data.from_course_id,
        });
        if (data.from_course_id > 0) {
            getSections();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.from_course_id]);

    useEffect(() => {
        getToCourses();

        setData({
            ...data,
            // to_course_id: 0,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.to_year]);

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            duplicateCourseSection();
        });
    };

    const duplicateCourseSection = async () => {
        try {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);

            const toSendData = { ...data };
            const { data: response } = await http.post(
                `/api/sections/${data.section_id}/duplicate`,
                toSendData,
                config
            );

            modal.message({
                title: "تم تنفيذ طلبك بنجاح",
                text: response.message,

                buttons: {
                    confirm: "حفظ ومتابعة",
                    cancel: "متابعة",
                },
                callback: (e) => {
                    if (e && e !== "cancel") {
                        setData(data);
                    } else {
                        setData(initialState);
                    }
                    setIsLoading(false);
                },
            });
        } catch ({ response }) {
            handleFormErrors(response, setIsLoading, setErrors);
        }
    };

    return (
        <div className="space-y-10">
            <AdminContainer>
                <AdminForm onSubmit={handleSubmit} isLoading={isLoading} buttonText="نقل المجموعة">
                    <div className="-my-8 clr-text-secondary font-small">
                        <div>انسخ المجموعة بمحتواها من كورس لكورس آخر</div>
                        <div className="underline">ملحوظات :</div>
                        <div className="font-smaller">
                            - اي محتوى يتم اضافته أو حذفه داخل مجموعة يتم اضافته أو حذفه في في كل
                            الكورسات الموجود بها هذه المجموعة
                        </div>
                    </div>

                    {inputFields.map((input, key) => (
                        <React.Fragment key={key}>
                            {renderInputFields(
                                key,
                                input.handleChange ? input.handleChange : handleChange,
                                data,
                                setData,
                                errors,
                                input
                            )}
                            {/* <InputField
                                key={key}
                                onChange={handleChange}
                                data={data}
                                setData={setData}
                                errors={errors}
                                {...input}
                            /> */}
                        </React.Fragment>
                    ))}
                </AdminForm>
            </AdminContainer>
        </div>
    );
};

export default CourseSectionsDuplicating;
