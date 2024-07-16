import React, { useState } from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import { ChartData, PieChart } from "../../components/ui/ChartData";
import { isMultiYear } from "../../services/defaultSettings";
import CenterIcon from "../../components/ui/CenterIcon";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

// default date on 14 day
const end = new Date();
const minusDay = 13;
const start = new Date(end.getTime() - minusDay * 24 * 60 * 60 * 1000);

const AdminAnalytics = () => {
  const [dateRange, setDateRange] = useState([end, new Date(start)]);

  return (
    <AdminContainer>
      <div className="w-full flex-center-both space-x-2 space-x-reverse pb-5">
        <CenterIcon
          icon={"arcticons:questionnaire-star"}
          className="font-big text-cyan-500"
        />
        <div className="font-w-bold font-h1 flex">
          <div className={`react-select__outer-container relative`}>
            <Flatpickr
              value={dateRange}
              id="range-picker"
              className="px-2 py-4 border-b-[1px] border-b-[#6b7280] outline-none text-end"
              style={{ direction: "ltr" }}
              onChange={(date) => {
                if (date.length > 1) setDateRange([date[1], date[0]]);
              }}
              options={{
                mode: "range",
              }}
            />
          </div>
          {/* <span className="text-blue-400 mr-2">Statistic</span> */}
        </div>
        <CenterIcon
          icon={"arcticons:questionnaire-star"}
          className="font-big text-cyan-500"
        />
      </div>
      <ChartData dateRange={dateRange} />
      {isMultiYear ? <PieChart dateRange={dateRange} /> : ""}
    </AdminContainer>
  );
};

export default AdminAnalytics;
