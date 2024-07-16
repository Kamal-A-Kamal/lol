import React, { useContext, useState } from "react";
import Button from "../../components/ui/Button";
import InputField from "../../components/form/elements/InputField";
import { Icon } from "@iconify/react";
import auth from "../../services/authServices";
import a from "../../services/analyticsServices";
import http from "../../services/httpServices";
import modal from "../../services/modalServices";
import AuthContext from "../../context/AuthContext";

const MigrationFromInsertAutoForm = () => {
    const [data, setData] = useState({
        insert_auto_phone: "",
    });
    const [error, setError] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState("");

    const { setUser: authUser, user } = useContext(AuthContext);

    const handleCharge = async () => {
        setIsLoading(true);
        setIsDisabled(true);
        setError("");

        const token = auth.getToken();
        const config = auth.getAuthConfig(token);
        try {
            const { data: result } = await http.post(
                `/api/user/migrate_from_insert_auto`,
                { ...data },
                config
            );
            console.log(result);
            // window.location.href = result.url;
            modal.message({
                title: "تم ربط الكود",
                text: `تم ربط الكود الخاص بك بنجاح`,
                callback: () => {
                    auth.authenticate(token, result.user);
                    authUser({
                        ...result.user,
                    });
                    //   setIsDisabled(true);
                    //   setIsDisabled();
                },
            });
        } catch ({ response }) {
            if (response.status != 422) {
                modal.message({
                    title: "حدث خطأ",
                    text: "يرجى الاتصال بالدعم",
                    icon: "error",
                });
            }
            setError(response.data.errors.insert_auto_phone[0]);
            setIsDisabled(false);
            setIsLoading(false);
        }
    };
    console.log(user);
    return (
        <div className=" flex flex-col space-y-2">
            <div className="flex flex-center-both">
                <div className="flex flex-col space-y-4 w-full max-w-lg">
                    <div className="pb-10 text-center space-y-3">
                        <div className="font-w-bold font-h2">لو كانت طالب سنتر :</div>
                        <div>
                            اكتب الكود المكون من ١١ رقم على كارت السنتر بتاعك هنا عشان تتفتح ليك
                            باقي محاضرات السنتر بتاعتك
                        </div>
                    </div>
                    <div className="flex flex-row items-end space-x-2 space-x-reverse  pb-4 pt-8 w-full">
                        <InputField
                            id="insert_auto_phone"
                            className="w-full"
                            placeholder="كود السنتر الخاص بك"
                            icon={
                                <span className="flex-center-both mb-1">
                                    <Icon icon="material-symbols:qr-code" />
                                </span>
                            }
                            data={data}
                            onChange={({ currentTarget: input }) => {
                                let insert_auto_phone = input.value;
                                setData({ insert_auto_phone: insert_auto_phone });
                            }}
                            type="text"
                            isDisabled={isDisabled}
                        />
                    </div>
                    <div className="flex-center-both">
                        <Button color="cyan" onClick={handleCharge} isLoading={isLoading}>
                            ربط الكود بالاكونت بتاعك
                        </Button>
                    </div>
                </div>
                <div></div>
            </div>
            {error && (
                <div className="bg-rose-800 bg-opacity-10 border border-rose-500 rounded-md px-5 py-2 text-rose-500">
                    {error}
                </div>
            )}
            {result && (
                <div className="bg-teal-300 bg-opacity-10 border border-teal-500 rounded-md px-5 py-2 text-teal-500">
                    {result}
                </div>
            )}
        </div>
    );
};

export default MigrationFromInsertAutoForm;
