import { Disclosure } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";
// import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

//context
import AuthContext from "../../context/AuthContext";
import ScrollingContext from "../../context/ScrollingContext";
import ThemeContext from "../../context/ThemeContext";

//ui
import ShowingTransition from "../../components/ui/ShowingTransition";

//navs
import DarkmodeButton from "./components/DarkmodeButton";
import NavbarMenu from "./components/NavbarMenu";
import NavbarMenuItem from "./components/NavbarMenuItem";
import NavbarNotification from "./components/NavbarNotification";
import NavbarRow from "./components/NavbarRow";
import ProgressBar from "./components/ProgressBar";

//navs-assets

// import logo from "../../assets/navbar/logo.png";
import userIcon from "../../assets/navbar/user.svg";
import "./navbar.css";
// import CenterIcon from "../../components/ui/CenterIcon";
import {
    adminPanelColor,
    adminPath,
    isChargeInsertAuto,
    isCommunity,
    isCourseRenamedToMonthlySubscriptions,
    isHideNavbarFromAdminPanel,
    isWalletEnabled,
    navbarDisclosureColor,
    navbarIconColor,
    teachersubadminPath,
} from "../../services/defaultSettings";

import CelebrateNotifiction from "./components/CelebrateNotifiction";
import ValidNameCheck from "./components/ValidNameCheck";
import {
    DisclosureLoginComponent,
    DisclosureRegisterComponent,
    navbarClassName,
    NavbarLoginComponent,
    NavbarRegisterComponent,
    navLogoComponent,
} from "../../services/navbarChangableComponents";
import CenterIcon from "../../components/ui/CenterIcon";
import { printUnit } from "../../utils/ar";
import GlobalNotifications from "./components/GlobalNotifications";

