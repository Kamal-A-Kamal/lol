import React, { useContext, useEffect, useState } from "react";

import ScrollingContext from "../../context/ScrollingContext";

import { getScrollingPercentage, windowHeight } from "../../services/scrollingServices";

import Waves from "./Waves";

import "./sectionHead.css";

const SectionHead = ({ className = "bg-yellow-800 text-slate-100", title = "الكورسات" }) => {
    const [percentage, setPercentage] = useState(0);
    const { scrolling } = useContext(ScrollingContext);

    useEffect(() => {
        const yearsHeader = document.querySelector(".home-years__head");

        let { percentage: percent } = getScrollingPercentage(
            scrolling,
            yearsHeader.getBoundingClientRect().top + scrolling,
            (windowHeight + yearsHeader.style.height) / 2
        );
        setPercentage(percent);
    }, [scrolling]);

    return (
        <div className=" z-10 relative">
            <Waves className="fill-primary-container transform -translate-y-1/4 scale-y-[.25] -mt-6 rotate-180 z-10 absolute right-0 top-0 left-0 w-full" />
            <div className={`home-years__head ${className}`}>
                <div className="gradient-transparency inset-0 w-full h-full z-0 absolute text-cyan-500"></div>

                <div className="relative px-10 overflow-hidden z-10">
                    <div className="home-years__title font-big py-20 font-w-bold relative">
                        <div
                            className="home-years-title-bg__container"
                            style={{ transform: `translateX(${-100 * (1 - percentage)}%)` }}
                        >
                            <div className="home-years-title__bg font-bigmax text-slate-100">
                                {title}
                            </div>
                        </div>

                        <div className="home-years-title__content relative z-10">{title}</div>
                    </div>
                </div>
                {/* <Waves className="fill-primary-container" /> */}
            </div>
            <Waves className="fill-primary-container transform translate-y-[38%] scale-y-[.25]  z-10 absolute bottom-0 left-0 w-full" />
        </div>
    );
};

export default SectionHead;
