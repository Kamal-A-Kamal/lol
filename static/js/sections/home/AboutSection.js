import React from "react";

import Container from "../../components/ui/Container";
import CenterIcon from "../../components/ui/CenterIcon";
import bgtop from "../../assets/bg-top.png";

import "./AboutSection.css";

const AboutSection = () => {
    return (
        <>
            <section className="relative pb-72 w-full">
                <div className="left-0 md:right-0 top-0 md:w-full w-[200vw] z-0 opacity-100 absolute -mt-1">
                    <img src={bgtop} alt="top" className="w-full" />
                </div>
            </section>
        </>
    );
};

export default AboutSection;
