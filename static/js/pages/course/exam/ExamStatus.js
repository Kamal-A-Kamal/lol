import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams, useNavigate, useLocation } from "react-router-dom";
import ExamContext from "../../../context/ExamContext";
import { padstart2 } from "../../../utils/time";
import Button from "../../../components/ui/Button";
import { isObjectEmpty } from "../../../utils/objects";
import LoadingIcon from "../../../components/ui/LoadingIcon";

const ExamStatus = ({ handleResume, handleSubmit }) => {
    const { exam, minutes, seconds, questions, startExam, submitLoading, examStarted } =
        useContext(ExamContext);
    const [selected, setSelected] = useState(0);
    const [opened, setOpened] = useState(0);

    const { question_id } = useParams();

    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        if (!question_id && startExam) {
            if (examStarted && questions.length > 0) {
                navigate("./questions/0");
                setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 100);
            } else {
                window.location.reload();
            }
            // console.log(false);
            // setStartExam(false);
            // setExam(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [examStarted, question_id, questions.length, startExam]);

    useEffect(() => {
        if (questions.length > 0) {
            let selectedCount = 0;
            let openedCount = 0;
            questions.forEach((element) => {
                if (element.selected_answer) {
                    selectedCount++;
                    openedCount++;
                } else if (element.opened) {
                    openedCount++;
                }
            });
            setSelected(selectedCount);
            setOpened(openedCount);
        }
    }, [questions.length, questions, location.pathname]);

    const handleNavigate = (forward) => {
        if (questions.length < 1) return;
        let forwardTo = "";
        if (forward) {
            if (parseInt(question_id) + 1 === questions.length) {
                forwardTo = "questions/0";
            } else {
                forwardTo = "questions/" + (parseInt(question_id) + 1);
            }
        } else {
            if (parseInt(question_id) === 0) {
                forwardTo = "questions/" + (questions.length - 1);
            } else {
                forwardTo = "questions/" + (parseInt(question_id) - 1);
            }
        }
        navigate(forwardTo);
    };
    return (
        <>
            {!isObjectEmpty(exam) && startExam ? (
                <div className="flex-center-both">
                    <div className="rounded-md bg-third-container px-5 py-2 shadow-md w-full max-w-2xl space-y-3 smooth clr-text-primary border border-secondary-container">
                        {questions.length > 0 ? (
                            <>
                                <div className="flex-center-both">
                                    <div className="bg-rose-500 rounded-md font-w-bold font-com font-h3 en space-y-1 px-3 clr-white pt-1 pb-2">
                                        <div className="bg-third-container font-smaller font-alm flex-center-both rounded-md px-2 pb-1 clr-text-secondary smooth">
                                            : باقي من الزمن
                                        </div>
                                        <div className="flex space-x-2 flex-center-both">
                                            <div>{padstart2(minutes)}</div>
                                            <div className="font-com -mt-0.5">:</div>
                                            <div>{padstart2(seconds)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full max-w-xs mx-auto py-3 space-y-5">
                                    <Button
                                        color="blue"
                                        className="w-full"
                                        isLoading={submitLoading}
                                        onClick={handleSubmit}
                                    >
                                        إنهاء الاختبار
                                    </Button>
                                    {exam.sectionable.is_continuable ? (
                                        <Button
                                            color="yellow"
                                            isLoading={submitLoading}
                                            className="w-full"
                                            onClick={handleResume}
                                        >
                                            استكمال االإختبار لاحقًا
                                        </Button>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="flex-center-both flex-col max-w-xs mx-auto space-y-2">
                                    <div className="flex justify-between w-full">
                                        <div>عدد الاسئلة :</div>
                                        <div className="flex-center-both">
                                            <div className="rounded-md bg-primary-container smooth clr-text-primary px-2 py-1">
                                                {questions.length}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div>عدد الاسئلة التي تم فتحها :</div>
                                        <div className="flex-center-both">
                                            <div className="rounded-md bg-yellow-500 clr-white px-2 py-1">
                                                {opened}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div>عدد الاسئلة غير المحلولة :</div>
                                        <div className="flex-center-both">
                                            <div className="rounded-md bg-rose-500 clr-white px-2 py-1">
                                                {opened - selected}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <div>عدد الاسئلة المحلولة :</div>
                                        <div className="flex-center-both">
                                            <div className="rounded-md bg-blue-500 clr-white px-2 py-1">
                                                {selected}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-px max-w-sm w-full bg-text-secondary smooth mx-auto opacity-50"></div>
                                    <div className="flex justify-between w-full">
                                        <div>السؤال الحالي :</div>
                                        <div className="flex-center-both">
                                            <div className="rounded-md bg-primary-container smooth clr-text-primary px-2 py-1 border-2 border-rose-500">
                                                {question_id ? parseInt(question_id) + 1 : ""}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-1 ">
                                    {questions.length > 0 &&
                                        questions.map((value, index) => {
                                            return (
                                                <NavLink
                                                    className={({ isActive }) =>
                                                        `smooth ${
                                                            isActive
                                                                ? "rounded-lg border-2 border-blue-500 border-opacity-100"
                                                                : "rounded-lg border-2 border-opacity-0 border-slate-300 dark:border-slate-900 dark:border-opacity-0"
                                                        }`
                                                    }
                                                    to={`questions/${index}`}
                                                    key={index}
                                                >
                                                    <div
                                                        className={`rounded-md ${
                                                            value.selected_answer
                                                                ? "bg-blue-400"
                                                                : value.opened
                                                                ? "bg-rose-500"
                                                                : "bg-slate-400"
                                                        } clr-white hover-shadow flex-center-both smooth`}
                                                    >
                                                        {index + 1}
                                                    </div>
                                                </NavLink>
                                            );
                                        })}
                                </div>
                                <div className="h-px max-w-sm w-full bg-text-secondary smooth mx-auto opacity-50"></div>
                                <div className="">
                                    <div className="flex-center-both space-x-4 space-x-reverse">
                                        <Button onClick={() => handleNavigate(false)}>
                                            السابق
                                        </Button>
                                        <Button
                                            onClick={() => handleNavigate(true)}
                                            className="px-6 py-2"
                                        >
                                            التالي
                                        </Button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <span className="flex space-x-reverse space-x-4 font-h3 flex-center-both w-full py-5">
                                    <LoadingIcon className={"font-h1 text-blue-500"} />
                                    <span className="">يتم الآن تحميل الاسئلة</span>
                                </span>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default ExamStatus;
