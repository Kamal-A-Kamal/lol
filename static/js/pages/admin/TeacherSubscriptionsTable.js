import React, { useEffect, useState } from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import RemoteTable from "../../components/ui/RemoteTable";
import { printFullDate } from "../../utils/time";
import { getInvoiceLink } from "../../services/fawaterkServices";
import InputField from "../../components/form/elements/InputField";
import auth from "../../services/authServices";
import http from "../../services/httpServices";
import { handleInputChange } from "../../services/formServices";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

const TeacherSubscriptionsTable = ({ teacherId = 0, isTeacherAdmin = false }) => {
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
                row.subscriptionable_type == "teacher" ? (
                    row.relatable ? (
                        <div className="py-2">{row.relatable.name}</div>
                    ) : (
                        <div className="text-rose-500">--تم حذف المادة--</div>
                    )
                ) : row.subscriptionable ? (
                    <div className="py-2">{row.subscriptionable.name}</div>
                ) : (
                    <div className="text-rose-500">--تم حذف الكورس--</div>
                ),
            // row.subscriptionable ? (
            //     row.subscriptionable.name
            // ) : (
            //     <div className="text-rose-500">--تم حذف الكورس--</div>
            // ),
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
                        اوتوماتك {row.wallet_record_id ? "-محفظة" : ""}
                    </div>
                ),
            sortable: true,
            sortField: "is_manual",
        },
        {
            name: "السعر",
            reorder: true,
            selector: (row) => row.price,
            sortable: true,
            sortField: "price",
        },
        {
            name: "رقم الفاتورة",
            reorder: true,
            selector: (row) => (
                <>
                    {row.invoice ? (
                        <div>
                            {/* <a
                                target="_blank"
                                rel="noreferrer"
                                href={getInvoiceLink(
                                    row.invoice.invoice_id,
                                    row.invoice.invoice_key
                                )}
                                className="underline"
                            > */}
                            {row.invoice.invoice_id}
                            {/* </a> */}
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
            name: "رقم سجل المحفظة",
            reorder: true,
            selector: (row) => <>{row.wallet_record_id}</>,
            sortable: true,
            sortField: "wallet_record_id",
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
    const [subjects, setSubjects] = useState([]);
    const initialState = {
        course_id: 0,
        teacher_id: 0,
        phone: "",
        is_manual: "",
    };
    const [filterData, setFilterData] = useState(initialState);

    const [data, setData] = useState(initialState);

    const getCourses = async () => {
        if (isTeacherAdmin) {
            const token = auth.getTeacherToken();
            const config = auth.getTeacherAuthConfig(token);
            const { data: response } = await http.get(
                `/api/teacher_admin_panel/courses/options`,
                config
            );
            setCourses(response);
        } else {
            const token = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(token);
            const { data: response } = await http.get(
                `/api/teachers/${teacherId}/courses/options`,
                config
            );
            setCourses(response);
        }
    };
    const getSubjects = async () => {
        if (isTeacherAdmin) {
            const token = auth.getTeacherToken();
            const config = auth.getTeacherAuthConfig(token);

            const { data: response } = await http.get(
                `/api/teacher_admin_panel/withyears/subjects/options`,
                config
            );
            setSubjects(response);
        } else {
            const token = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(token);

            const { data: response } = await http.get(
                `/api/admin/withyears/teachers/${teacherId}/subjects/options`,
                config
            );
            setSubjects(response);
        }
    };
    useEffect(() => {
        getCourses();
        getSubjects();
    }, []);

    return (
        // <AdminContainer>
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
                        {
                            value: "from_wallet",
                            text: "من المحفظة",
                        },
                    ]}
                    onChange={handleInputChange}
                    data={data}
                    setData={setData}
                />
                <InputField
                    id="subject_id"
                    type="select"
                    placeholder="اختر المادة"
                    options={[
                        {
                            value: 0,
                            text: "كل المواد",
                        },
                        ...subjects,
                    ]}
                    onChange={handleInputChange}
                    data={data}
                    setData={setData}
                />
                <InputField
                    id="subscriptionable_type"
                    type="select"
                    placeholder="اختر نوع الاشتراك"
                    options={[
                        {
                            value: "all",
                            text: "كل الفواتير",
                        },
                        {
                            value: "course",
                            text: "اشتراك بالكورس",
                        },
                        {
                            value: "teacher",
                            text: "اشتراك شهري",
                        },
                    ]}
                    onChange={handleInputChange}
                    data={data}
                    setData={setData}
                />
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
                api={`${
                    isTeacherAdmin
                        ? `/api/teacher_admin_panel/subscriptions/paginate`
                        : `/api/teachers/${teacherId}/subscriptions/paginate`
                }`}
                columns={columns}
                filterData={filterData}
                isTeacherAdmin={isTeacherAdmin}
                isAdmin={!isTeacherAdmin}
            />
        </div>
        // </AdminContainer>
    );
};

export default TeacherSubscriptionsTable;
