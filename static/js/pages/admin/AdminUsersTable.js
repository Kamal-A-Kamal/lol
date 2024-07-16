import React, { useEffect, useState } from "react";
import InputField from "../../components/form/elements/InputField";
import AdminContainer from "../../components/ui/AdminContainer";
import RemoteTable from "../../components/ui/RemoteTable";
import { isMultiYear } from "../../services/defaultSettings";
import { getYearPlaceHolder } from "../../services/yearSevices";
import { printFullDate } from "../../utils/time";
import { handleInputChange } from "../../services/formServices";
import http from "../../services/httpServices";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";

const AdminUsersTable = () => {
    let columns = [
        {
            name: "التسلسل",
            reorder: true,
            selector: (row) => row.id,
            sortable: true,
            sortField: "id",
        },
        {
            name: "الاسم الكامل",
            reorder: true,
            selector: (row) => row.full_name,
            sortable: true,
            sortField: "full_name",
        },
        {
            name: "عدد مرات تغير الباسورد",
            reorder: true,
            selector: (row) => row.password_reset_count,
            sortable: true,
            sortField: "password_reset_count",
        },
        {
            name: "رقم الهاتف",
            reorder: true,
            selector: (row) => (
                <Link
                    className="block px-1 py-1 text-center underline"
                    element="Link"
                    to={`../user_profile/${row.id}`}
                >
                    0{row.phone}
                </Link>
            ),
            sortable: true,
            sortField: "phone",
        },
        {
            name: "رقم هاتف ولي الأمر",
            reorder: true,
            selector: (row) => row.father_phone,
            sortable: true,
            sortField: "father_phone",
        },
        {
            name: "البريد الإلكتروني",
            reorder: true,
            selector: (row) => row.email,
            sortable: true,
            sortField: "email",
        },
    ];
    if (isMultiYear) {
        columns.push({
            name: "العام الدراسي",
            reorder: true,
            selector: (row) => row.year,
            format: (row) => getYearPlaceHolder(row.year),
            sortable: true,
            sortField: "year",
        });
    }

    columns = [
        ...columns,
        {
            name: "عدد الإشتراكات",
            reorder: true,
            selector: (row) => row.subscriptions_count,
            sortable: true,
            sortField: "subscriptions_count",
        },
        {
            name: "عدد الفواتير",
            reorder: true,
            selector: (row) => row.invoices_count,
            sortable: true,
            sortField: "invoices_count",
        },
        {
            name: "تاريخ انشاء الحساب",
            reorder: true,
            selector: (row) => row.created_at,
            format: (row) => printFullDate(row.created_at),
            sortable: true,
            sortField: "created_at",
        },
    ];

    const initialState = {
        full_name: "",
        phone: "",
        father_phone: "",
        email: "",
        government_id: 0,
    };

    const [filterData, setFilterData] = useState(initialState);

    const [data, setData] = useState(initialState);

    const [governments, setGovernments] = useState([]);

    async function getGovernments() {
        const { data } = await http.get("/api/governments");
        setGovernments(data);
    }
    useEffect(() => {
        getGovernments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AdminContainer>
            <div className="w-full space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6 w-full">
                    <InputField
                        id="full_name"
                        placeholder="اسم الطالب"
                        onChange={handleInputChange}
                        data={data}
                        setData={setData}
                    />
                    <InputField
                        id="phone"
                        placeholder="رقم هاتف الطالب"
                        onChange={handleInputChange}
                        data={data}
                        setData={setData}
                    />
                    <InputField
                        id="father_phone"
                        placeholder="رقم هاتف ولي الأمر"
                        onChange={handleInputChange}
                        data={data}
                        setData={setData}
                    />
                    <InputField
                        id="email"
                        placeholder="البريد الإلكتروني"
                        onChange={handleInputChange}
                        data={data}
                        setData={setData}
                    />
                    <InputField
                        id="government_id"
                        placeholder="المحافظة"
                        type="select"
                        options={[
                            {
                                value: 0,
                                text: "الكل",
                            },
                            ...governments,
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
                    api={`/api/admin_users/users/paginate`}
                    columns={columns}
                    filterData={filterData}
                />
            </div>
        </AdminContainer>
    );
};

export default AdminUsersTable;
