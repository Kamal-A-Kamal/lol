export const getYearPlaceHolder = (year) => {
    const yearsPlaceHolders = {
        1: "الصف الأول الثانوي",
        2: "الصف الثاني الثانوي",
        3: "الصف الثالث الثانوي",
        4: "كورسات المحاضرات",
    };
    return yearsPlaceHolders[year];
};
export const years = [
    { value: "1", text: getYearPlaceHolder(1) },
    { value: "2", text: getYearPlaceHolder(2) },
    { value: "3", text: getYearPlaceHolder(3) },
    { value: "4", text: getYearPlaceHolder(4) },
];
