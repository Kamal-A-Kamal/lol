import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import http from "../services/httpServices";
import auth from "../services/authServices";
import modal from "../services/modalServices";
import page from "../services/pageServices";
import InputIcon from "../components/form/elements/InputIcon";
import AuthContext from "../context/AuthContext";

import adminLogin from "../assets/admin-login.jpeg";
import loginIcon from "../assets/gear.svg";
import SigningForm from "../components/form/singingForm/SigningForm";
import InputField from "../components/form/elements/InputField";
import { adminPath } from "../services/defaultSettings";
import { handleFormErrors, handleFormSubmit, handleInputChange } from "../services/formServices";
import a from "../services/analyticsServices";

const AdminLogin = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const { setAdmin: authAdmin } = useContext(AuthContext);

    const inputFields = [
        {
            id: "email",
            placeholder: "اسم المستخدم",
            icon: <InputIcon icon="clarity:administrator-solid" />,
        },
        {
            id: "password",
            placeholder: "كلمة السر",
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
    const location = useLocation();

    const redirect = () => {
        if (location.state?.from) {
            navigate(location.state.from);
        } else {
            navigate(`/${adminPath}/panel/home`);
        }
    };

    const loginUser = async () => {
        try {
            await http.get("/sanctum/csrf-cookie");
            const visitorVisitId = a.getVisitorVisit();
            const toSendUser = { ...user, visitor_visit_id: visitorVisitId };
            const result = await http.post("api/auth/admin/login", toSendUser);

            auth.authenticateAdmin(result.data.token, result.data.user);
            authAdmin({
                ...result.data.user,
            });
            setIsLoading(false);
            modal.message({
                title: "تم تسجيل الدخول بنجاح !",
                text: "اضغط حسنًا للإستمرار",
                callback: redirect,
            });
        } catch ({ response }) {
            handleFormErrors(response, setIsLoading, setErrors);
        }
    };

    return (
        <SigningForm
            headTitle={"الدخول للوحة التحكم بالموقع :"}
            headIcon={loginIcon}
            toSpin={true}
            picture={adminLogin}
            description={"ادخل اسم المستخدم و كلمة السر للوصول للوحة التحكم"}
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
            color={"purple"}
            secondaryColor={"blue"}
            buttonTitle="تسجيل الدخول"
            isLoading={isLoading}
            altLink={"/register"}
        />
    );
};

export default AdminLogin;
