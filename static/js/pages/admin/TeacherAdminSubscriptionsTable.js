import React from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import TeacherSubscriptionsTable from "./TeacherSubscriptionsTable";

const TeacherAdminSubscriptionsTable = () => {
    return (
        <AdminContainer>
            <TeacherSubscriptionsTable isTeacherAdmin={true} />
        </AdminContainer>
    );
};

export default TeacherAdminSubscriptionsTable;
