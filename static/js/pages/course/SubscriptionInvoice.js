import { Icon } from "@iconify/react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import CourseContext from "../../context/CourseContext";

import auth from "../../services/authServices";
import http from "../../services/httpServices";
import modal from "../../services/modalServices";

import Form from "../../components/form/elements/Form";
import InputField from "../../components/form/elements/InputField";
import Button from "../../components/ui/Button";
import CenterIcon from "../../components/ui/CenterIcon";
import Container from "../../components/ui/Container";
import FlexRowReverse from "../../components/ui/FlexRowReverse";
import a from "../../services/analyticsServices";
import { isCouponable, isWalletEnabled } from "../../services/defaultSettings";
import AuthContext from "../../context/AuthContext";
import { isObjectEmpty } from "../../utils/objects";

const SubscriptionInvoice = () => {
    const [discount, setDiscount] = useState(0);
    const [isDisabled, setIsDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [coupon, setCoupon] = useState("");
    const [data, setData] = useState({
        coupon: "",
    });
    const [error, setError] = useState("");
    const [result, setResult] = useState("");

    const [subscribeButtonLoading, setSubscribeButtonLoading] = useState(false);

    const { course } = useContext(CourseContext);

    const { currentBalance } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (result) {
            setData({ coupon: "" });
            setDiscount(0);
            setResult("");
            setIsDisabled(false);
            return;
        }
        setError("");
        setLoading(true);
        setIsDisabled(true);

        if (!data.coupon) {
            return setError("الرجاء ملئ الكوبون");
        }
        const token = auth.getToken();
        const config = auth.getAuthConfig(token);

        try {
            const { data: response } = await http.post(
                `/api/sellables/course/${course.id}/validate_coupon`,
                data,
                config
            );
            setResult(response.message);
            setDiscount(response.discount);
            setLoading(false);
            // setIsDisabled(false);
        } catch ({ response }) {
            setError(response.data.errors.coupon[0]);
            setLoading(false);
            setIsDisabled(false);
        }

        // if()
    };
    const SubscriptionInstruction = () => {
        modal.message({
            title: "شروط الاشتراك فى الكورس",
            text: `الكورس متاح لشخص واحد فقط ولا يجوز مشاركته مع طالب اخر`,
            icon: "warning",

            buttons: {
                confirm: " اوافق على الشروط",
                cancel: "الغاء",
            },
            callback: (e) => {
                if (e && e !== "cancel") {
                    createInvoice();
                }
            },
        });
    };

    const createInvoice = async () => {
        setSubscribeButtonLoading(true);
        let toSendData = {};
        if (discount) {
            toSendData = { ...data };
        }
        const token = auth.getToken();
        const config = auth.getAuthConfig(token);
        const visitorVisitId = a.getVisitorVisit();
        try {
            const { data: result } = await http.post(
                `/api/sellables/course/${course.id}/subscribe_request`,
                { ...toSendData, visitor_visit_id: visitorVisitId },
                config
            );
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
            if (response.status == 469) {
                modal.message({
                    title: "حدث خطأ اثناء انشاء الفاتورة ",
                    text: response.data.message,
                    icon: "error",
                    buttons: {
                        confirm: "شحن الآن",
                        cancel: "إلغاء",
                    },
                    callback: (e) => {
                        if (e && e !== "cancel") {
                            window.location.href = `/me/user/wallet`;
                        } else {
                            setSubscribeButtonLoading(false);
                        }
                    },
                });
            } else {
                modal.message({
                    title: "حدث خطأ اثناء انشاء الفاتورة ",
                    text: "يرجى الاتصال بالدعم",
                    icon: "error",
                });
                setSubscribeButtonLoading(false);
            }
        }
    };
    const subscribeFromWallet = async () => {
        setSubscribeButtonLoading(true);
        if (currentBalance < course.price - discount) {
            modal.message({
                title: "رصيدك لا يكفي !",
                text: `يجب شحن الرصيد اولًا ب ${
                    course.price - discount - currentBalance
                } أو اكثر للمتابعة !`,
                icon: "error",
                buttons: {
                    confirm: "شحن الآن",
                    cancel: "إلغاء",
                },
                callback: (e) => {
                    if (e && e !== "cancel") {
                        window.location.href = `/me/user/wallet`;
                    } else {
                        setSubscribeButtonLoading(false);
                    }
                },
            });
            return "";
        }

        let toSendData = {};
        if (discount) {
            toSendData = { ...data };
        }
        const token = auth.getToken();
        const config = auth.getAuthConfig(token);
        const visitorVisitId = a.getVisitorVisit();
        try {
            const { data: result } = await http.post(
                `/api/sellables/course/${course.id}/subscribe_from_wallet`,
                { ...toSendData, visitor_visit_id: visitorVisitId },
                config
            );
            // window.location.href = result.url;
            modal.message({
                title: "تم الاشتراك في الكورس بنجاح !",
                text: `عملية ناجحة !`,
                callback: () => {
                    window.location.href = `/course/${course.id}`;
                },
            });
        } catch ({ response }) {
            if (response.status == 469) {
                modal.message({
                    title: "لا يوجد لديك رصيد كافي",
                    text: response.data.message,
                    icon: "error",
                    buttons: {
                        confirm: "شحن الآن",
                        cancel: "إلغاء",
                    },
                    callback: (e) => {
                        if (e && e !== "cancel") {
                            window.location.href = `/me/user/wallet`;
                        } else {
                            setSubscribeButtonLoading(false);
                        }
                    },
                });
            } else {
                modal.message({
                    title: "حدث خطأ اثناء الإشتراك",
                    text: "يرجى الاتصال بالدعم",
                    icon: "error",
                });
                setSubscribeButtonLoading(false);
            }
        }
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (!isObjectEmpty(course)) {
            if (course.subscriptions_count > 0) {
                navigate(`/course/${course.id}`);
            }
        }
    }, [course, course.subscriptions_count]);
    return (
        <Container>
            <div className="relative z-10 bg-inner-container smooth clr-text-primary rounded-lg shadow-large p-10 -mt-52">
                <Link element="Link" className="underline clr-text-secondary smooth" to={-1}>
                    <FlexRowReverse>
                        <CenterIcon icon="akar-icons:arrow-right" />
                        <span>العودة للوراء</span>
                    </FlexRowReverse>
                </Link>
                <div className="font-h1 flex-center-both pb-10 font-w-bold">
                    <div className="">الفاتورة</div>
                </div>
                {course.is_couponable && isCouponable ? (
                    <div>
                        <div>
                            هل لديك كوبون؟{" "}
                            <span className="text-cyan-500 underline"> انسخه الآن ! </span>
                        </div>

                        <Form onSubmit={handleSubmit}>
                            <div className="flex flex-row items-end space-x-2 space-x-reverse  pb-10 pt-8">
                                <div>
                                    <Button
                                        isLoading={loading}
                                        color={result ? "teal" : "yellow"}
                                        className="shrink-0 rounded-l-none rounded-r-md"
                                    >
                                        {result && "تعديل"}
                                        {!result && "تطبيق"}
                                    </Button>
                                </div>
                                <InputField
                                    className="max-w-sm"
                                    placeholder="الكوبون الخاص بك"
                                    icon={
                                        <span className="flex-center-both mb-1">
                                            <Icon icon="bi:gift-fill" />
                                        </span>
                                    }
                                    // value={coupon}
                                    id="coupon"
                                    data={data}
                                    onChange={({ currentTarget: input }) => {
                                        setData({
                                            coupon: input.value.toUpperCase(),
                                        });
                                    }}
                                    isDisabled={isDisabled}
                                />
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
                        </Form>
                    </div>
                ) : null}
                <div>
                    <table className="table-auto w-full table-style">
                        <thead className="py-10">
                            <tr>
                                <th className="h-20 text-center">سعر الكورس</th>
                                <th className="h-20 text-center">الخصم</th>
                                <th className="h-20 text-center">
                                    اجمالي سعر
                                    <br />
                                    الفاتورة النهائي
                                </th>
                            </tr>
                        </thead>
                        <tbody className="py-10">
                            <tr>
                                <td className="h-20 text-center">{course.price} جنيهًا</td>
                                <td className="h-20 text-center">{discount} جنيهًا</td>
                                <td className="h-20 text-center">
                                    {course.price - discount} جنيهًا
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex-center-both pt-10 md:space-x-4 md:space-x-reverse md:flex-row flex-col space-y-2 md:space-y-0">
                    <div className="w-full max-w-lg">
                        <Button
                            color="cyan"
                            className="w-full"
                            onClick={SubscriptionInstruction}
                            isLoading={subscribeButtonLoading}
                        >
                            الذهاب للدفع
                        </Button>
                    </div>
                    {isWalletEnabled ? (
                        <div>
                            <Button
                                color="slate"
                                onClick={subscribeFromWallet}
                                isLoading={subscribeButtonLoading}
                            >
                                أو اشترك من المحفظة
                            </Button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </Container>
    );
};

export default SubscriptionInvoice;
