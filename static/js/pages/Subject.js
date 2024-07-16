import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import SubjectContext from "../context/SubjectContext";
import auth from "../services/authServices";
import http from "../services/httpServices";
import page from "../services/pageServices";
import { isObjectEmpty } from "../utils/objects";
import Container from "../components/ui/Container";
import LoadingIcon from "../components/ui/LoadingIcon";
import { motion } from "framer-motion";
import SubjectHeaderSection from "../sections/course/SubjectHeaderSection";

const Subject = () => {
    const { subject, setSubject } = useContext(SubjectContext);
    const navigate = useNavigate();
    const { id } = useParams();

    const getSubject = async () => {
        const token = auth.getToken();
        const config = auth.getAuthConfig(token);
        try {
            const { data } = await http.get(`/api/user/subjects/${id}`, config);
            setSubject({});
            setSubject(data);
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
        let title = !isObjectEmpty(subject) ? "صفحة المادة : " + subject.name : "صفحة المادة";
        page.setTitle(title);
        return () => {
            page.setTitle(currentTitle);
        };
    }, [subject]);
    return (
        <>
            <div className="bg-outer-container smooth clr-text-primary negative-nav-margin posisitve-nav-padding-top">
                <Container className="py-10 pb-10">
                    <SubjectHeaderSection />
                    {isObjectEmpty(subject) && (
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

                    {!isObjectEmpty(subject) && <Outlet />}

                    {/* <ContentSection /> */}
                </Container>
            </div>
        </>
    );
};

export default Subject;
