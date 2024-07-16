import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import auth from "../services/authServices";
import http from "../services/httpServices";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { printUnit } from "../utils/ar";
import { adminPath, prepaidInfoColor } from "../services/defaultSettings";

const HasPrepaid = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let { setPrepaidCourses, prepaidCourses, user, isPrepaidChecked, setIsPrepaidChecked } =
        useContext(AuthContext);
    const hasPrepaid = async () => {
        let prepaid_courses;
        if (prepaidCourses > 0) {
            prepaid_courses = prepaidCourses;
        } else {
            if (!isPrepaidChecked) {
                try {
                    const token = auth.getToken();
                    const config = auth.getAuthConfig(token);
                    const { data } = await http.get(`/api/user/prepaid_courses`, config);
                    prepaid_courses = parseInt(data.prepaid_courses);
                    setPrepaidCourses(prepaid_courses);
                    setIsPrepaidChecked(true);
                } catch (error) {}
            }
        }
        if (prepaid_courses > 0) {
            const isSeen = auth.getIsPrepaidCoursesStoreSeen();
            if (isSeen) {
                return;
            }
            if (!location.pathname.includes("login")) {
                navigate("/prepaid_store");
            }
        }
    };
    useEffect(() => {
        const token = auth.getToken();
        if (token) {
            hasPrepaid();
        } else {
            setPrepaidCourses(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, user.fullname, location, isPrepaidChecked]);

    let bgColorClassName = "bg-rose-500";
    let valueBgColorClassName = "bg-blue-500";
    switch (prepaidInfoColor) {
        case "yellow":
            bgColorClassName = "bg-yellow-500";
            valueBgColorClassName = "bg-blue-500";
            break;
        case "cyan":
            bgColorClassName = "bg-cyan-500";
            valueBgColorClassName = "bg-blue-500";
            break;
        case "emerald":
            bgColorClassName = "bg-emerald-500";
            valueBgColorClassName = "bg-blue-500";
            break;
        case "blue":
            bgColorClassName = "bg-blue-500";
            valueBgColorClassName = "bg-blue-500";
            break;
        default:
            break;
    }

    const [className, setClassName] = useState("");

    useEffect(() => {
        if (location.pathname.includes(adminPath)) {
            setClassName(" !hidden");
        } else {
            setClassName("");
        }
    }, [location.pathname]);

    return (
        <>
            {prepaidCourses > 0 ? (
                <Link
                    to="/prepaid_store"
                    className={`fixed bottom-6 right-6 ${bgColorClassName} z-50 text-center p-2 rounded-md shadow-lg bg-opacity-90 font-smaller space-y-1 border border-slate-900 dark:border-slate-50 smooth clr-white ${className}`}
                >
                    <div>لديك من الرصيد</div>
                    <div
                        className={`flex-center-both ${valueBgColorClassName} rounded-md font-w-bold shadow-lg font-h3 underline px-3 py-1`}
                    >
                        {/* {prepaidCourses < 3
                            ? getUnit(prepaidCourses, "حصص", "حصة", "حصتان", true).label
                            : prepaidCourses} */}
                        {printUnit(prepaidCourses, "محاضرة")}
                    </div>
                    <div>
                        {/* {prepaidCourses > 2
                            ? getUnit(prepaidCourses, "حصص", "حصة", "حصتان", true).label
                            : ""}{" "} */}
                        مسبقة الدفع
                    </div>
                </Link>
            ) : (
                ""
            )}
        </>
    );
};

export default HasPrepaid;
