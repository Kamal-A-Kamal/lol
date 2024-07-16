import React from "react";
import Button from "../../../components/ui/Button";
import RemoteTable from "../../../components/ui/RemoteTable";
import { printFullDate } from "../../../utils/time";
import { isCustomUserExamLimit } from "../../../services/defaultSettings";
import IncreaseCustomUserExamLimitButton from "./IncreaseCustomUserExamLimitButton";

const UserExamResultsTable = ({ user = { id: 0 } }) => {
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
    ];
    if (isCustomUserExamLimit) {
        columns = [
            ...columns,
            {
                name: "زيادة عدد مرات دخول الامتحان",
                reorder: true,
                selector: (row) =>
                    row.exam ? (
                        <IncreaseCustomUserExamLimitButton exam={row.exam} user={user} />
                    ) : (
                        "تم حذف الامتحان"
                    ),
                sortable: true,
                sortField: "exam_id",
            },
        ];
    }
    columns = [
        ...columns,
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
                <Button
                    className="block px-1 py-1 text-center"
                    element="Link"
                    to={`../exam_results/${row.id}`}
                >
                    عرض الاجابات
                </Button>
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
                    api={`/api/users/${user["id"]}/profile/exam_results/exam/paginate`}
                    columns={columns}
                />
            </div>
        </div>
    );
};

export default UserExamResultsTable;
