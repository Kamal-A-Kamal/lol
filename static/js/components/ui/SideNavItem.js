import React from "react";
import { NavLink } from "react-router-dom";
import CenterIcon from "./CenterIcon";

const SideNavItem = ({
    open,
    icon,
    text,
    to,
    color = "blue",
    className = "",
    activeClassName = "",
    iconProperties = {},
    isLink = true,
    iconClassName = "",
    onClick = null,
}) => {
    const textArray = text.split(" ");

    // if (color === "blue") {
    //     className +=
    //         "bg-blue-300 dark:bg-blue-800 hover:bg-blue-500 dark:hover:bg-blue-500 dark:text-blue-500 text-blue-500 dark:hover:text-blue-100 hover:text-blue-100";
    //     activeClassName +=
    //         "bg-blue-600 dark:bg-blue-600 hover:bg-blue-500 dark:hover:bg-blue-500 dark:text-blue-100 text-blue-100";
    // } else if (color === "yellow") {
    //     className +=
    //         "bg-yellow-200 dark:bg-yellow-800 hover:bg-yellow-500 dark:hover:bg-yellow-500 dark:text-yellow-500 text-yellow-500 dark:hover:text-yellow-100 hover:text-yellow-100";
    //     activeClassName +=
    //         "bg-yellow-400 dark:bg-yellow-600 hover:bg-yellow-500 dark:hover:bg-yellow-500 dark:text-yellow-100 text-yellow-600";
    // }
    if (!className.includes("bg") && !className.includes("clr-") && !className.includes("text-")) {
        if (!className.includes("bg")) {
            className += `  ${
                open ? "bg-outer-container" : "bg-slate-100 dark:bg-slate-900"
            } hover:bg-slate-200 dark:hover:bg-slate-800 dark:text-slate-300 text-slate-800 dark:hover:text-slate-100 hover:text-slate-900`;
            // bg-slate-100 dark:bg-slate-900
        }
        if (color === "yellow") {
            activeClassName +=
                " bg-yellow-600 dark:bg-yellow-300 hover:bg-yellow-500 dark:hover:bg-yellow-500 dark:text-slate-900 text-yellow-100";

            if (!iconClassName.includes("text-")) {
                iconClassName +=
                    " text-yellow-600 dark:text-yellow-300  group-hover:text-yellow-600 dark:group-hover:text-yellow-500 smooth";
            }
        } else if (color === "rose") {
            activeClassName +=
                " bg-rose-600 dark:bg-rose-600 hover:bg-rose-500 dark:hover:bg-rose-500 dark:text-rose-100 text-rose-100";

            if (!iconClassName.includes("text-")) {
                iconClassName +=
                    " text-rose-500  group-hover:text-rose-600 dark:group-hover:text-rose-500 smooth";
            }
        } else if (color === "emerald") {
            activeClassName +=
                " bg-emerald-600 dark:bg-emerald-600 hover:bg-emerald-500 dark:hover:bg-emerald-500 dark:text-emerald-100 text-emerald-100";

            if (!iconClassName.includes("text-")) {
                iconClassName +=
                    " text-emerald-500  group-hover:text-emerald-600 dark:group-hover:text-emerald-500 smooth";
            }
        } else if (color === "cyan") {
            activeClassName +=
                " bg-cyan-600 dark:bg-cyan-600 hover:bg-cyan-500 dark:hover:bg-cyan-500 dark:text-cyan-100 text-cyan-100";

            if (!iconClassName.includes("text-")) {
                iconClassName +=
                    " text-cyan-500  group-hover:text-cyan-600 dark:group-hover:text-cyan-500 smooth";
            }
        } else if (color === "teal") {
            activeClassName +=
                " bg-teal-600 dark:bg-teal-600 hover:bg-teal-500 dark:hover:bg-teal-500 dark:text-teal-100 text-teal-100";

            if (!iconClassName.includes("text-")) {
                iconClassName +=
                    " text-teal-500  group-hover:text-teal-600 dark:group-hover:text-teal-500 smooth";
            }
        } else if (color === "stone") {
            activeClassName +=
                " bg-stone-600 dark:bg-stone-600 hover:bg-stone-500 dark:hover:bg-stone-500 dark:text-stone-100 text-stone-100";

            if (!iconClassName.includes("text-")) {
                iconClassName +=
                    " text-stone-500  group-hover:text-stone-600 dark:group-hover:text-stone-500 smooth";
            }
        } else {
            activeClassName +=
                " bg-blue-600 dark:bg-blue-600 hover:bg-blue-500 dark:hover:bg-blue-500 dark:text-blue-100 text-blue-100";

            if (!iconClassName.includes("text-")) {
                iconClassName +=
                    " text-blue-500  group-hover:text-blue-600 dark:group-hover:text-blue-500 smooth";
            }
        }
    }

    return (
        <>
            {isLink ? (
                <NavLink
                    to={to}
                    className={({ isActive }) =>
                        `flex flex-row items-center pl-3 px-2 te justify-start smooth cursor-pointer rounded-md py-3 group space-x-2 space-x-reverse ${
                            isActive ? activeClassName : className
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <div
                                className={`w-10 flex-center-both font-h2 ${
                                    isActive ? "" : iconClassName
                                }`}
                            >
                                <CenterIcon icon={icon} iconProperties={iconProperties} />
                            </div>
                            <div
                                className={`flex font-w-bold  ${
                                    open ? "" : "hidden"
                                } pl-3 space-x-1 space-x-reverse`}
                            >
                                {textArray.map((element, key) => (
                                    <span key={key}>{element}</span>
                                ))}
                            </div>
                        </>
                    )}
                </NavLink>
            ) : (
                <div
                    onClick={onClick}
                    className={`flex flex-row items-center pl-3 px-2 te justify-start smooth cursor-pointer rounded-md py-3 group space-x-2 space-x-reverse ${className}`}
                >
                    <div className={`w-10 flex-center-both font-h2`}>
                        <CenterIcon
                            icon={icon}
                            nY="0"
                            className={`${iconClassName}`}
                            iconProperties={iconProperties}
                        />
                    </div>
                    <div
                        className={`font-smaller flex font-w-bold ${
                            open ? "" : "hidden"
                        } pl-3 space-x-1 space-x-reverse`}
                    >
                        {textArray.map((element, key) => (
                            <span key={key}>{element}</span>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default SideNavItem;
