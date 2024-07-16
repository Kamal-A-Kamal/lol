import React, { useContext } from "react";
import TeacherContext from "../../context/TeacherContext";
import HeaderSection from "../../components/ui/HeaderSection";
import CourseItemsCounter from "../../components/items/CourseItemsCounter";
import { headerSectionColor } from "../../services/defaultSettings";
import { getYearPlaceHolder } from "../../services/yearSevices";

const TeacherHeaderSection = () => {
    const { teacher } = useContext(TeacherContext);

    return (
        <HeaderSection>
            <div className="relative z-10 space-y-6">
                {/* <div className="flex-center-both text-slate-100 font-h2 font-w-bold underline">
                    صفحة المدرس
                </div> */}
                <div className="flex flex-wrap">
                    <CourseItemsCounter
                        text="المواد"
                        number={teacher.subjects_count}
                        icon="mdi:teacher"
                    />
                    <CourseItemsCounter
                        text="الكورسات"
                        number={teacher.courses_count}
                        icon="carbon:course"
                        className={`${
                            headerSectionColor === "rose"
                                ? "bg-yellow-300 text-slate-900"
                                : "bg-rose-500 text-slate-100"
                        }`}
                        iconClassName="text-yellow-400"
                    />
                </div>
                <div className="space-y-2">
                    <div className="font-h1 font-w-bold">{teacher.name}</div>
                </div>
                <div className="space-y-2">
                    <div className="font-h2 text-slate-200">{teacher.description}</div>
                </div>
                <div className="flex">
                    <div className="space-y-2">
                        {teacher.subjects &&
                            teacher.subjects.map((subject) => (
                                <div
                                    className={`rounded-full border-2 bg-sky-500 border-sky-600 px-5 pb-3 pt-2 smooth bg-opacity-100 w-full font-h3 font-w-bold`}
                                >
                                    <div className="">
                                        {subject.name} - {getYearPlaceHolder(subject.year)}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </HeaderSection>
    );
};

export default TeacherHeaderSection;
