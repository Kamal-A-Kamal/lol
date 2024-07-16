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
import modal from "../../services/modalServices";
import { baseURL } from "../../config";
import { printIdOfOptions } from "../../utils/ar";

const CenterUsersTable = () => {
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
            name: "اثبات شخصية",
            reorder: true,
            selector: (row) => (
                <Button
                    color="blue"
                    onClick={(e) => {
                        e.preventDefault();
                        modal.message({ icon: `${baseURL}/${row.national_id_copy}` });
                    }}
                    className=""
                >
                    عرض الصورة
                </Button>
            ),
            sortable: true,
            sortField: "national_id_copy",
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
            name: "اسم السنتر",
            reorder: true,
            selector: (row) => printIdOfOptions(centers, row.center_id),
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
    const [centers, setCenters] = useState([]);

    async function getGovernments() {
        const { data } = await http.get("/api/governments");
        let governments = data.filter((value) =>
            ["الإسماعيلية", "القاهره", "الجيزة"].includes(value.text)
        );
        setGovernments(governments);
    }

    async function getCenters() {
        const { data } = await http.get("/api/centers/options");
        setCenters(data);
        // user["government_id"] = data[0]["value"];
        // setUser(user);
    }

    useEffect(() => {
        getGovernments();
        getCenters();
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
                    <InputField
                        id="center_id"
                        placeholder="السنتر"
                        type="select"
                        options={[
                            {
                                value: 0,
                                text: "الكل",
                            },
                            ...centers,
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
                    api={`/api/center_users/paginate`}
                    columns={columns}
                    filterData={filterData}
                />
            </div>
        </AdminContainer>
    );
};

export default CenterUsersTable;
