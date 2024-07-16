import React from "react";
// import { Link } from "react-router-dom";
// import { Icon } from "@iconify/react";

const FooterLink = ({ icon, className, link = "/" }) => {
    return (
        <a
            href={link}
            className={`relative w-14 h-14 flex-center-both rounded-full font-h1 hover-shadow smooth ${className}`}
        >
            <span className="absolute opacity-50 transform scale-125 text-slate-800">{icon}</span>
            <span className="relative">{icon}</span>
        </a>
    );
};

export default FooterLink;
