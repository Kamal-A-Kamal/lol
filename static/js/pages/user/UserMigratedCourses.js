import React from "react";
import Categorie from "../../sections/home/CoursesSection/Categorie";

const UserMigratedCourses = () => {
    return (
        <div className="relative mb-20 overflow-hidden" id="courses">
            <Categorie
                api={`/api/sellables/migrated_subscribed`}
                grid="small"
                noCoursesPlaceholder="لا يوجد لديك كورسات من الأكواد حتى الآن"
            />
        </div>
    );
};

export default UserMigratedCourses;
