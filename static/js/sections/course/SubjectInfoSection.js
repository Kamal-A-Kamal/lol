import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import SubjectContext from "../../context/SubjectContext";
import auth from "../../services/authServices";
import modal from "../../services/modalServices";
import { isObjectEmpty } from "../../utils/objects";
import { printUnit } from "../../utils/ar";
import CourseItemsCounter from "../../components/items/CourseItemsCounter";
import CourseDescItem from "../../components/items/CourseDescItem";
import SubscriptionInstructionText from "../../pages/course/SubscriptionInstructionText";
import { isSubscribeBySubjectTeacher } from "../../services/defaultSettings";

const SubjectInfoSection = () => {
    const token = auth.getToken();

    const { subject } = useContext(SubjectContext);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    let location = useLocation();
    return (
        <>
            {!isObjectEmpty(subject) && (
                <div className="w-full glassy smooth clr-text-primary shadow-large rounded-lg overflow-hidden">
                    <div className="p-4 space-y-8">
                        <div className="font-small">
                            <CourseDescItem
                                title="عدد المدرسين"
                                value={`+ ${subject.teachers_count}`}
                                valueName={printUnit(subject.teachers_count, "مدرس").split(" ")[1]}
                                icon="icon-park-twotone:time"
                            />
                            <CourseDescItem
                                title="عدد الكورسات"
                                value={`+ ${subject.courses_count}`}
                                valueName={printUnit(subject.courses_count, "كورس").split(" ")[1]}
                                icon="ant-design:question-circle-twotone"
                                isLast={true}
                            />
                            <div className="py-4 space-y-2">
                                {isSubscribeBySubjectTeacher ? (
                                    <SubscriptionInstructionText isSubject={true} />
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

export default SubjectInfoSection;
