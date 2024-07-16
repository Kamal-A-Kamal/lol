let pages = [
    {
        type: "breakline",
    },
    {
        to: "home",
        icon: "ant-design:home-twotone",
        text: "الصفحة الرئيسية",
        type: "page",
        available: true,
    },
];

pages = [
    ...pages,
    {
        to: "",
        icon: "ant-design:home-twotone",
        text: "الصفحة الرئيسية",
        type: "hidden",
        available: true,
    },
    {
        type: "breakline",
    },
];
pages = [
    ...pages,
    // {
    //     to: "courses",
    //     icon: "fa-solid:layer-group",
    //     text: "جدول المواد",
    //     type: "page",
    //     available: true,
    // },
    {
        to: "subscriptions",
        icon: "eos-icons:activate-subscriptions",
        text: "جداول الإشتراكات",
        type: "page",
        available: true,
    },
    {
        to: "invoices",
        icon: "fa6-solid:file-invoice-dollar",
        text: "جداول الفواتير",
        type: "page",
        available: true,
    },
    // {
    //     to: "courses",
    //     icon: "fa-solid:layer-group",
    //     text: "جدول الكورسات",
    //     type: "page",
    //     available: true,
    // },
    // {
    //     to: "videos",
    //     icon: "clarity:video-gallery-solid",
    //     text: "جدول الفيديوهات",
    //     type: "page",
    //     available: true,
    // },
    // {
    //     to: "exams",
    //     icon: "ph:exam-duotone",
    //     text: "جدول الامتحانات",
    //     type: "page",
    //     available: true,
    // },
    // {
    //     to: "exam_results",
    //     icon: "charm:graduate-cap",
    //     text: "جدول نتائج الامتحانات",
    //     type: "page",
    //     available: true,
    // },
    // {
    //     to: "hm_results",
    //     icon: "healthicons:i-exam-multiple-choice",
    //     text: "جدول نتائج الواجبات",
    //     type: "page",
    //     available: true,
    // },
];

export const teacherPages = pages;
