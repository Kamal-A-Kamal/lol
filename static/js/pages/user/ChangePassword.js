import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { handleFormErrors, handleFormSubmit, handleInputChange } from "../../services/formServices";
import auth from "../../services/authServices";
import modal from "../../services/modalServices";
import page from "../../services/pageServices";
import http from "../../services/httpServices";
import InputIcon from "../../components/form/elements/InputIcon";
import SigningForm from "../../components/form/singingForm/SigningForm";
import {
    isAbleChangingPassword,
    registerPageColor,
    registerPageIcon,
} from "../../services/defaultSettings";
import InputField from "../../components/form/elements/InputField";

const ChangePassword = () => {
    const [user, setUser] = useState({
        old_password: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { setUser: authUser, setIsCheckedInvalidName } = useContext(AuthContext);
    let inputFields = [
        {
            id: "old_password",
            type: "password",
            placeholder: `كلمة المرور الحالية `,
            icon: <InputIcon icon="ri:lock-password-line" />,
        },
        {
            id: "password",
            placeholder: ` كلمة المرور الجديدة`,
            icon: <InputIcon icon="teenyicons:password-outline" />,
        },

        {
            id: "password_confirmation",
            placeholder: `تأكيد كلمة المرور الجديدة `,
            icon: <InputIcon icon="game-icons:confirmed" />,
        },
    ];

    const handleSubmit = (e) => {
        handleFormSubmit(e, setIsLoading, setErrors, registerUser);
    };

    const navigate = useNavigate();
    const location = useLocation();

    const redirect = () => {
        // if (location.state?.from) {
        //     navigate(location.state.from);
        // } else {
        //     navigate("/home");
        // }
    };

    const registerUser = async () => {
        try {
            const token = auth.getToken();
            const config = auth.getAuthConfig(token);
            await http.post("api/user/password", user, config);

            setIsLoading(false);
            setIsCheckedInvalidName(false);
            modal.message({
                title: "تم تنفيذ طلبك بنجاح",
                text: `تم تغيير كلمة المرور بنجاح`,
                callback: redirect,
            });
        } catch ({ response }) {
            handleFormErrors(response, setIsLoading, setErrors);
        }
    };
    useEffect(() => {
        const currentTitle = page.getCurrentTitle();
        page.setTitle("تعديل كلمة المرور");
        return () => {
            page.setTitle(currentTitle);
        };
    }, []);

    return (
        <>
            {isAbleChangingPassword ? (
                <SigningForm
                    className="space-y-6 mr-10"
                    headTitle={"تعديل كلمة المرور :"}
                    headIcon={registerPageIcon}
                    picture={false}
                    description={"عدل كلمة المروره الخاصة بحسابك"}
                    onSubmit={handleSubmit}
                    fields={
                        <div className=" flex flex-col space-y-8">
                            {inputFields.map((input, index) => {
                                return (
                                    <InputField
                                        key={index}
                                        onChange={handleInputChange}
                                        data={user}
                                        setData={setUser}
                                        errors={errors}
                                        className="w-10/12"
                                        {...input}
                                    />
                                );
                            })}
                        </div>
                    }
                    color={registerPageColor}
                    buttonTitle="تغيير "
                    isLoading={isLoading}
                />
            ) : (
                ""
            )}
        </>
    );
};

export default ChangePassword;
