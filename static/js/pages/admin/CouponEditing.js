/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import AdminForm from "../../components/ui/AdminForm";
import InputIcon from "../../components/form/elements/InputIcon";
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
    limit_per_user: 2,
    total_limit: 999,
    discount: 0,
    maximum: 0,
    is_active: 1,

    submit_type: 0,
    coupon_id: 0,
};

const CouponEditing = () => {
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [inputFields, setInputFields] = useState([]);

    const [coupons, setCoupons] = useState([]);

    const getCoupons = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/coupons/options`, config);
        setCoupons(response);
    };

    const getCouponInfo = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/coupons/${data.coupon_id}`, config);
        let result = {};
        Object.keys(response).forEach((element) => {
            if (
                [
                    "name",
                    "limit_per_user",
                    "total_limit",
                    "discount",
                    "maximum",
                    "is_active",
                ].includes(element)
            ) {
                result[element] = response[element];
            }
        });

        setData({ ...data, ...result });
    };

    useEffect(() => {
        if (data.submit_type && data.submit_type !== "store") {
            getCoupons();
        }
    }, [data.choosen_year, data.submit_type]);

    useEffect(() => {
        if (data.coupon_id > 0 && data.submit_type && data.submit_type !== "store") {
            getCouponInfo();
        }
    }, [data.coupon_id, data.submit_type, data.choosen_year]);

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
                fields = [
                    ...fields,
                    {
                        id: "coupon_id",
                        placeholder: "اختر الكوبون",
                        type: "select",
                        options: coupons,
                    },
                ];
                if (data.submit_type === "update") {
                    if (data.coupon_id > 0) {
                        fields = [
                            ...fields,
                            {
                                id: "name",
                                placeholder: "الكوبون",
                                icon: <InputIcon icon="fluent:app-title-24-filled" />,
                            },
                            {
                                id: "is_active",
                                placeholder: "تفعيل هذا الكوبون",
                                type: "switch",
                            },
                            {
                                id: "total_limit",
                                placeholder: "مرات الاستخدام الكوبون الاجمالية ",
                                type: "number",
                            },
                            {
                                id: "limit_per_user",
                                placeholder: "مرات الاستخدام للمستخدم",
                                type: "number",
                            },
                            {
                                id: "discount",
                                placeholder: "الخصم (نسبة مئوية ٪)",
                                type: "number",
                            },
                            {
                                id: "maximum",
                                placeholder: "اقصى مبلغ للخصم (بـ الجنيه)",
                                type: "number",
                            },
                        ];
                    }
                }
            }

            if (data.submit_type && data.submit_type === "store") {
                fields = [
                    ...fields,
                    {
                        id: "name",
                        placeholder: "الكوبون",
                        icon: <InputIcon icon="fluent:app-title-24-filled" />,
                    },
                    {
                        id: "is_active",
                        placeholder: "تفعيل هذا الكوبون",
                        type: "switch",
                    },
                    {
                        id: "total_limit",
                        placeholder: "مرات الاستخدام الكوبون الاجمالية ",
                        type: "number",
                    },
                    {
                        id: "limit_per_user",
                        placeholder: "مرات الاستخدام للمستخدم",
                        type: "number",
                    },
                    {
                        id: "discount",
                        placeholder: "الخصم (نسبة مئوية ٪)",
                        type: "number",
                    },
                    {
                        id: "maximum",
                        placeholder: "اقصى مبلغ للخصم (بـ الجنيه)",
                        type: "number",
                    },
                ];
            }
        }
        setInputFields(fields);
    }, [data.submit_type, coupons, data.coupon_id, data.submit_type]);

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);
            const crudApiEndPoint = "/api/coupons";
            const crudItemName = "الكوبون";

            handleCrud(
                config,
                data,
                crudApiEndPoint,
                crudItemName,
                setIsLoading,
                setErrors,
                setData,
                initialState,
                data.coupon_id
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

export default CouponEditing;
