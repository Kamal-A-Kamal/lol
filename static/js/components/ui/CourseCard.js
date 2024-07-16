import { Icon } from "@iconify/react";
import React, { useState } from "react";

import { baseURL } from "../../config";
import { printFullDate } from "../../utils/time";
import { Link } from "react-router-dom";
// import Button from "./Button";
import { description as formatDescription } from "../../utils/ar";
import Button from "./Button";
import LoadingIcon from "./LoadingIcon";
import { getYearPlaceHolder } from "../../services/yearSevices";

const CourseCard = ({
    name = "الكورس الاول - تيست",
    description = "جميع محتويات الكورس الاول",
    price = "30",
    isNew = false,
    picture,
    isStaticPicture = false,
    updated_at,
    created_at,
    subscriptions_count = 0,
    isYear = false,
    id,
    isPrepaid = false,
    onPrepaidClick = null,
    teacher = null,
    subject = null,
    ...props
}) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <div className="group">
            {teacher ? (
                <div className="z-10 relative px-5 flex-center-both translate-y-1/3">
                    <div className="w-ful px-5 bg-primary-container smooth clr-text-primary rounded-md py-2 shadow-md border border-cyan-500 text-center">
                        <div className="font-w-bold">{teacher.name}</div>
                    </div>
                </div>
            ) : (
                ""
            )}
            <div className="rounded-md overflow-hidden w-full">
                <img
                    src={isStaticPicture ? isStaticPicture : `${baseURL}/${picture}`}
                    alt="course"
                    onLoad={() => {
                        setIsLoading(false);
                    }}
                    className={` ${
                        isLoading ? "hidden " : undefined
                    }w-full transform text-center group-hover:scale-110 group-hover:brightness-110 group-hover:saturate-150 smooth`}
                />
                {isLoading ? (
                    <div className="h-72 bg-slate-300 dark:bg-slate-50/10 flex-center-both font-h1 font-w-bold">
                        <div className="flex flex-row space-x-3 space-x-reverse">
                            <LoadingIcon className={"font-big text-blue-500"} />
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="px-5 -mt-10 relative z-10">
                {isYear && (
                    <Link to={`/years/${isYear}`}>
                        <div
                            className={`rounded-md w-full bg-third-container clr-text-primary px-4 py-6 shadow-large--oblique hover-shadow-larg group-hover:shadow-large smooth ${
                                subscriptions_count < 1
                                    ? "border border-slate-300 dark:border-slate-800"
                                    : "border-2 border-cyan-500"
                            }`}
                        >
                            <div className="flex flex-col space-y-6">
                                <div className="flex flex-row flex-center-y justify-between space-x-4 space-x-reverse">
                                    <div className="flex flex-col space-y-4 w-full">
                                        <div className="font-w-bold font-h3 pr-3">{name}</div>
                                        <div
                                            className={`divider-2 rounded-lg smooth ${
                                                subscriptions_count < 1
                                                    ? "bg-teal-400 dark:bg-teal-600"
                                                    : "bg-cyan-500"
                                            }`}
                                        ></div>
                                        <div className="clr-text-secondary">
                                            {formatDescription(description)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                )}
                {!isYear && (
                    <div
                        className={`rounded-md w-full bg-third-container clr-text-primary px-4 py-6 shadow-large--oblique hover-shadow-larg group-hover:shadow-large smooth ${
                            subscriptions_count < 1
                                ? "border border-slate-300 dark:border-slate-800"
                                : "border-2 border-cyan-500"
                        }`}
                    >
                        <div className="flex flex-col space-y-6">
                            {subject ? (
                                <div className="flex-center-both">
                                    <div className="font-w-bold rounded-md bg-yellow-500 bg-opacity-50 px-4 py-1">
                                        {subject.name} -{" "}
                                        <span className="underline">
                                            {getYearPlaceHolder(subject.year)}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                            <div className="flex flex-center-y justify-between flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
                                <div className="flex flex-col space-y-4 w-full">
                                    <div className="font-w-bold font-h3 pr-3">{name}</div>
                                    <div
                                        className={`divider-2 rounded-lg smooth ${
                                            subscriptions_count < 1
                                                ? "bg-teal-400 dark:bg-teal-600"
                                                : "bg-cyan-500"
                                        }`}
                                    ></div>
                                    <div className="clr-text-secondary">
                                        {formatDescription(description)}
                                    </div>
                                </div>
                                <div className="font-smaller shrink-0 flex flex-col space-y-3">
                                    {subscriptions_count < 1 ? (
                                        <>
                                            {isPrepaid ? (
                                                // <Button className="bg-gradient-to-r from-teal-500 to-sky-500 clr-white rounded-full px-3 py-1 flex-center-both">
                                                //     اشترك الآن !
                                                // </Button>
                                                <Link
                                                    to={`/course/${id}`}
                                                    className="border-2 border-teal-500 rounded-full px-3 py-1 hover:bg-teal-500 hover:text-white  smooth clr-text-primary"
                                                >
                                                    الاضطلاع علي المحاضرة
                                                </Link>
                                            ) : (
                                                <>
                                                    <Link
                                                        to={`/course/${id}`}
                                                        className="border-2 border-teal-500 rounded-full px-3 py-1 hover:bg-teal-500 hover:text-white  smooth clr-text-primary"
                                                    >
                                                        الدخول للكورس
                                                    </Link>{" "}
                                                    {price == 0 ? (
                                                        <div className="bg-gradient-to-r from-rose-500 to-purple-500 clr-white rounded-full px-3 py-1 flex-center-both">
                                                            كورس مجاني !
                                                        </div>
                                                    ) : (
                                                        <Link
                                                            to={`/course/${id}/subscribe/previous_invoices/`}
                                                            className="bg-gradient-to-r from-teal-500 to-sky-500 clr-white rounded-full px-3 py-1 flex-center-both"
                                                        >
                                                            اشترك الآن !
                                                        </Link>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <div className="bg-cyan-500 bg-opacity-10 border-cyan-500 border rounded-md py-4 px-3 font-w-bold text-cyan-500 text-center">
                                            انت {/* <br /> */}
                                            مشترك
                                            <br />
                                            {/* <br /> */} في هذا الكورس
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex-col flex space-y-3">
                                <div className="px-10">
                                    <div className="divider-1 bg-secondary-container smooth"></div>
                                </div>
                                <div className="w-full opacity- font-w-bold font-smaller flex flex-col-reverse sm:flex-row space-y-4 space-y-reverse sm:space-y-0 sm:space-x-reverse sm:space-x-4 justify-between flex-center-y">
                                    {subscriptions_count < 1 ? (
                                        <>
                                            {isPrepaid ? (
                                                <Button onClick={() => onPrepaidClick(id, name)}>
                                                    اشترك في هذه المحاضرة !
                                                </Button>
                                            ) : price == 0 ? (
                                                <div>
                                                    <div className="bg-gradient-to-r from-rose-500 to-purple-500 text-slate-100 rounded-lg py-1 px-3 space-x-2 space-x-reverse">
                                                        كورس مجاني !
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="bg-teal-500 text-slate-100 rounded-lg py-1 px-3 space-x-2 space-x-reverse">
                                                        <span className="bg-primary-container clr-text-primary smooth px-2 py-px rounded-md ">
                                                            {price}
                                                        </span>
                                                        <span>جنيهًا</span>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            to={`/course/${id}`}
                                            className="border-2 border-cyan-500 rounded-full px-3 py-1 bg-cyan-500 hover:bg-opacity-0 text-white  smooth hover:clr-text-primary"
                                        >
                                            الدخول للكورس
                                        </Link>
                                    )}
                                    <div className="flex sm:justify-end sm:items-start flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-1 items-center sm:space-x-reverse clr-text-secondary flex-wrap">
                                        <div className="flex flex-col space-y-2 shrink-0">
                                            <div className="flex justify-between space-x-1 space-x-reverse">
                                                <span className="flex-center-both">
                                                    {printFullDate(updated_at)}
                                                </span>
                                                <span className="font-normal flex-center-both transform -translate-y-px">
                                                    <Icon icon="icon-park-twotone:update-rotation" />
                                                </span>
                                            </div>
                                            <div className="flex  justify-between space-x-1 space-x-reverse">
                                                <span className="flex-center-both">
                                                    {printFullDate(created_at)}
                                                </span>
                                                <span className="font-normal flex-center-both transform -translate-y-px">
                                                    <Icon icon="ic:twotone-create-new-folder" />
                                                </span>
                                            </div>
                                        </div>
                                        {isNew && !subscriptions_count && (
                                            <span className="bg-yellow-600 rounded-lg px-2 pb-px clr-white shrink-0 mb-2">
                                                جديد !
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseCard;
