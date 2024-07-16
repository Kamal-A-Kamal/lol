import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import http from "../../services/httpServices";
import auth from "../../services/authServices";
import { printFullDate } from "../../utils/time";

const TeacherChart = ({ teacherId = 0, isTeacherSubAdmin = false }) => {
    const screenWidth = window.innerWidth;
    const lineHeight = screenWidth > 729 ? 100 : 200;
    const lineWidth = screenWidth > 729 ? undefined : 160;
    const [numberOfDays, setNumberOfDays] = useState([]);
    const [subscriptionCount, setSubscriptionCount] = useState([]);
    const [invoiceCount, setInvoiceCount] = useState([]);
    const [paidInvoiceCount, setPaidInvoiceCount] = useState([]);

    // Get Days Stats
    async function getDays() {
        const adminToken = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(adminToken);

        const { data: response } = await http.get("/api/statistic/number-of-days", config);
        setNumberOfDays(response.data);
    }

    // Get Video View Stats

    // Get Subscription Stats
    async function getSubscriptionCount() {
        if (isTeacherSubAdmin) {
            const teacherToken = auth.getTeacherToken();
            const config = auth.getTeacherAuthConfig(teacherToken);
            const { data: response } = await http.get(
                `/api/teacher_admin_panel/teacher/statistics/subscriptions-count`,
                config
            );
            setSubscriptionCount(response.data);
        } else {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);

            const { data: response } = await http.get(
                `/api/teacher/${teacherId}/subscriptions-count`,
                config
            );
            setSubscriptionCount(response.data);
        }
    }

    // Get Invoice Stats
    async function getInvoiceCount() {
        if (isTeacherSubAdmin) {
            const teacherToken = auth.getTeacherToken();
            const config = auth.getTeacherAuthConfig(teacherToken);
            const { data: response } = await http.get(
                `/api/teacher_admin_panel/teacher/statistics/invoices-count`,
                config
            );
            setInvoiceCount(response.data);
        } else {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);

            const { data: response } = await http.get(
                `/api/teacher/${teacherId}/invoices-count`,
                config
            );
            setInvoiceCount(response.data);
        }
    }
    async function getPaidInvoiceCount() {
        if (isTeacherSubAdmin) {
            const teacherToken = auth.getTeacherToken();
            const config = auth.getTeacherAuthConfig(teacherToken);

            const { data: response } = await http.get(
                `/api/teacher_admin_panel/teacher/statistics/paid-invoices-count`,
                config
            );
            setPaidInvoiceCount(response.data);
        } else {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);

            const { data: response } = await http.get(
                `/api/teacher/${teacherId}/paid-invoices-count`,
                config
            );
            setPaidInvoiceCount(response.data);
        }
    }
    useEffect(() => {
        if (teacherId || isTeacherSubAdmin) {
            getDays();
            getSubscriptionCount();
            getInvoiceCount();
            getPaidInvoiceCount();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teacherId]);
    const lineChartData = {
        labels: numberOfDays.map((value) => printFullDate(value)),
        datasets: [
            {
                data: subscriptionCount,
                label: "الاشتراكات",
                borderColor: "#31cf15",
                backgroundColor: "#9ad98f",
                fill: false,
                lineTension: 0.5,
            },
            {
                data: invoiceCount,
                label: "الفواتير",
                borderColor: "#eb0e0e",
                backgroundColor: "#ed9191",
                fill: false,
                lineTension: 0.5,
            },
            {
                data: paidInvoiceCount,
                label: "الفواتير اللي اتدفعت",
                borderColor: "#ffc908",
                backgroundColor: "#ffedad",
                fill: false,
                lineTension: 0.5,
            },
        ],
    };
    return (
        <>
            <Line type="line" height={lineHeight} width={lineWidth} data={lineChartData} />
        </>
    );
};

const PieChart = ({ teacherId = 0, isTeacherSubAdmin = false }) => {
    const [userYears, setUserYears] = useState([]);
    const screenWidth = window.innerWidth;
    const [pieHeight, setPieHeight] = useState(20);
    // Get Invoice Stats
    async function getUserYearsCount() {
        if (isTeacherSubAdmin) {
            const teacherToken = auth.getTeacherToken();
            const config = auth.getTeacherAuthConfig(teacherToken);

            const { data: response } = await http.get(
                `/api/teacher_admin_panel/teacher/statistics/user-years-count`,
                config
            );
            setUserYears(response.data);
        } else {
            const adminToken = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(adminToken);

            const { data: response } = await http.get(
                `/api/teacher/${teacherId}/user-years-count`,
                config
            );
            setUserYears(response.data);
        }
    }

    useEffect(() => {
        if (teacherId || isTeacherSubAdmin) {
            getUserYearsCount();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teacherId]);
    const PieChartData = {
        labels: [
            "الصف الأول",
            "الصف الثاني",
            "الصف الثالث",
            // "الصف الثالث",
        ],
        datasets: [
            {
                label: "User Years",
                data: userYears,
                backgroundColor: [
                    "#ffcd56",
                    "#36a2eb",
                    "#ff6385",
                    // "#ff6385",
                ],
                hoverOffset: 4,
            },
        ],
    };

    return (
        <div className="flex flex-col flex-center-both w-full space-y-4">
            <h2 className="font-w-bold font-h3">عدد الطلبة المشتركين بالسنة الدراسية</h2>
            {userYears[0] || userYears[1] || userYears[2] ? (
                <div className="max-w-md">
                    <Pie type="Pie" height={pieHeight} data={PieChartData} />
                </div>
            ) : (
                <div className="text-center">
                    <p>لا توجد بيانات</p>
                </div>
            )}
        </div>
    );
};
export { TeacherChart, PieChart };
