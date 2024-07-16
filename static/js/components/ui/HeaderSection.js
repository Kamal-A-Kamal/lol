import React from "react";

import bg from "../../assets/bg-star-dark.png";
import { headerSectionColor } from "../../services/defaultSettings";

import "./HeaderSection.css";

const HeaderSection = ({ children }) => {
    let bgColorClass = "bg-blue-600";
    let textColorClass = "text-blue-500";
    if (headerSectionColor === "rose") {
        bgColorClass = "bg-rose-600";
        textColorClass = "text-rose-500";
    } else if (headerSectionColor === "emerald") {
        bgColorClass = "bg-emerald-600";
        textColorClass = "text-emerald-500";
    } else if (headerSectionColor === "yellow") {
        bgColorClass = "bg-yellow-400";
        textColorClass = "text-yellow-400";
    } else if (headerSectionColor === "slate") {
        bgColorClass =
            "bg-slate-900 dark:bg-slate-800 shadow-md border border-slate-900 dark:border-gray-800";
        textColorClass = "text-slate-800";
    } else if (headerSectionColor === "sky") {
        // bgColorClass =
        //     "bg-sky-900 dark:bg-sky-800 shadow-md border border-sky-900 dark:border-sky-800";
        // textColorClass = "text-sky-800";
        bgColorClass = "bg-sky-400";
        textColorClass = "text-sky-400";
    } else if (headerSectionColor === "stone") {
        bgColorClass =
            "bg-stone-900 dark:bg-stone-800 shadow-md border border-stone-900 dark:border-gray-800";
        textColorClass = "text-stone-800";
    }
    return (
        <div
            className={`rounded-md py-24 px-8 ${
                headerSectionColor === "yellow" ? "text-slate-900" : "text-slate-100"
            } relative overflow-hidden pb-56 ${bgColorClass}`}
        >
            {children}
            <div className="absolute inset-0 w-full h-full">
                <div
                    className="w-auto h-full md:w-full opacity-100 relative mr-auto transform "
                    style={{
                        backgroundImage: "url(" + bg + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "center top",
                    }}
                ></div>
                <div
                    className={`absolute inset-0 w-full h-full bg-gradient ${textColorClass}`}
                ></div>
            </div>
        </div>
    );
};

export default HeaderSection;
