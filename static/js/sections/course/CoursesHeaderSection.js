import React, { useContext } from "react";

import CourseContext from "../../context/CourseContext";

import CourseItemsCounter from "../../components/items/CourseItemsCounter";
import FlexRowReverse from "../../components/ui/FlexRowReverse";
import CenterIcon from "../../components/ui/CenterIcon";
import { printFullDate } from "../../utils/time";

import HeaderSection from "../../components/ui/HeaderSection";

import { description as formatDescription } from "../../utils/ar";
import { headerSectionColor } from "../../services/defaultSettings";

const CoursesHeaderSection = () => {
    const { course } = useContext(CourseContext);
    return (
        <HeaderSection>
            <div className="relative z-10 space-y-6">
                <div className="flex flex-wrap">
                    <CourseItemsCounter
                        text="فيديوهات"
                        number={course.videos_count}
                        icon="bxs:videos"
                    />
                    <CourseItemsCounter
                        text="امتحانات"
                        number={course.exams_count}
                        icon="healthicons:i-exam-qualification"
                        className={`${
                            headerSectionColor === "rose"
                                ? "bg-yellow-300 text-slate-900"
                                : "bg-rose-500 text-slate-100"
                        }`}
                        iconClassName="text-yellow-400"
                    />
                    <CourseItemsCounter
                        text="واجبات"
                        number={course.hms_count}
                        icon="healthicons:i-exam-multiple-choice"
                        className={`${
                            headerSectionColor === "blue"
                                ? "bg-yellow-300 text-slate-900"
                                : "bg-blue-500 text-slate-100"
                        }`}
                        iconClassName="text-yellow-400"
                    />
                    <CourseItemsCounter
                        text="ملفات"
                        number={course.books_count}
                        icon="ant-design:book-twotone"
                    />
                    {/* <CourseItemsCounter
                        text="كويزات الفيديو"
                        number={course.video_quizes_count}
                        icon="ic:twotone-video-camera-back"
                        className={`${
                            headerSectionColor === "rose"
                                ? "bg-yellow-300 text-slate-900"
                                : "bg-rose-500 text-slate-100"
                        } `}
                        iconClassName="text-yellow-400"
                    /> */}
                </div>
                <div className="font-h1 font-w-bold">{course.name}</div>
                <div className="">{formatDescription(course.description)}</div>
                <div
                    className={`flex flex-col sm:flex-row font-smaller ${
                        headerSectionColor === "yellow" ? "text-slate-900" : "text-slate-100"
                    } sm:space-y-0 space-y-4 sm:space-x-8 sm:space-x-reverse`}
                >
                    <FlexRowReverse>
                        <CenterIcon
                            className={`${
                                headerSectionColor === "blue" || headerSectionColor === "emerald"
                                    ? "text-yellow-400"
                                    : "text-blue-400"
                            } `}
                            nY=""
                            icon="ic:twotone-create-new-folder"
                        />
                        <span className="font-w-bold underline">
                            <span>تاريخ انشاء الكورس</span>{" "}
                        </span>
                        <span
                            className={`${
                                headerSectionColor === "blue" || headerSectionColor === "emerald"
                                    ? "bg-yellow-400"
                                    : "bg-blue-400"
                            } px-3 rounded-full opacity-90 text-slate-800`}
                        >
                            {Object.keys(course).length ? printFullDate(course.created_at) : "..."}
                        </span>
                    </FlexRowReverse>
                    <FlexRowReverse>
                        <CenterIcon
                            className={`${
                                headerSectionColor === "rose" ? "text-yellow-400" : "text-rose-400"
                            } `}
                            nY=""
                            icon="icon-park-twotone:update-rotation"
                        />
                        <span className="font-w-bold underline">آخر تحديث للكورس</span>
                        <span
                            className={`${
                                headerSectionColor === "rose" ? "bg-yellow-400" : "bg-rose-400"
                            } px-3 rounded-full opacity-90 text-slate-800`}
                        >
                            {Object.keys(course).length ? printFullDate(course.updated_at) : "..."}
                        </span>
                    </FlexRowReverse>
                </div>
            </div>
        </HeaderSection>
    );
};

export default CoursesHeaderSection;
