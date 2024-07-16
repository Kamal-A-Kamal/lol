import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";

import ThemeContext from "../../../context/ThemeContext";

const NavbarLink = ({
    children,
    className,
    to = "/",
    activeClassName = "33",
    defualtHover = "hover-shadow",
    isClrPrimary = true,
}) => {
    let { isRTL } = useContext(ThemeContext);
    if (isClrPrimary) {
        className += ` clr-text-primary `;
    }
    let location = useLocation();
    return (
        <NavLink
            to={to}
            state={{ prevPath: location.pathname }}
            className={(active) => {
                return `px-4 py-2 rounded-md text-sm font-medium smooth flex space-x-2 ${
                    isRTL && "space-x-reverse"
                } ${className} ${defualtHover}`;
            }}
            // activeClassName={true}
        >
            {children}
        </NavLink>
    );
};

export default NavbarLink;
