import React from "react";
import RemoteTable from "../../components/ui/RemoteTable";
import { printFullDate } from "../../utils/time";
import payment from "../../services/paymentServices";

const Subscriptions = () => {
    let columns = [
        {
            name: "التسلسل",
            reorder: true,
            selector: (row) => row.id,
            sortable: true,
            sortField: "id",
        },
        {
            name: "اسم الطالب",
            reorder: true,
            selector: (row) => row.user.full_name,
            // sortable: true,
            // sortField: "user.full_name",
        },
        {
            name: "اسم الكورس",
            reorder: true,
            selector: (row) =>
                row.subscriptionable ? (
                    row.subscriptionable.name
                ) : (
                    <div className="text-rose-500">--تم حذف الكورس--</div>
                ),
            // sortable: true,
            // sortField: "id",
        },
        {
            name: "طريقة الاشتراك",
            reorder: true,
            selector: (row) =>
                row.is_manual ? (
                    <div className="rounded-md px-2 py-1 bg-yellow-500 text-slate-800">
                        دفع يدوي
                    </div>
                ) : (
                    <div className="rounded-md px-2 py-1 bg-cyan-500 text-slate-100">
                        دفع اوتوماتك
                    </div>
                ),
            sortable: true,
            sortField: "id",
        },
        {
            name: "رقم الفاتورة",
            reorder: true,
            selector: (row) => (
                <div>
                    {/* <a
                        target="_blank"
                        rel="noreferrer"
                        href={getInvoiceLink(row.invoice_id, row.invoice_key)}
                        className="underline"
                        >
                    </a> */}
                    {row.invoice_id}
                </div>
            ),
            sortable: true,
            sortField: "invoice_id",
        },
        {
            name: "تاريخ الاشتراك",
            reorder: true,
            selector: (row) => row.created_at,
            sortable: true,
            sortField: "id",
            format: (row) => printFullDate(row.created_at),
        },
    ];
    return (
        <div>
            <div className="w-full">
                <RemoteTable
                    isAdmin={false}
                    api={`/api/user/subscriptions/paginate`}
                    columns={columns}
                />
            </div>
        </div>
    );
};

export default Subscriptions;
