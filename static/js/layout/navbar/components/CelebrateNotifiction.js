import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CenterIcon from "../../../components/ui/CenterIcon";
import AuthContext from "../../../context/AuthContext";
import auth from "../../../services/authServices";
import { adminPath, isFreeTrialAvailable } from "../../../services/defaultSettings";
import http from "../../../services/httpServices";
import modal from "../../../services/modalServices";

import free from "../../../assets/free-bg.png";
import { padstart2 } from "../../../utils/time";
import Button from "../../../components/ui/Button";

const CelebrateNotifiction = () => {
    let {
        token: authToken,
        isFreeTrial,
        setIsFreeTrial,
        isFreeTrialDone,
        setIsFreeTrialDone,
        freeTrialTimeLeft,
        setFreeTrialTimeLeft,
        isFreeTrialMenuClosed,
        setIsFreeTrialMenuClosed,
    } = useContext(AuthContext);

    const [trialButtonLoading, setTrialButtonLoading] = useState(false);
    const getTrialInfo = async () => {
        const token = auth.getToken();
        const config = auth.getAuthConfig(token);
        try {
            const { data: result } = await http.get("/api/subscriptions/free_trial", config);

            if (result.is_free_trial_started) {
                if (result.is_free_trial_done) {
                    setIsFreeTrialDone(true);
                } else {
                    setFreeTrialTimeLeft(result.time_left);
                    // setFreeTrialTimeLeft(3);
                }
                setIsFreeTrial(true);
            }
        } catch (error) {
            modal.message({
                icon: "error",
                title: "حدث خطأ",
            });
            setTrialButtonLoading(false);
        }
    };

    const startTrial = async () => {
        setTrialButtonLoading(true);
        modal.message({
            icon: "success",
            title: "رسالة تأكيد للعد التنازلي",
            text: "هل انت متأكد من بدأ رحلة الـ 15 دقيقة الآن؟",
            buttons: {
                confirm: "بدأ الرحلة",
                cancel: "الغاء",
            },
            callback: async (e) => {
                if (e && e !== "cancel") {
                    const token = auth.getToken();
                    const config = auth.getAuthConfig(token);
                    try {
                        // eslint-disable-next-line no-unused-vars
                        const { data: result } = await http.post(
                            "/api/subscriptions/free_trial",
                            {},
                            config
                        );
                        setTrialButtonLoading(false);
                        setIsFreeTrial(true);
                        setFreeTrialTimeLeft(15 * 60);
                        window.location.reload();
                    } catch (error) {
                        modal.message({
                            icon: "error",
                            title: "حدث خطأ",
                        });
                        setTrialButtonLoading(false);
                    }
                } else {
                    setTrialButtonLoading(false);
                }
            },
        });
    };
    useEffect(() => {
        if (isFreeTrial && !isFreeTrialDone) {
            let timing = freeTrialTimeLeft;
            const interval = setInterval(() => {
                timing--;
                setFreeTrialTimeLeft(timing);
                if (timing < 1) {
                    window.location.reload();
                    clearInterval(interval);
                }
            }, 1000);

            if (timing < 1) {
                window.location.reload();
                clearInterval(interval);
            } else {
                return () => {
                    clearInterval(interval);
                };
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFreeTrial, isFreeTrialDone]);

    useEffect(() => {
        if (authToken && isFreeTrialAvailable) {
            getTrialInfo();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authToken, isFreeTrialAvailable]);
    const location = useLocation();
    return (
        <>
            {isFreeTrialAvailable && !location.pathname.includes(adminPath) ? (
                isFreeTrialMenuClosed ? (
                    <div
                        className="p-5 bg-blue-500 dark:bg-blue-800 fixed z-10 smooth shadow-lg flex-center-both clr-white  right-0 rounded-l-md mt-4 opacity-50 hover:opacity-70 cursor-pointer overflow-hidden"
                        onClick={() => setIsFreeTrialMenuClosed(false)}
                    >
                        <CenterIcon icon="game-icons:stars-stack" className="font-h1" />
                        {isFreeTrial && !isFreeTrialDone ? (
                            <div className="absolute bottom-0 inset-x-0 w-full h-1 bg-rose-900">
                                <div
                                    className="w-full h-full bg-rose-500 smooth"
                                    style={{
                                        width: `${(freeTrialTimeLeft / (15 * 60)) * 100}%`,
                                    }}
                                ></div>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                ) : (
                    <div className="py-10 px-5 bg-blue-500 dark:bg-blue-800 fixed w-full inset-x-0 z-10 smooth shadow-lg flex-center-both clr-white flex-col mt-1 overflow-hidden">
                        {/* <div
                className="absolute w-full inset-0 h-full opacity-30 z-0"
                style={{
                    backgroundImage: "url(" + stars + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    // backgroundRepeat: "repeat-y",
                }}
            ></div> */}
                        <div
                            className="absolute w-full inset-0 h-full opacity-20 z-0"
                            style={{
                                backgroundImage: "url(" + free + ")",
                                backgroundSize: "cover",
                                backgroundPosition: "center top",
                                // backgroundRepeat: "repeat-y",
                            }}
                        ></div>
                        {/* <img
                className="absolute w-full inset-0 opacity-30 z-0 free-bg"
                src={free}
                alt="free"
                ref={}
            />
            <img
                className="absolute w-full inset-0 opacity-30 z-0 free-bg"
                src={free}
                alt="free"
            /> */}
                        {isFreeTrial && !isFreeTrialDone ? (
                            <div className="absolute bottom-0 inset-x-0 w-full h-1 bg-rose-900">
                                <div
                                    className="w-full h-full bg-rose-500 smooth"
                                    style={{
                                        width: `${(freeTrialTimeLeft / (15 * 60)) * 100}%`,
                                    }}
                                ></div>
                            </div>
                        ) : (
                            ""
                        )}
                        <div
                            className="absolute z-10 right-0 top-0 p-2 cursor-pointer hover-shadow smooth rounded-md"
                            onClick={() => setIsFreeTrialMenuClosed(true)}
                        >
                            <CenterIcon icon={"fa:close"} className="font-h3" />
                        </div>
                        <div className="flex-center-both flex-col relative z-10">
                            {authToken ? (
                                isFreeTrial ? (
                                    isFreeTrialDone ? (
                                        <>
                                            <div className="flex flex-row flex-wrap space-x-2 space-x-reverse font-h3 flex-center-both font-w-bold">
                                                <span>بنحتفل بـ الـ </span>
                                                <span className="font-w-bold bg-primary-container shadow-lg clr-text-primary smooth rounded-full font-big pl-6 pr-4 font-comforter tracking-widest">
                                                    500,000
                                                </span>
                                                <span>مشترك ! </span>
                                            </div>
                                            <div className="pt-4 font-smaller">
                                                انتهت رحلتك المجانية في المنصة
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="font-w-bold tracking-wider font-h3">
                                                {" "}
                                                انت الآن في رحلة التجربة المجانية للمنصة!
                                            </div>
                                            <div className="font-w-bold pt-2">
                                                <span>يمكنك تجربة كل محتوى المنصة خلال :</span>
                                            </div>
                                            <div className="pt-2">
                                                <div className="bg-primary-container rounded-full clr-text-primary smooth font-w-bold font-h2 px-4 space-x-1">
                                                    <span>
                                                        {padstart2(
                                                            Math.floor(freeTrialTimeLeft / 60)
                                                        )}
                                                    </span>
                                                    <span className="animate-pulse">:</span>
                                                    <span>{padstart2(freeTrialTimeLeft % 60)}</span>
                                                </div>
                                            </div>
                                        </>
                                    )
                                ) : (
                                    <>
                                        <div className="flex flex-row flex-wrap space-x-2 space-x-reverse font-h3 flex-center-both font-w-bold">
                                            <span>بمناسبة الـ </span>
                                            <span className="font-w-bold bg-primary-container shadow-lg clr-text-primary smooth rounded-full font-big pl-6 pr-4 font-comforter tracking-widest">
                                                500,000
                                            </span>
                                            <span>مشترك ! </span>
                                        </div>
                                        <div className="flex-wrap space-x-2 space-x-reverse flex-center-both py-3">
                                            <span className="pt-1">
                                                لمشاهدة كل محتوى المنصة لمدة{" "}
                                                <span className="">15 دقيقة</span>
                                            </span>

                                            <span className=" bg-yellow-500 clr-white smooth rounded-full px-4 py-1 font-w-bold font-h3">
                                                مجانًا !
                                            </span>
                                        </div>
                                        <div className="pt-2">
                                            <Button
                                                color="rose"
                                                className="font-w-bold font-taj pb-0.5"
                                                onClick={startTrial}
                                                isLoading={trialButtonLoading}
                                            >
                                                اضغط هنا لبدأ الرحلة المجانية!
                                            </Button>
                                        </div>
                                    </>
                                )
                            ) : (
                                <>
                                    <div className="flex flex-row flex-wrap space-x-2 space-x-reverse font-h3 flex-center-both font-w-bold">
                                        <span>بمناسبة الـ </span>
                                        <span className="font-w-bold bg-primary-container shadow-lg clr-text-primary smooth rounded-full font-big pl-6 pr-4 font-comforter tracking-widest">
                                            500,000
                                        </span>
                                        <span>مشترك ! </span>
                                    </div>
                                    <div className="flex-wrap space-x-2 space-x-reverse flex-center-both py-3">
                                        <span className="pt-1">
                                            لمشاهدة كل محتوى المنصة لمدة{" "}
                                            <span className="">15 دقيقة</span>
                                        </span>

                                        <span className=" bg-yellow-500 clr-white smooth rounded-full px-4 py-1 font-w-bold font-h3">
                                            مجانًا !
                                        </span>
                                    </div>
                                    <div className="pt-2">
                                        <Button
                                            color="rose"
                                            className="font-w-bold font-taj pb-0.5"
                                            element="Link"
                                            to="/register"
                                        >
                                            اضغط هنا وأنشئ حسابك وابدأ الرحلة المجانية!
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )
            ) : (
                ""
            )}
        </>
    );
};

export default CelebrateNotifiction;
