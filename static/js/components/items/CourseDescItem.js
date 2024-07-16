import React from "react";
import FlexRowReverse from "../ui/FlexRowReverse";
import CenterIcon from "../ui/CenterIcon";

const CourseDescItem = ({ title, icon, value, valueName, isLast = false }) => {
    return (
        <div className="py-3 flex justify-between px-2 relative">
            <FlexRowReverse>
                <CenterIcon className="text-blue-900 dark:text-blue-400 smooth" icon={icon} />
                <span>{title}</span>
            </FlexRowReverse>
            <FlexRowReverse className="clr-text-secondary smooth">
                <span>{value}</span>
                <span>{valueName}</span>
            </FlexRowReverse>
            {!isLast && (
                <div className="absolute w-full h-0.5 bg-secondary-container smooth top-full right-0 trasnform scale-x-90"></div>
            )}
        </div>
    );
};

export default CourseDescItem;
