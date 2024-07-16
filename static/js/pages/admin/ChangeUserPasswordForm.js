import React, { useState } from "react";
import InputIcon from "../../components/form/elements/InputIcon";
import AdminForm from "../../components/ui/AdminForm";
import auth from "../../services/authServices";
import {
    handleFormErrors,
    handleFormSubmit,
    handleInputChange as handleChange,
    renderInputFields,
} from "../../services/formServices";
import http from "../../services/httpServices";
import modal from "../../services/modalServices";

const ChangeUserPasswordForm = ({ user = { id: 0 }, afterSuccess = () => null }) => {
    const [data, setData] = useState({
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const inputFields = [
        {
            id: "password",
            togglePassword: true,
            placeholder: "الرقم السري الجديد",
            icon: <InputIcon icon="ant-design:lock-twotone" />,
        },
    ];
    const handleSubmit = (e) => {
        // return;

        handleFormSubmit(e, setIsLoading, setErrors, () => {
            modal.message({
                title: "هل انت متأكد",
                text: `هل انت متأكد من تعديل الرقم السري لـ ${user.full_name} إلى ${data.password}?`,
                icon: "info",
                // button: "تأكيد",
                buttons: {
                    confirm: "تأكيد",
                    cancel: "إلغاء",
                },
                callback: (e) => {
                    if (e && e !== "cancel") {
                        handlePasswordChange();
                    } else {
                        setIsLoading(false);
                    }
                },
            });
        });
    };
    const handlePasswordChange = async () => {
        const adminToken = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(adminToken);

        try {
            setIsLoading(false);

            const { data: response } = await http.post(
                `/api/users/${user.id}/reset_password`,
                data,
                config
            );

            modal.message({
                title: `تم تغيير كلمة السر بنجاح للمرة : ${response.user.password_reset_count}`,
                text: "كلمة السر الجديدة : " + response.reseted_password,
                callback: () => {
                    afterSuccess();
                },
            });
        } catch ({ response }) {
            handleFormErrors(response, setIsLoading, setErrors);
        }
    };

    return (
        <AdminForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            buttonText="تغيير كلمة السر"
            className="space-y-4 py-0 pb-16"
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
    );
};

export default ChangeUserPasswordForm;
