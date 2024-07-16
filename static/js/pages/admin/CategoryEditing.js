/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import AdminForm from "../../components/ui/AdminForm";
import InputIcon from "../../components/form/elements/InputIcon";
import { domainName } from "../../services/defaultSettings";
import {
    handleCrud,
    handleFormSubmit,
    handleInputChange as handleChange,
    renderInputFields,
} from "../../services/formServices";
import auth from "../../services/authServices";
import http from "../../services/httpServices";
import { submitTypes } from "../../services/adminServices";
import { ReactSortable } from "react-sortablejs";
import LoadingIcon from "../../components/ui/LoadingIcon";

const initialState = {
    id: null,
    text: " ",
    titleFirst: " ",
    titleLast: " ",
    orders: [],
    order: null,
};

const CategoryEditing = () => {
    const [data, setData] = useState({ ...initialState });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [inputFields, setInputFields] = useState([]);

    const [dataLoaded, setDataLoaded] = useState(false);
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/categories`, config);
        setCategories(response);
        setDataLoaded(true);
    };

    const getCategoryInfo = () => {
        let category = categories.filter((c) => c.id === data.id && c)[0];
        data["text"] = category.text;
        data["titleFirst"] = category.titleFirst;
        data["titleLast"] = category.titleLast;
        data["order"] = category.order;
        setData(data);
    };

    useEffect(() => {
        if (data.id) {
            getCategoryInfo();
        }
    }, [data.id]);

    const addCurrentCategory = () => {
        console.log(11);
        let tempCategories = [...categories];
        let tempData = { ...data };
        tempData.order = tempCategories.length;
        tempCategories.push(tempData);
        setData(tempData);
        setCategories(tempCategories);
    };

    useEffect(() => {
        if (dataLoaded && data.submit_type === "store") {
            addCurrentCategory();
        }
    }, [dataLoaded, data.submit_type]);

    const afterSort = () => {
        categories.map((c, index) => {
            if (c.id == data.id) {
                let tempData = { ...data };
                tempData.order = index;
                setData(tempData);
            }
        });
    };

    const inputHandler = () => {
        let temp = [...categories];
        temp[data.order] = {
            text: data.titleFirst + " " + data.titleLast,
            titleFirst: data.titleFirst,
            titleLast: data.titleLast,
            id: data.id,
        };
        setCategories(temp);
    };

    useEffect(() => {
        inputHandler();
    }, [data.titleFirst, data.titleLast]);

    useEffect(() => {
        getCategories();
    }, [data.submit_type]);

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
                        id: "id",
                        placeholder: "اختر الفئة",
                        type: "select",
                        options: categories,
                    },
                ];
            }

            if (
                data.submit_type &&
                (data.submit_type === "store" || (data.submit_type === "update" && data.id))
            ) {
                fields = [
                    ...fields,
                    {
                        id: "titleFirst",
                        placeholder: "الاسم الاول",
                        icon: <InputIcon icon="fluent:app-title-24-filled" />,
                    },
                    {
                        id: "titleLast",
                        placeholder: "الاسم الثانى",
                        icon: <InputIcon icon="fluent:app-title-24-filled" />,
                    },
                ];
            }
        }
        setInputFields(fields);
        afterSort();
    }, [categories, data.submit_type, data.id]);

    const handleSubmit = (e) => {
        data.orders = JSON.stringify(categories);
        handleFormSubmit(e, setIsLoading, setErrors, () => {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);
            const crudApiEndPoint = "/api/categories";
            const crudItemName = "فئة";

            handleCrud(
                config,
                data,
                crudApiEndPoint,
                crudItemName,
                setIsLoading,
                setErrors,
                setData,
                initialState,
                data.id
            );
        });
    };
    const sortableOptions = {
        animation: 150,
        ghostClass: "sortable-ghost",
        chosenClass: "sortable-chosen",
        dragClass: "sortable-drag",
        swapThreshold: 0.6,
        invertSwap: true,
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
                {data.submit_type == "store" || (data.submit_type === "update" && data.id) ? (
                    <div className="relative">
                        {dataLoaded ? (
                            <>
                                {" "}
                                <span className="mb-10 block">ترتيب الفئه فى الصفحة الرئيسية</span>
                                <ReactSortable
                                    className="space-y-4"
                                    // onSort={onSort}
                                    list={categories}
                                    setList={setCategories}
                                    {...{ ...sortableOptions }}
                                >
                                    {categories.map((c, index) => (
                                        <div
                                            key={index}
                                            className="prevent-select w-full py-3 bg-blue-400 my-2 rounded-md px-3 cursor-pointer duration-200 "
                                        >
                                            {c.text}
                                        </div>
                                    ))}
                                </ReactSortable>
                            </>
                        ) : (
                            <div className="flex w-full justify-center">
                                <span className="mx-3  text-blue-400">
                                    جاري تحميل فئات كورسات الصفحه الرئيسية
                                </span>
                                <LoadingIcon className="text-blue-800 text-xl" />
                            </div>
                        )}
                    </div>
                ) : null}
            </AdminForm>
        </AdminContainer>
    );
};

export default CategoryEditing;
