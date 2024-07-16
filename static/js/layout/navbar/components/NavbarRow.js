import React, { useContext } from "react";

import ThemeContext from "../../../context/ThemeContext";

const NavbarRow = ({ children, className = "", isCentered = true }) => {
    let { isRTL } = useContext(ThemeContext);
    if (!className.includes("space-x")) {
        className += " md:space-x-8 space-x-0";
    }
    return (
        <div
            className={`flex ${isCentered && "flex-center-both"} ${
                isRTL && " md:space-x-reverse "
            } ${className}`}
        >
            {children}
        </div>
    );
};

export default NavbarRow;
