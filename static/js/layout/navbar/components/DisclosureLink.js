import React from "react";
import { Disclosure } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { navbarDisclosureColor } from "../../../services/defaultSettings";

const DisclosureLink = ({ children, to = "/", className = "" }) => {
    switch (navbarDisclosureColor) {
        case "rose":
            className += ` bg-rose-800 hover:bg-rose-900`;
            break;
        case "cyan":
            className += ` bg-cyan-800 hover:bg-cyan-900`;
            break;
        case "emerald":
            className += ` bg-emerald-800 hover:bg-emerald-900`;
            break;
        case "yellow":
            className += ` bg-yellow-800 hover:bg-yellow-900`;
            break;
        case "teal":
            className += ` bg-teal-800 hover:bg-teal-900`;
            break;
        case "sky":
            className += ` bg-sky-800 hover:bg-sky-900`;
            break;
        default:
            className += ` bg-blue-800 hover:bg-blue-900`;
            break;
    }
    return (
        <Disclosure.Button
            as={NavLink}
            to={to}
            className={`smooth rounded-xl relative px-4 py-2 text-sm font-medium block ${className}`}
        >
            <div
                className={`smooth flex space-x-3 space-x-reverse hover:-translate-x-2 hover:line-right`}
            >
                {children}
            </div>
        </Disclosure.Button>
    );
};

export default DisclosureLink;
