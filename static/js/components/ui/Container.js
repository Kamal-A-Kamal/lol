import React from "react";

const Container = ({ children, className = "" }) => {
    if (!className.includes("space-y")) {
        className += ` space-y-10`;
    }
    if (!className.includes("py-")) {
        className += ` py-8`;
    }
    return <div className={`px-2 lg:px-4 sm:px-10 ${className}`}>{children}</div>;
};

export default Container;
