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
import { isMultiYear } from "../../services/defaultSettings";
const initialState = {
    phone: "",
    course_id: [],
    is_all: false,
    year: 3,
};

const ManualUnsubscription = () => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [courses, setCourses] = useState([]);

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
                id: "course_id",
                placeholder: "اختر الكورس",
                multiple: true,
                isDisabled: isCoursesDisabled,
                options: courses,
                type: "select",
            },
            {
                id: "is_all",
                placeholder: "إلغاء تفعيل جميع الكورسات",
                type: "switch",
            },
        ];

        setInputFields(fields);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courses]);

    const getCourses = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/years/${data.year}/courses/options`,
            config
        );
        setCourses(response);
    };

    useEffect(() => {
        getCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.year]);

    useEffect(() => {
        setIsCoursesDisabled(data["is_all"]);
    }, [data]);

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
            const { data: response } = await http.post("/api/unsubscriptions", toSendData, config);

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
                    successfulPlaceholder={`اشتراكات تم\nإلغائها`}
                    duplicatedPlaceholder={`كورسات غير مشترك\nبها بالفعل`}
                />
            )}
            <AdminContainer>
                <AdminForm onSubmit={handleSubmit} isLoading={isLoading} buttonText="الغاء التفعيل">
                    <div className="-my-8 clr-text-secondary font-small">
                        لإلغاء اشتراك أكثر من رقم في نفس الوقت اترك{" "}
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

export default ManualUnsubscription;
