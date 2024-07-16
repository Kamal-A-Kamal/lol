import React, { useContext } from "react";
import TeacherContext from "../../context/TeacherContext";
import { isObjectEmpty } from "../../utils/objects";
import CourseDescItem from "../../components/items/CourseDescItem";
import { printUnit } from "../../utils/ar";
import SubscriptionInstructionText from "../../pages/course/SubscriptionInstructionText";
import { baseURL } from "../../config";
import { isSubscribeBySubjectTeacher } from "../../services/defaultSettings";

const TeacherInfoSection = () => {
    const { teacher } = useContext(TeacherContext);

    return (
        <>
            {!isObjectEmpty(teacher) && (
                <div className="w-full glassy smooth clr-text-primary shadow-large rounded-lg overflow-hidden">
                    <div className="p-4 space-y-8">
                        <div className="overflow-hidden rounded-md">
                            <img src={`${baseURL}/${teacher.picture}`} alt="course" />
                        </div>

                        <div className="font-small">
                            <CourseDescItem
                                title="عدد المواد"
                                value={`+ ${teacher.subjects_count}`}
                                valueName={printUnit(teacher.subjects_count, "مدرس").split(" ")[1]}
                                icon="icon-park-twotone:time"
                            />
                            <CourseDescItem
                                title="عدد الكورسات"
                                value={`+ ${teacher.courses_count}`}
                                valueName={printUnit(teacher.courses_count, "كورس").split(" ")[1]}
                                icon="ant-design:question-circle-twotone"
                                isLast={true}
                            />
                            <div className="py-4 space-y-2">
                                {isSubscribeBySubjectTeacher ? (
                                    <SubscriptionInstructionText isSubject={false} />
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TeacherInfoSection;
