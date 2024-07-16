import React, { useEffect, useMemo, useState } from "react";
import { submitTypes } from "../../services/adminServices";
import auth from "../../services/authServices";
import { isCouponable, isMultiYear } from "../../services/defaultSettings";
import http from "../../services/httpServices";
import InputIcon from "../../components/form/elements/InputIcon";
import { years } from "../../services/yearSevices";
import {
    handleCrud,
    handleFormSubmit,
    handleInputChange as handleChange,
    renderInputFields,
} from "../../services/formServices";
import AdminContainer from "../../components/ui/AdminContainer";
import AdminForm from "../../components/ui/AdminForm";
import Select from "react-select";
import chroma from "chroma-js";
import { tailwindColors } from "../../services/contentServices";

const dot = (color = "transparent") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
        backgroundColor: color,
        borderRadius: 10,
        content: '" "',
        display: "block",
        marginLeft: 8,
        height: 10,
        width: 10,
    },
});
let indexYellow = 0;
const initialState = {
    name: "",
    year: 3,
    departments_id: [],
    color: tailwindColors[indexYellow]?.value,
    price: 0,
    visible: 1,
    sellable: 1,
    is_couponable: 1,
    submit_type: 0,
    subject_id: 0,
    choosen_year: 3,
};
const SubjectEditing = () => {
    const colourStyles = useMemo(
        () => ({
            control: (styles) => ({ ...styles, backgroundColor: "white" }),
            menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
            }),
            option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                const color = chroma(data.color);
                return {
                    ...styles,
                    borderRadius: "5px",
                    marginBottom: "3px",
                    marginTop: "3px",
                    backgroundColor: isDisabled
                        ? undefined
                        : isSelected
                        ? data.color
                        : isFocused
                        ? color.alpha(0.1).css()
                        : undefined,
                    color: isDisabled
                        ? "#ccc"
                        : isSelected
                        ? chroma.contrast(color, "white") > 2
                            ? "white"
                            : "black"
                        : data.color,
                    cursor: isDisabled ? "not-allowed" : "default",

                    ":active": {
                        ...styles[":active"],
                        backgroundColor: !isDisabled
                            ? isSelected
                                ? data.color
                                : color.alpha(0.3).css()
                            : undefined,
                    },
                };
            },
            input: (styles) => ({ ...styles, ...dot() }),
            placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
            singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
        }),
        []
    );
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [inputFields, setInputFields] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const getDepartments = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/admin/years/${data.year}/departments/options`,
            config
        );
        setDepartments(response);
    };

    const getSubjects = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);
        const { data: response } = await http.get(
            `/api/admin/years/${data.choosen_year}/subjects/options`,
            config
        );
        setSubjects(response);
    };

    const getSubjectInfo = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/subjects/${data.subject_id}`, config);
        let result = {};
        Object.keys(response).forEach((element) => {
            if (
                [
                    "name",
                    "visible",
                    "price",
                    "year",
                    "sellable",
                    "is_couponable",
                    "departments_id",
                    "color",
                ].includes(element)
            ) {
                result[element] = response[element];
            }
        });

        setData({ ...data, ...result });
    };

    useEffect(() => {
        if (data.submit_type && data.submit_type !== "store") {
            getSubjects();
        }
    }, [data.choosen_year, data.submit_type]);

    useEffect(() => {
        getDepartments();
    }, [data.year, data.submit_type]);

    useEffect(() => {
        if (data.subject_id > 0 && data.submit_type && data.submit_type !== "store") {
            getSubjectInfo();
        }
        setData({ ...data });
    }, [data.subject_id, data.submit_type, data.choosen_year]);

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
                        id: "subject_id",
                        placeholder: "اختر المادة",
                        type: "select",
                        options: subjects,
                    },
                ];

                if (data.submit_type === "update") {
                    if (data.subject_id > 0) {
                        fields = [
                            ...fields,
                            {
                                placeholder: (
                                    <div className={`react-select__outer-container relative`}>
                                        <Select
                                            value={tailwindColors.filter(
                                                (item) => item.value === data.color
                                            )}
                                            defaultValue={tailwindColors[indexYellow]}
                                            options={tailwindColors}
                                            styles={colourStyles}
                                            menuPortalTarget={document.body}
                                            onChange={(val) =>
                                                setData({ ...data, color: val.value })
                                            }
                                            theme={(theme) => ({
                                                ...theme,
                                                colors: {
                                                    ...theme.colors,
                                                    neutral0: "var(--color-primary-container)",
                                                    primary: "var(--color-text-primary)",
                                                    primary25: "var(--color-secondary-container)",
                                                    primary50: "var(--color-third-container)",
                                                },
                                            })}
                                        />
                                    </div>
                                ),
                                type: "html",
                                className: "", // container classname
                            },
                            {
                                id: "name",
                                placeholder: "العنوان",
                                icon: <InputIcon icon="fluent:app-title-24-filled" />,
                            },
                            {
                                id: "departments_id",
                                placeholder: "الشعب",
                                multiple: true,
                                options: departments,
                                type: "select",
                            },
                            {
                                id: "price",
                                placeholder: "السعر",
                                type: "number",
                                icon: <InputIcon icon="ic:twotone-price-change" />,
                            },
                            {
                                id: "visible",
                                placeholder: "ظاهر",
                                type: "switch",
                            },
                            {
                                id: "sellable",
                                placeholder: "قابل للبيع",
                                type: "switch",
                            },
                        ];
                        if (isCouponable) {
                            fields = [
                                ...fields,
                                {
                                    id: "is_couponable",
                                    placeholder: "تفعيل الكوبونات",
                                    type: "switch",
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
                    {
                        placeholder: (
                            <div className={`react-select__outer-container relative`}>
                                <Select
                                    defaultValue={tailwindColors[indexYellow]}
                                    options={tailwindColors}
                                    styles={colourStyles}
                                    menuPortalTarget={document.body}
                                    onChange={(val) => setData({ ...data, color: val.value })}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            neutral0: "var(--color-primary-container)",
                                            primary: "var(--color-text-primary)",
                                            primary25: "var(--color-secondary-container)",
                                            primary50: "var(--color-third-container)",
                                        },
                                    })}
                                />
                            </div>
                        ),
                        type: "html",
                        className: "", // container classname
                    },
                    {
                        id: "departments_id",
                        placeholder: "الشعب",
                        multiple: true,
                        options: departments,
                        type: "select",
                    },
                    {
                        id: "price",
                        placeholder: "السعر",
                        type: "number",
                        icon: <InputIcon icon="ic:twotone-price-change" />,
                    },
                    {
                        id: "visible",
                        placeholder: "ظاهر",
                        type: "switch",
                    },
                    {
                        id: "sellable",
                        placeholder: "قابل للبيع",
                        type: "switch",
                    },
                ];
                if (isCouponable) {
                    fields = [
                        ...fields,
                        {
                            id: "is_couponable",
                            placeholder: "تفعيل الكوبونات",
                            type: "switch",
                        },
                    ];
                }
            }
        }
        setInputFields(fields);
    }, [data.submit_type, departments, subjects, data.subject_id, data.choosen_year, data.color]);

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);
            const crudApiEndPoint = "/api/subjects";
            const crudItemName = "المادة";

            handleCrud(
                config,
                data,
                crudApiEndPoint,
                crudItemName,
                setIsLoading,
                setErrors,
                setData,
                initialState,
                data.subject_id
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

export default SubjectEditing;
