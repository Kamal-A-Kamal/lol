import React, { useEffect, useState } from "react";
import Table from "../../../components/ui/Table";
import { isMultiYear } from "../../../services/defaultSettings";
import { printFullDate } from "../../../utils/time";

import { getYearPlaceHolder } from "../../../services/yearSevices";
import { Link } from "react-router-dom";
import { printIdOfOptions } from "../../../utils/ar";
import http from "../../../services/httpServices";

const ShowUser = ({ user }) => {
    let columns = [
        {
            name: "التسلسل",
            reorder: true,
            selector: (row) => row.id,
        },
        {
            name: "عدد مرات تغير الباسورد",
            reorder: true,
            selector: (row) => row.password_reset_count,
        },
    ];
    if (user[0] && user[0].insert_auto_log_row && user[0].insert_auto_log_row.name) {
        columns = [
            ...columns,
            {
                name: "اسم جدول الأكواد",
                reorder: true,
                selector: (row) => (
                    <>
                        {user[0].insert_auto_log_row.name}
                        <br />
                        id: {user[0].insert_auto_log_row.id}, qty:{" "}
                        {user[0].insert_auto_log_row.quantity}
                    </>
                ),
            },
        ];
    }
    if (user[0] && user[0].charged_to_user) {
        columns = [
            ...columns,
            {
                name: "رقم هاتف المشحون إليه الإشتراك",
                reorder: true,
                selector: (row) => (
                    <Link
                        className="block px-1 py-1 text-center underline"
                        element="Link"
                        to={`../../user_profile/${row.charged_to_user.id}`}
                    >
                        {"0" + row.charged_to_user.phone}
                    </Link>
                ),
            },
        ];
    }
    columns = [
        ...columns,

        {
            name: "الاسم الكامل",
            reorder: true,
            selector: (row) => row.full_name,
        },
        {
            name: "رقم الهاتف",
            reorder: true,
            selector: (row) => row.phone,
        },
        {
            name: "رقم هاتف ولي الأمر",
            reorder: true,
            selector: (row) => row.father_phone,
        },
        {
            name: "المحافظة",
            reorder: true,
            selector: (row) => printIdOfOptions(governments, row.government_id),
            sortable: true,
            sortField: "phone",
        },
        {
            name: "البريد الإلكتروني",
            reorder: true,
            selector: (row) => row.email,
        },
    ];
    if (isMultiYear) {
        columns.push({
            name: "العام الدراسي",
            reorder: true,
            selector: (row) => row.year,
            format: (row) => getYearPlaceHolder(row.year),
        });
    }
    columns.push({
        name: "تاريخ انشاء الحساب",
        reorder: true,
        selector: (row) => row.created_at,
        format: (row) => printFullDate(row.created_at),
    });

    const [governments, setGovernments] = useState([]);

    async function getGovernments() {
        const { data } = await http.get("/api/governments");
        setGovernments(data);
    }
    useEffect(() => {
        getGovernments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return <Table columns={columns} data={user} />;
};

export default ShowUser;
