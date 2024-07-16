import React, { useState } from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import RemoteTable from "../../components/ui/RemoteTable";
import { printFullDateTime } from "../../utils/time";
import Button from "../../components/ui/Button";
import { handleInputChange } from "../../services/formServices";
import InputField from "../../components/form/elements/InputField";

const LogoutTokensTable = () => {
    const columns = [
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
                    "0" + row.tokenable.phone
                ) : (
                    <span className="text-rose-500">-- لم يتم العثور علي المستخدم --</span>
                ),
        },
        {
            name: "اسم الطالب",
            reorder: true,
            selector: (row) =>
                row.tokenable ? (
                    row.tokenable.full_name
                ) : (
                    <span className="text-rose-500">-- لم يتم العثور علي المستخدم --</span>
                ),
        },
        {
            name: "تم تسجيل الخروج بواسطة",
            reorder: true,
            selector: (row) => row.deleted_by,
            sortable: true,
            sortField: "deleted_by",
        },
        {
            name: "نوع الجهاز",
            reorder: true,
            selector: (row) => row.device_info.device_type,
        },
        {
            name: "اسم الجهاز",
            reorder: true,
            selector: (row) => row.device_info.device_name,
        },
        {
            name: "نظام التشغيل",
            reorder: true,
            selector: (row) => row.device_info.device_platform,
        },
        {
            name: "المتصفح",
            reorder: true,
            selector: (row) => row.device_info.device_browser,
        },
        {
            name: "تاريخ تسجيل الخروج",
            reorder: true,
            selector: (row) => printFullDateTime(row.deleted_at),
            sortable: true,
            sortField: "deleted_at",
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
        deleted_by: 0,
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
                    <InputField
                        id="deleted_by"
                        placeholder="تسجيل خروج بواسطة:"
                        type="select"
                        options={[
                            {
                                value: 0,
                                text: "الكل",
                            },
                            {
                                value: "admin",
                                text: "الادمن",
                            },
                            {
                                value: "user",
                                text: "المستخدم",
                            },
                            {
                                value: "automatic",
                                text: "اوتوماتك",
                            },
                        ]}
                        onChange={handleInputChange}
                        data={data}
                        setData={setData}
                        className="lg:col-span-2"
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
                    api={`/api/logout_tokens/paginate`}
                    columns={columns}
                    filterData={filterData}
                />
            </div>
        </AdminContainer>
    );
};

export default LogoutTokensTable;
