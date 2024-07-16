export const setTitle = (title) => {
    document.title = title;
};
export const getCurrentTitle = () => document.title;

export const page = {
    setTitle,
    getCurrentTitle,
};
export default page;
