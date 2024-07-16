/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import AdminForm from "../../components/ui/AdminForm";
import InputIcon from "../../components/form/elements/InputIcon";
import { isMultiYear } from "../../services/defaultSettings";
import { years } from "../../services/yearSevices";
import {
    handleCrud,
    handleFormSubmit,
    handleInputChange as handleChange,
    renderInputFields,
} from "../../services/formServices";
import auth from "../../services/authServices";
import http from "../../services/httpServices";

import { submitTypes } from "../../services/adminServices";

const initialState = {
    name: "",

    year: 3,
    submit_type: 0,
    division_id: 0,
    choosen_year: 3,
};

const Division = () => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [inputFields, setInputFields] = useState([]);

    const [divisions, setDivisions] = useState([]);

    const getDivisions = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/years/${data.choosen_year}/divisions/options`,
            config
        );
        setDivisions(response);
    };

    const getDivisionInfo = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/divisions/${data.division_id}`, config);
        let result = {};
        Object.keys(response).forEach((element) => {
            if (["name", "year"].includes(element)) {
                result[element] = response[element];
            }
        });

        setData({ ...data, ...result });
    };

    useEffect(() => {
        if (data.submit_type && data.submit_type !== "store") {
            getDivisions();
        }
    }, [data.choosen_year, data.submit_type]);

    useEffect(() => {
        if (data.division_id > 0 && data.submit_type && data.submit_type !== "store") {
            getDivisionInfo();
        }
    }, [data.division_id, data.submit_type, data.choosen_year]);

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
                            options: years,
                        },
                    ];
                }
                fields = [
                    ...fields,
                    {
                        id: "division_id",
                        placeholder: "اختر القسم",
                        type: "select",
                        options: divisions,
                    },
                ];
                if (data.submit_type === "update") {
                    if (data.division_id > 0) {
                        fields = [
                            ...fields,
                            {
                                id: "name",
                                placeholder: "العنوان",
                                icon: <InputIcon icon="fluent:app-title-24-filled" />,
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
                        }
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
                            options: years,
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
                ];
            }
        }
        setInputFields(fields);
    }, [data.submit_type, divisions, data.division_id, data.submit_type, data.choosen_year]);

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);
            const crudApiEndPoint = "/api/divisions";
            const crudItemName = "القسم";

            handleCrud(
                config,
                data,
                crudApiEndPoint,
                crudItemName,
                setIsLoading,
                setErrors,
                setData,
                initialState,
                data.division_id
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

export default Division;
