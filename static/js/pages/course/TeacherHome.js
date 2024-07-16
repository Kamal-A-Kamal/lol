import React, { useContext } from "react";
import TeacherContext from "../../context/TeacherContext";
import Container from "../../components/ui/Container";
import TeacherInfoSection from "../../sections/course/TeacherInfoSection";
import SubscriptionInstructionComponent from "./SubscriptionInstructionComponent";
import SubjectsGrid from "../../sections/home/CoursesSection/SubjectsGrid";
import Categorie from "../../sections/home/CoursesSection/Categorie";
import { isSubscribeBySubjectTeacher } from "../../services/defaultSettings";
import AuthContext from "../../context/AuthContext";

const TeacherHome = () => {
    const { teacher } = useContext(TeacherContext);
    const { user, token } = useContext(AuthContext);

    return (
        <Container className="relative py-0">
            <div className="flex flex-col md:flex-row-reverse space-y-10 md:space-y-0 md:space-x-10">
                <div className=" md:basis-1/3 relative -mt-52">
                    <TeacherInfoSection />
                </div>
                <div className=" md:basis-2/3">
                    {isSubscribeBySubjectTeacher ? (
                        <SubscriptionInstructionComponent isSubject={false} />
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <div className="w-full">
                {/* <TeachersGrid subjectId={subject.id} isSubject={false} /> */}
                {isSubscribeBySubjectTeacher ? (
                    <SubjectsGrid teacherId={teacher.id} isTeacher={true} />
                ) : (
                    ""
                )}
                <Categorie
                    titleFirst="الاشتراك الشهري"
                    titleLast="للمدرس"
                    api={`/api/teachers/${teacher.id}/renamed_only${
                        token ? `/years/${user.year}/courses` : `/courses`
                    }`}
                />
                <Categorie
                    titleFirst="كورسات منفصلة"
                    titleLast="للمدرس"
                    api={`/api/teachers/${teacher.id}/not_renamed_only${
                        token ? `/years/${user.year}/courses` : `/courses`
                    }`}
                />
            </div>
        </Container>
    );
};

export default TeacherHome;
