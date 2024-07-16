import React, { useContext, useEffect } from "react";
import Container from "../components/ui/Container";
import HeaderSection from "../components/ui/HeaderSection";
import LoadingIcon from "../components/ui/LoadingIcon";
import AuthContext from "../context/AuthContext";
import { isObjectEmpty } from "../utils/objects";
import { Outlet, NavLink } from "react-router-dom";
import AnimatingPage from "../middleware/AnimatingPage";
import CenterIcon from "../components/ui/CenterIcon";
import {
    isChargeInsertAuto,
    isAbleChangingPassword,
    isLoginTokens,
    isSubjectSubscriptionable,
    isMigrationFromInsertAuto,
    isWalletEnabled,
    isCourseRenamedToMonthlySubscriptions,
} from "../services/defaultSettings";
import page from "../services/pageServices";

const User = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const currentTitle = page.getCurrentTitle();
        page.setTitle("ملف المستخدم");
        return () => {
            page.setTitle(currentTitle);
        };
    }, []);

    return (
        <>
            <div className="bg-outer-container smooth clr-text-primary negative-nav-margin posisitve-nav-padding-top">
                <Container className="py-10 pb-10 space-y-0">
                    <HeaderSection></HeaderSection>
                    {isObjectEmpty(user) && (
                        <AnimatingPage>
                            <div className="relative z-10 w-full">
                                <div className="w-full flex-center-both flex-col">
                                    <div className="bg-inner-container clr-text-primary shadow-large rounded-md smooth px-8 py-10 w-full max-w-lg -mt-16 ">
                                        <span className="flex-center-both space-x-3 space-x-reverse">
                                            <LoadingIcon
                                                className={
                                                    "font-big text-teal-500 dark:text-teal-300"
                                                }
                                            />
                                            <span>يتم الآن تحميل بياناتك.....</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </AnimatingPage>
                    )}
                    {!isObjectEmpty(user) && (
                        <AnimatingPage>
                            <Container>
                                <Container>
                                    <div className="bg-inner-container clr-text-primary px-5 py-10  rounded-md shadow-lg -mt-32 relative z-10 smooth border-2 border-slate-500 border-opacity-10">
                                        <div className="flex-center-both">
                                            <div className="flex flex-row font-h2 font-w-bold rounded-full shadow-lg overflow-hidden bg-thir-container clr-text-primary smooth border-2 border-slate-500 border-opacity-10 shrink-0">
                                                <div className="h-12 w-16 border-2 border-opacity-30 border-blue-200 flex-center-both bg-blue-500 rounded-full clr-white">
                                                    <CenterIcon icon="carbon:user-avatar-filled" />
                                                </div>
                                                <div className="pl-6 pr-2 flex-center-both">
                                                    <div className="font-w-bold">ملف المستخدم</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row pt-5">
                                            <div className="sm:basis-1/4 shrink-0 min-w-0 pb-5">
                                                <div className="relative w-full">
                                                    <div className="px-4 py-4  flex flex-col w-full space-y-3">
                                                        <NavLink
                                                            to="./"
                                                            className={({ isActive }) =>
                                                                isActive
                                                                    ? "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-blue-500 clr-white  border-blue-100 border-opacity-20 smooth"
                                                                    : "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-primary-container border-slate-500 border-opacity-10 smooth hover:bg-opacity-0 hover:border-blue-500 hover:text-blue-500"
                                                            }
                                                        >
                                                            ملف المستخدم
                                                        </NavLink>
                                                        {isChargeInsertAuto ? (
                                                            <NavLink
                                                                to="./charge_insert_auto"
                                                                className={({ isActive }) =>
                                                                    isActive
                                                                        ? "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-blue-500 clr-white  border-blue-100 border-opacity-20 smooth"
                                                                        : "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-primary-container border-slate-500 border-opacity-10 smooth hover:bg-opacity-0 hover:border-blue-500 hover:text-blue-500"
                                                                }
                                                            >
                                                                شحن كود
                                                            </NavLink>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {isMigrationFromInsertAuto ? (
                                                            <NavLink
                                                                to="./migrate_from_insert_auto"
                                                                className={({ isActive }) =>
                                                                    isActive
                                                                        ? "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-blue-500 clr-white  border-blue-100 border-opacity-20 smooth"
                                                                        : "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-primary-container border-slate-500 border-opacity-10 smooth hover:bg-opacity-0 hover:border-blue-500 hover:text-blue-500"
                                                                }
                                                            >
                                                                محاضرات و اكواد السنتر
                                                            </NavLink>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {isWalletEnabled ? (
                                                            <NavLink
                                                                to="./wallet"
                                                                className={({ isActive }) =>
                                                                    isActive
                                                                        ? "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-blue-500 clr-white  border-blue-100 border-opacity-20 smooth"
                                                                        : "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-primary-container border-slate-500 border-opacity-10 smooth hover:bg-opacity-0 hover:border-blue-500 hover:text-blue-500"
                                                                }
                                                            >
                                                                محفظتي
                                                            </NavLink>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {isAbleChangingPassword ? (
                                                            <NavLink
                                                                to="./change_password"
                                                                className={({ isActive }) =>
                                                                    isActive
                                                                        ? "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-blue-500 clr-white  border-blue-100 border-opacity-20 smooth"
                                                                        : "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-primary-container border-slate-500 border-opacity-10 smooth hover:bg-opacity-0 hover:border-blue-500 hover:text-blue-500"
                                                                }
                                                            >
                                                                تغيير كلمة المرور
                                                            </NavLink>
                                                        ) : (
                                                            ""
                                                        )}
                                                        {isCourseRenamedToMonthlySubscriptions ? (
                                                            <NavLink
                                                                to="./monthly_courses"
                                                                className={({ isActive }) =>
                                                                    isActive
                                                                        ? "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-blue-500 clr-white  border-blue-100 border-opacity-20 smooth"
                                                                        : "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-primary-container border-slate-500 border-opacity-10 smooth hover:bg-opacity-0 hover:border-blue-500 hover:text-blue-500"
                                                                }
                                                            >
                                                                موادي
                                                            </NavLink>
                                                        ) : (
                                                            ""
                                                        )}

                                                        <NavLink
                                                            to="./courses"
                                                            className={({ isActive }) =>
                                                                isActive
                                                                    ? "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-blue-500 clr-white  border-blue-100 border-opacity-20 smooth"
                                                                    : "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-primary-container border-slate-500 border-opacity-10 smooth hover:bg-opacity-0 hover:border-blue-500 hover:text-blue-500"
                                                            }
                                                        >
                                                            كورساتي
                                                        </NavLink>

                                                        {isLoginTokens ? (
                                                            <NavLink
                                                                to="./login_data"
                                                                className={({ isActive }) =>
                                                                    isActive
                                                                        ? "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-blue-500 clr-white  border-blue-100 border-opacity-20 smooth"
                                                                        : "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-primary-container border-slate-500 border-opacity-10 smooth hover:bg-opacity-0 hover:border-blue-500 hover:text-blue-500"
                                                                }
                                                            >
                                                                الآمان و تاريخ تسجيل الدخول
                                                            </NavLink>
                                                        ) : (
                                                            ""
                                                        )}
                                                        <NavLink
                                                            to="./video_views"
                                                            className={({ isActive }) =>
                                                                isActive
                                                                    ? "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-blue-500 clr-white  border-blue-100 border-opacity-20 smooth"
                                                                    : "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-primary-container border-slate-500 border-opacity-10 smooth hover:bg-opacity-0 hover:border-blue-500 hover:text-blue-500"
                                                            }
                                                        >
                                                            تفاصيل المشاهدات
                                                        </NavLink>
                                                        <NavLink
                                                            to="./invoices"
                                                            className={({ isActive }) =>
                                                                isActive
                                                                    ? "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-blue-500 clr-white  border-blue-100 border-opacity-20 smooth"
                                                                    : "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-primary-container border-slate-500 border-opacity-10 smooth hover:bg-opacity-0 hover:border-blue-500 hover:text-blue-500"
                                                            }
                                                        >
                                                            الفواتير
                                                        </NavLink>
                                                        <NavLink
                                                            to="./subscriptions"
                                                            className={({ isActive }) =>
                                                                isActive
                                                                    ? "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-blue-500 clr-white  border-blue-100 border-opacity-20 smooth"
                                                                    : "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-primary-container border-slate-500 border-opacity-10 smooth hover:bg-opacity-0 hover:border-blue-500 hover:text-blue-500"
                                                            }
                                                        >
                                                            الاشتراكات
                                                        </NavLink>
                                                        <NavLink
                                                            to="./exam_results"
                                                            className={({ isActive }) =>
                                                                isActive
                                                                    ? "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-blue-500 clr-white  border-blue-100 border-opacity-20 smooth"
                                                                    : "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-primary-container border-slate-500 border-opacity-10 smooth hover:bg-opacity-0 hover:border-blue-500 hover:text-blue-500"
                                                            }
                                                        >
                                                            نتائج الامتحانات
                                                        </NavLink>
                                                        <NavLink
                                                            to="./hm_results"
                                                            className={({ isActive }) =>
                                                                isActive
                                                                    ? "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-blue-500 clr-white  border-blue-100 border-opacity-20 smooth"
                                                                    : "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-primary-container border-slate-500 border-opacity-10 smooth hover:bg-opacity-0 hover:border-blue-500 hover:text-blue-500"
                                                            }
                                                        >
                                                            نتائج الواجب
                                                        </NavLink>
                                                        {/* <NavLink
                                                            to="./video_quizes"
                                                            className={({ isActive }) =>
                                                                isActive
                                                                    ? "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-blue-500 clr-white  border-blue-100 border-opacity-20 smooth"
                                                                    : "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-primary-container border-slate-500 border-opacity-10 smooth hover:bg-opacity-0 hover:border-blue-500 hover:text-blue-500"
                                                            }
                                                        >
                                                            نتائج كويز الفيديو
                                                        </NavLink> */}

                                                        {/* <NavLink
                                                            to="./notifications"
                                                            className={({ isActive }) =>
                                                                isActive
                                                                    ? "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-blue-500 clr-white  border-blue-100 border-opacity-20 smooth"
                                                                    : "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-primary-container border-slate-500 border-opacity-10 smooth hover:bg-opacity-0 hover:border-blue-500 hover:text-blue-500"
                                                            }
                                                        >
                                                            الاشعارات
                                                        </NavLink> */}
                                                        {/* <NavLink
                                                            to="./"
                                                            className={({ isActive }) =>
                                                                isActive
                                                                    ? "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-blue-500 clr-white  border-blue-100 border-opacity-20 smooth"
                                                                    : "py-2 px-3 rounded-md shadow-md border-2 clr-text-primary bg-primary-container border-slate-500 border-opacity-10 smooth hover:bg-opacity-0 hover:border-blue-500 hover:text-blue-500"
                                                            }
                                                        >
                                                            مؤشر المستوي
                                                        </NavLink> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sm:basis-3/4 flex flex-col py-5 w-full overflow-auto">
                                                <Outlet />
                                            </div>
                                        </div>
                                    </div>
                                </Container>
                            </Container>
                        </AnimatingPage>
                    )}
                </Container>
            </div>

            {/* <AnimatePresence exitBeforeEnter>
                <div key={Object.keys(course).length}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {Object.keys(course).length < 1 && (
                            <div className="h-screen negative-nav-margin grow w-full flex-center-both font-h2 col-span-1 md:col-span-2 lg:col-span-3">
                                <span className="flex-center-both space-x-3 space-x-reverse bg-teal-500 px-28 py-12 clr-white rounded-2xl">
                                    <LoadingIcon
                                        className={"font-big text-teal-800 dark:text-teal-400"}
                                    />
                                    <span>يتم الآن تحميل بيانات الكورس.....</span>
                                </span>
                            </div>
                        )}
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {Object.keys(course).length > 0 && (
                            <div className="bg-outer-container smooth clr-text-primary negative-nav-margin posisitve-nav-padding-top">
                                <Container className="py-10 pb-10">

                                    <HeaderSection course={course} />
                                    <Outlet />

                                    <ContentSection course={course} />
                                </Container>
                            </div>
                        )}
                    </motion.div>
                </div>
            </AnimatePresence> */}
        </>
    );
};

export default User;
