import React from "react";
import { printFullDate } from "../../utils/time";
import CenterIcon from "./CenterIcon";

const icons = {
    add: "ic:twotone-tips-and-updates",
    improve: "icon-park-twotone:optimize",
    fix: "clarity:update-line",
    remove: "material-symbols:bookmark-remove-rounded",
};

const UpdateRelaseItem = ({
    icon = "add",
    date = new Date(),
    title = "تعديل الأكواد",
    text = "تعديل الأكواد",
}) => {
    return (
        <div className="bg-outer-container smooth border border-secondary-container clr-text-primary px-4 pt-8 w-full rounded-md h-full">
            <div className="space-y-2 w-full flex flex-col pb-10">
                <div className="flex justify-start items-start pl-5 space-x-2 space-x-reverse">
                    <CenterIcon icon={icons[icon]} className="font-h3 pt-1 text-blue-500" />
                    <div className="font-w-bold">{title}</div>
                </div>
                <div className="flex w-full">
                    <div className="flex justify-end w-full">
                        <div className="flex flex-center-both space-x-2 flex-row-reverse">
                            <CenterIcon
                                className="font-h3 text-blue-500"
                                icon="clarity:date-solid"
                            />
                            <div className="clr-text-secondary smooth font-smaller">
                                {printFullDate(date)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex-center-both px-20">
                    <div className="bg-inner-container w-full h-1 rounded-full smooth"></div>
                </div>
                <div className="flex">
                    <div className="clr-text-secondary smooth space-x-2 space-x-reverse flex items-start">
                        <CenterIcon className="text-blue-500 pt-2" icon="ph:star-four-duotone" />

                        <div>{text}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateRelaseItem;
