import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";

import FooterLink from "./components/FooterLink";

import { useLocation } from "react-router-dom";
import { adminPath, teachersubadminPath } from "../../services/defaultSettings";
const Footer = () => {
    const location = useLocation();

    const [className, setClassName] = useState("");

    useEffect(() => {
        if (
            location.pathname.includes(adminPath) ||
            location.pathname.includes(teachersubadminPath)
        ) {
            setClassName(" !hidden");
        } else {
            setClassName("");
        }
    }, [location.pathname]);
    return (
        <div
            className={`footer bg-slate-700 py-20 clr-white flex-center-both flex-col space-y-6 w-full ${className}`}
        >
            <div className="flex-center-both space-x-5 space-x-reverse">
                <FooterLink
                    link="https://www.youtube.com/@mrahmedadel9962"
                    className={`bg-gradient-to-r from-rose-500 to-red-500 `}
                    icon={<Icon icon="ant-design:youtube-filled" />}
                />
                <FooterLink
                    link="https://www.facebook.com/groups/206423153792493"
                    className={`bg-gradient-to-r from-cyan-500 to-blue-500 `}
                    icon={<Icon icon="fa6-brands:facebook" />}
                />
            </div>
            <div className="h-1 bg-slate-800 rounded-md w-2/3 sm:w-1/3 "></div>
            <div className="flex-center-both space-x-5 space-x-reverse px-5">
                <span className="font-h2 ">
                    <Icon icon="emojione-v1:beating-heart" />
                </span>
                <span className="text-slate-200 text-center shrink">
                    تم صنع هذه المنصة بهدف تهيئة الطالب لـ كامل جوانب الثانوية العامة و ما بعدها
                </span>
                <span className="font-h2">
                    <Icon icon="emojione-v1:beating-heart" />
                </span>
            </div>
            <div className="en text-center font-com space-x-2 opacity-60 px-5 flex flex-wrap flex-center-both">
                <span className="font-w-bold space-x-1">
                    <span className="text-purple-600">&#60;</span>
                    <span className="text-purple-300">Developed By</span>
                    <span className="text-purple-600">&#62;</span>
                </span>
                <span>
                    <a
                        href="https://www.facebook.com/Om4rS4Ieh/"
                        className="bg-slate-700 hover-shadow smooth px-2 py-2 rounded-md"
                    >
                        Omar
                    </a>
                    <span>,</span>
                    <a
                        href="https://www.facebook.com/emad.sharf.16"
                        className="bg-slate-700 hover-shadow smooth px-3 py-1 rounded-md"
                    >
                        Emad
                    </a>
                </span>
                <span className="font-w-bold space-x-1">
                    <span className="text-purple-600">&#60;</span>
                    <span className="text-purple-300">
                        All Copy Rights Reserved @{new Date().getFullYear()}
                    </span>
                    <span className="text-purple-600">&#62;</span>
                </span>
            </div>
            {/* <div className="text"></div> */}
        </div>
    );
};

export default Footer;
