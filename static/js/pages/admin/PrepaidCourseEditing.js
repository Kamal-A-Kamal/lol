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

const initialState = {
    phone: "",
    prepaid_courses: 0,
    to_sum: false,
};

const PrepaidCourseEditing = () => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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
        fields = [
            ...fields,
            {
                id: "prepaid_courses",
                placeholder: "عدد المحاضرات مسبوقة الدفع",
                type: "number",
                icon: <InputIcon icon="ic:twotone-price-change" />,
            },
            {
                id: "to_sum",
                placeholder: "جمع عدد المحاضرات مسبوقة الدفع",
                type: "switch",
            },
        ];
        setInputFields(fields);
    }, [data.is_all, data.permanent, data.platform_subscription]);

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
            const { data: response } = await http.post(
                "/api/user/edit/prepaid_courses",
                toSendData,
                config
            );

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
                    successfulPlaceholder={`رصيد المحاضرات الحالي`}
                    duplicatedPlaceholder={`رصيد المحاضرات السابق`}
                />
            )}
            <AdminContainer>
                <AdminForm onSubmit={handleSubmit} isLoading={isLoading} buttonText="تفعيل">
                    <div className="-my-8 clr-text-secondary font-small">
                        اختر جمع عدد المحاضرات لإضافة العدد لرصيد الكود
                        <br />
                        لو مختارتش "جمع عدد المحاضرات" هيكون لكل كود الرصيد اللي انت هتحطه بغض النظر
                        عن الرصيد السابق للكود
                    </div>

                    <div className="-my-8 clr-text-secondary font-small">
                        لتعديل أكثر من كود في نفس الوقت اترك{" "}
                        <span className="underline">مسافة</span> بين كل رقم و الآخر
                        <br />
                        أو <span className="underline">انسخ</span> الأكواد من ملف اكسل
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

export default PrepaidCourseEditing;
