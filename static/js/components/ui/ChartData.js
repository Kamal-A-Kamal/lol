import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import http from "../../services/httpServices";
import auth from "../../services/authServices";
import { getDatesInRange, printFullDate } from "../../utils/time";

const ChartData = ({
    dateRange
}) => {
    const screenWidth = window.innerWidth;
    const lineHeight = screenWidth > 1024 ? 100 : 200;
    const lineWidth = screenWidth > 1024 ? undefined : 160;
    const [userCount, setUserCount] = useState([]);
    const [videoViewCount, setVideoViewCount] = useState([]);
    const [fiveMinutesVideoViewCount, setFiveMinutesVideoViewCount] = useState([]);
    const [subscriptionCount, setSubscriptionCount] = useState([]);
    const [invoiceCount, setInvoiceCount] = useState([]);
    const [paidInvoiceCount, setPaidInvoiceCount] = useState([]);
    const numberOfDays = getDatesInRange(dateRange[1], dateRange[0])
    
    // Get Days Stats
    async function getDays() {
        // const adminToken = auth.getAdminToken();
        // const config = auth.getAdminAuthConfig(adminToken);

        // const { data: response } = await http.get("/api/statistic/number-of-days", config);
        // setNumberOfDays(response.data);
    }

    // Get User Stats
    async function getUserCount() {
        const adminToken = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(adminToken);
        config.params = {
            end_date: `${dateRange[0].getFullYear()}-${dateRange[0].getMonth()+1}-${dateRange[0].getDate()}`,
            start_date: `${dateRange[1].getFullYear()}-${dateRange[1].getMonth()+1}-${dateRange[1].getDate()}`,
        }

        const { data: response } = await http.get("/api/statistic/users-count", config);
        setUserCount(response.data);
    }

    // Get Video View Stats
    async function getVideoViewCount() {
        const adminToken = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(adminToken);

        const { data: response } = await http.get("/api/statistic/video-views-count", config);
        setVideoViewCount(response.data);
    }
    // Get Video View Stats
    async function getFiveMinutesVideoViewCount() {
        const adminToken = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(adminToken);

        const { data: response } = await http.get(
            "/api/statistic/over-five-minutes-video-views-count",
            config
        );
        setFiveMinutesVideoViewCount(response.data);
    }

    // Get Subscription Stats
    async function getSubscriptionCount() {
        const adminToken = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(adminToken);
        config.params = {
            end_date: `${dateRange[0].getFullYear()}-${dateRange[0].getMonth()+1}-${dateRange[0].getDate()}`,
            start_date: `${dateRange[1].getFullYear()}-${dateRange[1].getMonth()+1}-${dateRange[1].getDate()}`,
        }

        const { data: response } = await http.get("/api/statistic/subscriptions-count", config);
        setSubscriptionCount(response.data);
    }

    // Get Invoice Stats
    async function getInvoiceCount() {
        const adminToken = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(adminToken);
        config.params = {
            end_date: `${dateRange[0].getFullYear()}-${dateRange[0].getMonth()+1}-${dateRange[0].getDate()}`,
            start_date: `${dateRange[1].getFullYear()}-${dateRange[1].getMonth()+1}-${dateRange[1].getDate()}`,
        }

        const { data: response } = await http.get("/api/statistic/invoices-count", config);
        setInvoiceCount(response.data);
    }
    async function getPaidInvoiceCount() {
        const adminToken = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(adminToken);
        config.params = {
            end_date: `${dateRange[0].getFullYear()}-${dateRange[0].getMonth()+1}-${dateRange[0].getDate()}`,
            start_date: `${dateRange[1].getFullYear()}-${dateRange[1].getMonth()+1}-${dateRange[1].getDate()}`,
        }

        const { data: response } = await http.get("/api/statistic/paid-invoices-count", config);
        setPaidInvoiceCount(response.data);
    }
    useEffect(() => {
        // getDays();
        getUserCount();
        getVideoViewCount();
        getFiveMinutesVideoViewCount();
        getSubscriptionCount();
        getInvoiceCount();
        getPaidInvoiceCount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateRange]);
    const lineChartData = {
        labels: numberOfDays.map((value) => printFullDate(value)),
        datasets: [
            {
                data: userCount,
                label: "المستخدمين",
                borderColor: "#2898fa",
                backgroundColor: "#9fcdf5",
                fill: false,
                lineTension: 0.5,
            },
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
    const lineVideoViewsChartData = {
        labels: numberOfDays.map((value) => printFullDate(value)),
        datasets: [
            {
                data: videoViewCount,
                label: "مشاهدات الفيديو",
                borderColor: "#eb0e0e",
                backgroundColor: "#ed9191",
                fill: false,
                lineTension: 0.5,
            },
            {
                data: fiveMinutesVideoViewCount,
                label: "مشاهدات الفيديو اطول من خمس دقائق",
                borderColor: "#2898fa",
                backgroundColor: "#9fcdf5",
                fill: false,
                lineTension: 0.5,
            },
        ],
    };
    return (
        <>
            <Line type="line" height={lineHeight} width={lineWidth} data={lineChartData} />
            <Line
                type="line"
                height={lineHeight}
                width={lineWidth}
                data={lineVideoViewsChartData}
            />
        </>
    );
};

const PieChart = () => {
    const [userYears, setUserYears] = useState([]);
    const screenWidth = window.innerWidth;
    const pieHeight = screenWidth > 1024 ? 60 : 400;
    // Get Invoice Stats
    async function getUserYearsCount() {
        const adminToken = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(adminToken);

        const { data: response } = await http.get("/api/statistic/user-years-count", config);
        setUserYears(response.data);
    }

    useEffect(() => {
        getUserYearsCount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
        <div className="flex flex-col lg:flex-row justify-center gap-x-4 w-full lg:w-80">
            <Pie type="Pie" height={pieHeight} data={PieChartData} />
        </div>
    );
};
export { ChartData, PieChart };
