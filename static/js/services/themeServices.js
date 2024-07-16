const tokenKey = "darkmode";

const getDarkmode = () => {
    return localStorage.getItem(tokenKey) || false;
};

const setDarkmode = (darkmode) => {
    if (darkmode) {
        localStorage.setItem(tokenKey, true);
        document.body.classList.add("darkmode");
        document.body.classList.add("dark");
    } else {
        localStorage.removeItem(tokenKey);
        document.body.classList.remove("darkmode");
        document.body.classList.remove("dark");
    }
};
const theme = {
    getDarkmode,
    setDarkmode,
};
export default theme;
