import { Disclosure } from "@headlessui/react";
import React, { useContext } from "react";
// import CenterIcon from "../../components/ui/CenterIcon";
import SideNavItem from "../../components/ui/SideNavItem";
import useMediaQuery from "../../hooks/useMediaQuery";
import ThemeContext from "../../context/ThemeContext";

const SideNav = ({ color = "yellow", className = "", open, isFixed = true, pages }) => {
    const { toggleSideNav } = useContext(ThemeContext);
    let breaklineClassName = "";
    let closingIconClassname = "";
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    className +=
        " bg-primary-container border-l-2 border-slate-200 dark:border-slate-800 shadow-md";

    if (color === "yellow") {
        breaklineClassName = "bg-yellow-600 bg-opacity-40 dark:bg-yellow-400 dark:bg-opacity-50";
        closingIconClassname = "text-yellow-500 dark:text-yellow-300";
    } else if (color === "rose") {
        breaklineClassName = "bg-rose-100 dark:bg-rose-900";
        closingIconClassname = "text-rose-500";
    } else if (color === "emerald") {
        breaklineClassName = "bg-emerald-100 dark:bg-emerald-900";
        closingIconClassname = "text-emerald-500";
    } else if (color === "cyan") {
        breaklineClassName = "bg-cyan-100 dark:bg-cyan-900";
        closingIconClassname = "text-cyan-500";
    } else if (color === "teal") {
        breaklineClassName = "bg-teal-100 dark:bg-teal-900";
        closingIconClassname = "text-teal-500";
    } else if (color === "stone") {
        breaklineClassName = "bg-stone-100 dark:bg-stone-900";
        closingIconClassname = "text-stone-500";
    } else {
        breaklineClassName = "bg-blue-100 dark:bg-blue-900";
        closingIconClassname = "text-blue-500";
    }
    let isLastPageBreakline = false;

    return (
        <>
            <div
                className={`smooth ${
                    isFixed ? "fixed z-50 right-0" : "relative pisitive-nav-top z-0 opacity-0"
                }  peer navbar-complement-height  overflow-auto ${className} SideNav ${closingIconClassname}`}
            >
                <div className="flex flex-col space-y-3 py-4 rounded-md px-3">
                    {isDesktop ? (
                        <Disclosure.Button as="div" className="right-0 top-0 h-full">
                            <div
                                className={`flex ${
                                    !open
                                        ? "flex-col space-y-2"
                                        : "felx-row space-x-2 space-x-reverse"
                                }`}
                            >
                                <SideNavItem
                                    isLink={false}
                                    color={color}
                                    iconClassName={`smooth ${closingIconClassname}  ${
                                        open ? "rotate-180" : ""
                                    }`}
                                    className="hover:bg-slate-200 dark:hover:bg-slate-800 dark:text-slate-100 text-slate-600 px-2"
                                    icon={"bi:arrow-left-circle-fill"}
                                    text={"تصغير النافذة"}
                                    open={open}
                                />
                                <SideNavItem
                                    color={"rose"}
                                    // className="hover:bg-slate-200 dark:hover:bg-slate-800"
                                    icon={"majesticons:logout-line"}
                                    text={"تسجيل خروج"}
                                    open={open}
                                    to="logout"
                                />
                            </div>
                        </Disclosure.Button>
                    ) : (
                        <div className="right-0 top-0 h-full">
                            <div
                                className={`flex ${
                                    !open
                                        ? "flex-col space-y-2"
                                        : "felx-row space-x-2 space-x-reverse"
                                }`}
                            >
                                <SideNavItem
                                    isLink={false}
                                    color={color}
                                    iconClassName={`smooth ${closingIconClassname}  ${
                                        open ? "rotate-180" : ""
                                    }`}
                                    className="hover:bg-slate-200 dark:hover:bg-slate-800 dark:text-slate-100 text-slate-600 px-2"
                                    icon={"bi:arrow-left-circle-fill"}
                                    text={"تصغير النافذة"}
                                    onClick={toggleSideNav}
                                    open={open}
                                />
                                <SideNavItem
                                    color={"rose"}
                                    // className="hover:bg-slate-200 dark:hover:bg-slate-800"
                                    icon={"majesticons:logout-line"}
                                    text={"تسجيل خروج"}
                                    open={open}
                                    to="logout"
                                />
                            </div>
                        </div>
                    )}

                    {pages.map((page, key) => {
                        if (page.type === "page") {
                            isLastPageBreakline = false;
                            return (
                                <SideNavItem
                                    color={color}
                                    key={key}
                                    to={page.to}
                                    icon={page.icon}
                                    iconProperties={page.icon_properites}
                                    text={page.text}
                                    open={open}
                                />
                            );
                        } else if (page.type === "breakline") {
                            if (isLastPageBreakline) {
                                return "";
                            }
                            isLastPageBreakline = true;
                            return (
                                <div
                                    key={key}
                                    className={`w-full h-0.5 smooth ${breaklineClassName}`}
                                ></div>
                            );
                        }
                        return "";
                    })}
                </div>
            </div>
        </>
    );
};

export default SideNav;
