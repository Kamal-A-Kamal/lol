import React from "react";
import { Link } from "react-router-dom";

import Form from "../elements/Form";
import SigningFormHead from "./SigningFormHead";

import FlexRowReverse from "../../ui/FlexRowReverse";
import HalfPage from "../../ui/HalfPage";
import Button from "../../ui/Button";
import { isForgetPassword } from "../../../services/defaultSettings";

const SigningForm = ({
    headTitle,
    headIcon,
    picture,
    description,
    onSubmit,
    fields,
    color,
    secondaryColor,
    buttonTitle,
    altLink,
    alt = false,
    altColored,
    className = "",
    isLoading = false,
    toSpin = false,
    alternative = false,
    halfPageClassName = "",
    isPBMargin = true,
    showForgetPassword = false,
    aboveDescription = "",
    afterLogin = "",
    handlePasswordForget = () => null,
}) => {
    let altClassName = `text-teal-600 dark:text-teal-300`;
    if (secondaryColor === "cyan") {
        altClassName = `text-cyan-600 dark:text-cyan-300`;
    } else if (secondaryColor === "rose") {
        altClassName = `text-rose-600 dark:text-rose-500`;
    } else if (secondaryColor === "yellow") {
        altClassName = `text-yellow-600 dark:text-yellow-300`;
    } else if (secondaryColor === "purple") {
        altClassName = `text-purple-600 dark:text-purple-300`;
    } else if (secondaryColor === "emerald") {
        altClassName = `text-emerald-600 dark:text-emerald-300`;
    } else if (secondaryColor === "blue") {
        altClassName = `text-blue-500 dark:text-blue-400`;
    } else if (secondaryColor === "sky") {
        altClassName = `text-sky-500 dark:text-sky-400`;
    } else if (secondaryColor === "stone") {
        altClassName = `text-stone-500 dark:text-stone-400`;
    }
    if (!className.includes("space-y")) {
        className += ` space-y-12`;
    }
    return (
        <HalfPage picture={picture} className={halfPageClassName} isPBMargin={isPBMargin}>
            <div className={`w-4/5 h-4/5 flex justify-center lg:px-10 flex-col ${className}`}>
                {alternative ? (
                    <div>{alternative}</div>
                ) : (
                    <>
                        <div className="font-h2 font-w-bold relative">
                            <SigningFormHead
                                title={headTitle}
                                icon={headIcon}
                                color={color}
                                toSpin={toSpin}
                            />
                        </div>
                        {aboveDescription ? aboveDescription : ""}

                        <div className="clr-text-secondary font-normal ">{description}</div>

                        <div className="">
                            <Form onSubmit={onSubmit}>
                                <div className="space-y-6">
                                    <div>{fields}</div>
                                    <div className="flex">
                                        <Button
                                            type="submit"
                                            isLoading={isLoading}
                                            className="px-20 py-3"
                                            color={color}
                                        >
                                            {buttonTitle}
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                        {afterLogin ? afterLogin : ""}
                        {showForgetPassword && isForgetPassword ? (
                            <div>
                                هل نسيت كلمة السر؟{" "}
                                <span
                                    className="font-w-bold underline cursor-pointer"
                                    onClick={handlePasswordForget}
                                >
                                    اضغط هنا
                                </span>
                            </div>
                        ) : (
                            ""
                        )}
                        {alt ? (
                            <FlexRowReverse className="clr-text-secondary font-normal">
                                <span>{alt}</span>
                                <Link to={altLink}>
                                    <span className={altClassName}>{altColored}</span>
                                </Link>
                            </FlexRowReverse>
                        ) : (
                            ""
                        )}
                    </>
                )}
            </div>
        </HalfPage>
        // <div className="flex flex-col lg:flex-row lg:h-screen space-y-10 lg:space-y-0">
        //     <div className="lg:basis-2/5">
        //         <div className="h-64 lg:h-full overflow-hidden relative">
        //             <img className="w-full lg:inset-0 " src={picture} alt="panorama" />
        //             <img
        //                 className="w-full inset-0 top-1/2 transform -translate-y-1/3 absolute lg:hidden block fil"
        //                 src={picture}
        //                 alt="panorama"
        //             />
        //             <div className="h-full w-full inset-0 absolute form-img-cover smooth opacity-0 dark:opacity-70"></div>
        //             <div className="block lg:hidden h-full w-full inset-0 absolute smooth bg-slate-900 opacity-50"></div>
        //         </div>
        //     </div>
        //     <div className="lg:basis-3/5 flex-center-both pb-nav-margin">
        // <div className={`w-4/5 h-4/5 flex justify-center lg:px-10 flex-col ${className}`}>
        //     <div className="font-h2 font-w-bold relative">
        //         <SigningFormHead title={headTitle} icon={headIcon} color={color} />
        //     </div>

        //     <div className="clr-text-secondary font-normal ">{description}</div>

        //     <div className="">
        //         <Form onSubmit={onSubmit}>
        //             <div className="space-y-6">
        //                 <div>{fields}</div>
        //                 <div className="flex">
        //                     <Button
        //                         type="submit"
        //                         isLoading={isLoading}
        //                         className="px-20 py-3"
        //                         color={color}
        //                     >
        //                         {buttonTitle}
        //                     </Button>
        //                 </div>
        //             </div>
        //         </Form>
        //     </div>

        //     <FlexRowReverse className="clr-text-secondary font-normal">
        //         <span>{alt}</span>
        //         <Link to={altLink}>
        //             <span className={altClassName}>{altColored}</span>
        //         </Link>
        //     </FlexRowReverse>
        // </div>
        //     </div>
        // </div>
    );
};

export default SigningForm;
