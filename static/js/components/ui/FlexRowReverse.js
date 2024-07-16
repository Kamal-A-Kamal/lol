import React from "react";

const FlexRowReverse = ({ children, className = "space-x-2" }) => {
    if (!className.includes("space-x")) {
        className += " space-x-2";
    }
    return (
        <div
            className={`flex flex-wrap flex-row lg:space-x-reverse md:space-x-reverse sm:space-x-reverse space-x-reverse ${className}`}
        >
            {children}
        </div>
    );
};

export default FlexRowReverse;
