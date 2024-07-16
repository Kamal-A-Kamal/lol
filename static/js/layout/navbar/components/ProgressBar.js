import React, { useContext } from "react";
import ScrollingContext from "../../../context/ScrollingContext";

import "./ProgressBar.css";
import { getCurrentScrollingPercentage } from "../../../services/scrollingServices";
import { progressBarColor } from "../../../services/defaultSettings";

const ProgressBar = () => {
    const { scrolling } = useContext(ScrollingContext);

    let trackClassName = "bg-blue-400 dark:bg-blue-900";
    let barClassName = "bg-blue-700 dark:bg-blue-400";
    if (progressBarColor === "yellow") {
        trackClassName = "bg-yellow-400 dark:bg-yellow-900";
        barClassName = "bg-yellow-700 dark:bg-yellow-400";
    } else if (progressBarColor === "rose") {
        trackClassName = "bg-rose-400 dark:bg-rose-900";
        barClassName = "bg-rose-700 dark:bg-rose-400";
    } else if (progressBarColor === "emerald") {
        trackClassName = "bg-emerald-400 dark:bg-emerald-900";
        barClassName = "bg-emerald-700 dark:bg-emerald-400";
    } else if (progressBarColor === "cyan") {
        trackClassName = "bg-cyan-400 dark:bg-cyan-900";
        barClassName = "bg-cyan-700 dark:bg-cyan-400";
    } else if (progressBarColor === "teal") {
        trackClassName = "bg-teal-400 dark:bg-teal-900";
        barClassName = "bg-teal-700 dark:bg-teal-400";
    } else if (progressBarColor === "sky") {
        trackClassName = "bg-sky-400 dark:bg-sky-900";
        barClassName = "bg-sky-700 dark:bg-sky-400";
    }

    return (
        <div
            className={`progress-bar__track absolute inset-x-0 -bottom-1 ${trackClassName} smooth h-1 transform ${
                scrolling < 1 ? "-translate-y-2 opacity-0" : " translate-y-0"
            }`}
        >
            <div
                className={`progress-bar__moving ${barClassName} h-full left-0 absolute transition-colors duration-300`}
                style={{
                    width: `${getCurrentScrollingPercentage(scrolling) * 100}%`,
                }}
            ></div>
        </div>
    );
};

export default ProgressBar;
