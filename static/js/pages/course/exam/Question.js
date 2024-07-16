import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CenterIcon from "../../../components/ui/CenterIcon";
import ExamContext from "../../../context/ExamContext";
import { baseURL } from "../../../config";
import modal from "../../../services/modalServices";
import LoadingIcon from "../../../components/ui/LoadingIcon";

const Question = () => {
    const { question_id } = useParams();
    const { questions, setQuestions, startExam, setStartExam, forwardedToExam, triggerSaving } =
        useContext(ExamContext);

    const [question, setQuestion] = useState(false);

    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [placeHolder, setPlaceHolder] = useState("");

    const [isDisabled, setIsDisabled] = useState(false);

    const [timer, setTimer] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        if (!forwardedToExam) {
            navigate("../", { replace: true });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forwardedToExam]);

    useEffect(() => {
        if (forwardedToExam && questions.length > 0) {
            const toSetQuestion = questions[question_id];
            toSetQuestion["opened"] = true;
            setQuestion(toSetQuestion);
            setSelectedAnswer(toSetQuestion.selected_answer);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questions, startExam]);

    useEffect(() => {
        if (forwardedToExam && question) {
            const currentQuestions = questions;
            setQuestions([]);
            currentQuestions[question_id] = question;
            setQuestions(currentQuestions);
            // setTimeout(() => {
            //     currentQuestions[question_id] = question;
            //     setQuestions(currentQuestions);
            // }, 50);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question]);

    useEffect(() => {
        const timeIntVal = setInterval(() => {
            const now = new Date().getTime();
            if (now - timer > 500) {
                setIsDisabled(false);
                clearInterval(timeIntVal);
            }
        }, 100);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggerSaving]);

    useEffect(() => {
        if (forwardedToExam && !startExam) {
            modal.message({
                icon: "",
                title: "بدأ الامتحان الآن !",
                buttons: {
                    confirm: "بدأ الامتحان",
                    cancel: "إلغاء",
                },
                callback: (e) => {
                    if (e && e !== "cancel") {
                        navigate("../questions/0");
                        window.scrollTo(0, 0);
                        setStartExam(true);
                    } else {
                        navigate("../", { replace: true });
                    }
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startExam]);

    const handleChange = ({ currentTarget }) => {
        setIsDisabled(true);
        setTimer(new Date().getTime());
        setSelectedAnswer(currentTarget.value);

        const currentQuestions = questions;
        setQuestions([]);
        currentQuestions[question_id] = { ...question, selected_answer: currentTarget.value };
        setTimeout(() => {
            setQuestions(currentQuestions);
        }, []);
    };
    return (
        <>
            {startExam && question ? (
                <div className="rounded-md shadow-lg p-10 space-y-6">
                    <div className="font-h2 font-w-bold flex space-x-2 space-x-reverse">
                        <CenterIcon
                            className="text-blue-400 font-h1"
                            icon={"line-md:question-circle-twotone"}
                        />
                        <div>{question["title"]}</div>
                    </div>
                    <div className="px-2 space-y-5 sm:space-y-0 flex sm:flex-row flex-col space-x-2 space-x-reverse">
                        <div
                            className={`${
                                question.picture ? "sm:basis-1/2 basis-full" : ""
                            } w-full space-y-1`}
                        >
                            <div
                                className={` flex font-h1 pb-1 -mt-4 text-blue-500 -mr-2 ${
                                    isDisabled ? "" : "opacity-0"
                                }`}
                            >
                                <LoadingIcon />
                            </div>
                            <div className="answer_group flex space-x-2 space-x-reverse">
                                <div className="flex-center-both">
                                    <input
                                        disabled={isDisabled}
                                        name={`question_${question.id}`}
                                        onChange={handleChange}
                                        checked={selectedAnswer === question.answer_1}
                                        type="radio"
                                        value={question.answer_1}
                                    />
                                </div>
                                <div>{question.answer_1}</div>
                            </div>
                            <div className="answer_group flex space-x-2 space-x-reverse">
                                <div className="flex-center-both">
                                    <input
                                        disabled={isDisabled}
                                        name={`question_${question.id}`}
                                        onChange={handleChange}
                                        checked={selectedAnswer === question.answer_2}
                                        type="radio"
                                        value={question.answer_2}
                                    />
                                </div>
                                <div>{question.answer_2}</div>
                            </div>
                            <div className="answer_group flex space-x-2 space-x-reverse">
                                <div className="flex-center-both">
                                    <input
                                        disabled={isDisabled}
                                        name={`question_${question.id}`}
                                        onChange={handleChange}
                                        checked={selectedAnswer === question.answer_3}
                                        type="radio"
                                        value={question.answer_3}
                                    />
                                </div>
                                <div>{question.answer_3}</div>
                            </div>
                            <div className="answer_group flex space-x-2 space-x-reverse">
                                <div className="flex-center-both">
                                    <input
                                        disabled={isDisabled}
                                        name={`question_${question.id}`}
                                        onChange={handleChange}
                                        checked={selectedAnswer === question.answer_4}
                                        type="radio"
                                        value={question.answer_4}
                                    />
                                </div>
                                <div>{question.answer_4}</div>
                            </div>
                        </div>
                        {question.picture ? (
                            <div className="sm:basis-1/2 basis-full w-full">
                                <img
                                    src={`${baseURL}/${question.picture}`}
                                    alt="question"
                                    className="w-full"
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            ) : (
                placeHolder
            )}
        </>
    );
};

export default Question;
