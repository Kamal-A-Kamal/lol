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
import { Link } from "react-router-dom";

const HmResultsTable = () => {
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
            selector: (row) => row.user.full_name,
        },
        {
            name: "رقم هاتف الطالب",
            reorder: true,
            selector: (row) => (
                <Link
                    className="block px-1 py-1 text-center underline"
                    element="Link"
                    to={`../user_profile/${row.user.id}`}
                >
                    0{row.user.phone}
                </Link>
            ),
        },
        {
            name: "رقم هاتف ولى الأمر",
            reorder: true,
            selector: (row) => <span>0{row.user.father_phone}</span>,
        },
        {
            name: "اسم الواجب",
            reorder: true,
            selector: (row) => row.exam.name,
            sortable: true,
            sortField: "exam_id",
        },
        {
            name: "عدد الاسئلة",
            reorder: true,
            selector: (row) => row.questions_quantity,
            sortable: true,
            sortField: "questions_quantity",
        },
        {
            name: "النتيجة",
            reorder: true,
            selector: (row) => `${Math.round((row.result / row.questions_quantity) * 100)} %`,
            sortable: true,
            sortField: "result",
        },
        {
            name: "عدد الاسئلة المحلولة",
            reorder: true,
            selector: (row) => row.is_selected_count,
            sortable: true,
            sortField: "is_selected_count",
        },
        {
            name: "عدد الاسئلة الصحيحة",
            reorder: true,
            selector: (row) => row.result,
            sortable: true,
            sortField: "result",
        },
        {
            name: "الاجابات",
            reorder: true,
            selector: (row) => (
                <Button
                    className="block px-1 py-1 text-center"
                    element="Link"
                    to={`../user_profile/exam_results/${row.id}`}
                >
                    عرض الاجابات
                </Button>
            ),
            // sortable: true,
            // sortField: "questions_quantity",
        },
        {
            name: "وقت انهاء الواجب",
            reorder: true,
            selector: (row) => printFullDate(row.updated_at),
            sortable: true,
            sortField: "updated_at",
        },
        {
            name: "وقت بدأ الواجب",
            reorder: true,
            selector: (row) => printFullDate(row.created_at),
            sortable: true,
            sortField: "created_at",
        },
    ];

    const initialState = {
        full_name: "",
        phone: "",
        division_id: 0,
        exam_id: 0,
    };

    const [filterData, setFilterData] = useState(initialState);

    const [data, setData] = useState(initialState);

    const [divisions, setDivisions] = useState([]);
    const getDivisions = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/divisions/options`, config);
        setDivisions(response);
    };
    useEffect(() => {
        getDivisions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [exams, setExams] = useState([]);
    const getExams = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(
            `/api/divisions/${data.division_id}/exams/hm/options`,
            config
        );
        setExams(response);
    };
    useEffect(() => {
        // eslint-disable-next-line eqeqeq
        if (data.division_id != 0) {
            getExams();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.division_id]);

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
                        id="division_id"
                        type="select"
                        placeholder="اختر القسم"
                        options={divisions}
                        onChange={handleInputChange}
                        data={data}
                        setData={setData}
                    />
                    <InputField
                        id="exam_id"
                        type="select"
                        placeholder="اختر الواجب"
                        options={[
                            {
                                value: 0,
                                text: "كل الواجبات",
                            },
                            ...exams,
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
                    api={`/api/exam_results/hm/paginate`}
                    columns={columns}
                    filterData={filterData}
                />
            </div>
        </AdminContainer>
    );
};

export default HmResultsTable;
