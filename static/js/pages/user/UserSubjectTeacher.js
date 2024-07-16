import React from "react";
import SubjectTeacherGrid from "../../sections/home/CoursesSection/SubjectTeacherGrid";

const UserSubjectTeacher = () => {
    return (
        <div className="relative mb-20 overflow-hidden" id="courses">
            <div className="">
                <SubjectTeacherGrid api={"api/sellables/subject_teacher_subscribed"} grid="small" />
            </div>
        </div>
    );
};

export default UserSubjectTeacher;
