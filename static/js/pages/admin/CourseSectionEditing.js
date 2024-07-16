import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactSortable } from "react-sortablejs";
import InputIcon from "../../components/form/elements/InputIcon";
import AdminContainer from "../../components/ui/AdminContainer";
import Button from "../../components/ui/Button";
import CenterIcon from "../../components/ui/CenterIcon";
import LoadingIcon from "../../components/ui/LoadingIcon";
import auth from "../../services/authServices";
import { Icons } from "../../services/contentServices";
import http from "../../services/httpServices";
import modal from "../../services/modalServices";
import {
    handleFormErrors,
    handleInputChange as handleChange,
    handleInputChange,
    renderInputFields,
} from "../../services/formServices";
import InputField from "../../components/form/elements/InputField";
import { Disclosure, Transition } from "@headlessui/react";

const sortableOptions = {
    animation: 150,
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    swapThreshold: 0.6,
    invertSwap: true,
};

const CourseSectionEditing = () => {
    const [course, setCourse] = useState({});
    const [sections, setSections] = useState([]);
    const { courseId } = useParams();

    const [courseLoading, setCourseLoading] = useState(true);
    const [sectionsLoading, setSectionsLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const getSections = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: result } = await http.get(`/api/courses/${courseId}/sections`, config);
        setSections(result);
        setSectionsLoading(false);
    };
    const getCourse = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);

        const { data: result } = await http.get(`/api/courses/${courseId}`, config);
        setCourse(result);
        setCourseLoading(false);
    };
    useEffect(() => {
        getCourse();
        getSections();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async () => {
        setIsLoading(true);
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);
        const { data: result } = await http.post(
            `/api/courses/${courseId}/sections`,
            { sections },
            config
        );
        modal.message({
            title: "عملية ناجحة",
            // text: "تم تعديل الكورس بنجاح",
            text: result.message,
            callback: () => {
                setIsLoading(false);
                window.scrollTo(0, 0);
                // window.location.reload();
            },
        });
    };

    const initialState = {
        section_name: "",
        section_description: "",
    };
    const [data, setData] = useState(initialState);
    const [sectionFormLoading, setSectionFormLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSectionAdd = async (e, id, data, setData) => {
        setErrors({});
        setSectionFormLoading(true);
        modal.message({
            title: "هل انت متأكد من اضافة المجموعة؟",
            icon: "info",
            buttons: {
                confirm: "اضافة",
                cancel: "إلغاء",
            },
            callback: async (e) => {
                if (e && e !== "cancel") {
                    const token = auth.getAdminToken();
                    const config = auth.getAdminAuthConfig(token);
                    try {
                        const { data: response } = await http.post(
                            `/api/sections`,
                            {
                                section_name: data.section_name,
                                section_description: data.section_description,
                                course_id: course.id,
                            },
                            config
                        );
                        getSections();
                        modal.message({
                            title: "تمت اضافة المجموعة",
                            callback: () => {
                                setData({
                                    ...data,
                                    section_name: "",
                                    section_description: "",
                                    section_id: response.section.id,
                                });
                                setSectionFormLoading(false);
                            },
                        });
                    } catch ({ response }) {
                        handleFormErrors(response, setSectionFormLoading, setErrors, false);
                    }
                } else {
                    setSectionFormLoading(false);
                }
            },
        });
    };
    const fields = [
        {
            id: "section_name",
            placeholder: "اضافة مجموعة",
            icon: <InputIcon icon="fluent:app-title-24-filled" />,
        },
        {
            id: "section_description",
            placeholder: "وصف المجموعة",
            type: "textarea",
            icon: <InputIcon icon="ant-design:info-circle-twotone" />,
        },
        {
            id: "section_add_button",
            isLoading: sectionFormLoading,
            onClick: handleSectionAdd,
            element: "button",
            placeholder: "اضافة المجموعة",
        },
    ];

    return (
        <AdminContainer>
            <div className="w-full flex-center-both flex-col">
                <div className="underline">اسم الكورس</div>
                {!courseLoading ? (
                    <div className="font-h1  font-w-bold">{course.name}</div>
                ) : (
                    <div className="font-big text-blue-500 pt-5">
                        <LoadingIcon />
                    </div>
                )}
            </div>
            {!sectionsLoading ? (
                <>
                    <div className="w-full">
                        <ReactSortable
                            className="space-y-4"
                            list={sections}
                            setList={setSections}
                            {...{ ...sortableOptions }}
                        >
                            {sections.map((section, index) => {
                                return (
                                    <RenderSection
                                        key={section.id}
                                        section={section}
                                        index={[index]}
                                        setSections={setSections}
                                    />
                                );
                            })}
                        </ReactSortable>
                    </div>
                    <form className="w-full flex-center-both">
                        <div className="w-full max-w-lg flex flex-col space-y-10 py-10">
                            {fields.map((input, key) =>
                                renderInputFields(
                                    key,
                                    input.handleChange ? input.handleChange : handleChange,
                                    data,
                                    setData,
                                    errors,
                                    input
                                )
                            )}
                        </div>
                    </form>

                    <div className="w-full max-w-lg">
                        <Button
                            color="blue"
                            className="w-full font-h3"
                            onClick={handleSubmit}
                            isLoading={isLoading}
                        >
                            حفظ التغيرات
                        </Button>
                    </div>
                </>
            ) : (
                <div className="rounded-md bg-outer-container border border-blue-500 p-10">
                    <div className="font-big text-blue-500">
                        <LoadingIcon />
                    </div>
                </div>
            )}
        </AdminContainer>
    );
};
const RenderSection = ({ section, index, setSections }) => {
    const [isDeleteButtonLoading, setIsDeleteButtonLoading] = useState(false);

    const deleteSection = async () => {
        setSections((sourceList) => sourceList.filter((value) => value.id !== section.id));
        setIsDeleteButtonLoading(false);
    };
    const handleSectionInputChange = (setSections, newValue) => {
        setSections((sourceSections) => {
            return sourceSections.map((element) => {
                if (element.id === section.id) {
                    return { ...element, ...newValue };
                } else {
                    return element;
                }
            });
        });
    };
    const handleDeleteSection = () => {
        setIsDeleteButtonLoading(true);
        if (section.sectionables.length > 0) {
            modal.message({
                title: "هذه المجموعة ليست فراغة.. هل انت متأكد من حذف هذه المجموعة في هذا الكورس فقط؟",
                icon: "error",
                buttons: {
                    confirm: "حذف",
                    cancel: "إلغاء",
                },
                callback: (e) => {
                    if (e && e !== "cancel") {
                        deleteSection();
                    } else {
                        setIsDeleteButtonLoading(false);
                    }
                },
            });
        } else {
            modal.message({
                title: "هل انت متأكد من مسح هذه المجموعة في هذا الكورس فقط؟",
                icon: "info",
                buttons: {
                    confirm: "حذف",
                    cancel: "إلغاء",
                },
                callback: (e) => {
                    if (e && e !== "cancel") {
                        deleteSection();
                    } else {
                        setIsDeleteButtonLoading(false);
                    }
                },
            });
        }
    };
    return (
        <div className="bg-outer-container border-2 border-blue-500 clr-text-primary rounded-md shadow-lg p-5 smooth space-y-5">
            <div className="flex justify-between">
                <div className="flex space-x-4 space-x-reverse">
                    <CenterIcon className="font-h1 text-blue-500" icon={"uim:layer-group"} />
                    <div className="space-y-5">
                        <div className="space-x-2 space-x-reverse py-3">
                            <InputField
                                id="name"
                                data={section}
                                setData={(currentData) => {
                                    handleSectionInputChange(setSections, {
                                        name: currentData.name,
                                    });
                                }}
                                onChange={handleInputChange}
                                placeholder="العنوان :"
                            />
                            {/* <span className="underline">العنوان :</span>
                            <span className="font-h3">{section.name}</span> */}
                        </div>
                        <div className="space-x-2 space-x-reverse clr-text-secondary font-smaller">
                            <InputField
                                id="description"
                                data={section}
                                setData={(currentData) => {
                                    handleSectionInputChange(setSections, {
                                        description: currentData.description,
                                    });
                                }}
                                onChange={handleInputChange}
                                placeholder="الوصف :"
                            />
                            {/* <span className="underline">الوصف :</span>
                            <span className="">{section.description}</span> */}
                        </div>
                    </div>
                </div>
                <div className="flex flex-center-both">
                    <Button
                        className="flex-center-both font-h2 pt-1 pb-0.5 px-1 cursor-pointer"
                        color="rose"
                        isLoading={isDeleteButtonLoading}
                        onClick={handleDeleteSection}
                    >
                        <CenterIcon icon="ion:trash-bin" />
                    </Button>
                </div>
            </div>
            <ReactSortable
                key={section.id}
                list={section.sectionables}
                className="space-y-3 bg-blue-100 dark:bg-blue-900 bg-opacity-50 dark:bg-opacity-10 py-3 px-2 rounded-md smooth"
                setList={(currentList) => {
                    setSections((sourceList) => {
                        const tempList = [...sourceList];
                        const _blockIndex = [...index];
                        const lastIndex = _blockIndex.pop();
                        const lastArr = _blockIndex.reduce(
                            (arr, i) => arr[i]["sectionables"],
                            tempList
                        );
                        lastArr[lastIndex]["sectionables"] = currentList;
                        return tempList;
                    });
                }}
                {...{ ...sortableOptions, group: "content" }}
            >
                {section.sectionables &&
                    section.sectionables.map((sectionabe, sectionableIndex) => {
                        return (
                            <RenderSectionable
                                key={sectionabe.id}
                                section={section}
                                setSections={setSections}
                                sectionable={sectionabe}
                            />
                        );
                    })}
            </ReactSortable>
        </div>
    );
};
const RenderSectionable = ({ sectionable, section, setSections }) => {
    const type =
        sectionable.sectionable_type === "exam"
            ? sectionable.sectionable.type
            : sectionable.sectionable_type;

    const [isDeleteButtonLoading, setIsDeleteButtonLoading] = useState(false);

    const editSectionable = (input, id) => {
        const { currentTarget } = input;
        const { value: newValue } = currentTarget;

        setSections((sourceList) => {
            return sourceList.map((value) => {
                //catch section
                if (value.id === section.id) {
                    // filter sectionable to get what will be updated
                    value.sectionables = value.sectionables.map((element) => {
                        if (element.id == sectionable.id) {
                            switch (id) {
                                case "visible_from":
                                    element.visible_from = newValue;
                                    break;
                                case "visible_to":
                                    element.visible_to = newValue;
                                    break;
                                case "is_locked_on":
                                    element.is_locked_on = newValue;
                                    break;
                                case "exam_open_limit":
                                    element.exam_open_limit = newValue;
                                    break;
                                case "view_limit":
                                    element.view_limit = newValue;
                                    break;
                                default:
                                    break;
                            }
                        }
                        return element;
                    });
                }

                return value;
            });
        });
    };

    const deleteSection = async () => {
        setSections((sourceList) =>
            sourceList.map((value) => {
                if (value.id === section.id) {
                    value.sectionables = value.sectionables.filter(
                        (element) => element.id !== sectionable.id
                    );
                }
                return value;
            })
        );
        setIsDeleteButtonLoading(false);
    };
    const handleDeleteSection = () => {
        setIsDeleteButtonLoading(true);
        modal.message({
            title: "هل انت متأكد من الحذف؟",
            text: "هل انت متأكد من مسح هذا المحتوى من هذه المجموعة في كل الكورسات التي تحتوى علي نفس المجموعة؟",
            icon: "info",
            buttons: {
                confirm: "حذف",
                cancel: "إلغاء",
            },
            callback: (e) => {
                if (e && e !== "cancel") {
                    deleteSection();
                } else {
                    setIsDeleteButtonLoading(false);
                }
            },
        });
    };
    return (
        <Disclosure>
            {({ open }) => (
                <div
                    className={`bg-inner-container border ${
                        sectionable.sectionable_type === "video"
                            ? "border-yellow-500"
                            : sectionable.sectionable_type === "book"
                            ? "border-blue-500"
                            : sectionable.sectionable.type === "exam"
                            ? "border-rose-500"
                            : "border-teal-500"
                    } clr-text-primary rounded-md shadow-sm p-5 smooth space-y-4`}
                >
                    <div className="flex justify-between">
                        <div className="flex space-y-3 flex-col items-start">
                            <div className="rounded-full shadow-small pb-0.5 px-4 font-smaller font-w-bold">
                                --{" "}
                                {type === "video"
                                    ? "فيديو"
                                    : type === "book"
                                    ? "مذكرة"
                                    : type === "exam"
                                    ? "امتحان"
                                    : "واجب"}{" "}
                                --
                            </div>
                            <div className="flex space-x-1 space-x-reverse items-center">
                                <div className="flex-center-both font-h2">{Icons[type]}</div>
                                <div>{sectionable.sectionable.name}</div>
                            </div>
                        </div>
                        <div className="flex-center-both space-x-3 space-x-reverse">
                            <Disclosure.Button
                                className={"flex-center-both font-h3 pt-1 cursor-pointer block"}
                            >
                                <CenterIcon
                                    icon={"ep:arrow-up-bold"}
                                    className={`transform smooth clr-text-primary ${
                                        open ? "-rotate-180 text-slate-500" : ""
                                    }`}
                                />
                            </Disclosure.Button>
                            <div className="flex flex-center-both">
                                <Button
                                    className="flex-center-both font-h3 pt-1 pb-0.5 px-1 cursor-pointer"
                                    color="rose"
                                    isLoading={isDeleteButtonLoading}
                                    onClick={handleDeleteSection}
                                >
                                    <CenterIcon icon="ion:trash-bin-outline" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Transition
                        enter="transition duration-500 ease-out origin-top"
                        enterFrom="transform scale-y-0 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                    >
                        <Disclosure.Panel>
                            <form>
                                <div className="flex flex-col px-4 py-8 rounded-md clr-text-primary smooth mx-5 font-small space-y-10">
                                    {sectionable.sectionable_type == "exam" ? (
                                        <>
                                            <div>
                                                <InputField
                                                    id="exam_open_limit"
                                                    data={sectionable}
                                                    placeholder="عدد مرات إنهاء الإختبار"
                                                    type="number"
                                                    onChange={editSectionable}
                                                />
                                            </div>
                                            <div>
                                                <InputField
                                                    id="is_locked_on"
                                                    data={sectionable}
                                                    placeholder="قفل مابعده من محتوي"
                                                    type="switch"
                                                    onChange={editSectionable}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </form>
                        </Disclosure.Panel>
                    </Transition>
                </div>
            )}
        </Disclosure>
    );
};
export default CourseSectionEditing;
