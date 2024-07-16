import React from "react";

import NavbarLink from "../layout/navbar/components/NavbarLink";
import DisclosureLink from "../layout/navbar/components/DisclosureLink";
import CenterIcon from "../components/ui/CenterIcon";

import logoTextDark from "../assets/logodark.png";
import logoTextLight from "../assets/logolight.png";

export const navLogoComponent = (darkmode) => (
    <>
        {/* <img
            className="h-12 w-auto block lg:hidden"
            src={logo}
            alt="Workflow"
        /> */}

        <img
            className="h-10 sm:h-14 w-auto"
            src={darkmode ? logoTextDark : logoTextLight}
            alt="Workflow"
        />
        {/* <div className="font-w-bold font-h1 font-borel space-x-2 -mb-5">
            <span className="text-stone-400 dark:text-stone-500 smooth">Mr</span>
            <span className="clr-text-primary smooth">Genius</span>
        </div> */}
    </>
);
export const navbarClassName = (isNavbarHidden, isRTL, scrolling) =>
    ` ${isNavbarHidden && "hide-top"}  ${!isRTL ? "en" : ""} ${
        scrolling && "bg-primary-container"
    }`;
export const NavbarRegisterComponent = () => (
    <NavbarLink
        defualtHover="hover:bg-primary-container hover:text-stone-500 group"
        to="/register"
        className="bg-stone-500 clr-white border-2 border-stone-500 group"
    >
        <span className="flex-center-both font-h2 smooth text-stone-300 group-hover:text-stone-500 dark:group-hover:text-stone-500">
            <CenterIcon icon="ph:magnifying-glass-duotone" nY="0" />
        </span>
        <span className="flex-center-both">انشئ حسابك الآن !</span>
    </NavbarLink>
);
export const NavbarLoginComponent = ({ isRTL }) => (
    <NavbarLink
        to="/login"
        className="border border-yellow-400 border-opacity-0"
        defualtHover="hover:dark:border-opacity-100  hover-shadow group"
    >
        <CenterIcon
            icon="streamline:religion-symbol-peace-religion-peace-war-culture"
            className="text-yellow-500 dark:text-yellow-300 font-h1 group-hover:rotate-180 smooth"
            nY="0"
        />
        <span className="flex-center-both space-x-1 space-x-reverse">
            <span>تسجيل</span>
            <span className="text-yellow-500 dark:text-yellow-300">الدخول</span>
        </span>
    </NavbarLink>
);
export const DisclosureLoginComponent = ({ isRTL }) => (
    <DisclosureLink to="/login">
        <CenterIcon
            icon="streamline:religion-symbol-peace-religion-peace-war-culture"
            className="text-yellow-400 font-h1"
            nY="0"
        />

        <span className="flex-center-both">الدخول إلى حسابك</span>
    </DisclosureLink>
);
export const DisclosureRegisterComponent = () => (
    <DisclosureLink to="/register">
        <CenterIcon icon="ph:magnifying-glass-duotone" className="font-h1 text-stone-400" nY="0" />
        {/* <UserAddIcon className="h-6 w-6 text-yellow-300" /> */}
        <span className="flex-center-both">انشئ حسابك الآن !</span>
    </DisclosureLink>
);

export const domainName = "mahmoud-magdy.com";
