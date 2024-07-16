import React, { useContext, useState } from "react";

import MainSection from "../sections/home/MainSection";
import { ScrollingProvider } from "../context/ScrollingContext";

import YearsSection from "../sections/home/YearsSection";

import AboutSection from "../sections/home/AboutSection";
import AuthContext from "../context/AuthContext";
import auth from "../services/authServices";
import { useNavigate } from "react-router-dom";
import CoursesSection from "../sections/home/CoursesSection/CoursesSection";

const Home = () => {
    // const [isAuth, setIsAuth] = useState(false);
    // const { user } = useContext(AuthContext);
    // if (auth.isAuth()) {
    //     setIsAuth(true);
    // }
    // const navigate = useNavigate();
    // const token = auth.getToken();
    // if (token) {
    //     if (user.year) {
    //         navigate(`/years/${user.year}`);
    //     }
    // }
    return (
        <>
            <MainSection />
            <ScrollingProvider>
                <AboutSection />
            </ScrollingProvider>

            <CoursesSection />
            {/* <YearsSection /> */}
        </>
    );
};

export default Home;
