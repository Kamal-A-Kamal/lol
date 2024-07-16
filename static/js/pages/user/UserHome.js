import React, { useContext, useEffect, useState } from "react";

import CenterIcon from "../../components/ui/CenterIcon";

import profile from "../../assets/profile.svg";
import AuthContext from "../../context/AuthContext";
import FlexRowReverse from "../../components/ui/FlexRowReverse";
import { isAbleChangingPassword, profileStatistics } from "../../services/defaultSettings";
import LoadingIcon from "../../components/ui/LoadingIcon";
import ProgressCircle from "../../components/ui/ProgressCircle";
import { printUnit } from "../../utils/ar";
import auth from "../../services/authServices";
import http from "../../services/httpServices";
import { Link } from "react-router-dom";

const UserHome = () => {
    const { user } = useContext(AuthContext);
    const [statistics, setStatistics] = useState({});
    const [isProfileStatisticsLoading, setIsProfileStatisticsLoading] = useState(true);

    const getUserStatistics = async () => {
        setIsProfileStatisticsLoading(true);
        try {
            const token = auth.getToken();
            const config = auth.getAuthConfig(token);
            const { data: result } = await http.get("/api/user/statistics", config);
            setStatistics(result);

            setIsProfileStatisticsLoading(false);
        } catch (error) {
            setIsProfileStatisticsLoading(false);
        }
    };

    useEffect(() => {
        getUserStatistics();
    }, []);

    return (
        <>
            <div className="flex flex-col sm:flex-row sm:space-x-8 sm:space-x-reverse">
                <div className="sm:basis-1/4 p-2">
                    <img src={profile} alt="profile" />
                </div>
                <div className="sm:basis-3/4">
                    <div className="font-h2">{user.full_name}</div>
                    {/* <div className="py-3">
                    <div className="font-w-bold">النقاط</div>
                    <FlexRowReverse className="font-smaller">
                        <div>0</div>
                        <div>نقاط</div>
                    </FlexRowReverse>
                    <div className="h-2 w-full max-w-md rounded-full bg-yellow-200 dark:bg-yellow-800 smooth">
                        <div
                            className="h-full rounded-full bg-yellow-500"
                            style={{ width: "3%" }}
                        ></div>
                    </div>
                </div> */}
                    <div className="h-1 w-full bg-outer-container rounded-full my-5 smooth mb-10"></div>
                    <div className="">
                        <FlexRowReverse>
                            <CenterIcon
                                icon={"ant-design:phone-twotone"}
                                className="text-cyan-500"
                            />
                            <span className="flex-center-both">
                                {(user.phone + "").padStart(11, "0")}
                            </span>
                        </FlexRowReverse>
                        <FlexRowReverse>
                            <CenterIcon
                                icon={"ic:sharp-alternate-email"}
                                className="text-yellow-400"
                            />
                            <span className="flex-center-both">{user.email}</span>
                        </FlexRowReverse>
                        {isAbleChangingPassword ? (
                            <FlexRowReverse>
                                <CenterIcon
                                    icon={"teenyicons:password-outline"}
                                    className="text-rose-400"
                                />
                                <Link to="change_password">
                                    <span className="flex-center-both">تغيير كلمة المرور</span>
                                </Link>
                            </FlexRowReverse>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
            {profileStatistics ? (
                !isProfileStatisticsLoading ? (
                    <div className="pt-10 flex-center-both flex-col space-y-8">
                        <div>
                            <div className="max-w-lg w-full mx-auto h-1 bg-cyan-500 bg-opacity-30 smooth mb-5 rounded-md"></div>
                            <div className="w-full flex-center-both space-x-2 space-x-reverse pb-10">
                                <CenterIcon
                                    icon={"arcticons:questionnaire-star"}
                                    className="font-big text-cyan-500"
                                />
                                <div className="font-w-bold font-h1">
                                    احصائيات <span className="text-rose-400">كورساتك</span>
                                </div>
                                <CenterIcon
                                    icon={"arcticons:questionnaire-star"}
                                    className="font-big text-cyan-500"
                                />
                            </div>
                            <div className="w-full flex items-center justify-evenly">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
                                    <ProgressCircle
                                        color="rose"
                                        unit="فيديو"
                                        title="عدد الفيديوهات شوفتها"
                                        value={statistics.viewed_videos_count}
                                        max={statistics.total_videos_count}
                                        textsIndex={3}
                                    />
                                    <ProgressCircle
                                        color="cyan"
                                        unit="امتحان"
                                        title="عدد الاختبارات اللي خلصتها"
                                        value={statistics.finished_exams_count}
                                        max={statistics.total_exams_count}
                                        textsIndex={2}
                                    />
                                    <ProgressCircle
                                        color="purple"
                                        unit={false}
                                        title="متوسط النتائج اللي جبتها"
                                        value={statistics.total_results}
                                        max={statistics.total_questions_quantity}
                                        textsIndex={1}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="max-w-lg w-full mx-auto h-1 bg-cyan-500 bg-opacity-30 smooth mb-5 rounded-md"></div>
                        <div className="w-full flex-center-both space-x-2 space-x-reverse pb-10">
                            <CenterIcon
                                icon={"arcticons:questionnaire-star"}
                                className="font-big text-cyan-500"
                            />
                            <div className="font-w-bold font-h1">
                                احصائياتك علي <span className="text-rose-400">المنصة</span>
                            </div>
                            <CenterIcon
                                icon={"arcticons:questionnaire-star"}
                                className="font-big text-cyan-500"
                            />
                        </div>
                        <div className="flex-center-both flex-col w-full">
                            {/* <InfoRow
                                color="emerald"
                                unit={
                                    statistics.total_video_view_duration / 60 > 1 ? "ساعة" : "دقيقة"
                                }
                                title="إجمالي مدة مشاهدة الفيديوهات علي الموقع"
                                value={
                                    statistics.total_video_view_duration / 60 > 1
                                        ? Math.ceil(statistics.total_video_view_duration / 60)
                                        : statistics.total_video_view_duration
                                }
                            /> */}
                            <InfoRow
                                color="rose"
                                unit={
                                    Math.ceil(statistics.total_video_open_duration / 60) / 60 > 1
                                        ? "ساعة"
                                        : "دقيقة"
                                }
                                title="إجمالي مدة فتح المحاضرات علي الموقع"
                                value={
                                    Math.ceil(statistics.total_video_open_duration / 60) / 60 > 1
                                        ? Math.ceil(
                                              Math.ceil(statistics.total_video_open_duration / 60) /
                                                  60
                                          )
                                        : Math.ceil(statistics.total_video_open_duration / 60)
                                }
                            />
                            <InfoRow
                                color="yellow"
                                title="إجمالي عدد مرات مشاهدة الفيديوهات علي الموقع"
                                unit="مرة"
                                isDouble={true}
                                value={statistics.total_video_view_count}
                            />

                            <InfoRow
                                color="cyan"
                                unit="مرة"
                                title="اجمالي عدد مرات فتح الاختبار"
                                value={statistics.total_exam_results_count}
                            />
                            <InfoRow
                                color="purple"
                                title="اجمالي عدد مرات إنهاء الاختبارات"
                                unit="مرة"
                                isDouble={true}
                                value={statistics.finished_exam_results_count}
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="p-10 rounded-md bg-outer-container smooth border border-secondary-container flex-center-both clr-text-primary space-x-2 space-x-reverse">
                            <div className="font-h2 text-blue-500">
                                <LoadingIcon />
                            </div>
                            <div>يتم الآن تحميل احصائيات المستخدم</div>
                        </div>
                    </div>
                )
            ) : (
                ""
            )}
        </>
    );
};

export default UserHome;

const InfoRow = ({
    title = "اجمالي عدد مران",
    value = 0,
    unit = "ساعة",
    color = "blue",
    isDouble = false,
    className,
}) => {
    className += ` bg-blue-500`;
    if (color === "rose") {
        className += ` bg-rose-500`;
    } else if (color === "emerald") {
        className += ` bg-emerald-500`;
    } else if (color === "purple") {
        className += ` bg-purple-500`;
    } else if (color === "teal") {
        className += ` bg-teal-500`;
    } else if (color === "yellow") {
        className += ` bg-yellow-500`;
    } else if (color === "cyan") {
        className += ` bg-cyan-500`;
    } else if (color === "slate") {
        className += ` bg-slate-500`;
    }
    return (
        <div className="flex-center-both flex-col w-full">
            <div className="flex space-x-2 space-x-reverse items-center justify-between max-w-xl w-full">
                <div>{title}</div>
                <div className={`rounded-full p-1 ${className}`}>
                    <span className="bg-inner-container clr-text-primary smooth rounded-full py-1 px-2 font-w-bold flex text-center">
                        {printUnit(value, unit)}
                    </span>
                </div>
            </div>
            {isDouble ? (
                <>
                    <div className="flex-center-both px-2 w-full pt-5">
                        <div className="max-w-md w-full bg-outer-container smooth h-1 rounded-full"></div>
                    </div>
                    <div className="flex-center-both px-2 pb-5 pt-2 w-full">
                        <div className="max-w-md w-full bg-outer-container smooth h-1 rounded-full"></div>
                    </div>
                </>
            ) : (
                <div className="flex-center-both px-2 py-5 w-full">
                    <div className="max-w-md w-full bg-outer-container smooth h-1 rounded-full"></div>
                </div>
            )}
        </div>
    );
};
