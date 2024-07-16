const tokenKey = "loginToken";
const userKey = "user";

const adminTokenKey = "adminLoginToken";
const adminKey = "admin";

const teacherTokenKey = "teacherLoginToken";
const teacherKey = "teacher";

const prepaidSeenKey = "prepaidseen";

const getToken = () => {
    return localStorage.getItem(tokenKey);
};

const getAdminToken = () => {
    return localStorage.getItem(adminTokenKey);
};

const getTeacherToken = () => {
    return localStorage.getItem(teacherTokenKey);
};

const getUser = () => {
    try {
        const user = localStorage.getItem(userKey);
        return JSON.parse(user);
    } catch (error) {
        return null;
    }
};
const getAdmin = () => {
    try {
        const admin = localStorage.getItem(adminKey);
        return JSON.parse(admin);
    } catch (error) {
        return null;
    }
};

const getTeacher = () => {
    try {
        const teacher = localStorage.getItem(teacherKey);
        return JSON.parse(teacher);
    } catch (error) {
        return null;
    }
};

const authenticate = (token, user) => {
    user = JSON.stringify(user);
    localStorage.setItem(userKey, user);
    return localStorage.setItem(tokenKey, token);
};

const authenticateAdmin = (adminToken, admin) => {
    admin = JSON.stringify(admin);
    localStorage.setItem(adminKey, admin);
    return localStorage.setItem(adminTokenKey, adminToken);
};

const authenticateTeacher = (teacherToken, teacher) => {
    teacher = JSON.stringify(teacher);
    localStorage.setItem(teacherKey, teacher);
    return localStorage.setItem(teacherTokenKey, teacherToken);
};

const logout = () => {
    localStorage.removeItem(userKey);
    return localStorage.removeItem(tokenKey);
};

const adminLogout = () => {
    localStorage.removeItem(adminKey);
    return localStorage.removeItem(adminTokenKey);
};
const teacherLogout = () => {
    localStorage.removeItem(teacherKey);
    return localStorage.removeItem(teacherTokenKey);
};

const getAuthConfig = (token) => {
    return {
        headers: { Authorization: `Bearer ${token}` },
    };
};
const getAdminAuthConfig = (adminToken) => {
    return {
        headers: { Authorization: `Bearer ${adminToken}` },
    };
};

const getTeacherAuthConfig = (teacherToken) => {
    return {
        headers: { Authorization: `Bearer ${teacherToken}` },
    };
};

const isAuth = getToken() ? true : false;
const isAdmin = getAdminToken() ? true : false;
const isTeacher = getTeacherToken() ? true : false;

const setPrepaidCoursesStoreSeen = (value) => {
    if (value === true) {
        return localStorage.setItem(prepaidSeenKey, value);
    } else {
        return localStorage.removeItem(prepaidSeenKey);
    }
};
const getIsPrepaidCoursesStoreSeen = () => {
    return localStorage.getItem(prepaidSeenKey);
};

const auth = {
    getToken,
    authenticate,
    logout,
    isAuth,
    getUser,
    getAuthConfig,
    getAdminToken,
    authenticateAdmin,
    adminLogout,
    isAdmin,
    getAdmin,
    getAdminAuthConfig,
    getTeacherToken,
    authenticateTeacher,
    teacherLogout,
    isTeacher,
    getTeacher,
    getTeacherAuthConfig,
    setPrepaidCoursesStoreSeen,
    getIsPrepaidCoursesStoreSeen,
};
export default auth;
