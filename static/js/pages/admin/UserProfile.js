import React, { useEffect, useState } from "react";
import auth from "../../services/authServices";
import http from "../../services/httpServices";
import ShowUser from "./UserProfileTables/ShowUser";
import AdminContainer from "../../components/ui/AdminContainer";
import { useNavigate, useParams, Link } from "react-router-dom";
import modal from "../../services/modalServices";
import FlexRowReverse from "../../components/ui/FlexRowReverse";
import LoadingIcon from "../../components/ui/LoadingIcon";
import SideTitle from "../../components/ui/SideTitle";
import UserSubscriptionsTable from "./UserProfileTables/UserSubscriptionsTable";
import UserInvoicesTable from "./UserProfileTables/UserInvoicesTable";
import ChangeUserPasswordForm from "./ChangeUserPasswordForm";
import LoggingTokensTable from "./UserProfileTables/LoggingTokensTable";
import Button from "../../components/ui/Button";
import UserVideoViewTable from "./UserProfileTables/UserVideoViewTable";
import UserExamResultsTable from "./UserProfileTables/UserExamResultsTable";
import UserHmResultsTable from "./UserProfileTables/UserHmResultsTable";
import UserVideoQuizesResultsTable from "./UserProfileTables/UserVideoQuizesResultsTable";
import CenterIcon from "../../components/ui/CenterIcon";
import { isLoginTokens } from "../../services/defaultSettings";

const UserProfile = () => {
    const [user, setUser] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [deleteButtonLoading, setDeleteButtonIsLoading] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    const getUser = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);
        try {
            let { data: response } = await http.post(`/api/users/search`, { id }, config);

            setUser(response);
            setIsLoading(false);
        } catch ({ response }) {
            modal.message({
                text: "لم يتم العثور علي المستخدم",
                title: "لم يتم العثور علي المستخدم",
                icon: "error",
                callback: () => navigate("../"),
            });
        }
    };
    const deleteUser = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);
        try {
            // eslint-disable-next-line no-unused-vars
            let { data: response } = await http.delete(`/api/users/${id}`, config);
            modal.message({
                text: "تم حذف الطالب بنجاح",
                callback: () => {
                    navigate("../");
                },
            });
            setDeleteButtonIsLoading(false);
        } catch ({ response }) {
            modal.message({
                text: "لم يتم العثور علي المستخدم",
                title: "لم يتم العثور علي المستخدم",
                icon: "error",
            });
            setDeleteButtonIsLoading(false);
        }
    };
    const handleDelete = () => {
        setDeleteButtonIsLoading(false);
        modal.message({
            title: "رسالة تأكيد",
            text: "هل انت متأكد من حذف الطالب نهائيًا من الموقع؟ لا يمكنك استراجع بياناته",
            icon: "warning",
            buttons: {
                cancel: "إالغاء",
                confirm: "تأكيد الحذف",
            },
            callback: (e) => {
                if (e && e !== "cancel") {
                    deleteUser();
                } else {
                    setDeleteButtonIsLoading(false);
                }
            },
        });
        // const token = auth.getAdminToken();
        // const config = auth.getAdminAuthConfig(token);
        // try {
        //     let { data: response } = await http.post(`/api/users/search`, { id }, config);

        //     setUser(response);
        //     setIsLoading(false);
        // } catch ({ response }) {
        //     modal.message({
        //         text: "لم يتم العثور علي المستخدم",
        //         title: "لم يتم العثور علي المستخدم",
        //         icon: "error",
        //         callback: () => navigate("../"),
        //     });
        // }
    };
    useEffect(() => {
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AdminContainer>
            {isLoading ? (
                <>
                    <FlexRowReverse className="font-w-bold font-h1 py-10">
                        <span className="flex-center-both font-big text-blue-500">
                            <LoadingIcon />
                        </span>
                        <span>يتم الآن تحميل بيانات الطالب ...</span>
                    </FlexRowReverse>
                </>
            ) : (
                <>
                    <div className="w-full space-y-6">
                        <div className="w-full justify-start flex">
                            <Link
                                to="../"
                                className="underline flex space-x-3 space-x-reverse bg-yellow-500 px-5 py-2 rounded-md hover-shadow smooth clr-white"
                            >
                                <CenterIcon
                                    icon={"akar-icons:arrow-right-thick"}
                                    className="font-h3"
                                />
                                <span>العودة للخلف و البحث عن رقم آخر</span>
                            </Link>
                        </div>
                        <div className="flex-center-both font-h1 flex-col space-y-2 pb-5">
                            <div className="text-blue-500 font-w-bold font-smaller">
                                تم العثور علي الطالب
                            </div>
                            <div className="underline">0{user.phone}</div>
                        </div>
                        <div className="">
                            <ChangeUserPasswordForm user={user} afterSuccess={getUser} />
                        </div>
                        {isLoginTokens ? (
                            <div>
                                <div className="pb-3 pt-10">
                                    <SideTitle
                                        className="font-h1"
                                        first="سجل تسجيل"
                                        last={"الدخول"}
                                    />
                                </div>
                                <LoggingTokensTable user={user} />
                            </div>
                        ) : (
                            ""
                        )}
                        <div>
                            <div className="pb-3 pt-10">
                                <SideTitle className="font-h1" first="بيانات" last={"الطالب"} />
                            </div>
                            <div className="flex-center-both">
                                <Button
                                    color="rose"
                                    isLoading={deleteButtonLoading}
                                    onClick={handleDelete}
                                    className="px-20 py-2"
                                >
                                    حذف الطالب !
                                </Button>
                            </div>
                            <ShowUser user={[user]} />
                        </div>
                        <div className="h-1 bg-secondary-container smooth w-full max-w-lg mx-auto my-10 rounded-md"></div>
                        <div>
                            <div className="pb-3 pt-10">
                                <SideTitle className="font-h1" first="اشتراكات" last={"الطالب"} />
                            </div>
                            <UserSubscriptionsTable user={user} />
                        </div>

                        <div>
                            <div className="pb-3 pt-10">
                                <SideTitle className="font-h1" first="فواتير" last={"الطالب"} />
                            </div>
                            <UserInvoicesTable user={user} />
                        </div>
                        <div>
                            <div className="pb-3 pt-10">
                                <SideTitle className="font-h1" first="مشاهدات" last={"الفيديو"} />
                            </div>
                            <UserVideoViewTable user={user} />
                        </div>
                        <div>
                            <div className="pb-3 pt-10">
                                <SideTitle className="font-h1" first="نتائج" last={"الامتحانات"} />
                            </div>
                            <UserExamResultsTable user={user} />
                        </div>
                        <div>
                            <div className="pb-3 pt-10">
                                <SideTitle className="font-h1" first="نتائج" last={"الواجب"} />
                            </div>
                            <UserHmResultsTable user={user} />
                        </div>
                        {/* <div>
                            <div className="pb-3 pt-10">
                                <SideTitle
                                    className="font-h1"
                                    first="نتائج"
                                    last={"كويز الفيديو"}
                                />
                            </div>
                            <UserVideoQuizesResultsTable user={user} />
                        </div> */}
                    </div>
                </>
            )}
        </AdminContainer>
    );
};

export default UserProfile;
