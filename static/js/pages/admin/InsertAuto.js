import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { isInsertAutoTypes } from "../../services/defaultSettings";

const initialState = {
    name: "",
    quantity: 0,
};
const InsertAuto = () => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    let inputFields = [
        {
            id: "name",
            placeholder: "العنوان",
            icon: <InputIcon icon="fluent:app-title-24-filled" />,
        },
        {
            id: "quantity",
            placeholder: "عدد الأرقام",
            type: "number",
            icon: <InputIcon icon="fluent:document-page-number-24-regular" />,
        },
    ];
    if (isInsertAutoTypes) {
        inputFields = [
            ...inputFields,
            {
                id: "insert_auto_type",
                placeholder: "نوع الكود",
                type: "select",
                options: [
                    {
                        value: "center_to_migrate",
                        text: "اكواد سنتر تكمل مع الطالب لآخر السنة بتتربط بالأكونت بتاعه",
                    },
                    {
                        value: "insert_auto_code",
                        text: "كل كود عبارة عن اكونت منفصل",
                    },
                    {
                        value: "subscription_migration",
                        text: "اكواد شحن فقط",
                    },
                ],
            },
        ];
    }

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            insertAuto();
        });
    };
    const insertAuto = async () => {
        try {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);

            const toSendData = { ...data };
            // toSendData["phone"] = parseInt(data["phone"]);
            const { data: response } = await http.post("/api/insert_auto", toSendData, config);

            modal.message({
                title: "تم تنفيذ طلبك بنجاح",
                text: response.message,
                buttons: { cancel: "متابعة", save: "حفظ و متابعة", confirm: "مشاهدة الجدول" },
                callback: (e) => {
                    if (e && e !== "save") {
                        navigate("../insert_autos");
                    } else if (e === "save") {
                    } else {
                        setData(initialState);
                    }
                },
            });
            setIsLoading(false);
        } catch ({ response }) {
            handleFormErrors(response, setIsLoading, setErrors);
        }
    };

    return (
        <div className="space-y-10">
            <AdminContainer>
                <AdminForm onSubmit={handleSubmit} isLoading={isLoading} buttonText="انشاء">
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

export default InsertAuto;
