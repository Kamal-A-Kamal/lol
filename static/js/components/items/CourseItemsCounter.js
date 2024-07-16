import React from "react";
import CenterIcon from "../ui/CenterIcon";
import FlexRowReverse from "../ui/FlexRowReverse";

const CourseItemsCounter = ({
    className = "",
    counterClassName = "",
    iconClassName = "",
    icon,
    number,
    text,
    isIncreasing = true,
}) => {
    if (!className.includes("bg")) {
        className += ` bg-cyan-400`;
    }
    if (!className.includes("text")) {
        className += ` text-slate-900`;
    }
    if (!counterClassName.includes("bg")) {
        counterClassName += ` bg-blue-900`;
    }
    if (!iconClassName.includes("text")) {
        iconClassName += ` text-yellow-300`;
    }
    if (!className.includes("ml-")) {
        className += ` ml-4 my-2`;
    }
    return (
        <div
            className={`rounded-full font-small shadow-md flex overflow-hidden space-x-2 space-x-reverse shrink-0 ${className}`}
        >
            <FlexRowReverse
                className={`px-4 py-px flex-center-both rounded-full ${counterClassName}`}
            >
                {isIncreasing && (
                    <span className="flex-center-both clr-white transform -translate-y-0.5 font-h3">
                        +
                    </span>
                )}
                <span className="font-h3 font-w-bold clr-white">{number}</span>
                <CenterIcon icon={icon} className={`${iconClassName}`} nY="" />
            </FlexRowReverse>
            <FlexRowReverse className="pl-4 py-px flex-center-both">
                <span>{text}</span>
            </FlexRowReverse>
        </div>
    );
};

export default CourseItemsCounter;
