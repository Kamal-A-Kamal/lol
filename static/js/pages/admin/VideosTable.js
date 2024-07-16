import React from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import RemoteTable from "../../components/ui/RemoteTable";
import { getPlatformPlaceHolder, videoSource } from "../../services/contentServices";
// import { isMultiYear } from "../../services/defaultSettings";
// import { getYearPlaceHolder } from "../../services/yearSevices";
import { printFullDate } from "../../utils/time";

const VideosTable = () => {
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
            selector: (row) => row.name,
            sortable: true,
            sortField: "name",
        },
        {
            name: "مدة الفيديو",
            reorder: true,
            selector: (row) => row.duration,
            sortable: true,
            sortField: "duration",
        },
        {
            name: "مشاهدات الفيديو",
            reorder: true,
            selector: (row) => row.total_video_views_count,
            sortable: true,
            sortField: "total_video_views_count",
        },
        {
            name: "مشاهدات الفيديو اطول من ٥ دقائف",
            reorder: true,
            selector: (row) => row.over_five_minutes_video_views_count,
            sortable: true,
            sortField: "over_five_minutes_video_views_count",
        },
        {
            name: "منصة الفيديو",
            reorder: true,
            selector: (row) => getPlatformPlaceHolder(row.platform),
            sortable: true,
            sortField: "platform",
        },
        {
            name: "لينك الفيديو",
            reorder: true,
            selector: (row) =>
                row.platform === "upload" ? (
                    <a className="underline" href={videoSource(row.source)}>
                        {row.source}
                    </a>
                ) : (
                    row.source
                ),
            sortable: true,
            sortField: "source",
        },
        {
            name: "حالة تعدد الجودة",
            reorder: true,
            selector: (row) =>
                row.platform === "upload" ? (
                    <div className="rounded-md shadow-md">
                        {row.encoding_status === "raw" ? (
                            <div className="px-2 py-1 bg-yellow-300 text-slate-900">
                                لم يتم تعدد الجودة
                            </div>
                        ) : row.encoding_status === "proccessing" ? (
                            <div className="px-2 py-1 bg-teal-300 text-slate-900">
                                يتم الآن تعدد الجودة
                            </div>
                        ) : row.encoding_status === "failed" ? (
                            <div className="px-2 py-1 bg-rose-500 text-slate-100">
                                حدث خطأ اثناء تعدد الجودة
                            </div>
                        ) : (
                            <div className="px-2 py-1 bg-blue-500 text-slate-100">
                                تم تعدد الجودة بنجاح
                            </div>
                        )}
                    </div>
                ) : (
                    <span> ----</span>
                ),
            sortable: true,
            sortField: "encoding_status",
        },
        {
            name: "القسم",
            reorder: true,
            selector: (row) => (row.division ? row.division.name : ""),
            sortable: true,
            sortField: "division_id",
        },
        {
            name: "تاريخ آخر تعديل",
            reorder: true,
            selector: (row) => printFullDate(row.updated_at),
            sortable: true,
            sortField: "updated_at",
        },
        {
            name: "تاريخ الإضافة",
            reorder: true,
            selector: (row) => printFullDate(row.created_at),
            sortable: true,
            sortField: "created_at",
        },
    ];

    return (
        <AdminContainer>
            <div className="w-full">
                <RemoteTable api={`/api/videos/paginate`} columns={columns} />
            </div>
        </AdminContainer>
    );
};

export default VideosTable;
