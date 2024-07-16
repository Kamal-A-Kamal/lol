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
import { registerPageColor, registerPageIcon } from "../services/defaultSettings";

const EditMyPhone = () => {
    const [user, setUser] = useState({
        phone: "",
    });
    const [errors, setErrors] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const { setUser: authUser, setIsCheckedUnSyncedAccount } = useContext(AuthContext);

    let inputFields = [
        {
            id: "phone",
            placeholder: "رقم الهاتف",
            icon: <InputIcon icon="ant-design:phone-filled" />,
        },
    ];

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
            const toSendUser = { ...user, phone: parseInt(user["phone"]) };
            const result = await http.post("api/user/sync_phone", toSendUser, config);
            auth.logout();
            authUser({});
            auth.authenticate(result.data.token, result.data.user);
            authUser({
                ...result.data.user,
            });
            setIsLoading(false);
            modal.message({
                title: "تم تنفيذ طلبك بنجاح",
                text: `تم ربط الكود برقم الهاتف`,
                callback: redirect,
            });
        } catch ({ response }) {
            handleFormErrors(response, setIsLoading, setErrors);
        }
    };
    useEffect(() => {
        setIsCheckedUnSyncedAccount(false);
        const currentTitle = page.getCurrentTitle();
        page.setTitle("ربط رقم الهاتف");
        return () => {
            page.setTitle(currentTitle);
        };
    }, []);

    return (
        <SigningForm
            className="space-y-6"
            headTitle={"اكتب رقم الهاتف الخاص بك :"}
            headIcon={registerPageIcon}
            picture={registerPicture}
            description={"اكتب رقم الهاتف الخاص بك !"}
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
            buttonTitle="ربط رقم الهاتف"
            isLoading={isLoading}
        />
    );
};

export default EditMyPhone;
