import React from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import RemoteTable from "../../components/ui/RemoteTable";
// import { isMultiYear } from "../../services/defaultSettings";
// import { getYearPlaceHolder } from "../../services/yearSevices";
import { printFullDate } from "../../utils/time";

const DivisionsTable = () => {
    let columns = [
        {
            name: "التسلسل",
            reorder: true,
            selector: (row) => row.id,
            sortable: true,
            sortField: "id",
        },
        {
            name: "اسم القسم",
            reorder: true,
            selector: (row) => row.name,
            sortable: true,
            sortField: "name",
        },
        {
            name: "عدد الفيديوهات",
            reorder: true,
            selector: (row) => row.videos_count,
            sortable: true,
            sortField: "videos_count",
        },
        {
            name: "عدد الامتحانات",
            reorder: true,
            selector: (row) => row.exams_count,
            sortable: true,
            sortField: "exams_count",
        },
        {
            name: "عدد الواجبات",
            reorder: true,
            selector: (row) => row.hms_count,
            sortable: true,
            sortField: "hms_count",
        },
        {
            name: "عدد المذكرات",
            reorder: true,
            selector: (row) => row.books_count,
            sortable: true,
            sortField: "books_count",
        },
        {
            name: "تاريخ انشاء القسم",
            reorder: true,
            selector: (row) => printFullDate(row.created_at),
            sortable: true,
            sortField: "created_at",
        },
    ];

    return (
        <AdminContainer>
            <div className="w-full space-y-6">
                <RemoteTable api={`/api/divisions/paginate`} columns={columns} />
            </div>
        </AdminContainer>
    );
};

export default DivisionsTable;
