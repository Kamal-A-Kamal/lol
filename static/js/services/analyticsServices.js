const uidTokenKey = "uvuid";
const visitorTokenKey = "visitor_token_id";
const visitorVisitTokenKey = "visitor_visit_token_id";

const getUid = () => {
    return localStorage.getItem(uidTokenKey);
};
const getVisitor = () => {
    return localStorage.getItem(visitorTokenKey);
};
const getVisitorVisit = () => {
    return localStorage.getItem(visitorVisitTokenKey);
};
const setUid = (value) => {
    return localStorage.setItem(uidTokenKey, value);
};
const setVisitor = (value) => {
    return localStorage.setItem(visitorTokenKey, value);
};
const setVisitorVisit = (value) => {
    return localStorage.setItem(visitorVisitTokenKey, value);
};
const removeUid = (value) => {
    return localStorage.removeItem(uidTokenKey, value);
};
const removeVisitor = (value) => {
    return localStorage.removeItem(visitorTokenKey, value);
};
const removeVisitorVisit = (value) => {
    return localStorage.removeItem(visitorVisitTokenKey, value);
};
const a = {
    getUid,
    getVisitor,
    getVisitorVisit,
    setUid,
    setVisitor,
    setVisitorVisit,
    removeUid,
    removeVisitor,
    removeVisitorVisit,
};
export default a;
