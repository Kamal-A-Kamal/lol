import React from "react";
import TeacherInvoicesTable from "./TeacherInvoicesTable";
import AdminContainer from "../../components/ui/AdminContainer";

const TeacherAdminInvoicesTable = () => {
    return (
        <AdminContainer>
            <TeacherInvoicesTable isTeacherAdmin={true} />
        </AdminContainer>
    );
};

export default TeacherAdminInvoicesTable;
