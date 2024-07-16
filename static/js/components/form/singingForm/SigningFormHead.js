import React from "react";
import FlexRowReverse from "../../ui/FlexRowReverse";

const SigningFormHead = ({ title = "", icon, color, toSpin = false }) => {
    title = title.split(" ");
    let first = title[0];
    title.shift();
    let rest = title.join(" ");

    let className = " text-teal-600 dark:text-teal-400";
    if (color === "cyan") {
        className = `text-cyan-600 dark:text-cyan-400`;
    } else if (color === "rose") {
        className = `text-rose-600 dark:text-rose-500`;
    } else if (color === "yellow") {
        className = `text-yellow-700 dark:text-yellow-400`;
    } else if (color === "purple") {
        className = `text-purple-700 dark:text-purple-400`;
    } else if (color === "blue") {
        className = `text-blue-700 dark:text-blue-400`;
    } else if (color === "sky") {
        className = `text-sky-700 dark:text-sky-400`;
    } else if (color === "stone") {
        className = `text-stone-700 dark:text-stone-400`;
    }

    return (
        <>
            <FlexRowReverse>
                <span className="">{first}</span>
                <span className={className}>{rest}</span>
            </FlexRowReverse>
            <span className="absolute inset-y-0 -right-2 w-8 flex-center-both transform translate-x-full">
                <span className={`flex-center-both w-8 ${toSpin && "tospin"}`}>
                    <img src={icon} alt="icon" />
                </span>
            </span>
        </>
    );
};

export default SigningFormHead;
