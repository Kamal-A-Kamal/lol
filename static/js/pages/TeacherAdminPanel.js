import React, { useEffect, useContext, useState } from "react";

import "./admin.css";

import HeaderSection from "../components/ui/HeaderSection";

import Container from "../components/ui/Container";
import { Outlet, useLocation } from "react-router-dom";
import SideNav from "../sections/admin/SideNav";
import { Disclosure } from "@headlessui/react";
import { adminPanelColor } from "../services/defaultSettings";
import { page } from "../services/pageServices";
import Button from "../components/ui/Button";
import useMediaQuery from "../hooks/useMediaQuery";
import ThemeContext from "../context/ThemeContext";
import { teacherPages } from "../services/teacherSubadminServices";

const TeacherAdminPanel = () => {
    const screenWidth = window.innerWidth;
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    const { isOpen, toggleSideNav } = useContext(ThemeContext);

    const location = useLocation();
    let teacherAllowedPages = teacherPages;

    useEffect(() => {
        const locationSegments = location.pathname.split("/");

        const isLastSegment = teacherAllowedPages.filter(
            (element) => element.to === locationSegments[locationSegments.length - 1]
        );

        const isBeforeLastSegment = teacherAllowedPages.filter(
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
        <div className="relative negative-nav-margin">
            <div className="w-screen flex">
                <Disclosure defaultOpen={screenWidth > 768}>
                    {({ open }) => (
                        <div className="hidden lg:flex relative shrink-0">
                            <SideNav
                                open={open}
                                color={adminPanelColor}
                                isFixed={true}
                                pages={teacherAllowedPages}
                            />
                            {screenWidth > 768 ? (
                                <SideNav
                                    open={open}
                                    color={adminPanelColor}
                                    isFixed={false}
                                    pages={teacherAllowedPages}
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
                        <HeaderSection>
                            <div className="flex-center-both relative">
                                <Button
                                    className="absolute z-10"
                                    color="yellow"
                                    element="Link"
                                    to="/home"
                                >
                                    الصفحة الرئيسية للمنصة
                                </Button>
                            </div>
                        </HeaderSection>
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
                                className={`${!isOpen && "hidden "} top-0 `}
                                open={open}
                                color={adminPanelColor}
                                isFixed={true}
                                pages={teacherAllowedPages}
                            />
                        )}
                    </Disclosure>
                </>
            )}
        </div>
    );
};

export default TeacherAdminPanel;
