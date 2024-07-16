import React from "react";

const HalfPage = ({ picture, children, className = "", isPBMargin = true }) => {
    return (
        <div
            className={`halfPageSection flex flex-col lg:flex-row lg:min-h-screen space-y-10 lg:space-y-0 relative z-10 ${className}`}
        >
            <div className="lg:basis-2/5 min-w-0">
                <div
                    className="h-64 lg:h-full w-full overflow-hidden relative scalable-image"
                    style={{
                        backgroundImage: "url(" + picture + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "center top",
                        // backgroundRepeat: "repeat-y",
                    }}
                >
                    {/* <img className="w-full lg:inset-0 " src={picture} alt="panorama" />
                    <img
                        className="w-full inset-0 top-1/2 transform -translate-y-1/3 absolute lg:hidden block fil"
                        // style={{ color: "100% !important" }}
                        src={picture}
                        alt="panorama"
                    /> */}
                    <div className="h-full w-full inset-0 absolute form-img-cover smooth opacity-0 dark:opacity-70"></div>
                    <div className="block lg:hidden h-full w-full inset-0 absolute smooth bg-slate-900 opacity-50"></div>
                </div>
            </div>
            <div className={`lg:basis-3/5 flex-center-both${isPBMargin ? " pb-nav-margin" : ""}`}>
                {children}
            </div>
        </div>
    );
};

export default HalfPage;
