import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    isMultiYear,
    isOtpEnabled,
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
import {
    getFormData,
    handleFormErrors,
    handleFormSubmit,
    handleInputChange,
} from "../services/formServices";

import SigningForm from "../components/form/singingForm/SigningForm";
import InputField from "../components/form/elements/InputField";
import InputIcon from "../components/form/elements/InputIcon";

import registerPicture from "../assets/register.jpeg";
import a from "../services/analyticsServices";
import OtpComponent from "./OtpComponent";

const CenterLogin = () => {
    const [governments, setGovernments] = useState([]);
    const [centers, setCenters] = useState([]);

    const [user, setUser] = useState({
        first_name: "",
        second_name: "",
        third_name: "",
        last_name: "",
        phone: "",
        father_phone: "",
        government_id: "",
        year: 3,
        email: "",
        password: "",
        password_confirmation: "",
        new_phone: "",
        otp: "",
        national_id_copy: "",
    });
    const [errors, setErrors] = useState({});
    const [isOtp, setisOtp] = useState(false);
    const [showChangePhone, setShowChangePhone] = useState(true);

    const [isLoading, setIsLoading] = useState(false);

    const { setUser: authUser } = useContext(AuthContext);

    async function getGovernments() {
        const { data } = await http.get("/api/governments");
        let governments = data.filter((value) =>
            ["الإسماعيلية", "القاهره", "الجيزة"].includes(value.text)
        );
        setGovernments(governments);
        user["government_id"] = governments[0]["value"];
        setUser(user);
    }
    async function getCenters() {
        const { data } = await http.get("/api/centers/options");
        setCenters(data);
        // user["government_id"] = data[0]["value"];
        // setUser(user);
    }
    useEffect(() => {
        getGovernments();
        getCenters();
        const currentTitle = page.getCurrentTitle();
        page.setTitle("انشاء حساب سنتر");
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
            id: "second_name",
            placeholder: `الاسم الثاني`,
            icon: <InputIcon icon="icon-park-solid:edit-name" />,
        },
        {
            id: "third_name",
            placeholder: `الاسم الثالث`,
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
        {
            id: "center_id",
            placeholder: "اختر السنتر",
            type: "select",
            options: centers,

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
            id: "password",
            placeholder: "كلمة السر",
            icon: <InputIcon icon="ri:lock-password-fill" />,
        },
        {
            id: "password_confirmation",
            placeholder: "تأكيد كلمة السر",
            icon: <InputIcon icon="ri:lock-password-fill" />,
        },
        {
            id: "national_id_copy",
            placeholder: "ارفع شهادة الميلاد / البطاقة",
            type: "file",
            icon: <InputIcon icon="icon-park-twotone:id-card" />,

            className: "lg:col-span-2",
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
            const formData = getFormData(toSendUser);
            const { message } = await http.post("api/auth/center-login", formData);

            modal.message({
                title: `تم اضافة الطالب بنجاح`,
                text: message,
                icon: "success",

                buttons: {
                    confirm: "حفظ ومتابعة",
                },
                callback: () => {
                    setIsLoading(false);
                },
            });
        } catch ({ response }) {
            handleFormErrors(response, setIsLoading, setErrors);
        }
    };

    return (
        <>
            <SigningForm
                className="space-y-6"
                headTitle={"انشئ حساب السنتر :"}
                headIcon={registerPageIcon}
                picture={registerPicture}
                description={""}
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
                // altLink={"/login"}
                // alt="يوجد لديك حساب بالفعل؟"
                // altColored={"ادخل إلى حسابك الآن !"}
            />
        </>
    );
};

export default CenterLogin;
