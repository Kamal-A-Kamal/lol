import React from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import BooleanIndicator from "../../components/ui/BooleanIndicator";
import RemoteTable from "../../components/ui/RemoteTable";
import { printUnit } from "../../utils/ar";

const CouponsTable = () => {
    let columns = [
        {
            name: "التسلسل",
            reorder: true,
            selector: (row) => row.id,
            sortable: true,
            sortField: "id",
        },
        {
            name: "الكوبون",
            reorder: true,
            selector: (row) => row.name,
            sortable: true,
            sortField: "name",
        },
        {
            name: "مُفعل",
            reorder: true,
            selector: (row) => <BooleanIndicator value={row.is_active} />,
            sortable: true,
            sortField: "is_active",
        },
        {
            name: "مرات الاستخدام",
            reorder: true,
            selector: (row) => printUnit(row.total_used_coupons, "مرة"),
            sortable: true,
            sortField: "total_used_coupons",
        },
        {
            name: "مرات الاستخدام المتبقية",
            reorder: true,
            selector: (row) => printUnit(row.total_limit - row.total_used_coupons, "مرة"),
            sortable: true,
            sortField: "total_used_coupons",
        },
        {
            name: "مُفعل",
            reorder: true,
            selector: (row) => <BooleanIndicator value={row.is_active} />,
            sortable: true,
            sortField: "is_active",
        },
        {
            name: "مرات الاستخدام الكوبون الاجمالية ",
            reorder: true,
            selector: (row) => printUnit(row.total_limit, "مرة"),
            sortable: true,
            sortField: "total_limit",
        },
        {
            name: "مرات الاستخدام للمستخدم",
            reorder: true,
            selector: (row) => printUnit(row.limit_per_user, "مرة"),
            sortable: true,
            sortField: "limit_per_user",
        },
        {
            name: "الخصم",
            reorder: true,
            selector: (row) => row.discount,
            sortable: true,
            sortField: "discount",
        },
        {
            name: "اقصى مبلغ للخصم",
            reorder: true,
            selector: (row) => row.maximum,
            sortable: true,
            sortField: "maximum",
        },
    ];

    return (
        <AdminContainer>
            <div className="w-full">
                <RemoteTable api={`/api/coupons/paginate`} columns={columns} />
            </div>
        </AdminContainer>
    );
};

export default CouponsTable;
