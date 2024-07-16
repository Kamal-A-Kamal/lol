import React, { useEffect, useState } from "react";
import auth from "../../../services/authServices";
import http from "../../../services/httpServices";
import LoadingIcon from "../../../components/ui/LoadingIcon";
import TeacherCard from "../../../components/ui/TeacherCard";

const TeachersGrid = ({ department_id = 0, subjectId = 0, isSubject = false }) => {
    const [teachers, setTeachers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getTeachers = async () => {
        setIsLoading(true);
        const token = auth.getToken();
        const config = auth.getAuthConfig(token);

        let result;
        // console.log(subjectId);
        if (isSubject) {
            result = await http.get(`api/subjects/${subjectId}/teachers`, config);
            // console.log(subjectId);
        } else {
            result = await http.get(`api/departments/${department_id}/teachers`, config);
        }

        const { data } = result;

        setTeachers([]);
        setTeachers(data);
        setIsLoading(false);
        // console.log(data);
    };
    useEffect(() => {
        if (department_id > 0 || subjectId > 0) {
            getTeachers();
        }
    }, [department_id, subjectId]);

    return (
        <>
            {isLoading ? (
                <div className="flex-center-both">
                    <div className="border-2 rounded-md border-blue-300 dark:border-blue-500 p-10 bg-blue-100 dark:bg-opacity-5 smooth clr-text-primary flex space-x-2 space-x-reverse">
                        <LoadingIcon className="font-h1 text-blue-500" />
                        <span>يتم الآن تحميل المدرسين ...</span>
                    </div>
                </div>
            ) : teachers.length < 1 ? (
                <div className="flex-center-both">
                    <div className="border-2 rounded-md border-rose-300 dark:border-rose-500 p-10 bg-rose-100 dark:bg-opacity-5 smooth clr-text-primary">
                        سيتم اضافة مدرسين داخل هذه الشبعة قريبًا
                    </div>
                </div>
            ) : (
                <div
                    className={`g-teal-400 smooth clr-text-primary drk:bg-teal-800 bg-opacity-50 dark:bg-opacity-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10 gap-4 items-cent`}
                >
                    {teachers.map((teacher) => {
                        return <TeacherCard key={teacher.id} {...teacher} />;
                        // return <SubjectCard key={teacher.id} {...teacher} />;
                    })}
                </div>
            )}
        </>
    );
};

export default TeachersGrid;
