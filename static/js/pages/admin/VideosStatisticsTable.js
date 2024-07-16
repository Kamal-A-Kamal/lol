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
import { printUnit } from "../../utils/ar";

const VideosStatisticsTable = () => {
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
            name: "عدد مرات فتح الفيديو",
            reorder: true,
            selector: (row) => row.video_views_count,
            sortable: true,
            sortField: "video_views_count",
        },
        {
            name: "اجمالي مدة فتح الفيديو",
            reorder: true,
            selector: (row) =>
                printUnit(Math.ceil(row.video_views_sum_duration_opened / 60), "دقيقة"),
            sortable: true,
            sortField: "video_views_sum_duration_opened",
        },
        {
            name: "اجمالي مدة المشاهدة",
            reorder: true,
            selector: (row) =>
                printUnit(Math.ceil(row.video_views_sum_duration_played / 60), "دقيقة"),
            sortable: true,
            sortField: "video_views_sum_duration_played",
        },
        {
            name: "وقت الاشتراك",
            reorder: true,
            selector: (row) => printFullDateTime(row.subscriptions[0]["created_at"]),
            sortable: false,
        },
    ];

    const initialState = {
        full_name: "",
        phone: "",
        teacher_id: 0,
        year: 0,
        course_id: 0,
        video_id: 0,
        video_attendence: 0,
    };

    const [filterData, setFilterData] = useState(initialState);
    const [data, setData] = useState(initialState);

    const [teachers, setTeachers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [videos, setVideos] = useState([]);

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

    const getVideos = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);
        let result;

        result = await http.get(`/api/courses/${data.course_id}/videos/options`, config);
        const { data: response } = result;
        setVideos(response);
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
            getVideos();
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
                        id="video_id"
                        type="select"
                        placeholder="اختر الفيديو"
                        options={[...videos]}
                        onChange={handleInputChange}
                        data={data}
                        setData={setData}
                        className="lg:col-span-2"
                    />
                    <InputField
                        id="video_attendence"
                        placeholder="حالة الحضور"
                        type="select"
                        options={[
                            {
                                value: "all",
                                text: "الجميع",
                            },
                            {
                                value: "absent",
                                text: "لم يتم المشاهدة",
                            },
                            {
                                value: "viewed",
                                text: "تم فتح الفيديو",
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
                    isDisabled={data.video_id == 0 ? true : false}
                >
                    بحث
                </Button>
                {filterData.video_id == 0 ? (
                    <div className="flex-center-both w-full">
                        <div className="p-20 bg-yellow-500 bg-opacity-10 rounded-md border-2 border-yellow-500 clr-text-primary smooth text-center font-h3">
                            يرجى اختيار الفيديو و الضغط على بحث لمشاهدة الاحصائيات
                        </div>
                    </div>
                ) : (
                    <>
                        <RemoteTable
                            api={`/api/courses/${filterData.course_id}/videos/${filterData.video_id}/statistics/paginate`}
                            columns={columns}
                            filterData={filterData}
                        />
                    </>
                )}
            </div>
        </AdminContainer>
    );
};

export default VideosStatisticsTable;
