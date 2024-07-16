import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../config";
import auth from "./authServices";
import { adminPath } from "./defaultSettings";
import modal from "./modalServices";

const http = axios.create({
    baseURL,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
});
http.interceptors.response.use(null, (error) => {
    const expectedError =
        error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedError) {
        toast("حدث خطأ.. يرجى التواصل مع الدعم");
        return;
    } else if (error.response.status === 419) {
        toast("يرجى اعادة تحميل الصفحة");
        modal.message({
            title: "session expired",
            text: "يرجى اعادة تحميل الصفحة",
            icon: "warning",
            button: "اعادة التحميل",
            callback: () => {
                window.location.reload();
            },
        });
    } else if (error.response.status === 429) {
        toast("Too many requests. Please wait 1 minute then refresh.");
    } else if (error.response.status === 401) {
        toast("يرجى تسجيل الخروج و اعادة تسجيل الدخول مجددًا");

        let locationHref = "/login";
        if (window.location.pathname.includes(adminPath)) {
            locationHref = "/" + adminPath + "/login";
            auth.adminLogout();
        } else {
            auth.logout();
        }
        modal.message({
            title: "تم انتهاء صلاحية تسجيل دخولك",
            text: "يرجى اعادة تسجيل الدخول مجددًا",
            icon: "warning",
            button: "تسجيل الدخول",
            callback: () => {
                window.location.href = locationHref;
            },
        });
    } else if (error.response.status === 402) {
        toast("يرجى شراء الكورس");
        http.get("unsubscribed");
        modal.message({
            title: "غير مشترك",
            text: "يجب عليك الاشتراك في هذا الكورس أولًا !",
            icon: "warning",
            buttons: {
                confirm: "الذهاب للإشتراك",
                cancel: "الرجوع",
            },
            callback: (e) => {
                if (e && e !== "cancel") {
                    window.location.href = "../../../subscribe";
                } else {
                    window.location.href = "../../../";
                }
            },
        });
    } else if (error.response.status === 404) {
        toast("Error 404");
    } else if (error.response.status === 403) {
        toast("غير مسموح للدخول لهذا المسار ");
        http.get("forbidden");
        modal.message({
            title: "غير مسموح",
            text: "غير مسموح للدخول لهذا المسار ",
            icon: "warning",
            callback: () => {
                window.location.href = "/";
            },
        });
    } else if (error.response.status === 439) {
        // toast("غير مسموح للدخول لهذا المسار ");
        // http.get("forbidden");
        // modal.message({
        //     title: "غير مسموح",
        //     text: "غير مسموح للدخول لهذا المسار ",
        //     icon: "warning",
        //     callback: () => {
        //         window.location.href = "/";
        //     },
        // });
    } else {
        toast(error.response.data.message);
    }
    return Promise.reject(error);
});
export default http;
