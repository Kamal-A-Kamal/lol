import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    isMultiYear,
    loginPageColor,
    registerPageColor,
    registerPageIcon,
} from "../services/defaultSettings";

import AuthContext from "../context/AuthContext";

import auth from "../services/authServices";
import http from "../services/httpServices";
import modal from "../services/modalServices";
import page from "../services/pageServices";
import { years } from "../services/yearSevices";
import { handleFormErrors, handleFormSubmit, handleInputChange } from "../services/formServices";

import SigningForm from "../components/form/singingForm/SigningForm";
import InputField from "../components/form/elements/InputField";
import InputIcon from "../components/form/elements/InputIcon";

import registerPicture from "../assets/register.jpeg";
import a from "../services/analyticsServices";

const Register = () => {
    const [governments, setGovernments] = useState([]);

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        father_phone: "",
        government_id: "",
        year: 3,
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const { setUser: authUser } = useContext(AuthContext);

    async function getGovernments() {
        const { data } = await http.get("/api/governments");
        setGovernments(data);
        user["government_id"] = data[0]["value"];
        setUser(user);
    }
    useEffect(() => {
        getGovernments();
        const currentTitle = page.getCurrentTitle();
        page.setTitle("انشاء حساب");
        return () => {
            page.setTitle(currentTitle);
        };
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

            className: "lg:col-span-2",
        },
    ];
    if (isMultiYear) {
        const toUseYears = years.filter((value, index) => index < 3);

        inputFields = [
            ...inputFields,
            {
                id: "year",
                placeholder: "اختر الصف الدراسي",
                type: "select",
                options: toUseYears,

                className: "lg:col-span-2",
            },
        ];
    }
    inputFields = [
        ...inputFields,
        {
            id: "email",
            placeholder: "البريد الإلكتروني",
            icon: <InputIcon icon="bx:at" />,

            className: "lg:col-span-2",
        },
        {
            id: "password",
            placeholder: "كلمة السر",
            icon: <InputIcon icon="ri:lock-password-fill" />,
        },
        {
            id: "password_confirmation",
            placeholder: "تأكيد كلمة السر",
            icon: <InputIcon icon="ri:lock-password-fill" />,
        },
    ];

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, registerUser);
    };

    const navigate = useNavigate();

    const { state } = useLocation();

    const redirect = () => {
        if (!state) {
            navigate("/home");
        } else {
            navigate(state.prevPath);
        }
    };
    const registerUser = async () => {
        try {
            await http.get("/sanctum/csrf-cookie");
            const visitorVisitId = a.getVisitorVisit();
            const toSendUser = { ...user, visitor_visit_id: visitorVisitId };
            toSendUser["phone"] = parseInt(user["phone"]);
            toSendUser["father_phone"] = parseInt(user["father_phone"]);
            const result = await http.post("api/auth/register", toSendUser);
            auth.authenticate(result.data.token, result.data.user);
            authUser({
                ...result.data.user,
            });
            setIsLoading(false);
            modal.message({
                title: "تم انشاء حسابك و تسجيل الدخول بنجاح !",
                text: "اضغط حسنًا للإستمرار",
                callback: redirect,
            });
        } catch ({ response }) {
            handleFormErrors(response, setIsLoading, setErrors);
        }
    };

    return (
        <SigningForm
            className="space-y-6"
            headTitle={"أنشء حسابك الآن :"}
            headIcon={registerPageIcon}
            picture={registerPicture}
            description={"ادخل بياناتك بشكل صحيح للحصول علي افضل تجربة داخل الموقع"}
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
            secondaryColor={loginPageColor}
            buttonTitle="انشئ الحساب !"
            isLoading={isLoading}
            altLink={"/login"}
            alt="يوجد لديك حساب بالفعل؟"
            altColored={"ادخل إلى حسابك الآن !"}
        />
    );
};

export default Register;
