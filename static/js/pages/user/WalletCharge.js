import React, { useState } from "react";
import Button from "../../components/ui/Button";
import InputField from "../../components/form/elements/InputField";
import { Icon } from "@iconify/react";
import auth from "../../services/authServices";
import a from "../../services/analyticsServices";
import http from "../../services/httpServices";
import modal from "../../services/modalServices";

const WalletCharge = () => {
    const [data, setData] = useState({
        ammount: "0",
    });
    const [error, setError] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState("");

    const handleCharge = async () => {
        setIsLoading(true);
        setIsDisabled(true);
        setError("");

        const token = auth.getToken();
        const config = auth.getAuthConfig(token);

        const visitorVisitId = a.getVisitorVisit();
        try {
            const { data: result } = await http.post(
                `/api/wallet_records/charge_balance`,
                { ...data, visitor_visit_id: visitorVisitId },
                config
            );
            // window.location.href = result.url;
            if (result.referenceNumber) {
                modal.message({
                    title: "تم انشاء الفاتورة بنجاح !",
                    text: `رقمك المرجعي هو : ${result.referenceNumber} , \n توجه نحو اقرب فرع خدمة لفوري و اطلب الدفع على خدمة رقم ٧٨٨ بهذا الكود المرجعي`,
                    callback: () => {
                        //   setIsDisabled(true);
                        //   setIsDisabled();
                    },
                });
                setResult(
                    `رقمك المرجعي هو : ${result.referenceNumber} , \n توجه نحو اقرب فرع خدمة لفوري و اطلب الدفع على خدمة رقم ٧٨٨ بهذا الكود المرجعي`
                );
            } else {
                window.location.href = result.url;
            }
        } catch ({ response }) {
            if (response.status != 422) {
                modal.message({
                    title: "حدث خطأ اثناء انشاء الفاتورة ",
                    text: "يرجى الاتصال بالدعم",
                    icon: "error",
                });
            }
            setError(response.data.errors.ammount[0]);
            setIsDisabled(false);
            setIsLoading(false);
        }
    };
    return (
        <div className=" flex flex-col space-y-2">
            <div className="flex justify-between items-center">
                <div className="flex w-full ">
                    <div className="flex-center-both">
                        <Button color="slate" onClick={handleCharge} isLoading={isLoading}>
                            شحن المحفظة !
                        </Button>
                    </div>
                    <div className="flex flex-row items-end space-x-2 space-x-reverse  pb-4 pt-8 w-full">
                        <InputField
                            id="ammount"
                            className="w-full"
                            placeholder="المبلغ الذي تريد شحنه"
                            icon={
                                <span className="flex-center-both mb-1">
                                    <Icon icon="solar:wallet-bold-duotone" />
                                </span>
                            }
                            data={data}
                            onChange={({ currentTarget: input }) => {
                                let ammount = input.value;
                                ammount = ammount.replace(/[^\d.]/g, "");
                                ammount = Math.floor(ammount);
                                setData({ ammount: ammount });
                            }}
                            type="text"
                            isDisabled={isDisabled}
                        />
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

export default WalletCharge;
