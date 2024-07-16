import React from "react";
import { printUnit } from "../../utils/ar";
import "./ProgressCircle.css";

const ProgressCircle = ({ value = 0, max = 10, textsIndex = 1, title, unit, color }) => {
    const texts = {
        1: [
            "شد حيلك !",
            "في احسن!",
            "عاش !!",
            "اشطر واحد ❤️",
            // "اشطر واحد ❤️",
            // "اشطر واحد ❤️",
            // "اشطر واحد ❤️",
        ],
        2: [
            "ابدأ بسرعة!",
            "كمل يا بطل!",
            "فاضل حبة!",
            "حلو اوي ❤️",
            // "اشطر واحد ❤️",
            // "اشطر واحد ❤️",
            // "اشطر واحد ❤️",
        ],
        3: [
            "يلا ابدأ!",
            "يلا كمل!",
            "قربت تخلص!",
            "عاش اوي ❤️",
            // "اشطر واحد ❤️",
            // "اشطر واحد ❤️",
            // "اشطر واحد ❤️",
        ],
    };
    let borderColorClassName = "border-rose-500";
    let backgroundColorClassName = "bg-rose-500";
    let gradientColor = "#f43f5e";
    switch (color) {
        case "blue":
            gradientColor = "#3b82f6";
            borderColorClassName = "border-blue-500";
            backgroundColorClassName = "bg-blue-500";
            break;
        case "cyan":
            gradientColor = "#06b6d4";
            borderColorClassName = "border-cyan-500";
            backgroundColorClassName = "bg-cyan-500";
            break;
        case "purple":
            gradientColor = "#a855f7";
            borderColorClassName = "border-purple-500";
            backgroundColorClassName = "bg-purple-500";
            break;
        case "emerald":
            gradientColor = "#10b981";
            borderColorClassName = "border-emerald-500";
            backgroundColorClassName = "bg-emerald-500";
            break;
        default:
            break;
    }
    let percentage;
    if (max === 0) {
        percentage = 0;
    } else {
        percentage = Math.floor((parseInt(value) / parseInt(max)) * 100);
    }
    return (
        <div className="flex-center-both flex-col space-y-2 mx-auto">
            <div
                className="progress-circle flex-center-both relative w-32 h-32 overflow-hidden shadow-lg smooth"
                style={{
                    backgroundImage: `conic-gradient(${gradientColor}  ${
                        percentage < 10 ? 36 : (percentage / 100) * 360
                    }deg, var(--color-third-container) 0deg)`,
                }}
            >
                <div className="progress-content smooth bg-primary-container clr-text-primary w-full h-full flex-center-both shadow-md rounded-full ">
                    <div className="flex flex-col items-center font-w-bold">
                        <div className="flex-center-both space-x-1 space-x-reverse font-ibm">
                            <span>%</span>
                            <span>{percentage}</span>
                        </div>
                        <div className="font-smaller">
                            {parseInt(max) === 0
                                ? ""
                                : percentage < 40
                                ? texts[textsIndex][0]
                                : percentage < 60
                                ? texts[textsIndex][1]
                                : percentage < 90
                                ? texts[textsIndex][2]
                                : texts[textsIndex][3]}
                        </div>
                    </div>
                </div>
            </div>
            <div className="font-w-bold flex-center-both flex-col space-y-3">
                <div className="flex-center-both flex-col">{title}</div>
                {unit ? (
                    <div
                        className={`flex-center-both rounded-full border-2 ${borderColorClassName}`}
                    >
                        <div
                            className={`clr-white px-4 rounded-full py-1 font-smaller ${backgroundColorClassName}`}
                        >
                            {printUnit(parseInt(value), unit)}
                        </div>

                        <div className="pl-4 pr-2 font-small">من {max}</div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default ProgressCircle;
