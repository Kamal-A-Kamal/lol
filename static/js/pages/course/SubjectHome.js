import React, { useContext } from "react";
import Container from "../../components/ui/Container";
import SubjectContext from "../../context/SubjectContext";
import SubjectInfoSection from "../../sections/course/SubjectInfoSection";
import Categorie from "../../sections/home/CoursesSection/Categorie";
import SubscriptionInstructionComponent from "./SubscriptionInstructionComponent";
import TeachersGrid from "../../sections/home/CoursesSection/TeachersGrid";
import { isSubscribeBySubjectTeacher } from "../../services/defaultSettings";

const SubjectHome = () => {
    const { subject } = useContext(SubjectContext);

    return (
        <Container className="relative py-0">
            <div className="flex flex-col md:flex-row-reverse space-y-10 md:space-y-0 md:space-x-10">
                <div className=" md:basis-1/3 relative">
                    <SubjectInfoSection />
                </div>
                <div className=" md:basis-2/3">
                    {isSubscribeBySubjectTeacher ? (
                        <SubscriptionInstructionComponent isSubject={true} />
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <div className="w-full">
                <TeachersGrid subjectId={subject.id} isSubject={true} />
                <Categorie
                    titleFirst="كورسات"
                    titleLast="المادة"
                    api={`/api/subjects/${subject.id}/courses`}
                />
            </div>
        </Container>
    );
};

export default SubjectHome;
