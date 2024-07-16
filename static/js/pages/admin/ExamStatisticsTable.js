import React, { useEffect, useState } from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import Button from "../../components/ui/Button";
import RemoteTable from "../../components/ui/RemoteTable";
import http from "../../services/httpServices";
// import { isMultiYear } from "../../services/defaultSettings";
// import { getYearPlaceHolder } from "../../services/yearSevices";
import { printFullDate, printFullDateTime } from "../../utils/time";
import InputField from "../../components/form/elements/InputField";
import { handleInputChange } from "../../services/formServices";
import auth from "../../services/authServices";
import { Link } from "react-router-dom";
import { years } from "../../services/yearSevices";
import { isMultiYear, isSubjectSubscriptionable } from "../../services/defaultSettings";

const ExamStatisticsTable = () => {
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
            selector: (row) => row.full_name,
        },
        {
            name: "رقم هاتف الطالب",
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
        },
        {
            name: "رقم هاتف ولى الأمر",
            reorder: true,
            selector: (row) => <span>0{row.father_phone}</span>,
        },
        {
            name: "عدد مرات دخول الامتحان",
            reorder: true,
            selector: (row) => row.exam_results_count,
            sortable: true,
            sortField: "exam_results_count",
        },
        // {
        //     name: "اقل نتيجة",
        //     reorder: true,
        //     selector: (row) => row.exam_results_minimum_result,
        //     sortable: false,
        // },
        // {
        //     name: "متوسط النتائج",
        //     reorder: true,
        //     selector: (row) => row.exam_results_medium_result,
        //     sortable: false,
        // },
        // {
        //     name: "اعلى نتيجة",
        //     reorder: true,
        //     selector: (row) => row.exam_results_maximum_result,
        //     sortable: false,
        // },
        {
            name: "وقت الاشتراك",
            reorder: true,
            selector: (row) => printFullDateTime(row.subscriptions[0]["created_at"]),
            sortable: false,
        },
        // {
        //     name: "اخر مرة دخول امتحان",
        //     reorder: true,
        //     selector: (row) => printFullDateTime(row.exam_results[0]["created_at"]),
        //     sortable: false,
        // },
    ];

    const initialState = {
        full_name: "",
        phone: "",
        teacher_id: 0,
        year: 0,
        course_id: 0,
        exam_id: 0,
        exam_attendence: 0,
    };

    const [filterData, setFilterData] = useState(initialState);
    const [data, setData] = useState(initialState);

    const [teachers, setTeachers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [exams, setExams] = useState([]);

    const getTeachers = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: response } = await http.get(`/api/admin/teachers/options`, config);
        setTeachers(response);
    };

    const getCourses = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);
        let result;

        result = isSubjectSubscriptionable
            ? data.year === 0
                ? await http.get(`/api/teachers/${data.teacher_id}/courses/options`, config)
                : await http.get(
                      `/api/teachers/${data.teacher_id}/years/${data.year}/courses/options`,
                      config
                  )
            : data.year === 0
            ? await http.get(`/api/courses/options`, config)
            : await http.get(`/api/years/${data.year}/courses/options`, config);
        const { data: response } = result;
        setCourses(response);
    };

    const getExams = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);
        let result;

        result = await http.get(`/api/courses/${data.course_id}/exams/options`, config);
        const { data: response } = result;
        setExams(response);
    };

    useEffect(() => {
        isSubjectSubscriptionable && getTeachers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if ((isSubjectSubscriptionable && data.teacher_id) || !isSubjectSubscriptionable) {
            getCourses();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.year, data.teacher_id]);
    useEffect(() => {
        if (data.course_id) {
            getExams();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.course_id]);
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
                    /> */}
                    {isSubjectSubscriptionable && (
                        <InputField
                            id="teacher_id"
                            type="select"
                            placeholder="اختر المدرس"
                            options={teachers}
                            onChange={handleInputChange}
                            data={data}
                            setData={setData}
                            className="lg:col-span-2"
                        />
                    )}
                    {isMultiYear && (
                        <InputField
                            id="year"
                            type="select"
                            placeholder="اختر العام الدرسي"
                            options={[
                                {
                                    value: 0,
                                    text: "كل السنين",
                                },
                                ...years,
                            ]}
                            onChange={handleInputChange}
                            data={data}
                            setData={setData}
                            className="lg:col-span-2"
                        />
                    )}
                    <InputField
                        id="course_id"
                        type="select"
                        placeholder="اختر الكورس"
                        options={courses}
                        onChange={handleInputChange}
                        data={data}
                        setData={setData}
                        className="lg:col-span-2"
                    />
                    <InputField
                        id="exam_id"
                        type="select"
                        placeholder="اختر الامتحان"
                        options={[...exams]}
                        onChange={handleInputChange}
                        data={data}
                        setData={setData}
                        className="lg:col-span-2"
                    />
                    <InputField
                        id="exam_attendence"
                        placeholder="حالة الحضور"
                        type="select"
                        options={[
                            {
                                value: "all",
                                text: "الجميع",
                            },
                            {
                                value: "absent",
                                text: "غير الممتحنين",
                            },
                            {
                                value: "exammed",
                                text: "الممتحنين",
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
                    isDisabled={data.exam_id == 0 ? true : false}
                >
                    {/* {console.log(filterData.exam_id == 0 ? true : false)} */}
                    بحث
                </Button>
                {filterData.exam_id == 0 ? (
                    <div className="flex-center-both w-full">
                        <div className="p-20 bg-yellow-500 bg-opacity-10 rounded-md border-2 border-yellow-500 clr-text-primary smooth text-center font-h3">
                            يرجى اختيار الامتحان و الضغط على بحث لمشاهدة الاحصائيات
                        </div>
                    </div>
                ) : (
                    <>
                        <RemoteTable
                            api={`/api/courses/${filterData.course_id}/exams/${filterData.exam_id}/statistics/paginate`}
                            columns={columns}
                            filterData={filterData}
                        />
                    </>
                )}
            </div>
        </AdminContainer>
    );
};

export default ExamStatisticsTable;
