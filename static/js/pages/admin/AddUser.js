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
import { years } from "../../services/yearSevices";
import { domainName, isMultiYear } from "../../services/defaultSettings";

const initialState = {
    full_name: "",
    phone: "",
    father_phone: "",
    government_id: "",
    year: 3,
    email: "",
    password: "",
};
const AddUser = () => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [governments, setGovernments] = useState([]);

    let inputFields = [
        {
            id: "full_name",
            placeholder: `الاسم كامل`,
            icon: <InputIcon icon="icon-park-solid:edit-name" />,
        },
        {
            id: "phone",
            placeholder: "رقم الهاتف",
            icon: <InputIcon icon="ant-design:phone-filled" />,
        },
        {
            id: "father_phone",
            placeholder: "رقم هاتف ولي الأمر",
            icon: <InputIcon icon="ant-design:phone-filled" />,
        },
        {
            id: "government_id",
            placeholder: "اختر محافظتك",
            type: "select",
            options: governments,
        },
        {
            id: "email",
            placeholder: "البريد الإلكتروني",
            icon: <InputIcon icon="bx:at" />,
        },
        {
            id: "password",
            placeholder: "كلمة السر",
            icon: <InputIcon icon="ri:lock-password-fill" />,
            togglePassword: true,
        },
    ];
    if (isMultiYear) {
        inputFields = [
            ...inputFields,
            {
                id: "year",
                placeholder: "اختر الصف الدراسي",
                type: "select",
                options: years,

                className: "lg:col-span-2",
            },
        ];
    }
    async function getGovernments() {
        const { data: response } = await http.get("/api/governments");
        setGovernments(response);
        data["government_id"] = response[0]["value"];
        setData(data);
    }
    useEffect(() => {
        getGovernments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        data.email = (parseInt(data.phone) ? parseInt(data.phone) : "") + "@" + domainName;
    }, [data.phone]);
    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            addUser();
        });
    };
    const addUser = async () => {
        try {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);

            const toSendData = { ...data };
            toSendData["phone"] = parseInt(data["phone"]);
            toSendData["father_phone"] = parseInt(data["father_phone"]);
            const { data: response } = await http.post("/api/users", toSendData, config);

            modal.message({
                title: "تم تنفيذ طلبك بنجاح",
                // text: response.message,
            });
            setData(initialState);
            setIsLoading(false);
        } catch ({ response }) {
            handleFormErrors(response, setIsLoading, setErrors);
        }
    };

    return (
        <div className="space-y-10">
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

export default AddUser;
