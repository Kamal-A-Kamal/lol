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
import { years } from "../../services/yearSevices";
import {
    isMultiYear,
    isPlatformSubscription,
    isSubjectSubscriptionable,
    isTimedManualSubscription,
} from "../../services/defaultSettings";
import { printDateTime } from "../../utils/time";

const now = printDateTime();
const oneMonth = printDateTime(new Date().setMonth(new Date().getMonth() + 1));
const initialState = {
    phone: "",
    course_id: [],
    subscription_type: "course",
    subject_id: 0,
    teacher_id: 0,
    is_all: false,
    platform_subscription: false,
    permanent: true,
    valid_from: now,
    valid_to: oneMonth,
    year: 3,
};
const subscriptionsTypes = [
    { value: "course", text: "بالكورس" },
    { value: "subject_teacher", text: "بالمادة" },
];
const ManualSubscription = () => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [isCoursesDisabled, setIsCoursesDisabled] = useState(false);

    const [result, setResult] = useState({
        users: {},
        not_found_users: [],
    });
    const [showResult, setShowResult] = useState(false);
    const [inputFields, setInputFields] = useState([]);

    useEffect(() => {
        let fields = [
            {
                id: "phone",
                placeholder: "رقم الهاتف",
                icon: <InputIcon icon="ant-design:phone-filled" />,
            },
        ];
        if (isMultiYear) {
            fields = [
                ...fields,
                {
                    id: "year",
                    placeholder: "اختر الصف الدراسي",
                    isDisabled: data.is_all || data.platform_subscription,
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
                    isDisabled: data.is_all || data.platform_subscription,
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
        if (isSubjectSubscriptionable) {
            fields = [
                ...fields,
                {
                    id: "subscription_type",
                    placeholder: "اختر نوع الاشتراك",
                    isDisabled: data.is_all || data.platform_subscription,
                    type: "select",
                    options: subscriptionsTypes,
                },
            ];
        }
        if (data.subscription_type === "course") {
            fields = [
                ...fields,
                {
                    id: "course_id",
                    placeholder: "اختر الكورس",
                    multiple: true,
                    isDisabled: data.is_all || data.platform_subscription,
                    options: courses,
                    type: "select",
                },
            ];
        } else {
            fields = [
                ...fields,
                {
                    id: "subject_id",
                    placeholder: "اختر المادة",
                    isDisabled: data.is_all || data.platform_subscription,
                    options: subjects,
                    type: "select",
                },
                {
                    id: "teacher_id",
                    placeholder: "اختر المدرس",
                    isDisabled: data.is_all || data.platform_subscription,
                    options: teachers,
                    type: "select",
                },
            ];
        }
        fields = [
            ...fields,
            {
                id: "is_all",
                isDisabled: data.platform_subscription,
                placeholder: "تفعيل جميع الكورسات",
                type: "switch",
            },
        ];

        if (isPlatformSubscription) {
            fields = [
                ...fields,
                {
                    id: "platform_subscription",
                    placeholder: "تفعيل المنصة بالكامل (كورس موجود بالفعل او سيتم اضافته)",
                    type: "switch",
                },
            ];
        }
        if (isTimedManualSubscription) {
            fields = [
                ...fields,
                {
                    id: "permanent",
                    placeholder: "تفعيل الكورس لآخر السنة",
                    type: "switch",
                },
            ];
            fields = [
                ...fields,
                {
                    id: "valid_from",
                    visible: !data.permanent,
                    placeholder: "مشترك من",
                    type: "datetime",
                },
                {
                    id: "valid_to",
                    visible: !data.permanent,
                    placeholder: "مشترك إلى",
                    type: "datetime",
                },
            ];
        }

        setInputFields(fields);
    }, [
        courses,
        data.is_all,
        data.permanent,
        data.platform_subscription,
        data.subscription_type,
        subjects,
        teachers,
    ]);

    const getCourses = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/years/${data.year}/courses/options`,
            config
        );
        setCourses(response);
        // const currentData = { ...data };
        // currentData["course_id"] = response[0]["value"];
        // currentData["course_id"].push(response[0]["value"] + "");
        // setData(currentData);
    };
    const getSubjects = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/admin/years/${data.year}/subjects/options`,
            config
        );
        setSubjects(response);
    };
    const getTeachers = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/admin/subjects/${data.subject_id}/teachers/options`,
            config
        );
        setTeachers(response);
    };
    useEffect(() => {
        if (data.subscription_type === "subject_teacher") {
            getSubjects();
        } else {
            setData({ ...data, subject_id: 0 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.year, data.subscription_type]);
    useEffect(() => {
        if (data.subject_id > 0) {
            getTeachers();
        } else {
            setTeachers([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.year, data.subject_id]);

    useEffect(() => {
        getCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.year]);

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            subscribeUser();
        });
    };
    const subscribeUser = async () => {
        try {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);

            const toSendData = { ...data };
            // toSendData["phone"] = parseInt(data["phone"]);
            const { data: response } = await http.post("/api/subscriptions", toSendData, config);

            modal.message({
                title: "تم تنفيذ طلبك بنجاح",
                text: response.message,
                button: "مشاهدة نتيجة العملية",
                callback: () => {
                    window.scrollTo(0, 0);
                },
            });
            setResult(response.result);
            setShowResult(true);
            setData(initialState);
            setIsLoading(false);
        } catch ({ response }) {
            handleFormErrors(response, setIsLoading, setErrors);
        }
    };

    return (
        <div className="space-y-10">
            {showResult && (
                <SubscriptionResult
                    result={result}
                    successfulPlaceholder={`كورسات تم\nتفعيلها`}
                    duplicatedPlaceholder={`كورسات مشترك\nبها بالفعل`}
                />
            )}
            <AdminContainer>
                <AdminForm onSubmit={handleSubmit} isLoading={isLoading} buttonText="تفعيل">
                    <div className="-my-8 clr-text-secondary font-small">
                        لتفعيل أكثر من رقم في نفس الوقت اترك{" "}
                        <span className="underline">مسافة</span> بين كل رقم و الآخر
                        <br />
                        أو <span className="underline">انسخ</span> الأرقام من ملف اكسل
                    </div>
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

export default ManualSubscription;
