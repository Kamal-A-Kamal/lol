import React, { useContext } from "react";

import CourseContext from "../../context/CourseContext";

import { baseURL } from "../../config";

import SideTitle from "../../components/ui/SideTitle";
// import SideIcon from "../../components/ui/SideIcon";
// import FlexRowReverse from "../../components/ui/FlexRowReverse";
// import CenterIcon from "../../components/ui/CenterIcon";

import { isObjectEmpty } from "../../utils/objects";

import { description } from "../../utils/ar";

import GenerateVideo from "../../components/ui/GenerateVideo";

const CourseDescSection = () => {
    const { course } = useContext(CourseContext);
    <div className="font-h1">dasds</div>;
    return (
        <>
            {!isObjectEmpty(course) && (
                <div className="space-y-5">
                    <div className="rounded-2xl shadow-large overflow-hidden">
                        {!course.first_free_video ? (
                            <img src={`${baseURL}/${course.picture}`} alt="course" />
                        ) : (
                            <GenerateVideo video={course.first_free_video} />
                        )}
                    </div>
                    <div className="">
                        <div className="py-16 px-10 rounded-md shadow-small border border-secondary-container smooth clr-text-primary bg-inner-container space-y-12">
                            <div className="space-y-8">
                                <SideTitle className={"font-h1"} first={course.name} />
                                <div className="clr-text-secondary">
                                    {description(course.description)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CourseDescSection;
