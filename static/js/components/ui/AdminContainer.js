import React from "react";
import { useLocation } from "react-router-dom";
import { adminPages } from "../../services/adminServices";
import { adminPanelColor } from "../../services/defaultSettings";
import CenterIcon from "./CenterIcon";

const AdminContainer = ({
    customTitle = "",
    customIcon = "",
    children,
    iconColor = "blue",
    className = "",
}) => {
    let iconClassName = "";

    // if (adminPanelColor === "blue") {
    //     iconClassName += "text-blue-500";
    // } else if (adminPanelColor === "yellow") {
    //     iconClassName += "text-yellow-400";
    // }
    const color = adminPanelColor;

    if (color === "yellow") {
        iconClassName += " text-yellow-600 dark:text-yellow-300";
    } else if (color === "rose") {
        iconClassName += " text-rose-500";
    } else if (color === "emerald") {
        iconClassName += " text-emerald-500";
    } else if (color === "cyan") {
        iconClassName += " text-cyan-500";
    } else if (color === "teal") {
        iconClassName += " text-teal-500";
    } else if (color === "stone") {
        iconClassName += " text-stone-500";
    } else {
        iconClassName += "text-blue-500";
    }

    const location = useLocation();

    const locationSegments = location.pathname.split("/");

    const isLastSegment = adminPages.filter(
        (element) => element.to === locationSegments[locationSegments.length - 1]
    );

    const isBeforeLastSegment = adminPages.filter(
        (element) => element.to === locationSegments[locationSegments.length - 2]
    );

    let icon = "";
    let title = "";
    if (isLastSegment.length > 0 && isBeforeLastSegment.length < 1) {
        title = isLastSegment[0]["text"];
        icon = isLastSegment[0]["icon"];
    } else if (isBeforeLastSegment.length > 0) {
        icon = isBeforeLastSegment[0]["icon"];
        title = isBeforeLastSegment[0]["text"];
    }
    if (!className.includes("w-")) {
        className += " w-full";
    }
    return (
        <div
            className={`bg-inner-container rounded-md shadow-lg p-2 lg:p-10 flex-center-both flex-col space-y-8 border-2 border-secondary-container smooth clr-primary-text shadow-large mx-auto ${className}`}
        >
            <div className="font-h1 clr-text-primary smooth">
                {customTitle ? customTitle : title}
            </div>
            <div className={`font-h1 smooth ${iconClassName}`}>
                <CenterIcon icon={customIcon ? customIcon : icon} />
            </div>
            {children}
        </div>
    );
};

export default AdminContainer;
