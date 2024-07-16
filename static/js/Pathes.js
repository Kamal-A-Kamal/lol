import React from "react";
// import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation, Navigate, Outlet } from "react-router-dom";

import { CourseProvider } from "./context/CourseContext";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import Course from "./pages/Course";
import SubscriptionPreviousInvoices from "./pages/course/SubscriptionPreviousInvoices";
import SubscriptionInvoice from "./pages/course/SubscriptionInvoice";
import CourseHome from "./pages/course/CourseHome";

//ui
// import AnimatingPage from "./middleware/AnimatingPage";

//middlewares
import ProtectedRoute from "./middleware/ProtectedRoute";
import OnlyGuestRoute from "./middleware/OnlyGuestRoute";
import User from "./pages/User";
import UserHome from "./pages/user/UserHome";
import UserCourses from "./pages/user/UserCourses";
import Year from "./pages/Year";
// import { UserProvider } from "./context/UserContext";
import AdminLogin from "./pages/AdminLogin";
import AdminLogout from "./pages/AdminLogout";
import NotAdmin from "./middleware/NotAdmin";
import OnlyAdmin from "./middleware/OnlyAdmin";
import AdminPanel from "./pages/AdminPanel";
import ManualSubscription from "./pages/admin/ManualSubscription";
import {
    adminPath,
    isAccountCreationRequest,
    isManualPayment,
    isOnlySubscribeFromWallet,
    isSubscribeBySubjectTeacher,
    teachersubadminPath,
} from "./services/defaultSettings";
import PaymentInfoPage from "./pages/course/PaymentInfoPage";
import CourseEditing from "./pages/admin/CourseEditing";
import SelectCourseForm from "./pages/admin/SelectCourseForm";
import CourseSectionEditing from "./pages/admin/CourseSectionEditing";
import ManualPaymentInfo from "./pages/admin/ManualPaymentInfo";
import VideoEditing from "./pages/admin/VideoEditing";
import Video from "./pages/course/Video";
import BookEditing from "./pages/admin/BookEditing";
import Book from "./pages/course/Book";
import ManualUnsubscription from "./pages/admin/ManualUnsubscription";
import Division from "./pages/admin/Division";
import UserProfile from "./pages/admin/UserProfile";
import UserProfileForm from "./pages/admin/UserProfileForm";
import UsersTable from "./pages/admin/UsersTable";
import CoursesTable from "./pages/admin/CoursesTable";
import SubscriptionsTable from "./pages/admin/SubscriptionsTable";
import InvoicesTable from "./pages/admin/InvoicesTable";
import VideosTable from "./pages/admin/VideosTable";
import InsertAuto from "./pages/admin/InsertAuto";
import InsertAutos from "./pages/admin/InsertAutos";
import ExamEditing from "./pages/admin/ExamEditing";
import PartitionEditing from "./pages/admin/PartitionEditing";
import QuestionEditing from "./pages/admin/QuestionEditing";
import Exam from "./pages/course/Exam";
import { ExamProvider } from "./context/ExamContext";
import Question from "./pages/course/exam/Question";
import ExamHome from "./pages/course/exam/ExamHome";
import ExamResult from "./pages/user/ExamResult";
import LoginData from "./pages/user/LoginData";
import LoginTokensTable from "./pages/admin/LoginTokensTable";
import LogoutTokensTable from "./pages/admin/LogoutTokensTable";
import AddUser from "./pages/admin/AddUser";
import Invoices from "./pages/user/Invoices";
import Subscriptions from "./pages/user/Subscriptions";
import VideoQuizResults from "./pages/user/VideoQuizResults";
import HmResults from "./pages/user/HmResults";
import ExamResults from "./pages/user/ExamResults";
import VideoViews from "./pages/user/VideoViews";
import QuestionInsertAuto from "./pages/admin/QuestionInsertAuto";
import ExamResultsTable from "./pages/admin/ExamResultsTable";
import HmResultsTable from "./pages/admin/HmResultsTable";
import AdminHome from "./pages/admin/AdminHome";
import DivisionsTable from "./pages/admin/DivisionsTable";
import ExamsTable from "./pages/admin/ExamsTable";
import PartitionsTable from "./pages/admin/PartitionsTable";
import QuestionsTable from "./pages/admin/QuestionsTable";
import SectionEditing from "./pages/admin/SectionEditing";
import CourseSectionsDuplicating from "./pages/admin/CourseSectionsDuplicating";
import PrepaidStore from "./pages/PrepaidStore";
import PrepaidCourseEditing from "./pages/admin/PrepaidCourseEditing";
import EditMyName from "./pages/EditMyName";
import CouponEditing from "./pages/admin/CouponEditing";
import CouponsTable from "./pages/admin/CouponsTable";
import UpdatesReleases from "./pages/admin/UpdatesReleases";
import ManageAdmins from "./pages/admin/ManageAdmins";
import CategoryEditing from "./pages/admin/CategoryEditing";
import ChangePassword from "./pages/user/ChangePassword";
import { SubjectProvider } from "./context/SubjectContext";
import Subject from "./pages/Subject";
import SubjectHome from "./pages/course/SubjectHome";
import SubjectSubscriptionPreviousInvoices from "./pages/course/SubjectSubscriptionPreviousInvoices";
import SubjectSubscriptionInvoice from "./pages/course/SubjectSubscriptionInvoice";
import DepartmentEditing from "./pages/admin/DepartmentEditing";
import SubjectEditing from "./pages/admin/SubjectEditing";
import TeacherEditing from "./pages/admin/TeacherEditing";
import { TeacherProvider } from "./context/TeacherContext";
import Teacher from "./pages/Teacher";
import TeacherHome from "./pages/course/TeacherHome";
import { SubjectTeacherProvider } from "./context/SubjectTeacherContext";
import SubjectTeacher from "./pages/SubjectTeacher";
import SubjectTeacherHome from "./pages/course/SubjectTeacherHome";
import SubjectTeacherSubscriptionPreviousInvoices from "./pages/course/SubjectTeacherSubscriptionPreviousInvoices";
import SubjectTeacherSubscriptionInvoice from "./pages/course/SubjectTeacherSubscriptionInvoice";
import UserSubjectTeacher from "./pages/user/UserSubjectTeacher";
import AccountCreationRequest from "./pages/AccountCreationRequest";
import AccountCreationRequestsTable from "./pages/admin/AccountCreationRequestsTable";
import AccountCreationStatus from "./pages/AccountCreationStatus";
import NotTeacher from "./middleware/NotTeacher";
import OnlyTeacher from "./middleware/OnlyTeacher";
import TeacherLogin from "./pages/TeacherLogin";
import ExamStatisticsTable from "./pages/admin/ExamStatisticsTable";
import VideosStatisticsTable from "./pages/admin/VideosStatisticsTable";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import TeacherStatistic from "./pages/admin/TeacherStatistic";
import CenterLogin from "./pages/CenterLogin";
import UserWallet from "./pages/user/UserWallet";
import TeacherAdminPanel from "./pages/TeacherAdminPanel";
import TeacherAdminHome from "./pages/admin/TeacherAdminHome";
import TeacherAdminSubscriptionsTable from "./pages/admin/TeacherAdminSubscriptionsTable";
import TeacherAdminInvoicesTable from "./pages/admin/TeacherAdminInvoicesTable";
import TeacherLogout from "./pages/TeacherLogout";
import CenterUsersTable from "./pages/admin/CenterUsersTable";
import AdminUsersTable from "./pages/admin/AdminUsersTable";
import DivideAdminUsers from "./pages/admin/DivideAdminUsers";
import SubscribeFromWallet from "./pages/course/SubscribeFromWallet";
import SubjectTeacherSubscribeFromWallet from "./pages/course/SubjectTeacherSubscribeFromWallet";
import MigrateFromInsertAuto from "./pages/user/MigrateFromInsertAuto";
import EditMyPhone from "./pages/EditMyPhone";
import CommunityCategoryEditing from "./pages/admin/CommunityCategoryEditing";
import { CommunityProvider } from "./context/CommunityContext";
import CommunityHome from "./pages/CommunityHome";
import CommunityCategories from "./pages/CommunityCategories";
import CommunityCategory from "./pages/CommunityCategory";
import CommunityCategoriesTable from "./pages/admin/CommunityCategoriesTable";
import ChargeInsertAuto from "./pages/user/ChargeInsertAuto";
import GlobalNotificationsEditing from "./pages/admin/GlobalNotificationsEditing";
import ManualWalletCharge from "./pages/admin/ManualWalletCharge";

