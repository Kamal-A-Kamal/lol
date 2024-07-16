import React, { useEffect, useState } from "react";
import InputField from "../../components/form/elements/InputField";
import AdminContainer from "../../components/ui/AdminContainer";
import RemoteTable from "../../components/ui/RemoteTable";
import {
    isAdminUsers,
    isCenterUsers,
    isInsertAutoTypes,
    isMultiYear,
} from "../../services/defaultSettings";
import { getYearPlaceHolder } from "../../services/yearSevices";
import { printFullDate } from "../../utils/time";
import { handleInputChange } from "../../services/formServices";
import http from "../../services/httpServices";
import Button from "../../components/ui/Button";
import auth from "../../services/authServices";
import { printIdOfOptions } from "../../utils/ar";

const UsersTable = () => {
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
    ];
    if (isAdminUsers) {
        columns = [
            ...columns,
            {
                name: "المسئول",
                reorder: true,
                selector: (row) => printIdOfOptions(admins, row.admin_id),
                sortable: true,
                sortField: "admin_id",
            },
        ];
    }
    columns = [
        ...columns,

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
            selector: (row) => row.phone,
            sortable: true,
            sortField: "phone",
        },
        {
            name: "المحافظة",
            reorder: true,
            selector: (row) => printIdOfOptions(governments, row.government_id),
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
        user_type: 0,
    };

    const [filterData, setFilterData] = useState(initialState);

    const [data, setData] = useState(initialState);

    const [tableInputData, setTableInputData] = useState();

    const [governments, setGovernments] = useState([]);
    const [admins, setAdmins] = useState([]);

    async function getGovernments() {
        const { data } = await http.get("/api/governments");
        setGovernments(data);
    }
    const getAdmins = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);
        const { data: response } = await http.get(`/api/admins`, config);

        let adminOptions = response.map((user) => {
            return { value: user.id, text: user.full_name + ` (@${user.email})` };
        });
        setAdmins(adminOptions);
    };

    useEffect(() => {
        if (isAdminUsers) {
            getAdmins();
        }
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
                    {isAdminUsers ? (
                        <InputField
                            id="admin_id"
                            placeholder="المسئول"
                            type="select"
                            options={[
                                {
                                    value: 0,
                                    text: "الكل",
                                },
                                {
                                    value: "without_admin",
                                    text: "بدون مسئول",
                                },
                                ...admins,
                            ]}
                            onChange={handleInputChange}
                            data={data}
                            setData={setData}
                            className="lg:col-span-2"
                        />
                    ) : (
                        ""
                    )}
                    {isInsertAutoTypes ? (
                        <InputField
                            id="user_type"
                            placeholder="نوع الطالب"
                            type="select"
                            options={[
                                {
                                    value: 0,
                                    text: "الكل",
                                },
                                {
                                    value: "users",
                                    text: "طالب المنصة",
                                },
                                {
                                    value: "codes",
                                    text: "اكواد",
                                },
                                isCenterUsers && {
                                    value: "centers",
                                    text: "طلاب من السنتر",
                                },
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
                    api={`/api/users/paginate`}
                    columns={columns}
                    filterData={filterData}
                />
            </div>
        </AdminContainer>
    );
};

export default UsersTable;
