import React from "react";
import AdminContainer from "../../components/ui/AdminContainer";
// import { ChartData, PieChart } from "../../components/ui/ChartData";
import "chart.js/auto";
// import { isMultiYear } from "../../services/defaultSettings";
import UpdateReleaseList from "../../components/ui/UpdateReleaseList";
import CenterIcon from "../../components/ui/CenterIcon";

const AdminHome = () => {
    return (
        <AdminContainer>
            <div className="w-full flex-center-both space-x-2 space-x-reverse pb-5">
                <CenterIcon
                    icon={"arcticons:questionnaire-star"}
                    className="font-big text-cyan-500"
                />
                <div className="font-w-bold font-h1">
                    آخر <span className="text-blue-400">التحديثات</span>
                </div>
                <CenterIcon
                    icon={"arcticons:questionnaire-star"}
                    className="font-big text-cyan-500"
                />
            </div>
            {/* <div className="flex-center-both"></div> */}
            <UpdateReleaseList rows={0} onlyRecent={true} />
            {/* <ChartData /> */}
            {/* {isMultiYear ? <PieChart /> : ""} */}
        </AdminContainer>
    );
};

export default AdminHome;
