import { Disclosure, Transition } from "@headlessui/react";
import React from "react";

import { description } from "../../utils/ar";
import CenterIcon from "./CenterIcon";
import SectionableListItem from "./SectionableListItem";

const SectionListItem = ({ children, section, course }) => {
    // const { course } = useContext(CourseContext);
    return (
        <Disclosure>
            {({ open }) => (
                <div className="bg-primary-container rounded-md px-5 py-5  clr-text-primary smooth shadow-medium border-2 border-secondary-container space-y-4">
                    <Disclosure.Button className={`w-full`}>
                        <div
                            className={`flex flex-row justify-between px-5 py-5 rounded-md clr-text-primary smooth ${
                                open ? "bg-rose-100 dark:bg-rose-900" : "bg-third-container"
                            }`}
                        >
                            <div className="flex flex-row flex-center-both space-x-4 space-x-reverse">
                                <div className="flex-center-both text-rose-500 font-big pt-2 cursor-pointer">
                                    <CenterIcon icon={"ant-design:appstore-add-outlined"} />
                                </div>
                                <div className="flex flex-col">
                                    <div className="font-h1 font-w-bold">{section.name}</div>
                                    <div className="clr-text-secondary font-smaller text-right">
                                        {description(section.description)}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-center-both font-h1 cursor-pointer">
                                {/* <CenterIcon icon={}/> */}
                                <CenterIcon
                                    icon={"ep:arrow-up-bold"}
                                    className={`transform smooth clr-text-primary  ${
                                        open ? "-rotate-180 text-rose-500" : ""
                                    }`}
                                />
                            </div>
                        </div>
                    </Disclosure.Button>
                    <Transition
                        enter="transition duration-500 ease-out origin-top"
                        enterFrom="transform scale-y-0 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                    >
                        <Disclosure.Panel>
                            <div className="rounded-md px-5 py-5 bg-third-container clr-text-primary smooth">
                                <div className="flex flex-col space-y-3">
                                    {section.sectionables.map((sectionable, index) => {
                                        return (
                                            <SectionableListItem
                                                sectionable={sectionable}
                                                section={section}
                                                course={course}
                                                key={index}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </div>
            )}
        </Disclosure>
    );
};

export default SectionListItem;
