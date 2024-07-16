import React from "react";
import { Link } from "react-router-dom";

import HalfPage from "../components/ui/HalfPage";
import CenterIcon from "../components/ui/CenterIcon";

import registerPicture from "../assets/register.jpeg";

const NotFound = () => {
    return (
        <HalfPage picture={registerPicture}>
            <div className="flex w-full px-10">
                <div className="w-full font-h1 font-w-bold en flex-center-both flex-col space-y-6">
                    <div className="w-full flex-center-both space-x-6">
                        <span className="flex space-x-2 font-bigmax font-com">
                            <span>4</span>
                            <CenterIcon className="text-purple-700" icon="uim:rocket" />
                            <span>4</span>
                        </span>
                        <span className="tracking-widest font-com">NOT FOUND</span>
                    </div>
                    <div className="h-2 w-1/2 bg-secondary-container rounded-md smooth"></div>
                    <div></div>
                    <div className="space-y-2 flex-center-both flex-col">
                        <div className="clr-text-secondary font-h3">
                            ! عذرًا و لكن هذه الصفحة غير موجودة علي الموقع
                        </div>
                        <div className="text-teal-500 font-w-bold font-normal underline">
                            <Link to="/">! العودة للصفحة الرئيسية</Link>
                        </div>
                    </div>
                </div>
            </div>
        </HalfPage>
    );
};

export default NotFound;
