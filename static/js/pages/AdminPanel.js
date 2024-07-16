/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";

import "./admin.css";

import HeaderSection from "../components/ui/HeaderSection";

import Container from "../components/ui/Container";
import { Outlet, useLocation } from "react-router-dom";
import SideNav from "../sections/admin/SideNav";
import { Disclosure } from "@headlessui/react";
import { adminPanelColor, isMultiAdmin } from "../services/defaultSettings";
import { page } from "../services/pageServices";
import { adminPages } from "../services/adminServices";
import AuthContext from "../context/AuthContext";
import auth from "../services/authServices";
import http from "../services/httpServices";
import { handleFormErrors } from "../services/formServices";
import useMediaQuery from "../hooks/useMediaQuery";
import ThemeContext from "../context/ThemeContext";

const AdminPanel = () => {
    const screenWidth = window.innerWidth;
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { isOpen, toggleSideNav } = useContext(ThemeContext);

    const location = useLocation();
    const { allowedPages, setAllowedPages } = useContext(AuthContext);

    const getAdminPages = async () => {
        try {
            const token = auth.getAdminToken();
            let config = auth.getAdminAuthConfig(token);
            const result = await http.get("api/admin_pages_allow", config);
            setAllowedPages(result["data"]);
        } catch ({ response }) {
            handleFormErrors(response, setIsLoading, setErrors);
        }
    };

    let adminAllowedPages = adminPages;
    if (isMultiAdmin) {
        adminAllowedPages = adminAllowedPages.filter((page) => {
            if (!page.available && page.type == "page") {
                if (allowedPages?.includes(page.to)) return page;
            } else return page;
        });
    }
    useEffect(() => {
        if (!allowedPages && isMultiAdmin) {
            getAdminPages();
        }
    }, []);

    useEffect(() => {
        const locationSegments = location.pathname.split("/");

        const isLastSegment = adminAllowedPages.filter(
            (element) => element.to === locationSegments[locationSegments.length - 1]
        );

        const isBeforeLastSegment = adminAllowedPages.filter(
            (element) => element.to === locationSegments[locationSegments.length - 2]
        );

        let pageTitle = "";
        if (isLastSegment.length > 0 && isBeforeLastSegment.length < 1) {
            pageTitle = isLastSegment[0]["text"];
        } else if (isBeforeLastSegment.length > 0) {
            pageTitle = isBeforeLastSegment[0]["text"];
        }

        const currentTitle = page.getCurrentTitle();
        let title = "لوحة التحكم - " + pageTitle;
        page.setTitle(title);
        return () => {
            page.setTitle(currentTitle);
        };
    }, [location]);
    return (
        <div className="relative">
            <div className="w-screen flex">
                <Disclosure defaultOpen={screenWidth > 768}>
                    {({ open }) => (
                        <div className="hidden lg:flex relative shrink-0">
                            <SideNav
                                open={open}
                                color={adminPanelColor}
                                isFixed={true}
                                pages={adminAllowedPages}
                            />
                            {screenWidth > 768 ? (
                                <SideNav
                                    open={open}
                                    color={adminPanelColor}
                                    isFixed={false}
                                    pages={adminAllowedPages}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    )}
                </Disclosure>
                <div
                    className={`bg-outer-container min-h-screen smooth clr-text-primary w-full overflow-auto`}
                >
                    <Container>
                        <HeaderSection />
                        <Container>
                            <div className="-mt-40 z-10 relative">
                                <Outlet />
                            </div>
                        </Container>
                    </Container>
                </div>
            </div>
            {!isDesktop && (
                <>
                    <div
                        className={`${
                            !isOpen && "hidden "
                        } w-full absolute bg-[rgba(0,0,0,0.5)] top-0 h-full z-30`}
                        onClick={toggleSideNav}
                    ></div>
                    <Disclosure defaultOpen={true}>
                        {({ open }) => (
                            <SideNav
                                className={`${!isOpen && "hidden "} top-[5rem] `}
                                open={open}
                                color={adminPanelColor}
                                isFixed={true}
                                pages={adminAllowedPages}
                            />
                        )}
                    </Disclosure>
                </>
            )}
        </div>
    );
};

export default AdminPanel;
