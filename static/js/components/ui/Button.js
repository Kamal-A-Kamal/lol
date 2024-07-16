import React from "react";
import LoadingIcon from "../ui/LoadingIcon";
import { Link } from "react-router-dom";

const Button = ({
    children,
    color = "teal",
    className = "",
    hoverEffect = false,
    type,
    isLoading = false,
    isDisabled = false,
    onClick = null,
    element = "button",
    reversed = false,
    ...props
}) => {
    if (!className.includes("bg")) {
        if (color === "cyan") {
            className += ` bg-cyan-400 border-cyan-400 dark:bg-cyan-500 dark:border-cyan-500 hover:bg-opacity-0 dark:hover:bg-opacity-0 hover:text-cyan-400 dark:hover:text-cyan-500 clr-white`;
        } else if (color === "rose") {
            if (reversed) {
                className += ` bg-rose-500 border-rose-500 dark:bg-rose-500 dark:border-rose-500 hover:bg-opacity-100 dark:hover:bg-opacity-100 dark:bg-opacity-0 bg-opacity-0 text-rose-500 dark:hover:text-rose-500 hover:text-slate-50 dark:hover:text-slate-50`;
            } else {
                className += ` bg-rose-500 border-rose-500 dark:bg-rose-500 dark:border-rose-500 hover:bg-opacity-0 dark:hover:bg-opacity-0 dark:bg-opacity-100 bg-opacity-100 hover:text-rose-500 dark:hover:text-rose-500 clr-white`;
            }
        } else if (color === "yellow") {
            className += ` bg-yellow-400 border-yellow-400 dark:bg-yellow-500 dark:border-yellow-500 hover:bg-opacity-0 dark:hover:bg-opacity-0 hover:text-yellow-400 dark:hover:text-yellow-500 clr-white`;
        } else if (color === "purple") {
            className += ` bg-purple-400 border-purple-400 dark:bg-purple-500 dark:border-purple-500 hover:bg-opacity-0 dark:hover:bg-opacity-0 hover:text-purple-400 dark:hover:text-purple-500 clr-white`;
        } else if (color === "blue") {
            if (reversed) {
                className += ` bg-blue-500 border-blue-500 dark:bg-blue-600 dark:border-blue-600 hover:bg-opacity-100 dark:hover:bg-opacity-100 dark:bg-opacity-0 bg-opacity-0 text-blue-500 dark:text-blue-600 hover:text-slate-50 dark:hover:text-slate-50`;
            } else {
                className += ` bg-blue-500 border-blue-500 dark:bg-blue-600 dark:border-blue-600 hover:bg-opacity-0 dark:hover:bg-opacity-0 dark:bg-opacity-100 bg-opacity-100 hover:text-blue-500 dark:hover:text-blue-600 clr-white`;
            }
        } else if (color === "emerald") {
            className += ` bg-emerald-500 border-emerald-500 dark:bg-emerald-600 dark:border-emerald-600 hover:bg-opacity-0 dark:hover:bg-opacity-0 hover:text-emerald-500 dark:hover:text-emerald-600 clr-white`;
        } else if (color === "stone") {
            className += ` bg-stone-500 border-stone-500 dark:bg-stone-600 dark:border-stone-600 hover:bg-opacity-0 dark:hover:bg-opacity-0 hover:text-stone-500 dark:hover:text-stone-600 clr-white`;
        } else if (color === "sky") {
            className += ` bg-sky-500 border-sky-500 dark:bg-sky-600 dark:border-sky-600 hover:bg-opacity-0 dark:hover:bg-opacity-0 hover:text-sky-500 dark:hover:text-sky-600 clr-white`;
        } else if (color === "slate") {
            className += ` bg-slate-500 border-slate-500 dark:bg-slate-600 dark:border-slate-600 hover:bg-opacity-0 dark:hover:bg-opacity-0 hover:text-slate-500 dark:hover:text-slate-600 clr-white`;
        } else {
            className += ` bg-teal-400 border-teal-400 dark:bg-teal-500 dark:border-teal-500 hover:bg-opacity-0 dark:hover:bg-opacity-0 hover:text-teal-400 dark:hover:text-teal-500 clr-white`;
        }
    }
    if (!className.includes("rounded")) {
        className += ` rounded-md `;
    }
    if (!className.includes("px")) {
        className += ` px-4 py-2 `;
    }

    return (
        <>
            {element === "button" && (
                <button
                    onClick={onClick}
                    type={type}
                    className={`${isLoading ? "loading" : ""} ${
                        isLoading || isDisabled ? "opacity-50" : ""
                    } border-2 smooth ${hoverEffect} ${className}`}
                    disabled={isDisabled || isLoading ? true : false}
                    {...props}
                >
                    {isLoading ? <LoadingIcon /> : children}
                </button>
            )}
            {element === "Link" && (
                <Link
                    onClick={onClick}
                    type={type}
                    className={`${isLoading ? "loading" : ""} ${
                        isLoading || isDisabled ? "opacity-50" : ""
                    } border-2 smooth ${hoverEffect} ${className}`}
                    disabled={isDisabled || isLoading ? true : false}
                    {...props}
                >
                    {isLoading ? <LoadingIcon /> : children}
                </Link>
            )}
            {element === "a" && (
                <a
                    onClick={onClick}
                    type={type}
                    className={`${isLoading ? "loading" : ""} ${
                        isLoading || isDisabled ? "opacity-50" : ""
                    } border-2 smooth ${hoverEffect} ${className}`}
                    disabled={isDisabled || isLoading ? true : false}
                    {...props}
                >
                    {isLoading ? <LoadingIcon /> : children}
                </a>
            )}
        </>
    );
};

export default Button;
