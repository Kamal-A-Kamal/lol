import React from "react";
import Table from "./Table";
import { printFullDateTime } from "../../utils/time";

const LogoutTable = ({ data, isAdmin = false, ...props }) => {
    const columns = [
        {
            name: "التسلسل",
            reorder: true,
            selector: (row) => row.id,
            sortable: true,
            sortField: "id",
        },
        {
            name: "تم تسجيل الخروج بواسطة",
            reorder: true,
            selector: (row) => row.deleted_by,
            sortable: true,
            sortField: "deleted_by",
        },
        {
            name: "نوع الجهاز",
            reorder: true,
            selector: (row) => row.device_info.device_type,
        },
        {
            name: "اسم الجهاز",
            reorder: true,
            selector: (row) => row.device_info.device_name,
        },
        {
            name: "نظام التشغيل",
            reorder: true,
            selector: (row) => row.device_info.device_platform,
        },
        {
            name: "المتصفح",
            reorder: true,
            selector: (row) => row.device_info.device_browser,
        },
        {
            name: "تاريخ تسجيل الخروج",
            reorder: true,
            selector: (row) => printFullDateTime(row.deleted_at),
            sortable: true,
            sortField: "deleted_at",
        },
        {
            name: "اخر نشاط",
            reorder: true,
            selector: (row) => printFullDateTime(row.last_used_at),
            sortable: true,
            sortField: "last_used_at",
        },
        {
            name: "تاريخ تسجيل الدخول",
            reorder: true,
            selector: (row) => printFullDateTime(row.created_at),
            sortable: true,
            sortField: "created_at",
        },
    ];
    return <Table columns={columns} data={data} pagination {...props} />;
};

export default LogoutTable;
