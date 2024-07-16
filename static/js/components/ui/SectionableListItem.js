import { Disclosure, Transition } from "@headlessui/react";
import React from "react";
import { Icons } from "../../services/contentServices";
import { description, getUnit, printUnit } from "../../utils/ar";
import CenterIcon from "./CenterIcon";
import FlexRowReverse from "./FlexRowReverse";
import SectionableOpenLink from "./SectionableOpenLink";

const SectionableListItem = ({ children, sectionable, course, section }) => {
    const type =
        sectionable.sectionable_type === "exam"
            ? sectionable.sectionable.type
            : sectionable.sectionable_type;

    let width = 0;
    if (sectionable.sectionable_type === "video" && sectionable.sectionable.platform === "ink") {
        let percentage =
            (parseInt(sectionable.sectionable.total_time_played) /
                parseInt(sectionable.sectionable.duration)) *
            60 *
            100;
        width = percentage > 100 ? 100 : percentage;
    }
    return (
        <Disclosure>
            {({ open }) => (
                <div className="space-y-4">
                    <Disclosure.Button className={"w-full relative rounded-md overflow-hidden"}>
                        {sectionable.is_locked ? (
                            <div className="inset-0 absolute bg-slate-900 dark:bg-slate-900 z-10 bg-opacity-40 dark:bg-opacity-70 flex-center-both">
                                <FlexRowReverse className="w-full flex-center-both text-center z-50 relative ">
                                    <CenterIcon
                                        className="text-rose-700 dark:text-rose-500 bg-rose-100 bg-opacity-40 dark:bg-rose-900 dark:bg-opacity-10 rounded-full px-2 pb-1 pt-0.5 border border-rose-500 border-opacity-20 smooth"
                                        icon={"ant-design:lock-twotone"}
                                    />
                                    <span className="text-slate-900 font-smaller bg-rose-400 rounded-full px-3 clr-white py-1">
                                        هذا المحتوى مغلق حتى النجاح في الاختبار السابق!
                                    </span>
                                </FlexRowReverse>
                            </div>
                        ) : (
                            ""
                        )}
                        <div
                            className={`clr-text-primary smooth relative rounded-md ${
                                open ? "bg-slate-200 dark:bg-slate-800" : "bg-primary-container"
                            } 
                            ${
                                ""
                                // + "border" +
                                // sectionable.sectionable_type === "video"
                                //     ? "border-yellow-500"
                                //     : sectionable.sectionable_type === "book"
                                //     ? "border-blue-500"
                                //     : sectionable.sectionable.type === "exam"
                                //     ? "border-rose-500"
                                //     : "border-teal-500"
                            }
                            `}
                        >
                            <div className="flex flex-row justify-between px-4 py-4 relative">
                                <div className="flex-center-both space-x-3 space-x-reverse cursor-pointer">
                                    <div className="font-h1 pt-1">{Icons[type]}</div>
                                    <div className="font-h3">{sectionable.sectionable.name}</div>
                                </div>

                                <div className="flex-center-both space-x-3 space-x-reverse">
                                    {sectionable.sectionable_type !== "video" ||
                                    !sectionable.sectionable.limit_reached ? (
                                        !sectionable.is_locked ? (
                                            <>
                                                {sectionable.key_item ? (
                                                    <CenterIcon
                                                        className="text-rose-500"
                                                        icon="ic:twotone-vpn-key"
                                                    />
                                                ) : (
                                                    ""
                                                )}
                                                {course.subscriptions_count > 0 ? (
                                                    <SectionableOpenLink
                                                        sectionable={sectionable}
                                                        section={section}
                                                        type={type}
                                                    />
                                                ) : parseFloat(course.price) !== 0 ? (
                                                    type === "video" &&
                                                    sectionable.sectionable.is_free ? (
                                                        <SectionableOpenLink
                                                            sectionable={sectionable}
                                                            section={section}
                                                            type={type}
                                                        />
                                                    ) : (
                                                        ""
                                                    )
                                                ) : (
                                                    <SectionableOpenLink
                                                        sectionable={sectionable}
                                                        section={section}
                                                        type={type}
                                                    />
                                                )}
                                            </>
                                        ) : (
                                            ""
                                        )
                                    ) : (
                                        ""
                                    )}

                                    <div className="flex-center-both font-h3 pt-1 cursor-pointer">
                                        <CenterIcon
                                            icon={"ep:arrow-up-bold"}
                                            className={`transform smooth clr-text-primary ${
                                                open ? "-rotate-180 text-slate-500" : ""
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>
                            {sectionable.sectionable_type === "exam" ? (
                                <div
                                    className={`w-full relative overflow-hidden smooth shadow-medium rounded-l-full ${
                                        open ? "h-6" : "h-2"
                                    }`}
                                >
                                    <div className="absolute bg-secondary-container smooth inset-0 h-full w-full"></div>
                                    <div
                                        className="absolute bg-blue-500 opacity-30 smooth h-full top-0 right-0 rounded-l-full flex-center-both font-smaller clr-white"
                                        style={{
                                            width: `${sectionable.sectionable.exam_results_max_result_percentage}%`,
                                        }}
                                    ></div>
                                    <div
                                        className="absolute bg-rose-500 smooth h-full top-0 right-0 rounded-l-full flex-center-both font-smaller clr-white"
                                        style={{
                                            width: `${sectionable.sectionable.exam_results_medium_percentage}%`,
                                        }}
                                    ></div>
                                    <div
                                        className="absolute bg-yellow-500 opacity-90 smooth h-full top-0 right-0 rounded-l-full flex-center-both font-smaller clr-white"
                                        style={{
                                            width: `${
                                                sectionable.sectionable
                                                    .exam_results_min_result_percentage === 0
                                                    ? 1
                                                    : sectionable.sectionable
                                                          .exam_results_min_result_percentage
                                            }%`,
                                        }}
                                    ></div>
                                    <div
                                        className="absolute smooth h-full top-0 right-0 rounded-l-full flex-center-both font-smaller clr-white"
                                        style={{
                                            width: `${sectionable.sectionable.exam_results_medium_percentage}%`,
                                        }}
                                    >
                                        <span
                                            className={`smooth ${
                                                open &&
                                                sectionable.sectionable
                                                    .exam_results_medium_percentage > 5
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            }`}
                                        >
                                            {true ||
                                            (open &&
                                                sectionable.sectionable
                                                    .exam_results_medium_percentage > 5) ? (
                                                <>
                                                    متوسط نتائجك{" "}
                                                    {parseInt(
                                                        sectionable.sectionable
                                                            .exam_results_medium_percentage
                                                    )}{" "}
                                                    %
                                                </>
                                            ) : (
                                                ""
                                            )}
                                        </span>
                                    </div>
                                </div>
                            ) : sectionable.sectionable_type === "video" &&
                              sectionable.sectionable.platform === "ink" ? (
                                <div
                                    className={`w-full relative overflow-hidden smooth shadow-medium rounded-l-full ${
                                        open ? "h-6" : "h-2"
                                    }`}
                                >
                                    <div className="absolute bg-secondary-container smooth inset-0 h-full w-full"></div>
                                    <div
                                        className="absolute bg-rose-500 smooth h-full top-0 right-0 rounded-l-full flex-center-both font-smaller clr-white"
                                        style={{
                                            width: `${width}%`,
                                        }}
                                    ></div>
                                    <div
                                        className="absolute smooth h-full top-0 right-0 rounded-l-full flex-center-both font-smaller clr-white"
                                        style={{
                                            width: `${width}%`,
                                        }}
                                    >
                                        <span
                                            className={`smooth ${
                                                open && width > 5 ? "opacity-100" : "opacity-0"
                                            }`}
                                        >
                                            {true || (open && width > 5) ? (
                                                <>اجمالي ما تم مشاهدته من الفيديو {width} %</>
                                            ) : (
                                                ""
                                            )}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </Disclosure.Button>
                    <Transition
                        enter="transition duration-500 ease-out origin-top"
                        enterFrom="transform scale-y-0 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                    >
                        <Disclosure.Panel>
                            <div className="flex flex-col px-4 py-4 rounded-md bg-primary-container clr-text-primary smooth mx-5 font-smaller">
                                {/* <div className="flex flex-col w-full max-w-md"> */}
                                {sectionable.sectionable_type === "exam" ? (
                                    <div className="flex flex-col space-y-1">
                                        <div className="flex md:flex-row flex-col items-start sm:justify-right pb-3 md:space-x-6 md:space-x-reverse flex-wrap">
                                            <div className="flex flex-row space-x-2 space-x-reverse flex-center-both">
                                                <div className="rounded-full w-4 h-4 bg-yellow-500"></div>
                                                <div className="flex-center-both">
                                                    اقل نتيجة لك :{" "}
                                                    {sectionable.sectionable
                                                        .exam_results_min_result_percentage
                                                        ? parseInt(
                                                              sectionable.sectionable
                                                                  .exam_results_min_result_percentage
                                                          )
                                                        : 0}{" "}
                                                    %
                                                </div>
                                            </div>
                                            <div className="flex flex-row space-x-2 space-x-reverse flex-center-both">
                                                <div className="rounded-full w-4 h-4 bg-rose-500"></div>
                                                <div className="flex-center-both">
                                                    متوسط نتائجك :{" "}
                                                    {sectionable.sectionable
                                                        .exam_results_medium_percentage
                                                        ? parseInt(
                                                              sectionable.sectionable
                                                                  .exam_results_medium_percentage
                                                          )
                                                        : 0}{" "}
                                                    %
                                                </div>
                                            </div>
                                            <div className="flex flex-row space-x-2 space-x-reverse flex-center-both">
                                                <div className="rounded-full w-4 h-4 bg-blue-500"></div>
                                                <div className="flex-center-both">
                                                    اعلى نتيجة لك :{" "}
                                                    {sectionable.sectionable
                                                        .exam_results_max_result_percentage
                                                        ? parseInt(
                                                              sectionable.sectionable
                                                                  .exam_results_max_result_percentage
                                                          )
                                                        : 0}{" "}
                                                    %
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex md:flex-row flex-col items-start sm:justify-right pb-3 md:space-x-6 md:space-x-reverse flex-wrap">
                                            <div>
                                                <span>- عدد مرات دخولك : </span>
                                                <span className="clr-text-secondary smooth">
                                                    {printUnit(
                                                        sectionable.sectionable.exam_results_count
                                                            ? sectionable.sectionable
                                                                  .exam_results_count
                                                            : 0,
                                                        "مرة"
                                                    )}
                                                </span>
                                            </div>
                                            <div>
                                                <span>- عدد مرات انهائك : </span>
                                                <span className="clr-text-secondary smooth">
                                                    {printUnit(
                                                        sectionable.sectionable
                                                            .exam_results_finished_count
                                                            ? sectionable.sectionable
                                                                  .exam_results_finished_count
                                                            : 0,
                                                        "مرة"
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                                <div className="space-x-2 space-x-reverse flex flex-row">
                                    <FlexRowReverse className="font-w-bold">
                                        <CenterIcon
                                            className="text-rose-500 pt-1"
                                            icon="ant-design:info-circle-twotone"
                                        />
                                        <span>الوصف :</span>
                                    </FlexRowReverse>
                                    <div className="clr-text-secondary smooth">
                                        {description(sectionable.sectionable.description)}
                                    </div>
                                </div>
                                {sectionable.sectionable_type === "video" ? (
                                    <>
                                        <div className="space-x-2 space-x-reverse flex flex-row">
                                            <FlexRowReverse className="font-w-bold">
                                                <CenterIcon
                                                    className="text-yellow-500"
                                                    nY="0"
                                                    icon="icon-park-twotone:stopwatch-start"
                                                />
                                                <span>مدة الفيديو :</span>
                                            </FlexRowReverse>
                                            <div className="clr-text-secondary smooth">
                                                <FlexRowReverse>
                                                    <span>
                                                        {
                                                            getUnit(
                                                                sectionable.sectionable.duration
                                                            )["value"]
                                                        }
                                                    </span>
                                                    <span>
                                                        {
                                                            getUnit(
                                                                sectionable.sectionable.duration,
                                                                "دقائق",
                                                                "دقيقة",
                                                                "دقيقتان",
                                                                true
                                                            )["label"]
                                                        }
                                                    </span>
                                                </FlexRowReverse>
                                            </div>
                                        </div>
                                        <div className="space-x-2 space-x-reverse flex flex-row">
                                            <FlexRowReverse className="font-w-bold">
                                                <CenterIcon
                                                    className="text-yellow-500"
                                                    nY="0"
                                                    icon="ic:twotone-people-alt"
                                                />
                                                <span>عدد المشاهدات :</span>
                                            </FlexRowReverse>
                                            <div className="clr-text-secondary smooth">
                                                {printUnit(
                                                    sectionable.sectionable.video_opened_count
                                                        ? sectionable.sectionable.video_opened_count
                                                        : 0,
                                                    "مشاهدة"
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-x-2 space-x-reverse flex flex-row">
                                            <FlexRowReverse className="font-w-bold">
                                                <CenterIcon
                                                    className="text-yellow-500"
                                                    nY="0"
                                                    icon="fluent:time-and-weather-20-filled"
                                                />
                                                <span>اجمالي وقت المشاهدة :</span>
                                            </FlexRowReverse>
                                            <div className="clr-text-secondary smooth">
                                                {printUnit(
                                                    sectionable.sectionable.total_time_played
                                                        ? parseFloat(
                                                              sectionable.sectionable
                                                                  .total_time_played / 60
                                                          )
                                                        : 0,
                                                    "دقيقة"
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    ""
                                )}
                                {sectionable.sectionable_type === "exam" ? (
                                    <>
                                        <div className="space-x-2 space-x-reverse flex flex-row">
                                            <FlexRowReverse className="font-w-bold">
                                                <CenterIcon
                                                    className="text-blue-500"
                                                    nY="0"
                                                    icon="fluent:document-page-number-24-regular"
                                                />
                                                <span>عدد الاسئلة :</span>
                                            </FlexRowReverse>
                                            <div className="clr-text-secondary smooth">
                                                {printUnit(
                                                    sectionable.sectionable.question_quantity,
                                                    "سؤال"
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-x-2 space-x-reverse flex flex-row">
                                            <FlexRowReverse className="font-w-bold">
                                                <CenterIcon
                                                    className="text-yellow-500"
                                                    nY="0"
                                                    icon="icon-park-twotone:stopwatch-start"
                                                />
                                                <span>مدة الامتحان :</span>
                                            </FlexRowReverse>
                                            <div className="clr-text-secondary smooth">
                                                <FlexRowReverse>
                                                    <span>
                                                        {
                                                            getUnit(
                                                                sectionable.sectionable.duration
                                                            )["value"]
                                                        }
                                                    </span>
                                                    <span>
                                                        {
                                                            getUnit(
                                                                sectionable.sectionable.duration,
                                                                "دقائق",
                                                                "دقيقة",
                                                                "دقيقتان",
                                                                true
                                                            )["label"]
                                                        }
                                                    </span>
                                                </FlexRowReverse>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    ""
                                )}

                                {/* </div> */}
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </div>
            )}
        </Disclosure>
    );
};

export default SectionableListItem;
