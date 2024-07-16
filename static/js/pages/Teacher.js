import React, { useContext, useEffect } from "react";
import { isObjectEmpty } from "../utils/objects";
import page from "../services/pageServices";
import http from "../services/httpServices";
import auth from "../services/authServices";
import TeacherContext from "../context/TeacherContext";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Container from "../components/ui/Container";
import TeacherHeaderSection from "../sections/course/TeacherHeaderSection";
import { motion } from "framer-motion";
import LoadingIcon from "../components/ui/LoadingIcon";

const Teacher = () => {
    const { teacher, setTeacher } = useContext(TeacherContext);
    const navigate = useNavigate();
    const { id } = useParams();

    const getSubject = async () => {
        const token = auth.getToken();
        const config = auth.getAuthConfig(token);
        try {
            const { data } = await http.get(`/api/user/teachers/${id}`, config);
            setTeacher({});
            setTeacher(data);
        } catch (error) {
            // navigate("/404-not-found");
        }
    };

    useEffect(() => {
        getSubject();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const currentTitle = page.getCurrentTitle();
        let title = !isObjectEmpty(teacher) ? "صفحة المدرس : " + teacher.name : "صفحة المدرس";
        page.setTitle(title);
        return () => {
            page.setTitle(currentTitle);
        };
    }, [teacher]);
    return (
        <>
            <div className="bg-outer-container smooth clr-text-primary negative-nav-margin posisitve-nav-padding-top">
                <Container className="py-10 pb-10">
                    <TeacherHeaderSection />
                    {isObjectEmpty(teacher) && (
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

                    {!isObjectEmpty(teacher) && <Outlet />}
                </Container>
            </div>
        </>
    );
};

export default Teacher;
