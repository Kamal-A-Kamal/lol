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

const ExamsTable = () => {
    let columns = [
        {
            name: "التسلسل",
            reorder: true,
            selector: (row) => row.id,
            sortable: true,
            sortField: "id",
        },
        {
            name: "اسم الامتحان",
            reorder: true,
            selector: (row) => row.name,
            sortable: true,
            sortField: "name",
        },
        {
            name: "عدد النتائج",
            reorder: true,
            selector: (row) => row.exam_results_count,
            sortable: true,
            sortField: "exam_results_count",
        },
        {
            name: "عدد النتائج اكبر من النصف",
            reorder: true,
            selector: (row) => row.half_mark_exam_results_count,
            sortable: true,
            sortField: "half_mark_exam_results_count",
        },
        {
            name: "عدد النتائج النهائية",
            reorder: true,
            selector: (row) => row.full_mark_exam_results_count,
            sortable: true,
            sortField: "full_mark_exam_results_count",
        },
        {
            name: "عدد الاسئلة",
            reorder: true,
            selector: (row) => row.question_quantity,
            sortable: true,
            sortField: "question_quantity",
        },
        {
            name: "مجموعات الاسئلة",
            reorder: true,
            // width: "auto",
            grow: 2,
            selector: (row) => (
                <div className="space-y-3 flex-wrap">
                    {row.partitions && row.partitions[0]
                        ? row.partitions.map((value) => (
                              <div className="font-w-bold bg-rose-900 py-1 px-3 rounded-md space-y-1 text-center flex-center-both flex-col clr-white">
                                  <div>{value.name}</div>
                                  <div className="bg-blue-500 py-1 px-2 rounded-md">
                                      للمجموعة عدد الاسئلة :{" "}
                                      <span className="underline">
                                          {value.pivot.question_number}
                                      </span>
                                  </div>
                                  {value.pivot.question_number > value.questions_count ? (
                                      <>
                                          <div className="text-yellow-300">
                                              عدد الاسئلة الموجودة في
                                              <br />
                                              مجموعة الاسئلة اقل من عدد
                                              <br />
                                              اسئلة الامتحان !
                                          </div>
                                          <div className="bg-rose-500 py-1 px-2 rounded-md font-w-bold">
                                              عدد الاسئلة المتاحة في المجموعة :{" "}
                                              <span className="underline">
                                                  {value.questions_count}
                                              </span>
                                          </div>
                                      </>
                                  ) : (
                                      <div className="bg-yellow-500 py-1 px-2 rounded-md">
                                          عدد الاسئلة المتاحة في المجموعة :{" "}
                                          <span className="underline">{value.questions_count}</span>
                                      </div>
                                  )}
                              </div>
                          ))
                        : ""}
                </div>
            ),
        },
        {
            name: "وقت الامتحان",
            reorder: true,
            selector: (row) => row.duration,
            sortable: true,
            sortField: "duration",
        },
        {
            name: "قابل للإستكمال",
            reorder: true,
            selector: (row) => <BooleanIndicator value={row.is_continuable} />,
            sortable: true,
            sortField: "is_continuable",
        },
        {
            name: "ترتيب عشوائي للأسئلة",
            reorder: true,
            selector: (row) => <BooleanIndicator value={row.shuffle_questions} />,
            sortable: true,
            sortField: "shuffle_questions",
        },
        {
            name: "ترتيب عشوائي لمجموعات الاسئلة",
            reorder: true,
            selector: (row) => <BooleanIndicator value={row.shuffle_partitions} />,
            sortable: true,
            sortField: "shuffle_partitions",
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
        division_id: 0,
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

    return (
        <AdminContainer>
            <div className="w-full space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6 w-full">
                    <InputField
                        id="division_id"
                        type="select"
                        placeholder="اختر القسم"
                        options={divisions}
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
                    api={`/api/exams/paginate`}
                    columns={columns}
                    filterData={filterData}
                />
            </div>
        </AdminContainer>
    );
};

export default ExamsTable;
