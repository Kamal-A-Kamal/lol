import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";

import auth from "../services/authServices";
import http from "../services/httpServices";
import modal from "../services/modalServices";
import page from "../services/pageServices";
import { handleFormErrors, handleFormSubmit, handleInputChange } from "../services/formServices";

import SigningForm from "../components/form/singingForm/SigningForm";
import InputField from "../components/form/elements/InputField";
import InputIcon from "../components/form/elements/InputIcon";

import registerPicture from "../assets/register.jpeg";
import {
    autoChangeCenterWithNames,
    autoChangeDataWithNames,
    registerPageColor,
    registerPageIcon,
} from "../services/defaultSettings";

const EditMyName = () => {
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        father_phone: "",
        center_id: 0,
    });
    const [errors, setErrors] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const { setUser: authUser, setIsCheckedInvalidName } = useContext(AuthContext);
    const [centers, setCenters] = useState([]);
    const getCenters = async () => {
        const { data } = await http.get("/api/centers/options");
        setCenters(data);
    };
    useEffect(() => {
        getCenters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let inputFields = [
        {
            id: "first_name",
            placeholder: `الاسم الأول`,
            icon: <InputIcon icon="icon-park-solid:edit-name" />,
        },
        {
            id: "last_name",
            placeholder: `الاسم الأخير`,
            icon: <InputIcon icon="icon-park-solid:edit-name" />,
        },
    ];
    if (autoChangeDataWithNames) {
        inputFields = [
            ...inputFields,
            {
                id: "phone",
                placeholder: `رقم الهاتف`,
                icon: <InputIcon icon="ant-design:phone-filled" />,
            },
            {
                id: "father_phone",
                placeholder: `رقم هاتف ولي الأمر`,
                icon: <InputIcon icon="ant-design:phone-filled" />,
            },
        ];
    }
    if (autoChangeCenterWithNames) {
        inputFields = [
            ...inputFields,
            {
                id: "center_id",
                placeholder: "اختر السنتر",
                type: "select",
                options: centers,

                className: "lg:col-span-2",
            },
        ];
    }

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, registerUser);
    };

    const navigate = useNavigate();
    const location = useLocation();

    const redirect = () => {
        if (location.state?.from) {
            navigate(location.state.from);
        } else {
            navigate("/home");
        }
    };

    const registerUser = async () => {
        try {
            const token = auth.getToken();
            const config = auth.getAuthConfig(token);
            if (autoChangeCenterWithNames) {
                if (!user.center_id > 0) {
                    setIsLoading(false);
                    return modal.message({
                        icon: "error",
                        title: "يجب اختيار السنتر",
                    });
                }
            }
            const toSendUser = { ...user };
            toSendUser["phone"] = parseInt(user["phone"]);
            toSendUser["father_phone"] = parseInt(user["father_phone"]);
            const result = await http.post("api/user/name", toSendUser, config);
            auth.authenticate(token, result.data.user);
            authUser({
                ...result.data.user,
            });
            setIsLoading(false);
            setIsCheckedInvalidName(false);
            modal.message({
                title: "تم تنفيذ طلبك بنجاح",
                text: `تم تغيير الاسم إلى : '${result.data.user.full_name}'`,
                callback: redirect,
            });
        } catch ({ response }) {
            handleFormErrors(response, setIsLoading, setErrors);
        }
    };
    useEffect(() => {
        const currentTitle = page.getCurrentTitle();
        if (autoChangeDataWithNames) {
            page.setTitle("تعديل البيانات");
        } else {
            page.setTitle("تعديل الاسم");
        }
        return () => {
            page.setTitle(currentTitle);
        };
    }, []);

    return (
        <SigningForm
            className="space-y-6"
            headTitle={`تعديل ${autoChangeDataWithNames ? "البيانات" : "الاسم"} :`}
            headIcon={registerPageIcon}
            picture={registerPicture}
            description={"عدل الاسم الأول و الثاني للحساب الخاص بك"}
            onSubmit={handleSubmit}
            fields={
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-6">
                    {inputFields.map((input, index) => {
                        return (
                            <InputField
                                key={index}
                                onChange={handleInputChange}
                                data={user}
                                setData={setUser}
                                errors={errors}
                                {...input}
                            />
                        );
                    })}
                </div>
            }
            color={registerPageColor}
            buttonTitle="تعديل الاسم"
            isLoading={isLoading}
        />
    );
};

export default EditMyName;
