import React from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import "chart.js/auto";

import { PieChart, TeacherChart } from "../../components/ui/TeacherChart";

const TeacherAdminHome = () => {
    return (
        <AdminContainer>
            <div className="flex-center-both w-full">
                <div className="w-full space-y-20">
                    <TeacherChart isTeacherSubAdmin={true} />
                    <PieChart isTeacherSubAdmin={true} />
                </div>
            </div>
        </AdminContainer>
    );
};

export default TeacherAdminHome;
