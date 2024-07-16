import React, { Fragment, useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react";

import CourseContext from "../../context/CourseContext";

import http from "../../services/httpServices";

import LoadingIcon from "../../components/ui/LoadingIcon";

import { isObjectEmpty } from "../../utils/objects";
import SideTitle from "../../components/ui/SideTitle";
import SectionListItem from "../../components/ui/SectionListItem";
import auth from "../../services/authServices";

const ContentSection = () => {
    // const [sections, setSections] = useState([]);
    const [placeholder, setPlaceholder] = useState(
        <div className="font-h2 col-span-1 md:col-span-2 lg:col-span-3 font-alm">
            <span className="flex-center-both space-x-3 space-x-reverse">
                <LoadingIcon className={"font-h1 text-yellow-600"} />
                <span>يتم الآن تحميل المراحل</span>
            </span>
        </div>
    );

    const { course, sections, setSections } = useContext(CourseContext);

    const getSections = async () => {
        const token = auth.getToken();
        const config = auth.getAuthConfig(token);
        const { data } = await http.get(`/api/sellables/course/${course.id}/content`, config);
        setSections(data);
        setPlaceholder(
            <div className="font-h2 col-span-1 md:col-span-2 lg:col-span-3 font-alm">
                <span className="flex-center-both space-x-3 space-x-reverse">
                    <span className="font-h1 flex-center-both text-rose-500">
                        <Icon icon="carbon:data-error" />
                    </span>
                    <span className="text-slate-200">سيتم اضافة المحتوى قريبًا</span>
                </span>
            </div>
        );
    };
    useEffect(() => {
        !isObjectEmpty(course) && getSections();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [course]);

    return (
        <div className="rounded-2xl shadow-large w-full relative overflow-hidden bg-third-container smooth clr-text-primary">
            <div className="py-10 px-5 sm:px-10">
                <div className="smooth font-w-bold font-h1 space-y-6">
                    <SideTitle first={"محتوى"} last={"الكورس"} className="py-5" />

                    {sections.length < 1 && placeholder}

                    {sections.length > 0 && (
                        <>
                            {sections.map((section, sectionIndex) => {
                                return (
                                    <SectionListItem
                                        course={course}
                                        section={section}
                                        key={sectionIndex}
                                    />
                                );
                            })}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContentSection;
