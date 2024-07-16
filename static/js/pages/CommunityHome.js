import React from "react";
import { Outlet } from "react-router-dom";
import HeaderSection from "../components/ui/HeaderSection";
import Container from "../components/ui/Container";

const CommunityHome = () => {
    return (
        <>
            <div className="bg-outer-container smooth clr-text-primary negative-nav-margin posisitve-nav-padding-top">
                <Container className="py-10 pb-10 space-y-0">
                    <HeaderSection></HeaderSection>
                </Container>
                <div className="w-full -mt-12 relative bg-primary-container shadow-medium rounded-md clr-text-primary smooth">
                    <Outlet />
                </div>
                <Container></Container>
            </div>
        </>
    );
};

export default CommunityHome;
