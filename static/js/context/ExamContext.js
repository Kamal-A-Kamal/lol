import React, { createContext, useEffect, useState } from "react";
import { isObjectEmpty } from "../utils/objects";

const ExamContext = createContext();

export const ExamProvider = ({ children }) => {
    const [exam, setExam] = useState(false);
    const [questions, setQuestions] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    const [timer, setTimer] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [forwardedToExam, setForwardedToExam] = useState(false);
    const [startExam, setStartExam] = useState(false);
    const [isContinue, setIsContinue] = useState(false);
    const [examStarted, setExamStarted] = useState(false);
    const [resultId, setResultId] = useState(0);

    const [triggerSaving, setTriggerSaving] = useState(false);

    useEffect(() => {
        if (!isObjectEmpty(exam) && startExam && examStarted) {
            const examDuration = exam.remaining_duration;

            setTimer(examDuration);

            let timing = examDuration;
            const interval = setInterval(() => {
                timing--;
                const minutes = Math.floor(timing / 60);
                const seconds = timing % 60;
                setMinutes(minutes);
                setSeconds(seconds);
                setTimer(timing);
                if (timing < 1) {
                    clearInterval(interval);
                }
            }, 1000);

            if (timing < 1) {
                clearInterval(interval);
            } else {
                return () => {
                    clearInterval(interval);
                };
            }
        }
    }, [exam, startExam, examStarted]);

    return (
        <ExamContext.Provider
            value={{
                exam,
                submitLoading,
                setSubmitLoading,
                setExam,
                questions,
                setQuestions,
                timer,
                minutes,
                seconds,
                startExam,
                setStartExam,
                isContinue,
                setIsContinue,
                resultId,
                setResultId,
                examStarted,
                setExamStarted,
                forwardedToExam,
                setForwardedToExam,
                triggerSaving,
                setTriggerSaving,
                setTimer,
            }}
        >
            {children}
        </ExamContext.Provider>
    );
};

export default ExamContext;
