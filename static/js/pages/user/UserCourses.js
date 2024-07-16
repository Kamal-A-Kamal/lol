import React from "react";
import Categorie from "../../sections/home/CoursesSection/Categorie";

const UserCourses = ({
    renamed = "",
    noCoursesPlaceholder = "انت غير مشترك بأي كورس حتى الآن!",
}) => {
    return (
        <div className="relative mb-20 overflow-hidden" id="courses">
            <Categorie
                api={`/api/sellables${
                    renamed === "not_renamed"
                        ? `/not_renamed/subscribed`
                        : `/only_renamed/subscribed`
                }`}
                grid="small"
                noCoursesPlaceholder={noCoursesPlaceholder}
            />
        </div>
    );
};

export default UserCourses;
