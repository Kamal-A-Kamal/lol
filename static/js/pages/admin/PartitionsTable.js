import React, { useEffect, useState } from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import Button from "../../components/ui/Button";
import RemoteTable from "../../components/ui/RemoteTable";
import http from "../../services/httpServices";
// import { isMultiYear } from "../../services/defaultSettings";
// import { getYearPlaceHolder } from "../../services/yearSevices";
import { printFullDate } from "../../utils/time";
import InputField from "../../components/form/elements/InputField";
import { handleInputChange } from "../../services/formServices";
import auth from "../../services/authServices";

const PartitionsTable = () => {
    let columns = [
        {
            name: "التسلسل",
            reorder: true,
            selector: (row) => row.id,
            sortable: true,
            sortField: "id",
        },
        {
            name: "اسم المجموعة",
            reorder: true,
            selector: (row) => row.name,
            sortable: true,
            sortField: "name",
        },
        {
            name: "عدد الاسئلة المضافة",
            reorder: true,
            selector: (row) => row.questions_count,
            sortable: true,
            sortField: "questions_count",
        },
        {
            name: "قسم الموقع",
            reorder: true,
            selector: (row) => (row.division ? row.division.name : "-- تم حذف القسم -- "),
            sortable: true,
            sortField: "division_id",
        },
        {
            name: "تاريخ الانشاء",
            reorder: true,
            selector: (row) => printFullDate(row.created_at),
            sortable: true,
            sortField: "created_at",
        },
    ];

    const initialState = {
        exam_id: 0,
    };

    const [filterData, setFilterData] = useState(initialState);
    const [data, setData] = useState(initialState);

    const [exams, setExams] = useState([]);
    const getExams = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/exams/options`, config);
        setExams(response);
    };

    useEffect(() => {
        getExams();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AdminContainer>
            <div className="w-full space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6 w-full">
                    <InputField
                        id="exam_id"
                        type="select"
                        placeholder="اختر الاختبار"
                        options={[
                            {
                                value: 0,
                                text: "كل الاختبارات",
                            },
                            ...exams,
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
                    api={`/api/partitions/paginate`}
                    columns={columns}
                    filterData={filterData}
                />
            </div>
        </AdminContainer>
    );
};

export default PartitionsTable;
