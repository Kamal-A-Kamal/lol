import { createContext, useEffect, useState } from "react";
import auth from "../services/authServices";
import { enableAutoLogin, isAnalytics, isWalletEnabled } from "../services/defaultSettings";
import http from "../services/httpServices";
import { toast } from "react-toastify";
import a from "../services/analyticsServices";
import { v4 as uuid } from "uuid";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});

    const [accountRequest, setAccountRequest] = useState(null);

    const [isFreeTrial, setIsFreeTrial] = useState(false);
    const [isFreeTrialDone, setIsFreeTrialDone] = useState(false);
    const [freeTrialTimeLeft, setFreeTrialTimeLeft] = useState(0);
    const [isFreeTrialMenuClosed, setIsFreeTrialMenuClosed] = useState(false);

    const [isCheckedInvalidName, setIsCheckedInvalidName] = useState(false);
    const [isValidName, setIsValidName] = useState(false);

    const [isCheckedUnSyncedAccount, setIsCheckedUnSyncedAccount] = useState(false);
    const [isSyncedAccount, setIsSyncedAccount] = useState(false);

    const [isPrepaidChecked, setIsPrepaidChecked] = useState(false);

    const [admin, setAdmin] = useState({});
    const [teacher, setTeacher] = useState({});

    const [prepaidCourses, setPrepaidCourses] = useState(0);

    const [adminToken, setAdminToken] = useState("");
    const [teacherToken, setTeacherToken] = useState("");

    const [loginAttemp, setLoginAttemp] = useState(false);

    const [uid, setUid] = useState(null);
    const [visitorId, setVisitorId] = useState(0);
    const [visitorVisitId, setVisitorVisitId] = useState(0);

    const [currentBalance, setCurrentBalance] = useState(0);

    const getAndStoreUID = () => {
        const generatedUid = uuid();
        a.setUid(generatedUid);
        setUid(generatedUid);
    };
    const getAndStoreVistorId = async () => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        let params = Object.fromEntries(urlSearchParams.entries());

        const visitorData = {};
        visitorData.uid = uid;
        visitorData.fbclid = params.fbclid;
        visitorData.referrer = document.referrer;
        visitorData.full_url = window.location.href;
        visitorData.is_admin = auth.getAdminToken() ? 1 : 0;

        const token = auth.getToken();
        const config = auth.getAuthConfig(token);
        await http.get("/sanctum/csrf-cookie");
        const { data: response } = await http.post("api/ana/init", visitorData, config);
        const { visitor_id: responseVisitorId, visitor_visit_id: responseVisitorVisitId } =
            response;
        setVisitorId(responseVisitorId);
        a.setVisitor(responseVisitorId);
        setVisitorVisitId(responseVisitorVisitId);
        a.setVisitorVisit(responseVisitorVisitId);
    };
    const getAndStoreVisitorVisitId = async () => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        let params = Object.fromEntries(urlSearchParams.entries());

        const visitorData = {};
        visitorData.fbclid = params.fbclid;
        visitorData.referrer = document.referrer;
        visitorData.full_url = window.location.href;
        visitorData.is_admin = auth.getAdminToken() ? 1 : 0;

        const token = auth.getToken();
        const config = auth.getAuthConfig(token);
        await http.get("/sanctum/csrf-cookie");
        const { data: response } = await http.post(
            `api/ana/init/${visitorId}`,
            visitorData,
            config
        );
        const { visitor_visit_id: responseVisitorVisitId } = response;
        setVisitorVisitId(responseVisitorVisitId);
        // console.log(responseVisitorVisitId);
        a.setVisitorVisit(responseVisitorVisitId);
    };
    useEffect(() => {
        if (isAnalytics) {
            if (!uid) {
                let localStorageUid = a.getUid();
                if (localStorageUid) {
                    setUid(localStorageUid);
                } else {
                    getAndStoreUID();
                }
            } else {
                if (!visitorId) {
                    let localStorageVisitorId = a.getVisitor();
                    if (localStorageVisitorId) {
                        setVisitorId(localStorageVisitorId);
                    } else {
                        getAndStoreVistorId();
                    }
                } else {
                    if (!visitorVisitId) {
                        getAndStoreVisitorVisitId();
                    }
                }
            }
        }
    }, [uid, visitorId, visitorVisitId]);
    const [allowedPages, setAllowedPages] = useState(null);

    useEffect(() => {
        let authUser = auth.getUser();
        setUser(authUser ? authUser : {});
        setAdmin(auth.getAdmin());
        setTeacher(auth.getTeacher());
    }, []);

    useEffect(() => {
        setIsPrepaidChecked(false);
        setToken(auth.getToken());
        if (user.full_name) {
            if (user.full_name.includes("random")) {
                setIsCheckedInvalidName(true);
                setIsValidName(false);
            } else {
                setIsCheckedInvalidName(false);
            }
            if (
                user.creation_method === "insert_auto" &&
                user.insert_auto_type === "center_to_migrate"
            ) {
                setIsCheckedUnSyncedAccount(false);
                setIsSyncedAccount(false);
            } else {
                setIsCheckedInvalidName(false);
            }
        } else {
            // auth.logout();
            // setUser({});
            setIsValidName(false);
            setIsCheckedInvalidName(false);
            setIsSyncedAccount(false);
            setIsCheckedUnSyncedAccount(false);
        }
        if (!auth.getToken()) {
            setIsFreeTrial(false);
            setIsFreeTrialDone(false);
            setFreeTrialTimeLeft(0);
        }
    }, [user, user.full_name]);

    // const location = useLocation();

    // const navigate = useNavigate();

    useEffect(() => {
        setAdminToken(auth.getAdminToken());
    }, [admin]);
    useEffect(() => {
        setTeacherToken(auth.getTeacherToken());
    }, [teacher]);

    const getCurrentBalance = async () => {
        const token = auth.getToken();
        const config = auth.getAuthConfig(token);
        await http.get("/sanctum/csrf-cookie");
        const { data: response } = await http.get(`api/wallet_records/get_current_balance`, config);
        setCurrentBalance(response);
    };

    useEffect(() => {
        if (isWalletEnabled && token) {
            getCurrentBalance();
        }
    }, [token]);

    // useEffect(() => {
    //     let { pathname } = location;
    //     if (pathname !== "/account_creation_status") {
    //         if (accountRequest) {
    //             navigate("/account_creation_status");
    //         }
    //     }
    // }, [accountRequest, location]);

    const loginUser = async (phone, password) => {
        try {
            const id = toast.loading("يتم الآن تسجيل دخولك");
            await http.get("/sanctum/csrf-cookie");
            phone = parseInt(phone);
            // console.log({ phone, password });
            const result = await http.post("api/auth/login", { phone, password });

            auth.authenticate(result.data.token, result.data.user);
            setUser({
                ...result.data.user,
            });
            toast.update(id, {
                render: "تم تسجيل دخولك بنجاح",
                type: "success",
                isLoading: false,
            });
            setTimeout(() => {
                window.location.href = "/course/6";
            }, 2000);
            // modal.message({
            //     title: "تم تسجيل الدخول بنجاح !",
            //     text: "اضغط حسنًا للإستمرار",
            //     callback: redirect,
            // });
        } catch ({ response }) {}
    };

    useEffect(() => {
        if (enableAutoLogin && !auth.getToken() && !loginAttemp) {
            setLoginAttemp(true);
            const urlSearchParams = new URLSearchParams(window.location.search);
            let params = Object.fromEntries(urlSearchParams.entries());

            if (params.credentials) {
                let { credentials } = params;
                credentials = credentials.split("~");
                if (credentials.length === 2) {
                    let phone = credentials[0];
                    let password = credentials[1];
                    phone = phone.substring(1);
                    password = password.substring(1);
                    loginUser(phone, password);
                }
            }
        }
    }, [loginAttemp]);

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                setUser,
                admin,
                adminToken,
                setAdmin,
                teacher,
                teacherToken,
                setTeacher,
                allowedPages,
                setAllowedPages,
                isFreeTrial,
                setIsFreeTrial,
                freeTrialTimeLeft,
                setFreeTrialTimeLeft,
                isFreeTrialDone,
                setIsFreeTrialDone,
                isFreeTrialMenuClosed,
                setIsFreeTrialMenuClosed,
                prepaidCourses,
                setPrepaidCourses,
                isPrepaidChecked,
                setIsPrepaidChecked,
                isCheckedInvalidName,
                setIsCheckedInvalidName,
                isValidName,
                setIsValidName,
                isCheckedUnSyncedAccount,
                setIsCheckedUnSyncedAccount,
                isSyncedAccount,
                setIsSyncedAccount,
                uid,
                setUid,
                visitorId,
                setVisitorId,
                visitorVisitId,
                setVisitorVisitId,
                accountRequest,
                setAccountRequest,
                currentBalance,
                getCurrentBalance,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
