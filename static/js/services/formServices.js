import { a2e } from "../utils/ar";
import InputField from "../components/form/elements/InputField";
import Button from "../components/ui/Button";
import http from "./httpServices";
import modal from "./modalServices";
import React from "react";

export const handleInputChange = ({ currentTarget: input }, id = "", data, setData) => {
    // if
    const currentData = { ...data };
    // if (input.type === "select-multiple") {
    //     if (currentData[input.id].includes(input.value)) {
    //         currentData[input.id] = currentData[input.id].filter((value) => {
    //             return value !== input.value;
    //         });
    //     } else {
    //         currentData[input.id].push(input.value);
    //     }
    // }
    if (input.type === "select") {
        let value;
        if (input.isMulti) {
            value = input.value.map((e) => e.value);
        } else {
            value = input.value.value;
        }
        currentData[input.id] = value;
    } else if (input.type === "textarea") {
        currentData[input.id] = input.value;
    } else if (input.type === "file") {
        currentData[input.id] = input.files[0];
    } else {
        currentData[input.id] = input.value;
    }
    if (id.includes("phone") && input.type === "text") {
        currentData[input.id] = a2e(currentData[input.id]);
    }
    setData(currentData);
};

export const handleFormSubmit = (e, setIsLoading, setErrors, callBack) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    callBack();
};

export const handleFormErrors = (response, setIsLoading, setErrors, scrollTop = true) => {
    if (scrollTop) {
        window.scrollTo(0, 0);
    }
    setIsLoading(false);
    if (!(response.status < 500)) {
        return;
    }
    let { errors: errorsArray } = response.data;
    setErrors(errorsArray);
    setIsLoading(false);
};

export const renderInputFields = (key, handleChange, data, setData, errors, input) => {
    if (input.element && input.element === "button") {
        return (
            <Button
                key={key}
                type="button"
                isLoading={input.isLoading}
                {...input}
                onClick={(e) => input.onClick(e, input.id, data, setData, input.setIsLoading)}
            >
                {input.placeholder}
            </Button>
        );
    } else if (input.element && input.element === "html") {
        return <React.Fragment key={key}>{input.input}</React.Fragment>;
    } else {
        return (
            <InputField
                key={key}
                onChange={handleChange}
                data={data}
                setData={setData}
                errors={errors}
                {...input}
            />
        );
    }
};

export const getFormData = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((index) => {
        // if (typeof data[index] === "object") {
        //     formData.append(index, JSON.stringify(data[index]));
        // } else formData.append(index, data[index]);
        formData.append(index, data[index]);
    });
    return formData;
};

export const handleCrud = async (
    config,
    data,
    crudApiEndPoint,
    crudItemName,
    setIsLoading,
    setErrors,
    setData,
    initialState,
    item_id
) => {
    try {
        const formData = getFormData(data);
        if (data.submit_type === "store") {
            const { data: response } = await http.post(crudApiEndPoint, formData, config);

            modal.message({
                title: `تم اضافة ${crudItemName} بنجاح`,
                text: response.message,
                icon: "success",

                buttons: {
                    confirm: "حفظ ومتابعة",
                    cancel: "متابعة",
                },
                callback: (e) => {
                    if (e && e !== "cancel") {
                        setData(data);
                    } else {
                        setData(initialState);
                    }
                },
            });
        } else if (data.submit_type === "update") {
            const { data: response } = await http.post(
                `${crudApiEndPoint}/${item_id}`,
                formData,
                config
            );

            modal.message({
                title: `تم تعديل ${crudItemName} بنجاح`,
                text: response.message,
                icon: "success",

                buttons: {
                    confirm: "حفظ ومتابعة",
                    cancel: "متابعة",
                },
                callback: (e) => {
                    if (e && e !== "cancel") {
                        setData(data);
                    } else {
                        setData(initialState);
                    }
                },
            });
            setData(initialState);
        } else if (data.submit_type === "delete") {
            const { data: response } = await http.delete(`${crudApiEndPoint}/${item_id}`, config);

            modal.message({
                title: `تم حذف ${crudItemName} بنجاح`,
                text: response.message,
            });
            setData(initialState);
        }
        setIsLoading(false);
    } catch ({ response }) {
        handleFormErrors(response, setIsLoading, setErrors);
    }
};
