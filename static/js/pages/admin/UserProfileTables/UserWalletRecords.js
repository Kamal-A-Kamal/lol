import React from "react";
import RemoteTable from "../../../components/ui/RemoteTable";
import { printFullDate } from "../../../utils/time";
import payment from "../../../services/paymentServices";
import modal from "../../../services/modalServices";
import Button from "../../../components/ui/Button";
import { printUnit } from "../../../utils/ar";

const UserWalletRecords = () => {
    let columns = [
        {
            name: "التسلسل",
            reorder: true,
            selector: (row) => row.id,
            sortable: true,
            sortField: "id",
        },
        {
            name: "المبلغ المتغير",
            reorder: true,
            selector: (row) => printUnit(row.ammount_added, "جنيه"),
            sortable: true,
            sortField: "ammount_added",
        },
        {
            name: "الرصيد قبل التغيير",
            reorder: true,
            selector: (row) => printUnit(row.previous_balance, "جنيه"),
            sortable: true,
            sortField: "previous_balance",
        },
        {
            name: "الرصيد بعد التغيير",
            reorder: true,
            selector: (row) => printUnit(row.updated_balance, "جنيه"),
            sortable: true,
            sortField: "updated_balance",
        },
        {
            name: "ملحوظة",
            reorder: true,
            selector: (row) => row.comment,
            sortable: true,
            sortField: "comment",
        },
        {
            name: "وقت انشاء الفاتورة",
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
                    api={`/api/user/wallet_records/paginate`}
                    columns={columns}
                />
            </div>
        </div>
    );
};

export default UserWalletRecords;
