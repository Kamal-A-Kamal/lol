import React from "react";
import RemoteTable from "../../components/ui/RemoteTable";
import { printFullDate } from "../../utils/time";
import payment from "../../services/paymentServices";
import modal from "../../services/modalServices";
import Button from "../../components/ui/Button";

const Invoices = () => {
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
            name: "التخفيض",
            reorder: true,
            selector: (row) => row.discount,
            sortable: true,
            sortField: "discount",
        },
        {
            name: "الكوبون",
            reorder: true,
            selector: (row) =>
                row.used_coupon ? (
                    row.used_coupon.coupon.name
                ) : (
                    <div className="text-yellow-500">--لا يوجد كوبون--</div>
                ),
        },
        {
            name: "عدد المشتريات",
            reorder: true,
            selector: (row) => row.quantity,
            sortable: true,
            sortField: "quantity",
        },
        {
            name: "المشتريات",
            reorder: true,
            selector: (row) =>
                row.invoice_subscriptions && row.invoice_subscriptions.length > 0 ? (
                    row.invoice_subscriptions.map((value, index) =>
                        value.invoice_subscriptionable ? (
                            <div className="py-2" key={index}>
                                -- {value.invoice_subscriptionable.name}
                            </div>
                        ) : (
                            <div className="text-rose-500" key={index}>
                                --تم حذف الكورس--
                            </div>
                        )
                    )
                ) : row.quantity > 0 ? (
                    <div className="text-rose-500">--تم حذف المشتريات--</div>
                ) : (
                    <div className="text-yellow-500">--لا توجد مشتريات--</div>
                ),
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
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={payment.getInvoiceUrl(row.invoice)}
                        className="underline"
                    >
                        {row.invoice_id}
                    </a>
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
                    api={`/api/user/invoices/paginate`}
                    columns={columns}
                />
            </div>
        </div>
    );
};

export default Invoices;
