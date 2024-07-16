import React from "react";

import Container from "../../components/ui/Container";

import CourseInfoSection from "../../sections/course/CourseInfoSection";
import CourseDescSection from "../../sections/course/CourseDescSection";

const CourseHome = () => {
    return (
        <Container className="relative py-0">
            <div className="flex flex-col md:flex-row-reverse space-y-10 md:space-y-0 md:space-x-10">
                <div className=" md:basis-1/3 relative -mt-52">
                    <CourseInfoSection />
                </div>
                <div className=" md:basis-2/3">
                    <CourseDescSection />
                </div>
            </div>
        </Container>
    );
};

export default CourseHome;
