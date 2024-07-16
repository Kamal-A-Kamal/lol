import React from "react";

export function getObjectLength(object) {
    return Object.keys(object).length;
}
export function isObjectEmpty(object) {
    return getObjectLength(object) < 1;
}
export const remapOptionsTextToLabel = (options) => {
    const newOptions = options.map(({ value, text }) => {
        return { value, label: text };
    });
    return newOptions;
};
export const getOptionTexts = (options) => {
    const texts = [];
    options.forEach((element) => {
        texts[element.value] = element.text;
    });
    return texts;
};

export const makeSearchQuery = (searchObject) => {
    let queries = [];
    if (searchObject) {
        Object.keys(searchObject).forEach((key) => {
            queries = [...queries, `${key}=${searchObject[key]}`];
        });
        return queries.join("&");
    }
    return "";
};

export const extractColumn = (arr, column) => {
    function reduction(previousValue, currentValue) {
        previousValue.push(currentValue[column]);
        return previousValue;
    }

    return arr.reduce(reduction, []);
};

export function extractString(obj) {
    if (typeof obj === "string") return obj;
    else if (React.isValidElement(obj)) {
        return extractString(obj.props.children);
    } else if (Array.isArray(obj)) {
        return obj.map((e) => extractString(e)).join(" ");
    } else if (!obj) return 0;
    else return obj.toString();
}
