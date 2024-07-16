import React from "react";

import { Icon } from "@iconify/react";
const CenterIcon = ({ className = "", icon, nY = "px", iconProperties = {}, ...props }) => {
    if (!className.includes("translate")) {
        if (nY === "1") {
            className += " -translate-y-1";
        } else if (nY === "0.5") {
            className += " -translate-y-0.5";
        } else if (nY === "px") {
            className += " -translate-y-px";
        } else {
            className += "";
        }
    }
    return (
        <span {...props} className={`flex-center-both trasnform ${className}`}>
            <Icon icon={icon} {...iconProperties} />
        </span>
    );
};

export default CenterIcon;
