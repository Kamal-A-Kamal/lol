import React, { useEffect, useState } from "react";
import InputIcon from "../../components/form/elements/InputIcon";
import AdminContainer from "../../components/ui/AdminContainer";
import AdminForm from "../../components/ui/AdminForm";
import { submitTypes } from "../../services/adminServices";
import auth from "../../services/authServices";
import { isMultiYear } from "../../services/defaultSettings";
import {
    handleCrud,
    handleFormSubmit,
    handleInputChange as handleChange,
    renderInputFields,
} from "../../services/formServices";
import http from "../../services/httpServices";
import { years } from "../../services/yearSevices";

const toUseYears = years.filter((value, index) => index < 3);

const initialState = {
    name: "",
    year: 3,
    visible: 1,
    submit_type: 0,
    department_id: 0,
    choosen_year: 3,
};

const DepartmentEditing = () => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [inputFields, setInputFields] = useState([]);

    const [departments, setDepartments] = useState([]);

    const getDepartments = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/admin/years/${data.choosen_year}/departments/options`,
            config
        );
        setDepartments(response);
    };

    const getDepartmentInfo = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/departments/${data.department_id}`, config);
        let result = {};
        Object.keys(response).forEach((element) => {
            if (["name", "visible"].includes(element)) {
                result[element] = response[element];
            }
        });

        setData({ ...data, ...result });
    };

    useEffect(() => {
        if (data.submit_type && data.submit_type !== "store") {
            getDepartments();
        }
    }, [data.choosen_year, data.submit_type]);

    useEffect(() => {
        if (data.department_id > 0 && data.submit_type && data.submit_type !== "store") {
            getDepartmentInfo();
        }
        setData({ ...data });
    }, [data.department_id, data.submit_type, data.choosen_year]);

    useEffect(() => {
        let fields = [
            {
                id: "submit_type",
                placeholder: "هتعمل ايه دلوقتي",
                type: "select",
                options: submitTypes,
            },
        ];

        if (data.submit_type) {
            if (data.submit_type && data.submit_type !== "store") {
                if (isMultiYear) {
                    fields = [
                        ...fields,
                        {
                            id: "choosen_year",
                            placeholder: "اختر الصف الدراسي",
                            type: "select",
                            options: toUseYears,
                        },
                    ];
                }
                fields = [
                    ...fields,
                    {
                        id: "department_id",
                        placeholder: "اختر الشعبة",
                        type: "select",
                        options: departments,
                    },
                ];
                if (data.submit_type === "update") {
                    if (data.department_id > 0) {
                        fields = [
                            ...fields,
                            {
                                id: "name",
                                placeholder: "العنوان",
                                icon: <InputIcon icon="fluent:app-title-24-filled" />,
                            },
                            {
                                id: "visible",
                                placeholder: "ظاهر في الصفحة الرئيسية",
                                type: "switch",
                            },
                        ];
                    }
                }
            }

            if (data.submit_type && data.submit_type === "store") {
                if (isMultiYear) {
                    fields = [
                        ...fields,
                        {
                            id: "year",
                            placeholder: "اختر الصف الدراسي",
                            type: "select",
                            options: toUseYears,
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
                        id: "visible",
                        placeholder: "ظاهر في الصفحة الرئيسية",
                        type: "switch",
                    },
                ];
            }
        }
        setInputFields(fields);
    }, [data.submit_type, departments, data.department_id, data.submit_type, data.choosen_year]);

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);
            const crudApiEndPoint = "/api/departments";
            const crudItemName = "الشعبة";

            handleCrud(
                config,
                data,
                crudApiEndPoint,
                crudItemName,
                setIsLoading,
                setErrors,
                setData,
                initialState,
                data.department_id
            );
        });
    };

    return (
        <AdminContainer>
            <AdminForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                buttonText="auto"
                submitType={data.submit_type}
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
        </AdminContainer>
    );
};

export default DepartmentEditing;
