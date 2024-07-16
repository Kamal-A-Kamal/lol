import React from "react";

const SideTitle = ({ first, last, className = "" }) => {
    if (!className.includes("font-")) {
        className += ` font-big`;
    }
    return (
        <div className={`font-w-bold clr-text-primary ${className}`}>
            <div className="relative group">
                <span className="">
                    <span className="clr-text-primary smooth group-hover:text-yellow-500  dark:group-hover:text-yellow-600 ">
                        {first}{" "}
                    </span>
                    <span className="text-yellow-500 dark:text-yellow-600 group-hover:text-black dark:group-hover:text-white smooth">
                        {last}{" "}
                    </span>
                </span>
                <span className="absolute w-28 h-1 bg-secondary-container rounded-md right-0 group-hover:right-1/4 top-full smooth"></span>
                <span className="absolute w-14 h-1 bg-secondary-container rounded-md right-0 top-full group-hover:right-1/3 transform translate-y-2 smooth"></span>
                <span className="absolute w-14 h-1 bg-secondary-container rounded-md right-0 bottom-full group-hover:right-1/3 transform -translate-y-2 smooth"></span>
            </div>
        </div>
    );
};

export default SideTitle;
