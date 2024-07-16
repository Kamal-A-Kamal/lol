import React, { useState } from "react";
import http from "../../services/httpServices";
import modal from "../../services/modalServices";
import { printFullDateTime } from "../../utils/time";
import Button from "./Button";
import Table from "./Table";

const LoginDataTable = ({ data, isAdmin = false, ...props }) => {
    const [index, setIndex] = useState(0);
    let columns = [
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
            name: "اخر نشاط",
            reorder: true,
            selector: (row) => printFullDateTime(row.last_used_at),
        },
        {
            name: "تاريخ تسجيل الدخول",
            reorder: true,
            selector: (row) => printFullDateTime(row.created_at),
        },
    ];
    if (isAdmin) {
        columns = [
            {
                name: "تسجيل خروج",
                reorder: true,
                selector: (row) => (
                    <Button
                        onClick={() => handleClick(row.id)}
                        color="rose"
                        className="shrink-0 flex-center-both flex-wrap px-1 pb-2 pt-1"
                    >
                        <span>تسجيل</span>

                        <span>خروج</span>
                    </Button>
                ),
                sortable: true,
                sortField: "id",
            },
            ...columns,
        ];
    }
    const handleClick = async (id) => {
        modal.message({
            title: "هل انت متأكد؟",
            text: "هل انت متأكد من تسجيل خروج هذا الطالب؟",
            icon: "warning",
            buttons: {
                confirm: "حذف",
                cancel: "إلغاء",
            },
            callback: async (e) => {
                if (e && e !== "cancel") {
                    try {
                        // eslint-disable-next-line no-unused-vars
                        const { data } = await http.post(`/api/tokens/${id}/destroy`, {}, isAdmin);
                        modal.message({
                            title: "تم تنفيذ طلبك بنجاح",
                            text: "تم تسجيل خروج هذا الطالب",
                            icon: "success",
                            button: "حسنًا",
                        });
                        setIndex(index + 1);
                    } catch (error) {}
                }
            },
        });
    };
    return <Table columns={columns} data={data} pagination {...props} key={index} />;
};

export default LoginDataTable;
