import React from "react";
import { getUnit } from "../../utils/ar";

const LogOutData = ({ deleted_today, deleted_this_week }) => {
    return (
        <>
            <div className="flex-center-both flex-col space-y-3">
                <div className="flex-center-both flex-col space-y-1">
                    <div className="">عدد مرات تسجيل الخروج خلال اليوم</div>
                    <div className="flex-cener-both rounded-md bg-rose-500 shadow-md px-4 py-1 space-x-1 space-x-reverse">
                        {deleted_today && deleted_today.user ? (
                            <>
                                <span>بواسطة المستخدم :</span>
                                <span className="bg-primary-container px-1 py-1 rounded-full smooth">
                                    {deleted_today.user}
                                </span>
                                <span>
                                    {
                                        getUnit(deleted_today.user, "مرات", "مرة", "مرتان", true)
                                            .label
                                    }
                                </span>
                            </>
                        ) : (
                            "لم يتم تسجيل الخروج بواسطة المستخدم اليوم"
                        )}
                    </div>
                    {deleted_today && deleted_today.admin ? (
                        <div className="flex-cener-both rounded-md bg-blue-500 shadow-md px-4 py-1 space-x-1 space-x-reverse">
                            <span>بواسطة الدعم الفني :</span>
                            <span className="bg-primary-container px-1 py-1 rounded-full smooth">
                                {deleted_today.admin}
                            </span>
                            <span>
                                {getUnit(deleted_today.admin, "مرات", "مرة", "مرتان", true).label}
                            </span>
                        </div>
                    ) : (
                        ""
                    )}
                    {deleted_today && deleted_today.automatic ? (
                        <div className="flex-cener-both rounded-md bg-yellow-500 shadow-md px-4 py-1 space-x-1 space-x-reverse">
                            <span>تلقائي من خلال التسجيل في جهاز آخر :</span>
                            <span className="bg-primary-container px-1 py-1 rounded-full smooth">
                                {deleted_today.automatic}
                            </span>
                            <span>
                                {
                                    getUnit(deleted_today.automatic, "مرات", "مرة", "مرتان", true)
                                        .label
                                }
                            </span>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="flex-center-both flex-col space-y-1">
                    <div className="">عدد مرات تسجيل الخروج خلال الاسبوع</div>
                    <div className="flex-cener-both rounded-md bg-rose-500 shadow-md px-4 py-1 space-x-1 space-x-reverse">
                        {deleted_this_week && deleted_this_week.user ? (
                            <>
                                <span>بواسطة المستخدم :</span>
                                <span className="bg-primary-container px-1 py-1 rounded-full smooth">
                                    {deleted_this_week.user}
                                </span>
                                <span>
                                    {
                                        getUnit(
                                            deleted_this_week.user,
                                            "مرات",
                                            "مرة",
                                            "مرتان",
                                            true
                                        ).label
                                    }
                                </span>
                            </>
                        ) : (
                            "لم يتم تسجيل الخروج بواسطة المستخدم هذا الاسبوع"
                        )}
                    </div>
                    {deleted_this_week && deleted_this_week.admin ? (
                        <div className="flex-cener-both rounded-md bg-blue-500 shadow-md px-4 py-1 space-x-1 space-x-reverse">
                            <span>بواسطة الدعم الفني :</span>
                            <span className="bg-primary-container px-1 py-1 rounded-full smooth">
                                {deleted_this_week.admin}
                            </span>
                            <span>
                                {
                                    getUnit(deleted_this_week.admin, "مرات", "مرة", "مرتان", true)
                                        .label
                                }
                            </span>
                        </div>
                    ) : (
                        ""
                    )}
                    {deleted_this_week && deleted_this_week.automatic ? (
                        <div className="flex-cener-both rounded-md bg-yellow-500 shadow-md px-4 py-1 space-x-1 space-x-reverse">
                            <span>تلقائي من خلال التسجيل في جهاز آخر :</span>
                            <span className="bg-primary-container px-1 py-1 rounded-full smooth">
                                {deleted_this_week.automatic}
                            </span>
                            <span>
                                {
                                    getUnit(
                                        deleted_this_week.automatic,
                                        "مرات",
                                        "مرة",
                                        "مرتان",
                                        true
                                    ).label
                                }
                            </span>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
};

export default LogOutData;
