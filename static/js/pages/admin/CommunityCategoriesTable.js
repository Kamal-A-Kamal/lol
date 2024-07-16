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

const CommunityCategoriesTable = () => {
    let columns = [
        {
            name: "التسلسل",
            reorder: true,
            selector: (row) => row.id,
            sortable: true,
            sortField: "id",
        },
        {
            name: "الاسم",
            reorder: true,
            selector: (row) => row.name,
            sortable: true,
            sortField: "name",
        },
        {
            name: "عدد المستخدمين القادرين على رؤية المجموعة",
            reorder: true,
            selector: (row) => row.users_able_to_view_count,
            // sortable: true,
            // sortField: "users_able_to_view_count",
        },
        {
            name: "عدد المستخدمين القادرين على المشاركة في المجموعة",
            reorder: true,
            selector: (row) => row.users_able_to_contribute_count,
            // sortable: true,
            // sortField: "users_able_to_contribute_count",
        },
        {
            name: "عدد المواضيع المقبولة",
            reorder: true,
            selector: (row) => row.approved_posts_count,
            // sortable: true,
            // sortField: "approved_posts_count",
        },
        {
            name: "عدد المواضيع قيد المراجعة",
            reorder: true,
            selector: (row) => row.pending_posts_count,
            // sortable: true,
            // sortField: "pending_posts_count",
        },
    ];
    columns = [
        ...columns,
        {
            name: "تاريخ اخر نشاط في المجموعة",
            reorder: true,
            selector: (row) => row.created_at,
            format: (row) => printFullDate(row.created_at),
            sortable: true,
            sortField: "created_at",
        },
        {
            name: "تاريخ انشاء المجموعة",
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

    // async function getGovernments() {
    //     const { data } = await http.get("/api/governments");
    //     let governments = data.filter((value) =>
    //         ["الإسماعيلية", "القاهره", "الجيزة"].includes(value.text)
    //     );
    //     setGovernments(governments);
    // }

    // async function getCenters() {
    //     const { data } = await http.get("/api/centers/options");
    //     setCenters(data);
    //     // user["government_id"] = data[0]["value"];
    //     // setUser(user);
    // }

    useEffect(() => {
        // getGovernments();
        // getCenters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AdminContainer>
            <div className="w-full space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6 w-full">
                    {/* <InputField
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
                    /> */}
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
                    api={`/api/community_categories/paginate`}
                    columns={columns}
                    filterData={filterData}
                />
            </div>
        </AdminContainer>
    );
};

export default CommunityCategoriesTable;
