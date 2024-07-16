export let baseURL = "http://adel.test";

if (process.env.NODE_ENV === "production") {
    baseURL = "https://api.mr-ahmed-adel.com";
}

export const dateOptions = { weekday: "long", year: "numeric", month: "short", day: "numeric" };

export const config = {
    baseURL,
    dateOptions,
};
export default config;
