import React, { useState } from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import Button from "../../components/ui/Button";
import RemoteTable from "../../components/ui/RemoteTable";
import auth from "../../services/authServices";
import http from "../../services/httpServices";
import modal from "../../services/modalServices";
import { printFullDateTime } from "../../utils/time";
import { Link } from "react-router-dom";
import InputField from "../../components/form/elements/InputField";
import { handleInputChange } from "../../services/formServices";

const LoginTokensTable = () => {
    const [index, setIndex] = useState(0);

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
                        const token = auth.getAdminToken();
                        const config = auth.getAdminAuthConfig(token);
                        // eslint-disable-next-line no-unused-vars
                        const { data } = await http.post(`/api/tokens/${id}/destroy`, {}, config);
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
    const columns = [
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
        {
            name: "التسلسل",
            reorder: true,
            selector: (row) => row.id,
            sortable: true,
            sortField: "id",
        },
        {
            name: "تسلسل  الطالب",
            reorder: true,
            selector: (row) =>
                row.tokenable ? (
                    row.tokenable.id
                ) : (
                    <span className="text-rose-500">-- لم يتم العثور علي المستخدم --</span>
                ),
        },
        {
            name: "رقم الهاتف",
            reorder: true,

            selector: (row) =>
                row.tokenable ? (
                    <Link className="underline" to={`../user_profile/${row.tokenable.id}`}>
                        {"0" + row.tokenable.phone}
                    </Link>
                ) : (
                    <span className="text-rose-500">-- لم يتم العثور علي المستخدم --</span>
                ),
            // sortable: true,
            // sortField: "tokenable.phone",
        },
        {
            name: "اسم الطالب",
            reorder: true,
            selector: (row) =>
                row.tokenable ? (
                    <Link className="underline" to={`../user_profile/${row.tokenable.id}`}>
                        {row.tokenable.full_name}
                    </Link>
                ) : (
                    <span className="text-rose-500">-- لم يتم العثور علي المستخدم --</span>
                ),
            // sortable: true,
            // sortField: "tokenable.full_name",
        },
        // {
        //     name: "عدد الأجهزة/المتصفح اليوم",
        //     reorder: true,
        //     selector: (row) => row.devices_today,
        //     sortable: true,
        //     sortField: "devices_today",
        // },
        // {
        //     name: "عدد الأجهزة/المتصفح هذا الأسبوع",
        //     reorder: true,
        //     selector: (row) => row.devices_this_week,
        //     sortable: true,
        //     sortField: "devices_this_week",
        // },
        {
            name: "عدد مرات تسجيل الخروج اليوم",
            reorder: true,
            selector: (row) => row.deleted_today,
            sortable: true,
            sortField: "deleted_today",
        },
        {
            name: "عدد مرات تسجيل الخروج هذا الأسبوع",
            reorder: true,
            selector: (row) => row.deleted_this_week,
            sortable: true,
            sortField: "deleted_this_week",
        },
        {
            name: "نوع الجهاز",
            reorder: true,
            selector: (row) => row.device_info.device_type,
            // sortable: true,
            // sortField: "device_info.device_type",
        },
        {
            name: "اسم الجهاز",
            reorder: true,
            selector: (row) => row.device_info.device_name,
            // sortable: true,
            // sortField: "device_info.device_name",
        },
        {
            name: "نظام التشغيل",
            reorder: true,
            selector: (row) => row.device_info.device_platform,
            // sortable: true,
            // sortField: "device_info.device_info",
        },
        {
            name: "المتصفح",
            reorder: true,
            selector: (row) => row.device_info.device_browser,
            // sortable: true,
            // sortField: "device_info.device_browser",
        },
        {
            name: "اخر نشاط",
            reorder: true,
            selector: (row) => printFullDateTime(row.last_used_at),
            sortable: true,
            sortField: "last_used_at",
        },
        {
            name: "تاريخ تسجيل الدخول",
            reorder: true,
            selector: (row) => printFullDateTime(row.created_at),
            sortable: true,
            sortField: "created_at",
        },
    ];

    const initialState = {
        phone: "",
        name: "",
    };
    const [filterData, setFilterData] = useState(initialState);

    const [data, setData] = useState(initialState);

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
                        id="name"
                        placeholder="تفاصيل \ اسم الجهاز"
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
                    key={index}
                    api={`/api/login_tokens/paginate`}
                    columns={columns}
                    filterData={filterData}
                />
            </div>
        </AdminContainer>
    );
};

export default LoginTokensTable;
