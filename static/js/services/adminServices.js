import {
    isCodes,
    isCouponable,
    isLoginTokens,
    isManualPayment,
    isMultiAdmin,
    isPrepaidSystem,
    isSubjectSubscriptionable,
    isCategories,
    isAccountCreationRequest,
    showExamStatisticsTable,
    isCenterUsers,
    isAdminUsers,
    isCommunity,
    showVideoStatisticsTable,
    isGlobalNotifications,
    isWalletEnabled,
    isManualChargeWallet,
} from "./defaultSettings";

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
    {
        to: "updates",
        icon: "icon-park-twotone:update-rotation",
        text: "آخر تحديثات المنصة",
        type: "page",
        available: true,
    },

    {
        to: "analytics",
        icon: "ic:twotone-analytics",
        text: "الاحصائيات",
        type: "page",
        available: false,
    },
    // {
    //     to: "updates",
    //     icon: "icon-park-twotone:update-rotation",
    //     text: "آخر تحديثات المنصة",
    //     type: "page",
    //     available: true,
    // },
    // {
    //     to: "stats",
    //     icon: "icomoon-free:stats-bars",
    //     text: "الاحصائيات",
    //     type: "page",

    // },
];
if (isManualPayment) {
    pages = [
        ...pages,
        {
            type: "breakline",
        },
        {
            to: "manual_payment_info",
            icon: "ant-design:info-circle-twotone",
            text: "معلومات الدفع",
            type: "page",
            available: false,
        },
    ];
}
if (isCodes) {
    pages = [
        ...pages,
        {
            type: "breakline",
        },

        {
            to: "insert_auto",
            icon: "mdi:qrcode-plus",
            text: "انشاء اكواد",
            type: "page",
            available: false,
        },
        {
            to: "insert_autos",
            icon: "mdi:barcode-scan",
            text: "جدول الأكواد",
            type: "page",
            available: false,
        },
    ];
    if (isPrepaidSystem) {
        pages = [
            ...pages,
            {
                to: "user_prepaid_courses",
                icon: "simple-icons:contactlesspayment",
                text: "تعديل المحاضرات مسبقة الدفع",
                type: "page",
                available: false,
            },
        ];
    }
}

if (isWalletEnabled && isManualChargeWallet) {
    pages = [
        ...pages,
        {
            type: "breakline",
        },

        {
            to: "manual_charge_wallet",
            icon: "icon-park-twotone:wallet",
            text: "شحن يدوي للمحفظة",
            type: "page",
            available: false,
        },
        {
            type: "breakline",
        },
    ];
}

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

if (isAdminUsers) {
    pages = [
        ...pages,
        {
            to: "divide_admin_users",
            icon: "ic:twotone-safety-divider",
            text: "توزيع الطلبة على المسئولين",
            type: "page",
            available: false,
        },
    ];
}

if (isLoginTokens) {
    pages = [
        ...pages,
        {
            to: "login_tokens",
            icon: "icomoon-free:enter",
            text: "مراجعة تسجيلات الدخول",
            type: "page",
            available: false,
        },
        {
            to: "logout_tokens",
            icon: "mdi:exit-run",
            text: "مراجعة تسجيلات الخروج",
            icon_properites: { flip: "horizontal" },
            type: "page",
            available: false,
        },
        {
            type: "breakline",
        },
    ];
}
// pages = [
//     ...pages,
//     {
//         to: "messages",
//         icon: "mdi:message-plus",
//         text: "اضافة و تعديل الايميلات المحفوظة",
//         type: "page",
//         available: true,
//     },
// ];
// pages = [
//     ...pages,
//     {
//         to: "send_messages",
//         icon: "mdi:message-arrow-right",
//         text: "ارسال الإيميلات",
//         type: "page",
//         available: true,
//     },
// ];

// pages = [
//     ...pages,
//     {
//         type: "breakline",
//     },
// ];
if (isCommunity) {
    pages = [
        ...pages,
        {
            to: "community_category_editing",
            icon: "ic:twotone-group",
            text: "اضافة و تعديل مجموعات المنتدى",
            type: "page",
            available: true,
        },
        {
            type: "breakline",
        },
    ];
}
pages = [
    ...pages,
    {
        to: "division",
        icon: "teenyicons:section-add-outline",
        text: "اضافة وتعديل الأقسام",
        type: "page",
        available: false,
    },
    {
        type: "breakline",
    },
];

