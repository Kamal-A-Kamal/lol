import React from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import RemoteTable from "../../components/ui/RemoteTable";
import { isMultiYear } from "../../services/defaultSettings";
import { getYearPlaceHolder } from "../../services/yearSevices";
import { printFullDate } from "../../utils/time";

const CoursesTable = () => {
    let columns = [
        {
            name: "التسلسل",
            reorder: true,
            selector: (row) => row.id,
            sortable: true,
            sortField: "id",
        },
        {
            name: "الاسم",
            reorder: true,
            selector: (row) => row.name,
            sortable: true,
            sortField: "name",
        },
        {
            name: "السعر",
            reorder: true,
            selector: (row) => row.price,
            sortable: true,
            sortField: "price",
        },
    ];
    if (isMultiYear) {
        columns.push({
            name: "العام الدراسي",
            reorder: true,
            selector: (row) => row.year,
            format: (row) => getYearPlaceHolder(row.year),
            sortable: true,
            sortField: "year",
        });
    }

    columns = [
        ...columns,
        {
            name: "تفعيل الكوبونات",
            reorder: true,
            selector: (row) =>
                row.is_couponable ? (
                    <div className="font-w-bold text-cyan-500">مفعل</div>
                ) : (
                    <div className="font-w-bold text-yellow-500">غير مفعل</div>
                ),
            sortable: true,
            sortField: "is_couponable",
        },
        {
            name: "ظاهر",
            reorder: true,
            selector: (row) =>
                row.visible ? (
                    <div className="font-w-bold text-yellow-500">مخفي</div>
                ) : (
                    <div className="font-w-bold text-cyan-500">ظاهر</div>
                ),
            sortable: true,
            sortField: "visible",
        },
        {
            name: "قابل للبيع",
            reorder: true,
            selector: (row) =>
                row.sellable ? (
                    <div className="font-w-bold text-cyan-500">مفعل</div>
                ) : (
                    <div className="font-w-bold text-yellow-500">غير مفعل</div>
                ),
            sortable: true,
            sortField: "sellable",
        },
        {
            name: "عدد المشتركين",
            reorder: true,
            selector: (row) => row.subscriptions_count,
            sortable: true,
            sortField: "subscriptions_count",
        },
        {
            name: "عدد الفواتير",
            reorder: true,
            selector: (row) => row.invoices_count,
            sortable: true,
            sortField: "invoices_count",
        },
        {
            name: "عدد الفواتير المدفوعة",
            reorder: true,
            selector: (row) => row.paid_invoices_count,
            sortable: true,
            sortField: "paid_invoices_count",
        },
        {
            name: "تاريخ آخر تعديل",
            reorder: true,
            selector: (row) => row.updated_at,
            format: (row) => printFullDate(row.updated_at),
            sortable: true,
            sortField: "updated_at",
        },
        {
            name: "تاريخ الإنشاء",
            reorder: true,
            selector: (row) => row.created_at,
            format: (row) => printFullDate(row.created_at),
            sortable: true,
            sortField: "created_at",
        },
    ];

    return (
        <AdminContainer>
            <div className="w-full">
                <RemoteTable api={`/api/courses/paginate`} columns={columns} />
            </div>
        </AdminContainer>
    );
};

export default CoursesTable;
