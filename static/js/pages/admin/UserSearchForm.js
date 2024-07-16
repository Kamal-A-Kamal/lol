import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputIcon from "../../components/form/elements/InputIcon";
import AdminForm from "../../components/ui/AdminForm";
import auth from "../../services/authServices";
import {
    handleFormErrors,
    handleFormSubmit,
    renderInputFields,
    handleInputChange as handleChange,
} from "../../services/formServices";
import http from "../../services/httpServices";
import modal from "../../services/modalServices";

const UserSearchForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState({
        phone: "",
        id: "",
        search_phone: true,
    });

    const [errors, setErrors] = useState({});
    const [inputFields, setInputFields] = useState([]);

    useEffect(() => {
        let fields = [];

        if (data.search_phone) {
            fields = [
                {
                    id: "phone",
                    placeholder: "ابحث برقم التليفون",
                    icon: <InputIcon icon="ant-design:phone-filled" />,
                },
            ];
        } else {
            fields = [
                {
                    id: "id",
                    placeholder: "ابحث برقم تسلسل الطالب",
                    icon: <InputIcon icon="bx:id-card" />,
                },
            ];
        }

        fields = [
            ...fields,
            {
                id: "search_phone",
                placeholder: "بحث برقم التليفون",
                type: "switch",
            },
        ];
        setInputFields(fields);
    }, [data.search_phone]);

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            handleSearchUser();
        });
    };

    const navigate = useNavigate();
    const handleSearchUser = async () => {
        const adminToken = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(adminToken);

        try {
            setIsLoading(false);
            const { data: user } = await http.post("/api/users/search", data, config);

            modal.message({
                title: "تم العثور علي المستخدم",
                text: "الاسم : " + user.full_name,
                callback: () => {
                    navigate(`./${user.id}`);
                },
            });
        } catch ({ response }) {
            handleFormErrors(response, setIsLoading, setErrors);
        }
    };
    return (
        <AdminForm onSubmit={handleSubmit} isLoading={isLoading} buttonText="بحث">
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

export default UserSearchForm;
