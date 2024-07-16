import React from "react";
import RemoteTable from "../../components/ui/RemoteTable";
import { printFullDate } from "../../utils/time";
import Button from "../../components/ui/Button";

const ExamResults = () => {
    let columns = [
        {
            name: "التسلسل",
            reorder: true,
            selector: (row) => row.id,
            sortable: true,
            sortField: "id",
        },
        {
            name: "اسم الامتحان",
            reorder: true,
            selector: (row) => row.exam.name,
            sortable: true,
            sortField: "exam_id",
        },
        {
            name: "عدد الاسئلة",
            reorder: true,
            selector: (row) => row.questions_quantity,
            sortable: true,
            sortField: "questions_quantity",
        },
        {
            name: "النتيجة",
            reorder: true,
            selector: (row) => `${Math.round((row.result / row.questions_quantity) * 100)} %`,
            sortable: true,
            sortField: "result",
        },
        {
            name: "عدد الاسئلة المحلولة",
            reorder: true,
            selector: (row) => row.is_selected_count,
            sortable: true,
            sortField: "is_selected_count",
        },
        {
            name: "عدد الاسئلة الصحيحة",
            reorder: true,
            selector: (row) => row.result,
            sortable: true,
            sortField: "result",
        },
        {
            name: "الاجابات",
            reorder: true,
            selector: (row) => (
                <>
                    {row.exam.show_results ? (
                        <Button
                            className="block px-1 py-1 text-center"
                            element="Link"
                            to={`../exam_results/${row.id}`}
                        >
                            عرض الاجابات
                        </Button>
                    ) : (
                        <span className="text-rose-500">--الاجابات غير متاحة--</span>
                    )}
                </>
            ),
            // sortable: true,
            // sortField: "questions_quantity",
        },
        {
            name: "وقت انهاء الامتحان",
            reorder: true,
            selector: (row) => printFullDate(row.updated_at),
            sortable: true,
            sortField: "updated_at",
        },
        {
            name: "وقت بدأ الامتحان",
            reorder: true,
            selector: (row) => printFullDate(row.created_at),
            sortable: true,
            sortField: "created_at",
        },
    ];
    return (
        <div>
            <div className="w-full">
                <RemoteTable
                    isAdmin={false}
                    api={`/api/user/exam_results/exam/paginate`}
                    columns={columns}
                />
            </div>
        </div>
    );
};

export default ExamResults;
