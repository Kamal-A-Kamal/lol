import React, { useEffect, useState } from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import RemoteTable from "../../components/ui/RemoteTable";
import { printFullDate } from "../../utils/time";
import InputField from "../../components/form/elements/InputField";
import auth from "../../services/authServices";
import http from "../../services/httpServices";
import { handleInputChange } from "../../services/formServices";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import payment from "../../services/paymentServices";
import { isSubjectSubscriptionable } from "../../services/defaultSettings";

const SubscriptionsTable = () => {
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
            name: "رقم هاتف ولي الأمر",
            reorder: true,
            selector: (row) =>
                row.user ? (
                    <>0{row.user.father_phone}</>
                ) : (
                    <span className="text-rose-500">-- لم يتم العثور علي المستخدم --</span>
                ),
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
            sortField: "is_manual",
        },
        {
            name: "رقم الفاتورة",
            reorder: true,
            selector: (row) => (
                <>
                    {row.invoice ? (
                        <div>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={payment.getInvoiceUrl(row.invoice)}
                                className="underline"
                            >
                                {row.invoice.invoice_id}
                            </a>
                        </div>
                    ) : (
                        "-- لا توجد فاتورة --"
                    )}
                </>
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

    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [governments, setGovernments] = useState([]);
    const initialState = {
        course_id: 0,
        government_id: 0,
        teacher_id: 0,
        phone: "",
        is_manual: "",
    };
    const [filterData, setFilterData] = useState(initialState);

    const [data, setData] = useState(initialState);

    const getCourses = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/courses/options`, config);
        setCourses(response);
    };

    const getGovernments = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/governments`, config);
        setGovernments(response);
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
        getGovernments();
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
                        className="lg:col-span-2"
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
                        id="is_manual"
                        type="select"
                        placeholder="طريقة الاشتراك"
                        options={[
                            {
                                value: "all",
                                text: "جميع الطرق",
                            },
                            {
                                value: 0,
                                text: "اوتوماتك",
                            },
                            {
                                value: 1,
                                text: "يدوي",
                            },
                        ]}
                        onChange={handleInputChange}
                        data={data}
                        setData={setData}
                    />
                    <InputField
                        id="government_id"
                        type="select"
                        placeholder="اختر المحافظة"
                        options={[
                            {
                                value: 0,
                                text: "كل المحافظات",
                            },
                            ...governments,
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
                    api={`/api/subscriptions/paginate`}
                    columns={columns}
                    filterData={filterData}
                />
            </div>
        </AdminContainer>
    );
};

export default SubscriptionsTable;
