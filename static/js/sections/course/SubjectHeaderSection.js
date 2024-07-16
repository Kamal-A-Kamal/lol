import React, { useContext } from "react";
import HeaderSection from "../../components/ui/HeaderSection";
import SubjectContext from "../../context/SubjectContext";
import CourseItemsCounter from "../../components/items/CourseItemsCounter";
import { headerSectionColor } from "../../services/defaultSettings";
import FlexRowReverse from "../../components/ui/FlexRowReverse";
import CenterIcon from "../../components/ui/CenterIcon";
import { getYearPlaceHolder } from "../../services/yearSevices";

const SubjectHeaderSection = () => {
    const { subject } = useContext(SubjectContext);

    return (
        <HeaderSection>
            <div className="relative z-10 space-y-6">
                <div className="flex flex-wrap">
                    <CourseItemsCounter
                        text="المدرسين"
                        number={subject.teachers_count}
                        icon="mdi:teacher"
                    />
                    <CourseItemsCounter
                        text="الكورسات"
                        number={subject.courses_count}
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
                    <div className="font-">{getYearPlaceHolder(subject.year)}</div>
                    <div className="font-h1 font-w-bold">{subject.name}</div>
                </div>
                <div className="flex">
                    <div className="space-y-2">
                        {subject.teachers &&
                            subject.teachers.map((teacher, index) => (
                                <div
                                    key={index}
                                    className={`rounded-full border-2 bg-sky-500 border-sky-600 px-5 pb-3 pt-2 smooth bg-opacity-100 w-full font-h3 font-w-bold`}
                                >
                                    <div className="">{teacher.name}</div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </HeaderSection>
    );
};

export default SubjectHeaderSection;
