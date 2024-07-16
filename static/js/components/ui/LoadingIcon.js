import { Icon } from "@iconify/react";
import React from "react";

const LoadingIcon = ({ className }) => {
    return (
        <span className={`flex-center-both ${className}`}>
            <Icon icon="line-md:loading-loop" />
        </span>
    );
};

export default LoadingIcon;
