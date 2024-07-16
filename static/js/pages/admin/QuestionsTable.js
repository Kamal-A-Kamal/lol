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
import BooleanIndicator from "../../components/ui/BooleanIndicator";
import modal from "../../services/modalServices";
import { baseURL } from "../../config";
import { useParams } from "react-router-dom";

const QuestionsTable = () => {
    let columns = [
        {
            name: "التسلسل",
            reorder: true,
            selector: (row) => row.id,
            sortable: true,
            sortField: "id",
        },
        {
            name: "العنوان",
            reorder: true,
            selector: (row) => row.title,
            sortable: true,
            sortField: "title",
        },
        {
            name: "الاجابة الأولى",
            reorder: true,
            selector: (row) =>
                row.answer_1 === row.correct_answer ? (
                    <>
                        {row.answer_1}
                        <span className="bg-emerald-500 clr-white px-2 pt-0.5 pb-1 font-smaller rounded-md text-center block mt-1">
                            صحيحة
                        </span>
                    </>
                ) : (
                    row.answer_1
                ),
            sortable: true,
            sortField: "answer_1",
        },
        {
            name: "الاجابة الثانية",
            reorder: true,
            selector: (row) =>
                row.answer_2 === row.correct_answer ? (
                    <>
                        {row.answer_2}
                        <span className="bg-emerald-500 clr-white px-2 pt-0.5 pb-1 font-smaller rounded-md text-center block mt-1">
                            صحيحة
                        </span>
                    </>
                ) : (
                    row.answer_2
                ),
            sortable: true,
            sortField: "answer_2",
        },
        {
            name: "الاجابة الثالثة",
            reorder: true,
            selector: (row) =>
                row.answer_3 === row.correct_answer ? (
                    <>
                        {row.answer_3}
                        <span className="bg-emerald-500 clr-white px-2 pt-0.5 pb-1 font-smaller rounded-md text-center block mt-1">
                            صحيحة
                        </span>
                    </>
                ) : (
                    row.answer_3
                ),
            sortable: true,
            sortField: "answer_3",
        },
        {
            name: "الاجابة الرابعة",
            reorder: true,
            selector: (row) =>
                row.answer_4 === row.correct_answer ? (
                    <>
                        {row.answer_4}
                        <span className="bg-emerald-500 clr-white px-2 pt-0.5 pb-1 font-smaller rounded-md text-center block mt-1">
                            صحيحة
                        </span>
                    </>
                ) : (
                    row.answer_4
                ),
            sortable: true,
            sortField: "answer_4",
        },
        {
            name: "ترتيب عشوائي للإجابات",
            reorder: true,
            width: "150px",
            selector: (row) => <BooleanIndicator value={row.shuffle_answers} />,
            sortable: true,
            sortField: "shuffle_answers",
        },
        {
            name: "الصورة",
            reorder: true,
            width: "150px",
            selector: (row) =>
                row.have_picture ? (
                    <Button
                        color="emerald"
                        onClick={() => showPicture(row.picture)}
                        hoverEffect="hover-shadow"
                    >
                        عرض الصورة
                    </Button>
                ) : (
                    "-- لا توجد صورة -- "
                ),
        },
        {
            name: "قسم الموقع",
            reorder: true,
            selector: (row) => (row.division ? row.division.name : "-- تم حذف القسم -- "),
            sortable: true,
            sortField: "division_id",
        },
        {
            name: "تاريخ آخر تعديل",
            reorder: true,
            selector: (row) => printFullDate(row.updated_at),
            sortable: true,
            sortField: "updated_at",
        },
        {
            name: "تاريخ الانشاء",
            reorder: true,
            selector: (row) => printFullDate(row.created_at),
            sortable: true,
            sortField: "created_at",
        },
    ];

    const showPicture = (picture) => {
        modal.message({ icon: `${baseURL}/${picture}` });
    };

    const initialState = {
        title: "",
        exam_id: 0,
        partition_id: 0,
        division_id: 0,
    };

    const params = useParams();

    useEffect(() => {
        setFilterData(params);
    }, []);

    const [filterData, setFilterData] = useState(initialState);
    const [data, setData] = useState(initialState);

    const [exams, setExams] = useState([]);
    const [partitions, setPartitions] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const getExams = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/exams/options`, config);
        setExams(response);
    };
    const getPartitions = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/partitions/options`, config);
        setPartitions(response);
    };
    const getDivisions = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/divisions/options`, config);
        setDivisions(response);
    };

    useEffect(() => {
        getExams();
        getPartitions();
        getDivisions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AdminContainer>
            <div className="w-full space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6 w-full">
                    <InputField
                        id="title"
                        placeholder="رأس السؤال"
                        onChange={handleInputChange}
                        data={data}
                        setData={setData}
                        className="lg:col-span-2"
                    />
                    <InputField
                        id="division_id"
                        type="select"
                        placeholder="اختر قسم الموقع"
                        options={[
                            {
                                value: 0,
                                text: "كل الاقسام",
                            },
                            ...divisions,
                        ]}
                        onChange={handleInputChange}
                        data={data}
                        setData={setData}
                        className="lg:col-span-2"
                    />
                    <InputField
                        id="exam_id"
                        type="select"
                        placeholder="اختر الامتحان"
                        options={[
                            {
                                value: 0,
                                text: "كل الامتحانات",
                            },
                            ...exams,
                        ]}
                        onChange={handleInputChange}
                        data={data}
                        setData={setData}
                        className="lg:col-span-2"
                    />
                    <InputField
                        id="partition_id"
                        type="select"
                        placeholder="اختر مجموعة الاسئلة"
                        options={[
                            {
                                value: 0,
                                text: "كل مجموعات الاسئلة",
                            },
                            ...partitions,
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
                    api={`/api/questions/paginate`}
                    columns={columns}
                    filterData={filterData}
                />
            </div>
        </AdminContainer>
    );
};

export default QuestionsTable;
