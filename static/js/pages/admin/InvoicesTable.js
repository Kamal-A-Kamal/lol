import React, { useEffect, useState } from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import RemoteTable from "../../components/ui/RemoteTable";
import { printFullDate } from "../../utils/time";
import { getInvoiceLink } from "../../services/fawaterkServices";
import InputField from "../../components/form/elements/InputField";
import { handleInputChange } from "../../services/formServices";
import auth from "../../services/authServices";
import http from "../../services/httpServices";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import modal from "../../services/modalServices";
import payment from "../../services/paymentServices";
import { isSubjectSubscriptionable } from "../../services/defaultSettings";

const InvoicesTable = () => {
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
            selector: (row) =>
                row.user ? (
                    row.user.full_name
                ) : (
                    <span className="text-rose-500">-- لم يتم العثور علي المستخدم --</span>
                ),
            // sortable: true,
            // sortField: "user.full_name",
        },
        {
            name: "رقم هاتف الطالب",
            reorder: true,
            selector: (row) =>
                row.user ? (
                    <Link
                        className="block px-1 py-1 text-center underline"
                        element="Link"
                        to={`../user_profile/${row.user.id}`}
                    >
                        0{row.user.phone}
                    </Link>
                ) : (
                    <span className="text-rose-500">-- لم يتم العثور علي المستخدم --</span>
                ),
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
                        href={payment.getInvoiceUrl(row)}
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

    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const initialState = {
        course_id: 0,
        teacher_id: 0,
        phone: "",
        invoice_id: "",
        invoice_status: 0,
    };
    const [filterData, setFilterData] = useState(initialState);

    const [data, setData] = useState(initialState);

    const getCourses = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/courses/options`, config);
        setCourses(response);
    };
    const fetchTeacher = async () => {
        let params = {
            limit: 100,
        };
        try {
            const { data: res } = await http.get("/api/teacher", {
                params,
            });
            setTeachers(res.results.map((teacher) => ({ value: teacher.id, text: teacher.name })));
        } catch (error) {
            console.log("err : ", error);
        }
    };
    useEffect(() => {
        getCourses();
        if (isSubjectSubscriptionable) {
            fetchTeacher();
        }
    }, []);

    return (
        <AdminContainer>
            <div className="w-full space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6 w-full">
                    <InputField
                        id="phone"
                        placeholder="رقم هاتف الطالب"
                        onChange={handleInputChange}
                        data={data}
                        setData={setData}
                    />
                    <InputField
                        id="invoice_id"
                        placeholder="رقم الفاتورة"
                        onChange={handleInputChange}
                        data={data}
                        setData={setData}
                    />
                    <InputField
                        id="course_id"
                        type="select"
                        placeholder="اختر الكورس"
                        options={[
                            {
                                value: 0,
                                text: "كل الكورسات",
                            },
                            ...courses,
                        ]}
                        onChange={handleInputChange}
                        data={data}
                        setData={setData}
                    />
                    <InputField
                        id="invoice_status"
                        type="select"
                        placeholder="حالة الدفع"
                        options={[
                            {
                                value: 0,
                                text: "جميع الحالات",
                            },
                            {
                                value: "pending",
                                text: "غير مدفوع",
                            },
                            {
                                value: "paid",
                                text: "مدفوع",
                            },
                        ]}
                        onChange={handleInputChange}
                        data={data}
                        setData={setData}
                    />
                    {isSubjectSubscriptionable ? (
                        <InputField
                            id="teacher_id"
                            type="select"
                            placeholder="جميع المدرسين"
                            options={[
                                {
                                    value: 0,
                                    text: "جميع المدرسين",
                                },
                                ...teachers,
                            ]}
                            onChange={handleInputChange}
                            data={data}
                            setData={setData}
                            className="lg:col-span-2"
                        />
                    ) : (
                        ""
                    )}
                </div>
                <Button
                    className="w-full"
                    color="blue"
                    onClick={() => {
                        setFilterData(data);
                    }}
                >
                    بحث
                </Button>
                <RemoteTable
                    api={`/api/invoices/paginate`}
                    columns={columns}
                    filterData={filterData}
                />
            </div>
        </AdminContainer>
    );
};

export default InvoicesTable;