const Pathes = () => {
    const location = useLocation();

    let routeKey = location.pathname.split("/");
    routeKey = routeKey[0] + "/" + routeKey[1] + "/" + routeKey[2];

    return (
        <>
            <Routes location={location} key={routeKey}>
                <Route path="/" exact element={<Home />} />
                <Route path="/home" exact element={<Home />} />
                <Route path="/years/:id" exact element={<Year />} />
                <Route
                    path="/prepaid_store"
                    exact
                    element={
                        <ProtectedRoute>
                            <PrepaidStore />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/edit_my_name"
                    exact
                    element={
                        <ProtectedRoute>
                            <EditMyName />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/edit_my_phone"
                    exact
                    element={
                        <ProtectedRoute>
                            <EditMyPhone />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/me/user/"
                    exact
                    element={
                        <ProtectedRoute>
                            <User />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<UserHome />} />
                    <Route path="home/" element={<UserHome />} />
                    <Route path="charge_insert_auto" element={<ChargeInsertAuto />} />
                    <Route path="migrate_from_insert_auto" element={<MigrateFromInsertAuto />} />
                    <Route path="subject_teacher" element={<UserSubjectTeacher />} />
                    <Route path="wallet" element={<UserWallet />} />
                    <Route path="courses" element={<UserCourses renamed={"not_renamed"} />} />
                    <Route path="change_password" element={<ChangePassword />} />
                    <Route
                        path="monthly_courses"
                        element={
                            <UserCourses
                                renamed={"only_renamed"}
                                noCoursesPlaceholder="انت غير مشترك بأي مادة حتى الآن!"
                            />
                        }
                    />
                    <Route path="login_data" element={<LoginData />} />
                    <Route path="video_views" element={<VideoViews />} />
                    <Route path="invoices" element={<Invoices />} />
                    <Route path="subscriptions" element={<Subscriptions />} />
                    <Route path="exam_results" element={<ExamResults />} />
                    <Route path="hm_results" element={<HmResults />} />
                    <Route path="video_quizes" element={<VideoQuizResults />} />
                    <Route path="exam_results/:exam_result_id" element={<ExamResult />} />
                    {/* <Route path="notifications" element={<VideoViews />} /> */}
                    <Route path="notifications" element={<Navigate replace to="../" />} />
                </Route>

                <Route
                    path="/login"
                    exact
                    element={
                        <OnlyGuestRoute>
                            <Login />
                        </OnlyGuestRoute>
                    }
                />

                <Route
                    path="/register"
                    exact
                    element={
                        <OnlyGuestRoute>
                            {isAccountCreationRequest ? <AccountCreationRequest /> : <Register />}
                        </OnlyGuestRoute>
                    }
                />
                <Route path="/login-center" exact element={<Navigate replace to="/login" />} />
                <Route path="/signup-center" exact element={<CenterLogin />} />
                {isAccountCreationRequest ? (
                    <Route
                        path="/account_creation_status"
                        exact
                        element={
                            <OnlyGuestRoute>
                                <AccountCreationStatus />
                            </OnlyGuestRoute>
                        }
                    />
                ) : (
                    ""
                )}
                <Route
                    path="/logout"
                    exact
                    element={
                        <ProtectedRoute>
                            <Logout />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/community"
                    exact
                    element={
                        <ProtectedRoute>
                            <CommunityProvider>
                                <CommunityHome />
                            </CommunityProvider>
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<CommunityCategories />} />
                    <Route path="home" element={<CommunityCategories />} />
                    <Route path="category/:community_category_id" element={<CommunityCategory />} />
                    <Route path="*" element={<Navigate replace to="/community" />} />
                </Route>

                <Route
                    path="/course/:id"
                    element={
                        <CourseProvider>
                            <Course />
                        </CourseProvider>
                    }
                >
                    <Route index element={<CourseHome />} />
                    <Route path="home" element={<CourseHome />} />
                    <Route
                        path="sections/:section_id"
                        element={
                            <ProtectedRoute>
                                <Outlet />
                            </ProtectedRoute>
                        }
                    >
                        <Route
                            path="video/:video_id"
                            element={
                                <ProtectedRoute>
                                    <Video key={location.pathname} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="book/:book_id"
                            element={
                                <ProtectedRoute>
                                    <Book key={location.pathname} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="exam/:exam_id"
                            element={
                                <ProtectedRoute>
                                    <ExamProvider>
                                        <Exam />
                                    </ExamProvider>
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<ExamHome />} />
                            <Route path="questions/:question_id" element={<Question />} />
                            <Route path="questions" element={<Navigate replace to="" />} />
                            <Route path="*" element={<Navigate replace to="" />} />
                        </Route>
                    </Route>
                    <Route path="subscribe">
                        {isManualPayment ? (
                            <>
                                <Route index element={<PaymentInfoPage />} />
                                <Route path="*" element={<Navigate replace to="" />} />
                            </>
                        ) : isOnlySubscribeFromWallet ? (
                            <>
                                <Route
                                    path="subscribe_from_wallet"
                                    element={
                                        <ProtectedRoute>
                                            <SubscribeFromWallet />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    index
                                    element={<Navigate replace to="subscribe_from_wallet" />}
                                />
                                <Route
                                    path="*"
                                    element={<Navigate replace to="subscribe_from_wallet" />}
                                />
                            </>
                        ) : (
                            <>
                                <Route
                                    path="previous_invoices"
                                    element={
                                        <ProtectedRoute>
                                            <SubscriptionPreviousInvoices />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="invoice"
                                    element={
                                        <ProtectedRoute>
                                            <SubscriptionInvoice />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    index
                                    element={<Navigate replace to="previous_invoices" />}
                                />
                                <Route
                                    path="*"
                                    element={<Navigate replace to="previous_invoices" />}
                                />
                            </>
                        )}
                    </Route>
                </Route>
                <Route
                    path="/subject/:id"
                    element={
                        <>
                            <SubjectProvider>
                                <Subject />
                            </SubjectProvider>
                        </>
                    }
                >
                    <Route index element={<SubjectHome />} />
                    <Route path="home" element={<SubjectHome />} />
                </Route>
                <Route
                    path="/teacher/:id"
                    element={
                        <>
                            <TeacherProvider>
                                <Teacher />
                            </TeacherProvider>
                        </>
                    }
                >
                    <Route index element={<TeacherHome />} />
                    <Route path="home" element={<TeacherHome />} />
                </Route>

                {isSubscribeBySubjectTeacher ? (
                    <Route
                        path="/subject_teacher/teacher/:teacherId/subject/:subjectId"
                        element={
                            <>
                                <SubjectTeacherProvider>
                                    <SubjectTeacher />
                                </SubjectTeacherProvider>
                            </>
                        }
                    >
                        <Route index element={<SubjectTeacherHome />} />
                        <Route path="home" element={<SubjectTeacherHome />} />
                        <Route path="subscribe">
                            {isManualPayment ? (
                                <>
                                    <Route index element={<PaymentInfoPage />} />
                                    <Route path="*" element={<Navigate replace to="" />} />
                                </>
                            ) : isOnlySubscribeFromWallet ? (
                                <>
                                    <Route
                                        path="subscribe_from_wallet"
                                        element={
                                            <ProtectedRoute>
                                                <SubjectTeacherSubscribeFromWallet />
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        index
                                        element={<Navigate replace to="subscribe_from_wallet" />}
                                    />
                                    <Route
                                        path="*"
                                        element={<Navigate replace to="subscribe_from_wallet" />}
                                    />
                                </>
                            ) : (
                                <>
                                    <Route
                                        path="previous_invoices"
                                        element={
                                            <ProtectedRoute>
                                                <SubjectTeacherSubscriptionPreviousInvoices />
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        path="invoice"
                                        element={
                                            <ProtectedRoute>
                                                <SubjectTeacherSubscriptionInvoice />
                                            </ProtectedRoute>
                                        }
                                    />
                                    <Route
                                        index
                                        element={<Navigate replace to="previous_invoices" />}
                                    />
                                    <Route
                                        path="*"
                                        element={<Navigate replace to="previous_invoices" />}
                                    />
                                </>
                            )}
                        </Route>
                    </Route>
                ) : (
                    ""
                )}
                <Route path={teachersubadminPath}>
                    <Route
                        path="login"
                        exact
                        element={
                            <NotTeacher>
                                <TeacherLogin />
                            </NotTeacher>
                        }
                    />

                    <Route
                        path="panel"
                        element={
                            <OnlyTeacher>
                                <TeacherAdminPanel />
                            </OnlyTeacher>
                        }
                    >
                        {/* <Route index exact element={<ManualSubscription />} /> */}
                        <Route path="home" exact element={<TeacherAdminHome />} />
                        <Route
                            path="subscriptions"
                            exact
                            element={<TeacherAdminSubscriptionsTable />}
                        />
                        <Route path="invoices" exact element={<TeacherAdminInvoicesTable />} />
                        <Route path="logout" exact element={<TeacherLogout />} />
                        <Route path="*" element={<Navigate replace to="home" />} />
                    </Route>
                    <Route index element={<Navigate replace to="login" />} />
                    <Route path="*" element={<Navigate replace to="login" />} />
                </Route>
                <Route path={adminPath}>
                    <Route
                        path="login"
                        exact
                        element={
                            <NotAdmin>
                                <AdminLogin />
                            </NotAdmin>
                        }
                    />

                    <Route
                        path="panel"
                        element={
                            <OnlyAdmin>
                                <AdminPanel />
                            </OnlyAdmin>
                        }
                    >
                        <Route index exact element={<ManualSubscription />} />
                        <Route path="home" exact element={<AdminHome />} />
                        <Route path="analytics" exact element={<AdminAnalytics />} />
                        <Route path="updates" exact element={<UpdatesReleases />} />
                        <Route path="login_tokens" exact element={<LoginTokensTable />} />
                        <Route path="logout_tokens" exact element={<LogoutTokensTable />} />
                        <Route path="categories" exact element={<CategoryEditing />} />
                        <Route
                            path="community_category_editing"
                            exact
                            element={<CommunityCategoryEditing />}
                        />
                        <Route path="department" exact element={<DepartmentEditing />} />
                        <Route path="subject" exact element={<SubjectEditing />} />
                        <Route path="teacher_statistics" exact element={<TeacherStatistic />} />
                        <Route path="teacher" exact element={<TeacherEditing />} />
                        <Route
                            path="global_notification"
                            exact
                            element={<GlobalNotificationsEditing />}
                        />
                        <Route path="course" exact element={<CourseEditing />} />
                        <Route path="coupon" exact element={<CouponEditing />} />
                        <Route path="section" exact element={<SectionEditing />} />
                        <Route path="course_sections_editing_page">
                            <Route index exact element={<SelectCourseForm />} />
                            <Route path=":courseId" element={<CourseSectionEditing />} />
                        </Route>
                        <Route
                            path="course_sections_duplicating"
                            exact
                            element={<CourseSectionsDuplicating />}
                        />
                        <Route path="division" exact element={<Division />} />
                        <Route path="video" exact element={<VideoEditing />} />
                        <Route path="book" exact element={<BookEditing />} />
                        <Route path="exam" exact element={<ExamEditing />} />
                        <Route path="partition" exact element={<PartitionEditing />} />
                        <Route path="question" exact element={<QuestionEditing />} />
                        <Route path="question_insert_auto" exact element={<QuestionInsertAuto />} />
                        <Route path="manual_payment_info" exact element={<ManualPaymentInfo />} />
                        <Route path="insert_auto" exact element={<InsertAuto />} />
                        <Route path="insert_autos" exact element={<InsertAutos />} />

                        <Route
                            path="user_prepaid_courses"
                            exact
                            element={<PrepaidCourseEditing />}
                        />
                        <Route path="manual_charge_wallet" exact element={<ManualWalletCharge />} />

                        <Route path="manual_subscription" exact element={<ManualSubscription />} />
                        <Route path="unsubscribe" exact element={<ManualUnsubscription />} />
                        <Route path="user_profile">
                            <Route index exact element={<UserProfileForm />} />
                            <Route path=":id" exact element={<UserProfile />} />
                            <Route
                                path="exam_results/:exam_result_id"
                                element={<ExamResult isAdmin={true} />}
                            />
                        </Route>
                        <Route path="add_user" exact element={<AddUser />} />
                        <Route
                            path="account_requests"
                            exact
                            element={<AccountCreationRequestsTable />}
                        />
                        <Route
                            path="community_categories"
                            exact
                            element={<CommunityCategoriesTable />}
                        />
                        <Route path="center_users" exact element={<CenterUsersTable />} />
                        <Route path="divide_admin_users" exact element={<DivideAdminUsers />} />
                        <Route path="admin_users" exact element={<AdminUsersTable />} />
                        <Route path="users" exact element={<UsersTable />} />
                        <Route path="divisions" exact element={<DivisionsTable />} />
                        <Route path="coupons" exact element={<CouponsTable />} />
                        <Route path="courses" exact element={<CoursesTable />} />
                        <Route path="videos" exact element={<VideosTable />} />
                        <Route path="exams" exact element={<ExamsTable />} />
                        <Route path="partitions" exact element={<PartitionsTable />} />
                        <Route path="questions" exact element={<QuestionsTable />} />
                        <Route path="video_statistics" exact element={<VideosStatisticsTable />} />
                        <Route path="exam_statistics" exact element={<ExamStatisticsTable />} />
                        <Route path="exam_results" exact element={<ExamResultsTable />} />
                        <Route path="hm_results" exact element={<HmResultsTable />} />
                        <Route path="subscriptions" exact element={<SubscriptionsTable />} />
                        <Route path="invoices" exact element={<InvoicesTable />} />

                        <Route path="admins" exact element={<ManageAdmins />} />
                        <Route path="logout" exact element={<AdminLogout />} />
                        <Route path="*" element={<Navigate replace to="home" />} />
                    </Route>
                    <Route index element={<Navigate replace to="login" />} />
                    <Route path="*" element={<Navigate replace to="login" />} />
                </Route>
                <Route path="404-not-found" element={<NotFound />} />
                <Route path="/index.php" element={<Navigate replace to="/home" />} />
                <Route path="/register.php" element={<Navigate replace to="/register" />} />
                <Route path="/login.php" element={<Navigate replace to="/login" />} />
                <Route path="/courses.php" element={<Navigate replace to="/home" />} />
                <Route path="*" element={<Navigate replace to="/404-not-found" />} />
            </Routes>
        </>
        // </AnimatePresence>
    );
};

export default Pathes;