if (isSubjectSubscriptionable) {
    pages = [
        ...pages,

        {
            to: "department",
            icon: "mingcute:department-fill",
            text: "اضافة و تعديل الشعبات",
            type: "page",
            available: false,
        },
        {
            to: "subject",
            icon: "uis:subject",
            text: "اضافة و تعديل المواد",
            type: "page",
            available: false,
        },
        {
            to: "teacher",
            icon: "ph:chalkboard-teacher-duotone",
            text: "اضافة و تعديل المدرسين",
            type: "page",
            available: false,
        },
        {
            to: "teacher_statistics",
            icon: "ic:round-analytics",
            text: "احصائيات المدرس",
            type: "page",
            available: false,
        },
        {
            type: "breakline",
        },
    ];
}
pages = [
    ...pages,

    {
        to: "course",
        icon: "ant-design:appstore-add-outlined",
        text: "اضافة وتعديل الكورسات",
        type: "page",
        available: false,
    },
];

if (isCategories) {
    pages = [
        ...pages,
        {
            to: "categories",
            title: "category",
            icon: "ic:round-category",
            text: "اضافه وتعديل فئات الكورسات",
            type: "page",
            available: true,
        },
    ];
}

if (isCouponable) {
    pages = [
        ...pages,
        {
            to: "coupon",
            icon: "nimbus:discount-circle",
            text: "اضافة و تعديل الكوبونات",
            type: "page",
            available: false,
        },
    ];
}
pages = [
    ...pages,
    {
        type: "breakline",
    },
];
pages = [
    ...pages,
    {
        to: "section",
        icon: "clarity:blocks-group-solid-badged",
        text: "اضافة و تعديل المجموعات",
        type: "page",
        available: false,
    },
];

pages = [
    ...pages,
    {
        to: "course_sections_editing_page",
        icon: "fluent:group-return-24-regular",
        text: "تعديل مجموعات الكورس",
        type: "page",
        available: false,
    },
];

pages = [
    ...pages,
    {
        to: "course_sections_duplicating",
        icon: "pepicons:duplicate-print",
        text: "نقل مجموعات الكورس",
        type: "page",
        available: false,
    },
    {
        type: "breakline",
    },
];

pages = [
    ...pages,
    {
        to: "video",
        icon: "ic:twotone-ondemand-video",
        text: "اضافة وتعديل الفيديوهات",
        type: "page",
        available: false,
    },
];

pages = [
    ...pages,
    {
        to: "book",
        icon: "ant-design:file-add-twotone",
        text: "اضافة وتعديل المذكرات",
        type: "page",
        available: false,
    },
    {
        type: "breakline",
    },
];

pages = [
    ...pages,
    {
        to: "exam",
        icon: "ph:exam-duotone",
        text: "اضافة وتعديل الامتحانات",
        type: "page",
        available: false,
    },
];

pages = [
    ...pages,
    {
        to: "partition",
        icon: "uil:folder-question",
        text: "اضافة وتعديل مجاميع الأسئلة",
        type: "page",
        available: false,
    },
];

pages = [
    ...pages,
    {
        to: "question",
        icon: "ph:circle-wavy-question-duotone",
        text: "اضافة وتعديل الأسئلة",
        type: "page",
        available: false,
    },
];

pages = [
    ...pages,
    {
        to: "question_insert_auto",
        icon: "fluent:chat-bubbles-question-16-filled",
        text: "اضافة اكثر من سؤال",
        type: "page",
        available: false,
    },
    {
        type: "breakline",
    },
];

pages = [
    ...pages,
    {
        to: "manual_subscription",
        icon: "ic:twotone-payment",
        text: "الدفع اليدوي",
        type: "page",
        available: false,
    },
];

pages = [
    ...pages,
    {
        to: "unsubscribe",
        icon: "ic:twotone-disabled-by-default",
        text: "الغاء الإشتراك",
        type: "page",
        available: false,
    },
    {
        type: "breakline",
    },
];

pages = [
    ...pages,
    {
        to: "user_profile",
        icon: "carbon:user-profile",
        text: "ملف المستخدم",
        type: "page",
        available: false,
    },
];

pages = [
    ...pages,
    {
        to: "add_user",
        icon: "akar-icons:person-add",
        text: "اضافة طالب",
        type: "page",
        available: false,
    },
    {
        type: "breakline",
    },
];

