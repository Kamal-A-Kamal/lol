import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/ui/Button";
import ExamContext from "../../../context/ExamContext";
import auth from "../../../services/authServices";
import http from "../../../services/httpServices";
import { printUnit } from "../../../utils/ar";
// import modal from "../../../services/modalServices";
import { isObjectEmpty } from "../../../utils/objects";
import { printFullDateTime } from "../../../utils/time";
import LoadingIcon from "../../../components/ui/LoadingIcon";

const ExamHome = () => {
    const [previousResults, setPreviousResults] = useState([]);
    const [isExamResultsLoading, setIsExamResultsLoading] = useState(true);
    const [isGettingResultLoading, setIsGettingResultLoading] = useState(false);
    const { id, section_id, exam_id } = useParams();
    const { setIsContinue, setResultId, setForwardedToExam, exam } = useContext(ExamContext);

    const navigate = useNavigate();
    const getPreviousResults = async () => {
        const token = auth.getToken();
        const config = auth.getAdminAuthConfig(token);
        try {
            const { data: repsone } = await http.get(
                `/api/sellables/course/${id}/sections/${section_id}/sectionables/exams/${exam_id}/exam_results`,
                config
            );
            setIsExamResultsLoading(false);
            setPreviousResults(repsone);
        } catch ({ response }) {}
    };

    const handleGoToQuestion = () => {
        setForwardedToExam(true);
        navigate("questions/0");
    };

    const handleContinue = async (resultId) => {
        setIsContinue(true);
        setForwardedToExam(true);
        setResultId(resultId);
        navigate("questions/0");
    };

    const getResultResult = async (resultId) => {
        setIsGettingResultLoading(true);
        const token = auth.getToken();
        const config = auth.getAdminAuthConfig(token);
        try {
            const { data: repsone } = await http.post(
                `/api/sellables/course/${id}/sections/${section_id}/sectionables/exams/${exam_id}/exam_results/${resultId}/finish`,
                {},
                config
            );
            let updatedPreviousExamResults = previousResults.map((result) => {
                if (result.id === resultId) {
                    result.result = repsone.result;
                }
                return result;
            });
            setPreviousResults(updatedPreviousExamResults);
            setIsGettingResultLoading(false);
        } catch ({ response }) {}
    };
    useEffect(() => {
        getPreviousResults();
        // getExam();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="px-5 py-10 overflow-auto">
            {isExamResultsLoading ? (
                <>
                    <div className="w-full flex-center-both">
                        <div className="rounded-md border bg-third-container border-secondary-container smooth clr-text-primary flex-center-both p-10 space-x-2 space-x-reverse">
                            <div className="font-h1 text-blue-500 flex-center-both">
                                <LoadingIcon />
                            </div>
                            <div>يتم تحميل النتائج السابقة...</div>
                        </div>
                    </div>
                </>
            ) : previousResults.length > 0 && !isObjectEmpty(exam) ? (
                <table className="table-auto w-full table-style">
                    <thead className="py-10">
                        <tr>
                            <th className="h-20 text-center">السريال</th>
                            <th className="h-20 text-center">تاريخ الدخول</th>
                            <th className="h-20 text-center">اجمالي الوقت</th>
                            <th className="h-20 text-center">عدد مرات فتح الامتحان</th>
                            <th className="h-20 text-center">الوقت المستهلك</th>
                            <th className="h-20 text-center">اجمالي عدد الاسئلة</th>
                            <th className="h-20 text-center">عدد الاسئلة المحلولة</th>
                            <th className="h-20 text-center">النتيجة</th>

                            <th className="h-20 text-center"></th>
                        </tr>
                    </thead>
                    <tbody className="py-10">
                        {previousResults.map((result) => {
                            return (
                                <tr key={result.id}>
                                    <td className="h-20 text-center">{result.id}</td>
                                    <td className="h-20 text-center">
                                        {printFullDateTime(result.created_at)}
                                    </td>

                                    <td className="h-20 text-center">
                                        {printUnit(result.duration, "دقيقة")}
                                    </td>
                                    <td className="h-20 text-center">
                                        {printUnit(result.times_opened, "مرة")}
                                    </td>
                                    <td className="h-20 text-center">
                                        {result.time_spent < 60
                                            ? printUnit(result.time_spent, "ثانية")
                                            : printUnit(parseInt(result.time_spent / 60), "دقيقة")}
                                    </td>
                                    <td className="h-20 text-center">
                                        {result.questions_quantity}
                                    </td>
                                    <td className="h-20 text-center">{result.is_selected_count}</td>
                                    <td className="h-20 text-center">
                                        {!result.result && result.result !== 0 ? (
                                            <Button
                                                className="font-smaller"
                                                onClick={() => {
                                                    getResultResult(result.id);
                                                }}
                                                isLoading={isGettingResultLoading}
                                            >
                                                انهاء الاختبار <br />و الحصول علي النتيجة
                                            </Button>
                                        ) : (
                                            result.result
                                        )}{" "}
                                    </td>

                                    <td className="h-20 text-center">
                                        {!result.is_finished && exam.sectionable.is_continuable ? (
                                            <Button
                                                color="blue"
                                                onClick={() => handleContinue(result.id)}
                                            >
                                                الاستكمال
                                            </Button>
                                        ) : (
                                            ""
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <div className="font-w-bold flex-center-both">
                    <div className="px-5 py-1 rounded-full bg-primary-container smooth border-2 border-rose-500 font-h3 text-rose-500">
                        لا يوجد لديك نتائج سابقة...
                    </div>
                </div>
            )}
            <div className="my-10 font-h3 flex-center-both">
                {previousResults.length > 0 &&
                exam.exam_open_limit !== 0 &&
                previousResults.length >= exam.exam_open_limit ? (
                    ""
                ) : (
                    <Button onClick={handleGoToQuestion} className="px-10 py-2 font-w-bold">
                        فتح الإختبار الآن !
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ExamHome;
