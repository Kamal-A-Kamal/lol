import React, { useState } from "react";
import { useEffect } from "react";
import auth from "../../services/authServices";
import http from "../../services/httpServices";
import modal from "../../services/modalServices";
import { useParams } from "react-router-dom";
import { isObjectEmpty } from "../../utils/objects";
import CenterIcon from "../../components/ui/CenterIcon";
import { baseURL } from "../../config";

const ExamResult = ({ isAdmin = false }) => {
    const { exam_result_id } = useParams();

    const [examResult, setExamResult] = useState({});

    const getExamResult = async () => {
        let token = auth.getToken();
        // console.log("user", token);
        let apiLink = `/api/exam_results/${exam_result_id}`;
        if (isAdmin) {
            token = auth.getAdminToken();
            apiLink = `/api/exam_results/admin/${exam_result_id}`;
            // console.log("admin", token);
        }
        // console.log(1, token);
        const config = auth.getAdminAuthConfig(token);
        try {
            const { data: respone } = await http.get(apiLink, config);
            setExamResult(respone);
        } catch ({ response }) {
            modal.message({
                title: "حدث خطأ",
                icon: "error",
                // callback: null,
                callback: () => null,
            });
        }
    };
    useEffect(() => {
        getExamResult();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {isObjectEmpty(examResult) || (
                <div className="font-w-bold flex-center-both flex-col space-y-3">
                    <div className="px-5 py-1 rounded-md bg-blue-500 font-h3">
                        عدد الاسئلة : {examResult.questions_quantity}
                    </div>
                    <div className="px-5 py-1 rounded-md bg-teal-500 font-h1">
                        النتيجة :{" "}
                        {Math.round((examResult.result / examResult.questions_quantity) * 100)} %
                    </div>
                    <div className="px-5 py-1 rounded-md bg-yellow-500 font-h3">
                        عدد الاسئلة المحلولة : {examResult.is_selected_count}
                    </div>
                    <div className="px-5 py-1 rounded-md bg-teal-500 font-h3">
                        عدد الاسئلة الصحيحة: {examResult.result}
                    </div>
                    <div className="px-5 py-1 rounded-md bg-rose-500 font-h3">
                        عدد الاسئلة الخاطئة: {examResult.questions_quantity - examResult.result}
                    </div>
                    <div className="w-full flex-center-both py-10">
                        <div className="h-1 bg-text-secondary w-full max-w-2xl rounded-md"></div>
                    </div>
                    <div className=" w-full max-w-2xl space-y-8">
                        <div className="flex-center-both">
                            <div className="dark:bg-blue-900 bg-blue-100 smooth rounded-full font-h1  px-10 py-1 clr-text-primary shadow-md">
                                الاجابات
                            </div>
                        </div>
                        {examResult.answers.map((question, index) => {
                            return (
                                <div key={index}>
                                    <div
                                        className={`rounded-md shadow-lg p-10 space-y-6 clr-white smooth border-4 ${
                                            question.is_correct
                                                ? "bg-teal-500 dark:bg-teal-800 border-teal-800 dark:border-teal-500"
                                                : "bg-rose-500 dark:bg-rose-800 border-rose-800 dark:border-rose-500"
                                        }`}
                                    >
                                        <div className="font-h2 font-w-bold flex space-x-2 space-x-reverse">
                                            <CenterIcon
                                                className={`font-h1 smooth ${
                                                    question.is_correct
                                                        ? "text-blue-900 dark:text-blue-300"
                                                        : "text-rose-900 dark:text-rose-300"
                                                }`}
                                                icon={"line-md:question-circle-twotone"}
                                            />
                                            <div>{question["title"]}</div>
                                        </div>
                                        <div className="px-2 space-y-5 sm:space-y-0 flex sm:flex-row flex-col space-x-2 space-x-reverse">
                                            <div
                                                className={`${
                                                    question.question
                                                        ? "sm:basis-1/2 basis-full"
                                                        : ""
                                                } w-full space-y-1`}
                                            >
                                                {question.selected_answer ? (
                                                    <div className="answer_group flex space-x-2 space-x-reverse">
                                                        <div className="flex-center-both">
                                                            <div className="flex flex-row space-x-2 space-x-reverse  px-4 py-1 ">
                                                                <CenterIcon
                                                                    className={`font-h2 smooth ${
                                                                        question.is_correct
                                                                            ? "text-blue-900 dark:text-blue-300"
                                                                            : "text-rose-900 dark:text-rose-300"
                                                                    }`}
                                                                    icon={
                                                                        question.is_correct
                                                                            ? "charm:square-tick"
                                                                            : "emojione-monotone:cross-mark-button"
                                                                    }
                                                                    nY=""
                                                                />
                                                                <div className="flex-center-both">
                                                                    {question.selected_answer}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="answer_group flex space-x-2 space-x-reverse">
                                                        <div className="flex-center-both">
                                                            <div className=" px-4 py-1 ">
                                                                لم يتم اختيار اجابة
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {question.is_correct ? (
                                                    ""
                                                ) : (
                                                    <div className="answer_group flex space-x-2 space-x-reverse">
                                                        <div className="flex-center-both">
                                                            <div className="flex flex-row space-x-2 space-x-reverse bg-primary-container px-4 py-1 rounded-md clr-text-primary smooth">
                                                                <CenterIcon
                                                                    className={`font-h2 smooth ${
                                                                        question.is_correct
                                                                            ? "text-blue-900 dark:text-blue-300"
                                                                            : "text-rose-900 dark:text-rose-300"
                                                                    }`}
                                                                    icon={"charm:square-tick"}
                                                                    nY=""
                                                                />
                                                                <div className="flex-center-both">
                                                                    {question.correct_answer}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {question.question ? (
                                                question.question.picture ? (
                                                    <div className="sm:basis-1/2 basis-full w-full">
                                                        <img
                                                            src={`${baseURL}/${question.question.picture}`}
                                                            alt="question"
                                                            className="w-full"
                                                        />
                                                    </div>
                                                ) : (
                                                    ""
                                                )
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default ExamResult;