if (isMultiAdmin) {
    pages = [
        "page",
        ...pages,
        {
            to: "admins",
            icon: "material-symbols:admin-panel-settings",
            text: "اضافه وتعديل مسؤول",
            type: "page",
            available: false,
        },
        {
            type: "breakline",
        },
    ];
}

if (isCommunity) {
    pages = [
        ...pages,
        {
            to: "community_categories",
            icon: "mdi:home-group",
            text: "جدول مجموعات المتدى",
            type: "page",
            available: true,
        },
    ];
}

if (isAccountCreationRequest) {
    pages = [
        ...pages,
        {
            to: "account_requests",
            icon: "fluent-mdl2:add-friend",
            text: "طلبات انشاء الحسابات",
            type: "page",
            available: false,
        },
    ];
}
if (isCenterUsers) {
    pages = [
        ...pages,
        {
            to: "center_users",
            icon: "gis:map-users",
            text: "جدول مستخدمين السنتر",
            type: "page",
            available: false,
        },
    ];
}

if (isAdminUsers) {
    pages = [
        ...pages,
        {
            to: "admin_users",
            icon: "fa-solid:users-cog",
            text: "جدول المستخدين - متابعتي",
            type: "page",
            available: false,
        },
    ];
}
pages = [
    ...pages,
    {
        to: "users",
        icon: "ph:users-duotone",
        text: "جدول المستخدمين",
        type: "page",
        available: false,
    },
];
if (isGlobalNotifications) {
    pages = [
        ...pages,

        {
            to: "global_notification",
            icon: "ant-design:appstore-add-outlined",
            text: "اضافة وتعديل الاشعارات",
            type: "page",
            available: false,
        },
        {
            type: "breakline",
        },
    ];
}
pages = [
    ...pages,
    {
        to: "divisions",
        icon: "icon-park-twotone:intersection",
        text: "جدول الاقسام",
        type: "page",
        available: false,
    },
];
if (isCouponable) {
    pages = [
        ...pages,
        {
            to: "coupons",
            icon: "ic:twotone-discount",
            text: "جدول الكوبونات",
            type: "page",
            available: false,
        },
    ];
}
pages = [
    ...pages,
    {
        to: "courses",
        icon: "fa-solid:layer-group",
        text: "جدول الكورسات",
        type: "page",
        available: false,
    },
    {
        to: "videos",
        icon: "clarity:video-gallery-solid",
        text: "جدول الفيديوهات",
        type: "page",
        available: false,
    },
    {
        to: "exams",
        icon: "ph:exam-duotone",
        text: "جدول الامتحانات",
        type: "page",
        available: false,
    },
    {
        to: "partitions",
        icon: "ph:folders-duotone",
        text: "جدول مجموعات الاسئلة",
        type: "page",
        available: false,
    },
    {
        to: "questions",
        icon: "fluent:book-question-mark-rtl-20-filled",
        text: "جدول الاسئلة",
        type: "page",
        available: false,
    },
];
if (showVideoStatisticsTable) {
    pages = [
        ...pages,
        {
            to: "video_statistics",
            icon: "ic:twotone-monitor-heart",
            text: "احصائيات الفيديوهات",
            type: "page",
            available: false,
        },
    ];
}
if (showExamStatisticsTable) {
    pages = [
        ...pages,
        {
            to: "exam_statistics",
            icon: "ic:twotone-monitor-heart",
            text: "احصائيات الامتحانات",
            type: "page",
            available: false,
        },
    ];
}
pages = [
    ...pages,
    {
        to: "exam_results",
        icon: "charm:graduate-cap",
        text: "جدول نتائج الامتحانات",
        type: "page",
        available: false,
    },
    {
        to: "hm_results",
        icon: "healthicons:i-exam-multiple-choice",
        text: "جدول نتائج الواجبات",
        type: "page",
        available: false,
    },
    {
        to: "subscriptions",
        icon: "eos-icons:activate-subscriptions",
        text: "جداول الإشتراكات",
        type: "page",
        available: false,
    },
    {
        to: "invoices",
        icon: "fa6-solid:file-invoice-dollar",
        text: "جداول الفواتير",
        type: "page",
        available: false,
    },
];

export const adminPages = pages;

export const submitTypes = [
    { value: "store", text: "اضافة" },
    { value: "update", text: "تعديل" },
    { value: "delete", text: "حذف" },
];