const Navbar = () => {
    let { token: authToken, user, adminToken: isAdmin, currentBalance } = useContext(AuthContext);
    let { isRTL, darkmode, isOpen, toggleSideNav } = useContext(ThemeContext);
    let { scrolling } = useContext(ScrollingContext);

    const [isAdminPath, setIsAdminPath] = useState(false);

    const location = useLocation();

    let isNavbarHidden = false;

    if ((location.pathname === "/" || location.pathname === "/home") && scrolling < 1) {
        isNavbarHidden = true;
    }

    const [className, setClassName] = useState("");
    useEffect(() => {
        if (
            location.pathname.includes(adminPath) ||
            location.pathname.includes(teachersubadminPath)
        ) {
            if (isHideNavbarFromAdminPanel) {
                setClassName("negative-nav-margin");
            }
            setIsAdminPath(true);
        } else {
            setClassName("");
            setIsAdminPath(false);
        }
    }, [location.pathname]);
    useEffect(() => {
        if (!location.pathname.includes("questions")) {
            window.scrollTo(0, 0);
        }
    }, [location.pathname]);
    let disclosureColorClassName;
    switch (navbarDisclosureColor) {
        case "rose":
            disclosureColorClassName = ` bg-rose-600 `;
            break;
        case "cyan":
            disclosureColorClassName = ` bg-cyan-600 `;
            break;
        case "emerald":
            disclosureColorClassName = ` bg-emerald-600 `;
            break;
        case "yellow":
            disclosureColorClassName = ` bg-yellow-300 `;
            break;
        case "teal":
            disclosureColorClassName = ` bg-teal-600 `;
            break;
        case "sky":
            disclosureColorClassName = ` bg-sky-600 `;
            break;
        default:
            disclosureColorClassName = `bg-blue-600`;
            break;
    }

    let adminPanelIconColor;
    switch (adminPanelColor) {
        case "yellow":
            adminPanelIconColor = ` bg-yellow-600 dark:bg-yellow-300 hover:bg-yellow-500 dark:hover:bg-yellow-500 text-yellow-100 dark:text-slate-900 `;
            break;
        case "rose":
            adminPanelIconColor = ` bg-rose-600 dark:bg-rose-600 hover:bg-rose-500 dark:hover:bg-rose-500 dark:text-rose-100 text-rose-100 `;
            break;
        case "emerald":
            adminPanelIconColor = ` bg-emerald-600 dark:bg-emerald-600 hover:bg-emerald-500 dark:hover:bg-emerald-500 dark:text-emerald-100 text-emerald-100`;
            break;
        case "cyan":
            adminPanelIconColor = ` bg-cyan-600 dark:bg-cyan-600 hover:bg-cyan-500 dark:hover:bg-cyan-500 dark:text-cyan-100 text-cyan-100 `;
            break;
        case "teal":
            adminPanelIconColor = `bg-teal-600 dark:bg-teal-600 hover:bg-teal-500 dark:hover:bg-teal-500 dark:text-teal-100 text-teal-100"`;
            break;
        case "stone":
            adminPanelIconColor = `bg-stone-600 dark:bg-stone-600 hover:bg-stone-500 dark:hover:bg-stone-500 dark:text-stone-100 text-stone-100"`;
            break;
        default:
            adminPanelIconColor = `bg-blue-600 dark:bg-blue-600 hover:bg-blue-500 dark:hover:bg-blue-500 dark:text-blue-100 text-blue-100 smooth`;
            break;
    }

    return (
        <Disclosure
            as="nav"
            className={`${className} navbar z-40 fixed inset-0 bottom-auto smooth ${navbarClassName(
                isNavbarHidden,
                isRTL,
                scrolling
            )}`}
        >
            {({ open }) => (
                <>
                    <ValidNameCheck />
                    <GlobalNotifications />
                    <div className="relative h-full">
                        <ProgressBar />
                        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 h-full">
                            <div className="relative flex items-center justify-between h-full flex-row-reverse">
                                {!authToken && (
                                    <div className="navbar-collapse-button absolute inset-y-0 left-0 flex items-center md:hidden">
                                        {/* Mobile menu button*/}
                                        <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ar">
                                            <span className="sr-only">Open main menu</span>
                                            <div
                                                id="nav-icon"
                                                className={`${navbarIconColor} ${
                                                    open ? " open" : ""
                                                }`}
                                            >
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </Disclosure.Button>
                                    </div>
                                )}

                                <DarkmodeButton
                                    className={`block md:hidden absolute ${
                                        authToken ? "left-0" : "right-0"
                                    }`}
                                />
                                {isAdminPath && isAdmin && (
                                    <div className="absolute top-navbar-height right-0 flex-center-both pt-2">
                                        <div
                                            className={`flex lg:hidden flex-row items-center justify-start cursor-pointer rounded-md py-3 group px-2 z-1000 ${adminPanelIconColor}`}
                                            onClick={toggleSideNav}
                                        >
                                            <div className={`w-10 flex-center-both font-h2`}>
                                                <CenterIcon
                                                    icon={"bi:arrow-left-circle-fill"}
                                                    nY="0"
                                                    className={`smooth  ${
                                                        isOpen ? "rotate-180" : ""
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <NavbarRow
                                    isCentered={false}
                                    className="navbar-brand-container flex-1 flex items-center justify-center md:items-center md:justify-end h-full"
                                >
                                    <DarkmodeButton className="hidden md:block" />
                                    <div className="navbar-brand flex-shrink-0 flex items-center">
                                        <Link to="/">{navLogoComponent(darkmode)}</Link>
                                    </div>
                                </NavbarRow>

                                <div
                                    className={`absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto sm:pr-0 sm:ml-6`}
                                >
                                    {!authToken && (
                                        <div className="md:block hidden mr-16 lg:mr-0">
                                            <NavbarRow>
                                                <NavbarRegisterComponent />
                                                <NavbarLoginComponent isRTL={isRTL} />
                                            </NavbarRow>
                                        </div>
                                    )}
                                    {authToken && (
                                        <>
                                            <NavbarRow isRTL={isRTL} className="space-x-2">
                                                <NavbarMenu
                                                    menuButton={
                                                        <>
                                                            <span className="sr-only">
                                                                Open user menu
                                                            </span>
                                                            <img
                                                                className="h-8 w-8 rounded-full"
                                                                src={userIcon}
                                                                alt=""
                                                            />
                                                        </>
                                                    }
                                                    menuButtonClassName={"rounded-full"}
                                                    menuItems={
                                                        <>
                                                            <NavbarMenuItem
                                                                icon="ic:twotone-home"
                                                                // to="profile"
                                                                to="/"
                                                                text="الصفحة الرئيسية"
                                                            />
                                                            <div className="w-full px-4">
                                                                <div className="h-1 bg-secondary-container smooth w-full rounded-md"></div>
                                                            </div>
                                                            <NavbarMenuItem
                                                                to="/me/user/"
                                                                text={`اهلًا ${
                                                                    user && user.full_name
                                                                }`}
                                                            />
                                                            {isCommunity ? (
                                                                <NavbarMenuItem
                                                                    icon="ic:twotone-group"
                                                                    // to="profile"
                                                                    to="/community"
                                                                    text="منتدى الطلبة"
                                                                />
                                                            ) : (
                                                                ""
                                                            )}
                                                            {isChargeInsertAuto ? (
                                                                <NavbarMenuItem
                                                                    icon="ri:qr-scan-line"
                                                                    // to="profile"
                                                                    to="/me/user/charge_insert_auto"
                                                                    text="شحن كود "
                                                                />
                                                            ) : (
                                                                ""
                                                            )}
                                                            <NavbarMenuItem
                                                                icon="carbon:user-avatar-filled"
                                                                // to="profile"
                                                                to="/me/user/"
                                                                text="حسابي"
                                                            />
                                                            {isWalletEnabled ? (
                                                                <NavbarMenuItem
                                                                    icon="solar:wallet-bold-duotone"
                                                                    // to="profile"
                                                                    to="/me/user/wallet"
                                                                    text="محفظتي"
                                                                />
                                                            ) : (
                                                                ""
                                                            )}
                                                            {isCourseRenamedToMonthlySubscriptions ? (
                                                                <NavbarMenuItem
                                                                    icon="ph:books-duotone"
                                                                    // to="profile"
                                                                    to="/me/user/monthly_courses"
                                                                    text="موادي"
                                                                />
                                                            ) : (
                                                                ""
                                                            )}
                                                            <NavbarMenuItem
                                                                icon="ph:book-open-duotone"
                                                                // to="profile"
                                                                to="/me/user/courses"
                                                                text="كورساتي"
                                                            />
                                                            <NavbarMenuItem
                                                                icon="icomoon-free:exit"
                                                                to="/logout"
                                                                text="تسجيل خروج"
                                                            />
                                                        </>
                                                    }
                                                />
                                                <NavbarMenu
                                                    containerClassName=""
                                                    menuButton={
                                                        <>
                                                            <span className="sr-only">
                                                                View notifications
                                                            </span>
                                                            <BellIcon className="h-6 w-6" />
                                                        </>
                                                    }
                                                    menuButtonClassName={""}
                                                    menuItems={
                                                        <>
                                                            <NavbarNotification />
                                                        </>
                                                    }
                                                />
                                                {isWalletEnabled ? (
                                                    <Link to="/me/user/wallet">
                                                        <div className="">
                                                            <div className="rounded-full bg-slate-900 dark:bg-slate-100 smooth flex flex-row flex-center-both overflow-hidden">
                                                                <div className="text-slate-100 font-h3 bg-slate-500 dark:text-slate-900 smooth rounded-full md:px-2 md:py-2 py-2 px-1">
                                                                    <CenterIcon
                                                                        icon={
                                                                            "solar:wallet-bold-duotone"
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="text-slate-100 dark:text-slate-900 smooth md:pb-0.5 font-small md:px-2 px-1">
                                                                    {printUnit(
                                                                        currentBalance,
                                                                        "جنيه"
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ) : (
                                                    ""
                                                )}
                                            </NavbarRow>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {!authToken && (
                            <ShowingTransition>
                                <Disclosure.Panel
                                    className={`${disclosureColorClassName} text-white rounded-xl mt-1 md:hidden block ar`}
                                >
                                    <div className="px-4 pt-4 pb-5 space-y-4">
                                        <DisclosureRegisterComponent />
                                        <DisclosureLoginComponent />
                                    </div>
                                </Disclosure.Panel>
                            </ShowingTransition>
                        )}
                    </div>
                    <CelebrateNotifiction />
                </>
            )}
        </Disclosure>
    );
};

export default Navbar;
