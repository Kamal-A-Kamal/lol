import React from "react";
import { printFullDate } from "../../../utils/time";
import { getUnit } from "../../../utils/ar";
import RemoteTable from "../../../components/ui/RemoteTable";
import { isCustomUserVideoLimit } from "../../../services/defaultSettings";
import IncreaseCustomUserVideoLimitButton from "./IncreaseCustomUserVideoLimitButton";
// import { getPlatformPlaceHolder } from "../../../services/contentServices";

const UserVideoViewTable = ({ user = { id: 0 } }) => {
    let columns = [
        {
            name: "التسلسل",
            reorder: true,
            selector: (row) => row.id,
            sortable: true,
            sortField: "id",
        },
        {
            name: "اسم الفيديو",
            reorder: true,
            selector: (row) =>
                row.video ? (
                    row.video.name
                ) : (
                    <span className="text-rose-500"> --- لم يتم العثور علي اسم الفيديو --- </span>
                ),
            sortable: true,
            sortField: "video_id",
        },
    ];
    if (isCustomUserVideoLimit) {
        columns = [
            ...columns,
            {
                name: "زياده عدد مرات المشاهده",
                reorder: true,
                selector: (row) =>
                    row.video ? (
                        row.video.platform === "ink" ? (
                            <IncreaseCustomUserVideoLimitButton video={row.video} user={user} />
                        ) : (
                            ""
                        )
                    ) : (
                        "تم حذف الفيديو"
                    ),
                sortable: true,
                sortField: "video_id",
            },
        ];
    }
    columns = [
        ...columns,
        {
            name: "اسم الكورس",
            reorder: true,
            selector: (row) =>
                row.course ? (
                    row.course.name
                ) : (
                    <span className="text-rose-500"> --- لم يتم العثور علي اسم الكورس --- </span>
                ),
            sortable: true,
            sortField: "course_id",
        },
        {
            name: "مدة فتح صفحة المشاهدة",
            reorder: true,
            selector: (row) =>
                row.duration_opened > 0 ? (
                    (getUnit(Math.ceil(row.duration_opened / 60), "دقائق", "دقيقة", "دقيقتان", true)
                        .value || "") +
                    " " +
                    getUnit(Math.ceil(row.duration_opened / 60), "دقائق", "دقيقة", "دقيقتان", true)
                        .label
                ) : (
                    <span className="text-rose-500"> -- لم يتم تشغيل الفيديو --</span>
                ),
            sortable: true,
            sortField: "duration_opened",
        },
        {
            name: "مدة المشاهدة",
            reorder: true,
            selector: (row) =>
                row.duration_played > 0 ? (
                    (getUnit(Math.ceil(row.duration_played / 60), "دقائق", "دقيقة", "دقيقتان", true)
                        .value || "") +
                    " " +
                    getUnit(Math.ceil(row.duration_played / 60), "دقائق", "دقيقة", "دقيقتان", true)
                        .label
                ) : (
                    <span className="text-rose-500"> -- لم يتم تشغيل الفيديو --</span>
                ),
            sortable: true,
            sortField: "duration_played",
        },
        // {
        //     name: "منصة الفيديو",
        //     reorder: true,
        //     selector: (row) => getPlatformPlaceHolder(row.platform),
        //     sortable: true,
        //     sortField: "platform",
        // },
        {
            name: "تسلسل تسجيل الدخول",
            reorder: true,
            selector: (row) => row.personal_access_token_id,
            sortable: true,
            sortField: "personal_access_token_id",
        },
        {
            name: "ip",
            reorder: true,
            selector: (row) => row.ip,
            sortable: true,
            sortField: "ip",
        },
        {
            name: "وقت المشاهدة",
            reorder: true,
            selector: (row) => printFullDate(row.created_at),
            sortable: true,
            sortField: "created_at",
        },
    ];
    return (
        <div>
            <div className="w-full">
                <RemoteTable
                    api={`/api/users/${user["id"]}/profile/video_views/paginate`}
                    columns={columns}
                />
            </div>
        </div>
    );
};

export default UserVideoViewTable;
