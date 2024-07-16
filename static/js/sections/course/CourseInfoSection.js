import React, { useContext, useState } from "react";

import { baseURL } from "../../config";

import CourseItemsCounter from "../../components/items/CourseItemsCounter";
import CourseDescItem from "../../components/items/CourseDescItem";
import Button from "../../components/ui/Button";
import modal from "../../services/modalServices";
import { useLocation, useNavigate } from "react-router-dom";
import CourseContext from "../../context/CourseContext";

import { isObjectEmpty } from "../../utils/objects";
import auth from "../../services/authServices";
import { isPrepaidSystem } from "../../services/defaultSettings";
import AuthContext from "../../context/AuthContext";
import http from "../../services/httpServices";

const CourseInfoSection = () => {
    const token = auth.getToken();

    const { course } = useContext(CourseContext);
    let { prepaidCourses, setPrepaidCourses } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);

    const onPrepaidClick = async () => {
        setIsLoading(true);
        modal.message({
            title: "رسالة تأكيد",
            text: `هل انت متأكد من الاشتراك في ${course.name} ؟`,
            icon: "info",
            buttons: {
                confirm: "الاشتراك",
                cancel: "إلغاء",
            },
            callback: async (e) => {
                if (e && e !== "cancel") {
                    const token = auth.getToken();
                    const config = auth.getAuthConfig(token);
                    const { data } = await http.post(
                        `/api/user/prepaid_courses`,
                        { course_id: course.id },
                        config
                    );
                    modal.message({
                        title: "عملية ناجحة",
                        text: `تم الاشتراك بـ ${course.name} بنجاح !`,
                        icon: "success",
                        callback: () => {
                            setPrepaidCourses(prepaidCourses - 1);
                            window.location.reload();
                            // navigate(`/course/${course.id}`);
                        },
                    });
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                }
            },
        });
    };

    const navigate = useNavigate();
    let location = useLocation();
    return (
        <>
            {!isObjectEmpty(course) && (
                <div className="w-full glassy smooth clr-text-primary shadow-large rounded-lg overflow-hidden">
                    <div className="p-4 space-y-8">
                        <div className="overflow-hidden rounded-md">
                            <img src={`${baseURL}/${course.picture}`} alt="course" />
                        </div>

                        {parseInt(course.price) === 0 ? (
                            <>
                                <Button color="rose" className="w-full inline-block text-center">
                                    هذا الكورس مجاني !
                                </Button>
                            </>
                        ) : (
                            <>
                                {token && course.subscriptions_count > 0 ? (
                                    <Button
                                        color="cyan"
                                        className="w-full inline-block text-center"
                                    >
                                        انت مشترك بهذا الكورس !
                                    </Button>
                                ) : (
                                    <div className="flex-center-both">
                                        {isPrepaidSystem &&
                                        course.prepaidable &&
                                        prepaidCourses > 0 ? (
                                            <div className="bg-teal-500 rounded-full px-5 w-full py-4 text-center clr-white">
                                                يمكنك الاشتراك في هذا الكورس ضمن رصيدك المسبق الدفع
                                            </div>
                                        ) : (
                                            <CourseItemsCounter
                                                text="جنيهًا"
                                                number={course.price}
                                                isIncreasing={false}
                                                icon="ant-design:pound-circle-twotone"
                                                counterClassName="bg-blue-600"
                                                className="bg-yellow-500 text-slate-100 ml-0"
                                                iconClassName="text-yellow-400"
                                            />
                                        )}
                                    </div>
                                )}
                                {token && course.subscriptions_count < 1 ? (
                                    isPrepaidSystem && course.prepaidable && prepaidCourses > 0 ? (
                                        <Button
                                            isLoading={isLoading}
                                            onClick={onPrepaidClick}
                                            color="blue"
                                            className="w-full inline-block text-center"
                                        >
                                            اشترك الآن!
                                        </Button>
                                    ) : (
                                        <Button
                                            element="Link"
                                            to={`subscribe/previous_invoices/`}
                                            color="blue"
                                            className="w-full inline-block text-center"
                                        >
                                            اشترك الآن !
                                        </Button>
                                    )
                                ) : (
                                    ""
                                )}
                                {!token && (
                                    <Button
                                        onClick={() => {
                                            modal.message({
                                                title: `يجب عليك تسجيل الدخول اولًا`,
                                                text: "يجب عليك تسجيل الدخول لشراء الكورس",
                                                icon: "warning",
                                                button: "تسجيل الدخول",
                                                callback: (accept) => {
                                                    if (accept) {
                                                        navigate("/login", {
                                                            state: { prevPath: location.pathname },
                                                        });
                                                    }
                                                },
                                            });
                                        }}
                                        color="blue"
                                        className="w-full inline-block text-center"
                                    >
                                        اشترك الآن !
                                    </Button>
                                )}
                            </>
                        )}
                        <div className="font-small">
                            <CourseDescItem
                                title="المحتوى"
                                value={`+ ${course.total_videos_duration}`}
                                valueName={
                                    course.total_videos_duration <= 10 &&
                                    course.total_videos_duration !== 1
                                        ? "ساعات"
                                        : "ساعة"
                                }
                                icon="icon-park-twotone:time"
                            />
                            <CourseDescItem
                                title="اجمالي الاسئلة"
                                value={`+ ${course.total_questions_quantity}`}
                                valueName={`${
                                    course.total_questions_quantity <= 10 &&
                                    course.total_questions_quantity !== 1
                                        ? "اسئلة"
                                        : "سؤال"
                                }`}
                                icon="ant-design:question-circle-twotone"
                                isLast={true}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CourseInfoSection;
