import React, { useContext, useState } from "react";
import Electric from "../../components/svgs/Electric";

import AuthContext from "../../context/AuthContext";

import "./MainSection.css";

import Button from "../../components/ui/Button";
// import FlexRowReverse from "../../components/ui/FlexRowReverse";
import Container from "../../components/ui/Container";
// import Waleed from "../../components/svgs/Waleed";
// import YearsBooks from "../../components/svgs/YearsBooks";
// import Shapes from "../../components/svgs/Shapes";
// import Waves from "../../components/ui/Waves";
import profile from "../../assets/profile.png";
import bg from "../../assets/bg-star.png";
import bgdark from "../../assets/bg-star-dark.png";
import bgtop from "../../assets/bg-top.png";
import bgbottom from "../../assets/bg-bottom.png";
import ThemeContext from "../../context/ThemeContext";
const MainSection = ({ title = false }) => {
    const { token } = useContext(AuthContext);

    let { darkmode } = useContext(ThemeContext);

    return (
        <>
            <section className="md:h-screen min-h-screen negative-nav-margin relative overflow-hidden">
                <div
                    className="right-0 top-0 bottom-0 w-3/4 h-full z-0 absolute opacity-100"
                    style={{
                        backgroundImage: "url(" + (darkmode ? bgdark : bg) + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        // backgroundRepeat: "repeat-y",
                    }}
                ></div>
                <div className="md:right-0 left-0 md:-top-20 top-0 md:w-full w-[200vw] z-0 absolute opacity-100">
                    <img src={bgtop} alt="top" className="w-full" />
                </div>
                <div className="md:left-0 right-0 md:-bottom- bottom-0 md:w-full w-[200vw] z-0 absolute opacity-100">
                    <img src={bgbottom} alt="bottom" className="w-full" />
                </div>
                <Container className="h-full relative z-10 font-fs pt-32 md:pt-0 pb-20 md:pb-0">
                    <div className="w-full flex md:flex-row flex-col-reverse h-full space-y-10 space-y-reverse md:space-y-0 ">
                        <div className=" md:basis-1/2 basis-full h-full flex-center-both">
                            <div className="flex-center-both flex-col  mooth space-y-6 md:space-y-0">
                                {/* <h2 className="font-h1 font-w-bold">منصة</h2> */}
                                <h1 className="font-big font-w-bold before-box relative font-ff">
                                    <div className="relative z-10 bg-yellow-300 text-stone-100 dark:bg-yellow-500 dark:text-stone-900 smooth">
                                        <div className="pt-3 px-6">
                                            <span> كلام مؤرخين</span>
                                        </div>
                                    </div>
                                </h1>
                                <h1 className="font-big font-w-bold font-ff pt-5">
                                    <span className="">م / احمد عادل</span>
                                </h1>
                                {/* <div className="h-20 w-1 bg-yellow-500"></div> */}
                                <h2 className="pt-4 space-y-2 font-w-bold flex-center-both flex-col font-ff">
                                    <div className="font-h2 inline pr-2">
                                        منصة <span className="text-yellow-500">متكاملة</span>
                                    </div>
                                    <div className="font-h2 relative">
                                        في مادة <span className="text-yellow-500">التاريخ</span>{" "}
                                        للثانوية العامة
                                    </div>
                                </h2>
                                {!token ? (
                                    <div className="pt-8 pb-20 md:pb-0">
                                        <Button color="stone" element="Link" to="/register">
                                            انشئ حسابك الآن !
                                        </Button>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <div className="md:basis-1/2 basis-full h-full flex-center-both pt-20 md:pt-0">
                            <div className="w-full h-full flex-center-both max-w-md">
                                <img src={profile} alt={"profile"} className="" />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    );
};

export default MainSection;
