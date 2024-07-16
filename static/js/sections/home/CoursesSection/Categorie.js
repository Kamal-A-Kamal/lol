import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";

import http from "../../../services/httpServices";

import Container from "../../../components/ui/Container";
import LoadingIcon from "../../../components/ui/LoadingIcon";
import SideTitle from "../../../components/ui/SideTitle";
import CourseCard from "../../../components/ui/CourseCard";
import auth from "../../../services/authServices";
import Button from "../../../components/ui/Button";
import CenterIcon from "../../../components/ui/CenterIcon";
import { isCollapseCategories } from "../../../services/defaultSettings";

const Categorie = ({
    titleFirst = false,
    titleLast,
    api = ``,
    className = "",
    grid = "normal",
    noCoursesPlaceholder = `سيتم إضافه ${titleFirst} ${titleLast} قريبا`,
    coursesList = false,
    isPrepaid = false,
    onPrepaidClick = null,
    isToHide = true,
}) => {
    const [courses, setCourses] = useState([]);
    const [showCourses, setShowCourses] = useState(!isToHide || !isCollapseCategories);

    if (!className.includes("space-x")) {
        if (grid === "normal") {
            className += ` grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10`;
        } else {
            className += ` grid-cols-1 lg:grid-cols-2 gap-5`;
        }
    }

    const [placeholder, setPlaceholder] = useState(
        <div className="font-h2 col-span-1 md:col-span-2 lg:col-span-3 py-20">
            <span className="flex-center-both space-x-3 space-x-reverse">
                <LoadingIcon className={"font-h1 text-teal-600 dark:text-teal-400"} />
                <span>يتم الآن تحميل الكورسات</span>
            </span>
        </div>
    );

    const getCourses = async (getAll = false) => {
        try {
            const token = auth.getToken();
            const config = auth.getAuthConfig(token);
            const { data } = await http.get(api, config);

            setCourses([]);
            setCourses(data);
        } catch (error) {}
        setPlaceholder(
            <div className="font-h2 col-span-1 md:col-span-2 lg:col-span-3 py-20">
                <span className="flex-center-both space-x-3 space-x-reverse">
                    <span className="font-h1 flex-center-both text-rose-600 dark:text-rose-400">
                        <Icon icon="carbon:data-error" />
                    </span>
                    <span>{noCoursesPlaceholder}</span>
                </span>
            </div>
        );
    };

    useEffect(() => {
        if (coursesList) {
            setCourses(coursesList);
        } else {
            getCourses();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coursesList]);

    return (
        <Container>
            {titleFirst ? (
                <div className="flex items-center md:space-x-20 md:space-x-reverse flex-col md:flex-row space-y-8 md:space-y-0">
                    <div onClick={() => getCourses(true)} className="cursor-pointer w-max flex ">
                        <SideTitle first={titleFirst} last={titleLast} />
                    </div>
                    {isToHide && isCollapseCategories ? (
                        <div className="pt-2">
                            <Button
                                className="flex-center-both space-x-2 space-x-reverse border-rose-500 text-rose-500 smooth group bg- border-0 underline"
                                onClick={() => setShowCourses(!showCourses)}
                            >
                                <span className="">عرض الكورسات</span>
                                <CenterIcon
                                    className={`transform smooth text-rose-500 ${
                                        showCourses ? "pb-1 -rotate-180 " : "pt-0.5 rotate-0"
                                    }`}
                                    icon="bxs:up-arrow"
                                />
                            </Button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                ""
            )}

            {showCourses ? (
                <div
                    className={`g-teal-400 smooth clr-text-primary drk:bg-teal-800 bg-opacity-50 dark:bg-opacity-50 grid ${className}`}
                >
                    <>
                        {courses.length > 0
                            ? courses.map((course) => {
                                  return (
                                      <CourseCard
                                          key={course.id}
                                          {...course}
                                          isPrepaid={isPrepaid}
                                          onPrepaidClick={onPrepaidClick}
                                      />
                                  );
                              })
                            : placeholder}
                    </>
                </div>
            ) : (
                <div className="flex-center-both">
                    <div
                        className="bg-slate-500 border-slate-500 clr-text-primary smooth px-20 py-t-2 pb-2 font-h1 bg-opacity-5 rounded-md border-2 cursor-pointer"
                        onClick={() => setShowCourses(!showCourses)}
                    >
                        ....
                    </div>
                </div>
            )}
        </Container>
    );
};

export default Categorie;
