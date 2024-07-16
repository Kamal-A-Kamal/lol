import React, { useContext, useState } from "react";
import Button from "../../components/ui/Button";
import InputField from "../../components/form/elements/InputField";
import { Icon } from "@iconify/react";
import auth from "../../services/authServices";
import http from "../../services/httpServices";
import modal from "../../services/modalServices";
import { printUnit } from "../../utils/ar";
import AuthContext from "../../context/AuthContext";

const ChargeInsertAutoForm = () => {
    const [data, setData] = useState({
        insert_auto_phone: "",
    });
    const [error, setError] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState("");

    const { getCurrentBalance, currentBalance } = useContext(AuthContext);

    const handleCharge = async () => {
        setIsLoading(true);
        setIsDisabled(true);
        setError("");

        const token = auth.getToken();
        const config = auth.getAuthConfig(token);
        try {
            const { data: response } = await http.post(
                `/api/user/charge_insert_auto`,
                { ...data },
                config
            );
            modal.message({
                title: "تم شحن الكود",
                text: `تم شحن الكود الخاص بك بنجاح`,
                callback: () => {
                    //   setIsDisabled(true);
                    //   setIsDisabled();
                    setResult(
                        <>
                            <div className="flex-center-both flex-col space-y-3">
                                {/* <div>هذا الكود فارغ</div> */}
                                {response.no_charge_found ? (
                                    <div>هذا الكود فارغ</div>
                                ) : (
                                    <>
                                        <div>تم شحن الكود بنجاح</div>
                                        {response.subscriptions_count ? (
                                            <>
                                                <div>
                                                    عدد الكورسات المشحونة :{" "}
                                                    {response.subscriptions_count}
                                                </div>
                                                <Button
                                                    element="Link"
                                                    to="/me/user/courses"
                                                    color="blue"
                                                >
                                                    الذهاب للكورسات
                                                </Button>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                        {response.added_prepaid_courses ? (
                                            <>
                                                <div>
                                                    رصيد المحاضرات المسبقة المضافة :{" "}
                                                    {response.added_prepaid_courses}
                                                </div>
                                                <Button
                                                    element="a"
                                                    href="/prepaid_store"
                                                    color="blue"
                                                >
                                                    اختار المحاضرة مسبقة الدفع!
                                                </Button>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                        {response.current_balance_to_charge ? (
                                            <>
                                                <div>
                                                    تم شحن المحفظة الخاصه بك بـ :{" "}
                                                    {printUnit(
                                                        response.current_balance_to_charge,
                                                        "جنيه"
                                                    )}
                                                </div>
                                                <div>
                                                    رصيدك الحالي اصبح :{" "}
                                                    {printUnit(
                                                        currentBalance +
                                                            response.current_balance_to_charge,
                                                        "جنيه"
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </>
                                )}
                            </div>
                        </>
                    );
                    if (response.current_balance_to_charge) {
                        getCurrentBalance();
                    }
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
    return (
        <div className=" flex flex-col space-y-2">
            <div className="flex flex-center-both">
                <div className="flex flex-col space-y-4 w-full max-w-lg">
                    <div className="pb-5 text-center space-y-3">
                        <div className="font-w-bold font-h2">شحن كود </div>
                        <div>
                            اكتب الكود المكون من ١١ رقم على الكارت بتاعك هنا عشان تشحنه على الأكونت
                            بتاعك
                        </div>
                    </div>
                    <div className="flex flex-row items-end space-x-2 space-x-reverse  pb-4 pt-2 w-full">
                        <InputField
                            id="insert_auto_phone"
                            className="w-full"
                            placeholder="الكود الخاص بك"
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
                            شحن الكود
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

export default ChargeInsertAutoForm;
