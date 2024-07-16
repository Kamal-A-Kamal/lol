// import { AnimatePresence, motion } from "framer-motion";
import { motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import http from "../services/httpServices";

import Container from "../components/ui/Container";
import LoadingIcon from "../components/ui/LoadingIcon";

import ContentSection from "../sections/course/ContentSection";
import CourseHeaderSection from "../sections/course/CoursesHeaderSection";
import CourseContext from "../context/CourseContext";
// import authContext from "../context/AuthContext";
import auth from "../services/authServices";

import { isObjectEmpty } from "../utils/objects";
import page from "../services/pageServices";

export const Course = () => {
    const { course, setCourse } = useContext(CourseContext);

    const navigate = useNavigate();
    const { id } = useParams();

    const getCourse = async () => {
        const token = auth.getToken();
        const config = auth.getAuthConfig(token);
        try {
            const { data } = await http.get(`/api/sellables/${id}`, config);
            data.total_videos_duration = Math.ceil(data.total_videos_duration / 60);
            setCourse({});
            setCourse(data);
        } catch (error) {
            navigate("/404-not-found");
        }
    };

    useEffect(() => {
        getCourse();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const currentTitle = page.getCurrentTitle();
        let title = !isObjectEmpty(course) ? "صفحة الكورس : " + course.name : "صفحة الكورس";
        page.setTitle(title);
        return () => {
            page.setTitle(currentTitle);
        };
    }, [course]);
    return (
        <>
            <div className="bg-outer-container smooth clr-text-primary negative-nav-margin posisitve-nav-padding-top">
                <Container className="py-10 pb-10">
                    <CourseHeaderSection />
                    {/* <AnimatePresence exitBeforeEnter> */}
                    {isObjectEmpty(course) && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="relative z-10 negative-nav-margin grow w-full flex-center-both font-h2 col-span-1 md:col-span-2 lg:col-span-3">
                                <span className="flex-center-both space-x-3 space-x-reverse bg-teal-500 px-28 py-12 clr-white rounded-2xl">
                                    <LoadingIcon
                                        className={"font-big text-teal-800 dark:text-teal-400"}
                                    />
                                    <span>يتم الآن تحميل بيانات الكورس.....</span>
                                </span>
                            </div>
                        </motion.div>
                    )}

                    {!isObjectEmpty(course) && <Outlet />}
                    {/* </AnimatePresence> */}

                    <ContentSection />
                </Container>
            </div>
        </>
    );
};

export default Course;
