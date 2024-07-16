import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";

import auth from "../services/authServices";
import { handleFormErrors, handleFormSubmit, handleInputChange } from "../services/formServices";
import http from "../services/httpServices";
import modal from "../services/modalServices";
import page from "../services/pageServices";

import InputField from "../components/form/elements/InputField";
import InputIcon from "../components/form/elements/InputIcon";
import SigningForm from "../components/form/singingForm/SigningForm";
import LoginDataTable from "../components/ui/LoginDataTable";

import loginPicture from "../assets/login.jpeg";
import {
    isAccountCreationRequest,
    loginPageColor,
    loginPageIcon,
    registerPageColor,
} from "../services/defaultSettings";
import a from "../services/analyticsServices";

const Login = () => {
    const [user, setUser] = useState({
        phone: "",
        password: "",
        with_code: false,
    });

    const [tokens, setTokens] = useState([]);
    const [errors, setErrors] = useState({});

    const [isLoading, setIsLoading] = useState(false);
    const [with_code, setWithCode] = useState(false);

    const { setUser: authUser, setAccountRequest } = useContext(AuthContext);

    const inputFields = [
        {
            id: "phone",
            placeholder: user.with_code ? "أدخل الكود" : "رقم الهاتف",
            icon: <InputIcon icon="ant-design:phone-filled" />,
        },
        {
            id: "password",
            placeholder: user.with_code ? "أعد كتابة الكود " : "كلمة السر",
            icon: <InputIcon icon="ri:lock-password-fill" />,
        },
        {
            id: "with_code",
            placeholder: "أو قم بتسجيل الدخول عن طريق الكود",
            type: "switch",
            icon: <InputIcon icon="ri:lock-password-fill" />,
        },
    ];

    useEffect(() => {
        const currentTitle = page.getCurrentTitle();
        page.setTitle("تسجيل الدخول");
        return () => {
            page.setTitle(currentTitle);
        };
    }, []);

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, loginUser);
    };

    const navigate = useNavigate();
    const { state } = useLocation();

    const redirect = (certainPath = false) => {
        if (certainPath) {
            navigate(certainPath);
        } else {
            if (!state) {
                navigate("/home");
            } else {
                navigate(state.prevPath);
            }
        }
    };

    const loginUser = async () => {
        try {
            await http.get("/sanctum/csrf-cookie");
            const visitorVisitId = a.getVisitorVisit();
            const toSendUser = { ...user, visitor_visit_id: visitorVisitId };
            toSendUser["phone"] = parseInt(user["phone"]);
            const result = await http.post("api/auth/login", toSendUser);

            auth.authenticate(result.data.token, result.data.user);
            authUser({
                ...result.data.user,
            });
            setIsLoading(false);
            modal.message({
                title: "تم تسجيل الدخول بنجاح !",
                text: "اضغط حسنًا للإستمرار",
                callback: redirect,
            });
        } catch ({ response }) {
            if (response.status === 455 && isAccountCreationRequest) {
                setAccountRequest(response.data.user);
                redirect("/account_creation_status");
            } else {
                handleFormErrors(response, setIsLoading, setErrors);
                if (response.status === 400 && response.data.error === "already_logged_in") {
                    setTokens(response.data.tokens);
                }
            }
        }
    };

    return (
        <SigningForm
            headTitle={"تسجيل الدخول :"}
            headIcon={loginPageIcon}
            picture={loginPicture}
            description={"ادخل علي حسابك بإدخال رقم الهاتف و كلمة المرور المسجل بهم من قبل"}
            onSubmit={handleSubmit}
            fields={
                <div className="space-y-12">
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
            color={loginPageColor}
            secondaryColor={registerPageColor}
            buttonTitle="تسجيل الدخول"
            isLoading={isLoading}
            altLink={"/register"}
            alt="لا يوجد لديك حساب؟"
            altColored={"انشئ حسابك الآن !"}
            alternative={
                tokens.length > 0 ? (
                    <div className="py-20 space-y-4">
                        <div className="rounded-md bg-rose-500 flex-center-both clr-white py-3">
                            انت مسجل دخولك بالفعل علي هذه الأجهزة!
                        </div>
                        <LoginDataTable data={tokens} isExcel={false} />
                        <div className="flex-center-both py-4">
                            يرجى تسجيل الخروج من هذه الأجهزة او التواصل مع الدعم
                        </div>
                    </div>
                ) : (
                    false
                )
            }
        />
    );
};

export default Login;
