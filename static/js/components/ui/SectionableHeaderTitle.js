import React, { useContext } from "react";
import CourseContext from "../../context/CourseContext";
import { Icons } from "../../services/contentServices";
import CenterIcon from "../../components/ui/CenterIcon";
import { headerSectionColor } from "../../services/defaultSettings";

const SectionableHeaderTitle = ({ sectionable_id }) => {
    const { sections } = useContext(CourseContext);

    let sectionable;
    sections.forEach((section) => {
        section.sectionables.forEach((element) => {
            if (element.id == parseFloat(sectionable_id)) {
                sectionable = element;
            }
        });
    });
    if (!sectionable) {
        return "";
    }
    let className = "";
    const type =
        sectionable.sectionable_type === "exam"
            ? sectionable.sectionable.type
            : sectionable.sectionable_type;
    switch (type) {
        case "video":
            className = "border-yellow-500 bg-yellow-500";
            break;
        case "hm":
            className = "border-teal-500 bg-teal-500";
            break;
        case "exam":
            className = "border-rose-500 bg-rose-500";
            break;
        default:
            className = "border-blue-500 bg-blue-500";
            break;
    }

    return (
        <>
            {sectionable ? (
                <div className="flex-center-both py-5">
                    <div
                        className={`font-w-bold rounded-full border-2 clr-white overflow-hidden ${className}`}
                    >
                        <div className={`relative`}>
                            <div className="flex-center-both">
                                <div className="flex-center-both">
                                    <div className="rounded-full bg-primary-container flex-center-both smooth shadow-lg">
                                        <div className="font-h1 p-3">{Icons[type]}</div>
                                    </div>
                                    <div className="flex-center-both flex-col h-full px-5">
                                        <div className="font-h3">
                                            {sectionable.sectionable.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {sectionable.sectionable_type === "exam" ? (
                                <div
                                    className={`w-full absolute bottom-0 inset-x-0 overflow-hidden smooth shadow-medium rounded-l-full  opacity-60 ${"h-1"}`}
                                >
                                    <div className="absolute bg-secondary-container smooth inset-0 h-full w-full"></div>
                                    <div
                                        className="absolute bg-blue-500 opacity-30 smooth h-full top-0 right-0 rounded-l-full flex-center-both font-smaller clr-white"
                                        style={{
                                            width: `${sectionable.sectionable.exam_results_max_result_percentage}%`,
                                        }}
                                    ></div>
                                    <div
                                        className="absolute bg-rose-500 smooth h-full top-0 right-0 rounded-l-full flex-center-both font-smaller clr-white"
                                        style={{
                                            width: `${sectionable.sectionable.exam_results_medium_percentage}%`,
                                        }}
                                    ></div>
                                    <div
                                        className="absolute bg-yellow-500 opacity-90 smooth h-full top-0 right-0 rounded-l-full flex-center-both font-smaller clr-white"
                                        style={{
                                            width: `${
                                                sectionable.sectionable
                                                    .exam_results_min_result_percentage < 10
                                                    ? 10
                                                    : sectionable.sectionable
                                                          .exam_results_min_result_percentage
                                            }%`,
                                        }}
                                    ></div>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default SectionableHeaderTitle;
