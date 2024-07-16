import React, { useState } from "react";
import { Link } from "react-router-dom";
import { baseURL } from "../../config";
import { description as formatDescription, printUnit } from "../../utils/ar";
import { printFullDate } from "../../utils/time";
import { Icon } from "@iconify/react";
import { getYearPlaceHolder } from "../../services/yearSevices";
import { isSubscribeBySubjectTeacher } from "../../services/defaultSettings";
const TeacherCard = ({
    name = "الكورس الاول - تيست",
    price = "30",
    isNew = false,
    id,
    isSubjectSubscribable = false,
    picture = "",
    description,
    updated_at,
    created_at,
    subjects,
    courses_count,
    subjects_count,
    ...props
}) => {
    const [subscribedToOne, setSubscribedToOne] = useState(false);
    return (
        <div className="group">
            <div className="z-10 relative px-5 flex-center-both translate-y-1/3">
                <div className="w-ful px-5 bg-primary-container smooth clr-text-primary rounded-md py-2 shadow-md border border-cyan-500 text-center">
                    <div className="font-w-bold">{name}</div>
                </div>
            </div>
            <div className="rounded-md overflow-hidden w-full relative">
                <img
                    src={`${baseURL}/${picture}`}
                    alt="course"
                    className="w-full transform group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-150 smooth"
                />
            </div>
            <div className="px-5 -mt-10 relative z-10">
                {
                    <Link to={`/teacher/${id}`}>
                        <div
                            className={`rounded-md w-full bg-third-container clr-text-primary px-4 py-6 shadow-large--oblique hover-shadow-larg group-hover:shadow-large smooth ${
                                !subscribedToOne
                                    ? "border border-slate-300 dark:border-slate-800"
                                    : "border-2 border-cyan-500"
                            }`}
                        >
                            <div className="flex flex-col space-y-6">
                                <div className="flex flex-center-y justify-between flex-col space-y-3">
                                    <div className="flex flex-col space-y-4 w-full">
                                        <div className="clr-text-secondary">
                                            {formatDescription(description)}
                                        </div>
                                    </div>
                                    <div
                                        className={`divider-2 rounded-lg smooth ${
                                            !subscribedToOne
                                                ? "bg-yellow-400 dark:bg-yellow-600"
                                                : "bg-cyan-500"
                                        }`}
                                    ></div>
                                    <div className="font-smaller flex flex-col space-y-3">
                                        <Link
                                            to={`/teacher/${id}`}
                                            className={`border rounded-full py-2 px-3 font-w-bold  text-center ${
                                                !subscribedToOne
                                                    ? "border-yellow-500 hover:bg-yellow-500 hover:text-white smooth clr-text-primary"
                                                    : "border-2 bg-cyan-500 bg-opacity-10 border-cyan-500 text-cyan-600 hover:text-cyan-900 dark:hover:text-white hover:bg-opacity-50 smooth"
                                            }`}
                                        >
                                            تفاصيل المدرس ..
                                        </Link>
                                    </div>
                                    <div
                                        className={`divider-2 rounded-lg smooth ${
                                            !subscribedToOne
                                                ? "bg-yellow-400 dark:bg-yellow-600"
                                                : "bg-cyan-500"
                                        }`}
                                    ></div>
                                    {(courses_count && courses_count !== 0) || true ? (
                                        <>
                                            <div className="flex justify-between pt-2 font-small w-full">
                                                <div className="space-y-2">
                                                    <div className="text-center font-smaller">
                                                        - عدد المواد -
                                                    </div>
                                                    <div
                                                        className={`rounded-full ${
                                                            subscribedToOne
                                                                ? " bg-cyan-500 dark:bg-cyan-700 border-cyan-600"
                                                                : "bg-yellow-500 dark:bg-yellow-700 border-yellow-600"
                                                        } font-w-bold px-2 pb-0.5 smooth border-2 clr-text-primary text-center`}
                                                    >
                                                        {printUnit(subjects_count, "مادة")}
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="text-center font-smaller">
                                                        - عدد الكورسات -
                                                    </div>
                                                    <div
                                                        className={`rounded-full ${
                                                            subscribedToOne
                                                                ? " bg-cyan-500 dark:bg-cyan-700 border-cyan-600"
                                                                : "bg-yellow-500 dark:bg-yellow-700 border-yellow-600"
                                                        } font-w-bold px-2 pb-0.5 smooth border-2 clr-text-primary text-center`}
                                                    >
                                                        {printUnit(courses_count, "كورس")}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="flex-col flex space-y-3">
                                    <div className="px-10">
                                        <div className="divider-1 bg-secondary-container smooth"></div>
                                    </div>
                                    <div className="w-full flex flex-col space-y-4  flex-center-both px-2">
                                        {subjects.map((subject, index) => (
                                            <React.Fragment key={index}>
                                                {/* <*/}
                                                {isSubscribeBySubjectTeacher &&
                                                subject.subscriptions_count > 0 &&
                                                !subscribedToOne
                                                    ? setSubscribedToOne(true)
                                                    : ""}
                                                <div
                                                    className={`font-smaller clr-text-primary rounded-md border-2 px-2 py-1 smooth bg-opacity-100 w-full ${
                                                        subject.subscriptions_count > 0
                                                            ? "bg-cyan-400 border-cyan-500 dark:bg-cyan-900 dark:border-cyan-700"
                                                            : "bg-yellow-400 border-yellow-500 dark:bg-yellow-900 dark:border-yellow-700"
                                                    }`}
                                                >
                                                    <div className="font-w-bold text-center">
                                                        {subject.name} - '
                                                        <span className="underline">
                                                            {getYearPlaceHolder(subject.year)}
                                                        </span>
                                                        '
                                                    </div>
                                                    {isSubscribeBySubjectTeacher ? (
                                                        <>
                                                            <div
                                                                className={`divider-2 rounded-lg smooth my-2 ${
                                                                    subject.subscriptions_count > 0
                                                                        ? "bg-cyan-500 dark:bg-cyan-800"
                                                                        : "bg-yellow-500 dark:bg-yellow-800"
                                                                }`}
                                                            ></div>
                                                            <div className="text-center font-w-bold">
                                                                الاشتراك الشهري :{" "}
                                                            </div>
                                                            {subject.subscriptions_count < 1 ? (
                                                                <div className="flex-center-both">
                                                                    <Link
                                                                        to={`/subject_teacher/teacher/${id}/subject/${subject.id}`}
                                                                    >
                                                                        <div className="rounded-full bg-yellow-500 dark:bg-yellow-800 hover-shadow hover:bg-yellow-500 dark:hover:bg-yellow-600 hover:border-yellow-700 dark:hover:border-yellow-500 border-2 border-yellow-200 font-w-bold px-2 pb-0.5 smooth clr-text-primary">
                                                                            {/* bg-opacity-100 dark:bg-opacity-100  hover:bg-opacity-0 */}
                                                                            تفاصيل...
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                            {/* <div className=" divider-2 rounded-lg smooth bg-yellow-500 dark:bg-yellow-800 my-2"></div> */}
                                                            <div className="flex justify-between pt-2">
                                                                {subject.subscriptions_count > 0 ? (
                                                                    <>
                                                                        <Link
                                                                            to={`/subject_teacher/teacher/${id}/subject/${subject.id}`}
                                                                        >
                                                                            <div className="rounded-full bg-yellow-200 dark:bg-yellow-800 hover-shadow hover:bg-yellow-500 dark:hover:bg-yellow-600 hover:border-yellow-700 dark:hover:border-yellow-500 border-2 border-yellow-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary">
                                                                                {/* bg-opacity-100 dark:bg-opacity-100  hover:bg-opacity-0 */}
                                                                                الدخول ..
                                                                            </div>
                                                                        </Link>
                                                                        <div className="rounded-full bg-cyan-500 dark:bg-cyan-700 border-2 border-cyan-600 font-w-bold px-2 pb-0.5 smooth clr-text-primary">
                                                                            انت مشترك !
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div className="rounded-full bg-cyan-500 dark:bg-cyan-700 border-2 border-cyan-600 font-w-bold px-2 pb-0.5 smooth clr-text-primary">
                                                                            {printUnit(
                                                                                subject.pivot.price,
                                                                                "جنيه"
                                                                            )}
                                                                        </div>
                                                                        <Link
                                                                            to={`/subject_teacher/teacher/${id}/subject/${subject.id}/subscribe`}
                                                                        >
                                                                            <div className="rounded-full bg-yellow-200 dark:bg-yellow-800 hover-shadow hover:bg-yellow-500 dark:hover:bg-yellow-600 hover:border-yellow-700 dark:hover:border-yellow-500 border-2 border-yellow-500 font-w-bold px-2 pb-0.5 smooth clr-text-primary">
                                                                                {/* bg-opacity-100 dark:bg-opacity-100  hover:bg-opacity-0 */}
                                                                                اشترك ..
                                                                            </div>
                                                                        </Link>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                {/* </Link> */}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                }
            </div>
        </div>
    );
};

export default TeacherCard;
