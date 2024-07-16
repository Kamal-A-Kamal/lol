import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import auth from "../services/authServices";
import http from "../services/httpServices";
import Categorie from "../sections/home/CoursesSection/Categorie";
import modal from "../services/modalServices";
import LoadingIcon from "../components/ui/LoadingIcon";
import Container from "../components/ui/Container";
import HeaderSection from "../components/ui/HeaderSection";
import page from "../services/pageServices";

const PrepaidStore = () => {
    let { prepaidCourses, setPrepaidCourses } = useContext(AuthContext);
    const navigate = useNavigate();
    const [prepaidableCourses, setPrepaidableCourses] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const getPrepaidableCourses = async () => {
        const token = auth.getToken();
        const config = auth.getAuthConfig(token);
        const { data } = await http.get(`/api/courses/prepaidable`, config);
        setPrepaidableCourses(data);
    };
    const onPrepaidClick = async (course_id, name) => {
        setIsLoading(true);
        modal.message({
            title: "رسالة تأكيد",
            text: `هل انت متأكد من الاشتراك في ${name} ؟`,
            icon: "info",
            buttons: {
                confirm: "الاشتراك",
                cancel: "إلغاء",
            },
            callback: async (e) => {
                if (e && e !== "cancel") {
                    const token = auth.getToken();
                    const config = auth.getAuthConfig(token);

                    // eslint-disable-next-line no-unused-vars
                    const { data } = await http.post(
                        `/api/user/prepaid_courses`,
                        { course_id },
                        config
                    );
                    modal.message({
                        title: "عملية ناجحة",
                        text: `تم الاشتراك بـ ${name} بنجاح !`,
                        icon: "success",
                        callback: () => {
                            setPrepaidCourses(prepaidCourses - 1);
                            auth.setPrepaidCoursesStoreSeen(0);
                            navigate(`/course/${course_id}`);
                        },
                    });
                    // setIsLoading(false);
                } else {
                    setIsLoading(false);
                }
            },
        });
    };

    useEffect(() => {
        if (prepaidCourses < 0) {
            return navigate("/");
        }
        auth.setPrepaidCoursesStoreSeen(true);
        getPrepaidableCourses();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prepaidCourses]);

    useEffect(() => {
        const currentTitle = page.getCurrentTitle();
        page.setTitle("استخدم رصيدك مسبق الدفع!");
        return () => {
            page.setTitle(currentTitle);
        };
    }, []);

    return (
        <>
            <div className="smooth clr-text-primary negative-nav-margin posisitve-nav-padding-top">
                <Container className="py-10 pb-10 space-y-0">
                    <HeaderSection></HeaderSection>
                </Container>
            </div>
            <div className="pb-10">
                <div className="flex-center-both flex-col space-y-5">
                    <div className="flex-center-both bg-rose-500 clr-white rounded-full px-10 py-3 font-h2 font-w-bold">
                        صفحة المحاضرات مسبقة الدفع
                    </div>
                    <div className="space-y-2 flex-center-both flex-col font-small">
                        <div>
                            اختر المحاضرة التي تريد الاشتراك بيها و سيتم خصمها من رصيدك من المحاضرات
                        </div>
                        <div>اضغط علي علي المحاضرة التي تريد الاشتراك بها</div>
                    </div>
                </div>
                {isLoading ? (
                    <>
                        <div className="font-h2 col-span-1 md:col-span-2 lg:col-span-3 pt-40">
                            <span className="flex-center-both space-x-3 space-x-reverse">
                                <LoadingIcon
                                    className={"font-h1 text-teal-600 dark:text-teal-400"}
                                />
                                <span>برجاء الانتظار قليلًا</span>
                            </span>
                        </div>
                    </>
                ) : (
                    <Categorie
                        titleFirst="أحدث"
                        titleLast="الكورسات"
                        onPrepaidClick={onPrepaidClick}
                        coursesList={prepaidableCourses}
                        isPrepaid={true}
                    />
                )}
            </div>
        </>
    );
};

export default PrepaidStore;
