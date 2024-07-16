import React from "react";
import CenterIcon from "../components/ui/CenterIcon";
import { Link } from "react-router-dom";
import { printRelativeDate, printUnit } from "../utils/ar";

const CommunityCategoryCard = ({ category }) => {
    return (
        <Link to={`./category/${category.id}`}>
            <div className="flex justify-between bg-third-container clr-text-primary rounded-md smooth p-5 hover-shadow border-2 border-third-container hover:border-cyan-500">
                <div className="flex-center-both space-x-2 space-x-reverse">
                    <div className="flex-center-both space-y-2">
                        <div className="md:w-20 w-10 md:h-20 h-10 rounded-full bg-secondary-container flex-center-both smooth">
                            <CenterIcon
                                className="w-full h-full clr-text-secondary smooth "
                                iconProperties={{ className: "h-3/4 w-3/4" }}
                                icon="ic:twotone-group"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="font-w-bold font-h3">{category.name}</div>
                        <div className="clr-text-secondary smooth">
                            <div className="font-w-bold">{category.description}</div>

                            <div className="font-smaller flex space-x-1 space-x-reverse">
                                <CenterIcon icon="icon-park-twotone:time" className="pt-0.5" />
                                <span>
                                    آخر نشاط داخل المجموعة {printRelativeDate(category.updated_at)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-center-both">
                    <div className="p-1 bg-secondary-container clr-text-secondary smooth rounded-md shadow-md flex-center-both flex-col space-y-2 text-center font-smaller">
                        <div className="">عدد المواضيع</div>
                        <div>{printUnit(category.community_posts_count, "موضوع")}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

// ic:twotone-group
export default CommunityCategoryCard;
