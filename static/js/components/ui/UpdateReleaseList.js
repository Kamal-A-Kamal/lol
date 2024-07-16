import React from "react";
import UpdateRelaseItem from "./UpdateRelaseItem";
import { updateReleases } from "../../services/UpdatesReleasesServices";

const UpdateReleaseList = ({ rows = 0, onlyRecent = false }) => {
    const recent_duration = 24 * 60 * 60 * 15;
    const today = Date.now() / 1000;

    function toTimestamp(strDate) {
        var datum = Date.parse(strDate);
        return datum / 1000;
    }

    return (
        <div className="grid md:grid-cols-3 grid-cols-1 items-start gap-10 w-full">
            {updateReleases.map((value, index) =>
                (rows === 0 || index < rows) &&
                (onlyRecent
                    ? toTimestamp(value.date) > parseFloat(today - recent_duration)
                    : true) ? (
                    <UpdateRelaseItem {...value} />
                ) : (
                    ""
                )
            )}
        </div>
    );
};

export default UpdateReleaseList;
