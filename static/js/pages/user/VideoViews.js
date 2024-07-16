import React from "react";
import RemoteTable from "../../components/ui/RemoteTable";
import { getUnit } from "../../utils/ar";
import { printFullDate } from "../../utils/time";

const VideoViews = () => {
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
                    isAdmin={false}
                    api={`/api/user/video_views/paginate`}
                    columns={columns}
                />
            </div>
        </div>
    );
};

export default VideoViews;
