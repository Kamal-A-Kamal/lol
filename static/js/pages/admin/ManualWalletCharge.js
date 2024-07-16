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
    ammount_to_add: 0,
};

const ManualWalletCharge = () => {
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
                placeholder: "رقم/ارقام الهاتف",
                icon: <InputIcon icon="ant-design:phone-filled" />,
            },
        ];
        fields = [
            ...fields,
            {
                id: "ammount_to_add",
                placeholder: "الرصيد المُضاف",
                type: "number",
                icon: <InputIcon icon="ic:twotone-price-change" />,
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
                "/api/wallet/manual/manual_charge",
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
                    successfulPlaceholder={`رصيد الحساب الحالي`}
                    duplicatedPlaceholder={`رصيد الحساب السابق`}
                />
            )}
            <AdminContainer>
                <AdminForm onSubmit={handleSubmit} isLoading={isLoading} buttonText="تفعيل">
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

export default ManualWalletCharge;
