import React, { useEffect, useState } from "react";
import InputIcon from "../../components/form/elements/InputIcon";
import auth from "../../services/authServices";
import {
    handleFormErrors,
    handleFormSubmit,
    handleInputChange as handleChange,
} from "../../services/formServices";
import http from "../../services/httpServices";
import modal from "../../services/modalServices";
import AdminContainer from "../../components/ui/AdminContainer";
import AdminForm from "../../components/ui/AdminForm";
import InputField from "../../components/form/elements/InputField";

const ManualPaymentInfo = () => {
    const [data, setData] = useState({
        name: "",
        description: "",
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [isDisabled, setIsDisabled] = useState(true);

    const inputFields = [
        {
            id: "name",
            placeholder: "العنوان",
            isDisabled,
            icon: <InputIcon icon="fluent:app-title-24-filled" />,
        },
        {
            id: "description",
            placeholder: "الوصف",
            type: "textarea",
            isDisabled,
            icon: <InputIcon icon="ant-design:info-circle-twotone" />,
        },
    ];

    const getInfo = async () => {
        try {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);
            const { data: response } = await http.get("/api/payment_info", config);
            setData({ name: response.name, description: response.description });
            setIsDisabled(false);
            setIsLoading(false);
        } catch (error) {}
    };
    useEffect(() => {
        getInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            editPaymentInfo();
        });
    };
    const editPaymentInfo = async () => {
        try {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);

            const toSendData = { ...data };
            const { data: response } = await http.post("/api/payment_info", toSendData, config);

            modal.message({
                title: "تم تنفيذ طلبك بنجاح",
                text: response.message,
            });
            setIsLoading(false);
        } catch ({ response }) {
            handleFormErrors(response, setIsLoading, setErrors);
        }
    };

    return (
        <AdminContainer>
            <AdminForm onSubmit={handleSubmit} isLoading={isLoading} buttonText="تعديل">
                <div className="-my-8 clr-text-secondary font-small">
                    تعديل البيانات الظاهرة علي صفحة الدفع عند ذهاب الطالب للإشتراك
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
    );
};

export default ManualPaymentInfo;
