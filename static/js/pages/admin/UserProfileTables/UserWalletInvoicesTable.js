import React from "react";
import RemoteTable from "../../../components/ui/RemoteTable";
import { printFullDate } from "../../../utils/time";
import payment from "../../../services/paymentServices";
import modal from "../../../services/modalServices";
import Button from "../../../components/ui/Button";

const UserWalletInvoicesTable = () => {
    let columns = [
        {
            name: "التسلسل",
            reorder: true,
            selector: (row) => row.id,
            sortable: true,
            sortField: "id",
        },
        {
            name: "اجمالي سعر الفاتورة",
            reorder: true,
            selector: (row) => row.total_price,
            sortable: true,
            sortField: "price",
        },
        {
            name: "حالة الدفع",
            reorder: true,
            selector: (row) => (
                <>
                    {row.invoice_provider == "fawry_ref" ? (
                        <div>
                            <Button
                                color={`${row.invoice_status === "paid" ? "cyan" : "rose"}`}
                                onClick={() =>
                                    modal.message({
                                        title: "دفع الفاتورة",
                                        text: `رقمك المرجعي هو : ${row.reference_number} , \n توجه نحو اقرب فرع خدمة لفوري و اطلب الدفع على خدمة رقم ٧٨٨ بهذا الكود المرجعي`,
                                    })
                                }
                            >
                                {row.invoice_status === "paid" ? "مدفوع" : "لم يتم الدفع"}
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={payment.getInvoiceUrl(row)}
                                className="underline"
                            >
                                {row.invoice_status === "paid" ? (
                                    <div className="py-1 px-2 rounded-md bg-cyan-500 clr-white">
                                        مدفوع
                                    </div>
                                ) : (
                                    <div className="py-1 px-2 rounded-md bg-rose-500 clr-white">
                                        لم يتم الدفع
                                    </div>
                                )}
                            </a>
                        </div>
                    )}
                </>
            ),
            sortable: true,
            sortField: "invoice_status",
        },
        {
            name: "وقت الدفع",
            reorder: true,
            selector: (row) =>
                row.invoice_status === "paid" ? (
                    row.payment_time ? (
                        printFullDate(row.payment_time)
                    ) : (
                        "--"
                    )
                ) : (
                    <div className="text-yellow-500">--لم يتم الدفع--</div>
                ),
            sortable: true,
            sortField: "payment_time",
        },
        {
            name: "طريقة الدفع",
            reorder: true,
            selector: (row) =>
                row.invoice_status === "paid" ? (
                    row.payment_method
                ) : (
                    <div className="text-yellow-500">--لم يتم الدفع--</div>
                ),
            sortable: true,
            sortField: "payment_method",
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
                    > */}
                    {row.invoice_id}
                    {/* </a> */}
                </div>
            ),
            sortable: true,
            sortField: "invoice_id",
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
                    api={`/api/user/wallet_invoices/paginate`}
                    columns={columns}
                />
            </div>
        </div>
    );
};

export default UserWalletInvoicesTable;
