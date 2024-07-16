import React, { useContext, useEffect } from "react";
import auth from "../../services/authServices";
import http from "../../services/httpServices";
import modal from "../../services/modalServices";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import ExamContext from "../../context/ExamContext";
import ExamStatus from "./exam/ExamStatus";
import SectionableHeaderTitle from "../../components/ui/SectionableHeaderTitle";

const Exam = () => {
    const { id, section_id, exam_id } = useParams();

    const location = useLocation();

    const {
        exam,
        setExam,
        setTimer,
        setQuestions,
        startExam,
        setStartExam,
        isContinue,
        resultId,
        setResultId,
        questions,
        examStarted,
        setExamStarted,
        timer,
        setSubmitLoading,
        setTriggerSaving,
        triggerSaving,
    } = useContext(ExamContext);

    const navigate = useNavigate();

    const getExam = async () => {
        const token = auth.getToken();
        const config = auth.getAdminAuthConfig(token);
        try {
            const { data: repsone } = await http.get(
                `/api/sellables/course/${id}/sections/${section_id}/sectionables/exams/${exam_id}`,
                config
            );
            if (repsone.questions && repsone.questions.length > 0) {
                setTimer(repsone.remaining_duration);
                setExamStarted(true);
                setExam(repsone);
                setResultId(repsone.exam_result.id);
                setQuestions(repsone.questions);
            } else {
                modal.message({
                    title: repsone.message ? repsone.message : "حدث خطأ",
                    icon: "error",
                    // callback: null,
                    callback: () => null,
                });
            }
        } catch (error) {
            modal.message({
                title: "حدث خطأ",
                text: error.response.data.message,
                icon: "error",
                // callback: null,
                callback: () => null,
            });
        }
    };
    const continueExam = async () => {
        const token = auth.getToken();
        const config = auth.getAdminAuthConfig(token);
        try {
            const { data: repsone } = await http.get(
                `/api/sellables/course/${id}/sections/${section_id}/sectionables/exams/${exam_id}/continue/${resultId}`,
                config
            );
            setTimer(repsone.exam.remaining_duration);
            setExamStarted(true);
            setExam(repsone.exam);
            setQuestions(repsone.questions);
        } catch ({ response }) {
            modal.message({
                title: response.data.message,
                icon: "error",
                // callback: null,
            });
        }
    };
    const saveAnswers = async () => {
        const token = auth.getToken();
        const config = auth.getAdminAuthConfig(token);
        const data = {
            questions,
            timer,
        };
        try {
            // eslint-disable-next-line no-unused-vars
            const { data: repsone } = await http.post(
                `/api/sellables/course/${id}/sections/${section_id}/sectionables/exams/${exam_id}/save_answers/${resultId}`,
                data,
                config
            );
            setTriggerSaving(!triggerSaving);
        } catch ({ response }) {
            // modal.message({
            //     title: "حدث خطأ",
            //     icon: "error",
            //     callback: null,
            // });
        }
    };
    useEffect(() => {
        if (questions.length > 0 && examStarted) {
            saveAnswers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questions]);

    const getSectionable = async () => {
        const token = auth.getToken();
        const config = auth.getAdminAuthConfig(token);
        try {
            const { data: repsone } = await http.get(
                `/api/sellables/course/${id}/sections/${section_id}/sectionables/${exam_id}`,
                config
            );
            setExam(repsone);
        } catch ({ response }) {}
    };

    useEffect(() => {
        if (!startExam) {
            getSectionable();
        }
        if (startExam && !examStarted) {
            if (isContinue && resultId) {
                continueExam();
            } else {
                getExam();
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startExam, isContinue, resultId]);

    const handleResume = async () => {
        setSubmitLoading(true);
        saveAnswers();
        setExamStarted(false);
        modal.message({
            title: "تم حفظ اجاباتك بنجاح",
            callback: () => {
                setStartExam(false);
                setSubmitLoading(false);
                // getSectionable();
                // setExam(false);
                navigate("home");
            },
        });
    };
    const handleSubmit = async () => {
        setSubmitLoading(true);
        const token = auth.getToken();
        const config = auth.getAdminAuthConfig(token);
        const data = {
            questions,
            timer,
            submit_type: "submit",
        };
        try {
            setExamStarted(false);
            const { data: repsone } = await http.post(
                `/api/sellables/course/${id}/sections/${section_id}/sectionables/exams/${exam_id}/save_answers/${resultId}`,
                data,
                config
            );
            modal.message({
                title: "تم حفظ اجاباتك بنجاح",
                callback: () => {
                    setSubmitLoading(false);
                    setStartExam(false);
                    exam.sectionable.show_results
                        ? navigate("/me/user/exam_results/" + repsone.id)
                        : navigate("home");
                },
            });
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
        if (timer < 1 && examStarted) {
            handleSubmit();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [examStarted, timer]);
    return (
        <div>
            <div className="mx-4 rounded-2xl shadow-large overflow-hidden border border-secondary-container smooth clr-text-primary -mt-20 relative z-30 bg-primary-container">
                <SectionableHeaderTitle sectionable_id={exam_id} />
                <ExamStatus handleResume={handleResume} handleSubmit={handleSubmit} />

                <>
                    <div>
                        <Outlet key={location.pathname} />
                    </div>
                </>
            </div>
        </div>
    );
};

export default Exam;
