import React, { useEffect, useState } from "react";
import auth from "../../../services/authServices";
import http from "../../../services/httpServices";
import LoadingIcon from "../../../components/ui/LoadingIcon";
import SubjectTeacherCard from "../../../components/ui/SubjectTeacherCard";
import TeacherCard from "../../../components/ui/TeacherCard";

const SubjectTeacherGrid = ({
    department_id = 0,
    api = null,
    subjectId = 0,
    noSubjectTeacherPlaceHolder = "لا يوجد اشتراكات",
    grid = "normal",
    className = "",
}) => {
    const [subjectTeachers, setSubjectTeachers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    if (grid === "normal") {
        className += ` grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 `;
    } else {
        className += ` grid-cols-1 sm:grid-cols-2 gap-4`;
    }
    const getSubjectTeacher = async () => {
        setIsLoading(true);
        const token = auth.getToken();
        const config = auth.getAuthConfig(token);

        let result;
        // console.log(subjectId);
        if (api) {
            const token = auth.getToken();
            const config = auth.getAuthConfig(token);
            result = await http.get(api, config);
        } else {
            if (subjectId) {
                result = await http.get(`api/subjects/${subjectId}/teachers`, config);
                // console.log(subjectId);
            } else {
                result = await http.get(`api/departments/${department_id}/teachers`, config);
            }
        }

        const { data } = result;

        setSubjectTeachers([]);
        setSubjectTeachers(data);
        setIsLoading(false);
        // console.log(data);
    };
    useEffect(() => {
        if (department_id > 0 || subjectId > 0 || api) {
            getSubjectTeacher();
        }
    }, [department_id, api]);

    return (
        <>
            {isLoading ? (
                <div className="flex-center-both">
                    <div className="border-2 rounded-md border-blue-300 dark:border-blue-500 p-10 bg-blue-100 dark:bg-opacity-5 smooth clr-text-primary flex space-x-2 space-x-reverse">
                        <LoadingIcon className="font-h1 text-blue-500" />
                        <span>يتم الآن تحميل الاشتراكات ...</span>
                    </div>
                </div>
            ) : subjectTeachers.length < 1 ? (
                <div className="flex-center-both">
                    <div className="border-2 rounded-md border-rose-300 dark:border-rose-500 p-10 bg-rose-100 dark:bg-opacity-5 smooth clr-text-primary">
                        {noSubjectTeacherPlaceHolder}
                    </div>
                </div>
            ) : (
                <div
                    className={`g-teal-400 smooth clr-text-primary drk:bg-teal-800 bg-opacity-50 dark:bg-opacity-50 grid ${className} pb-10  items-cent`}
                >
                    {subjectTeachers.map((teacher) => (
                        <TeacherCard key={teacher.id} {...teacher} />
                    ))}
                </div>
            )}
        </>
    );
};

export default SubjectTeacherGrid;
