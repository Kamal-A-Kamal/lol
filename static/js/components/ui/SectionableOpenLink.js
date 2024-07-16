import React, { useContext } from "react";
import CourseContext from "../../context/CourseContext";
import Button from "./Button";

const SectionableOpenLink = ({ sectionable, section, type }) => {
    let color = "yellow";
    let text = "مشاهدة الفيديو";
    if (type === "book") {
        color = "blue";
        text = "فتح الملف";
    } else if (type === "hm") {
        color = "teal";
        text = "فتح الواجب";
        type = "exam";
    } else if (type === "exam") {
        color = "rose";
        text = "بدا الامتحان";
        type = "exam";
    }

    const { course, isRefresh } = useContext(CourseContext);

    let element = "Link";
    let props = { to: `sections/${section.id}/${type}/${sectionable.id}` };
    if (isRefresh && type === "video" && sectionable.sectionable.platform === "ink") {
        element = "a";
        props = { href: `/course/${course.id}/sections/${section.id}/${type}/${sectionable.id}` };
    }
    return (
        <Button className="font-smaller" color={color} element={element} {...props}>
            {text}
        </Button>
    );
};

export default SectionableOpenLink;
