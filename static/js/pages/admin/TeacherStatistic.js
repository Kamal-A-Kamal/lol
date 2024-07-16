import React, { useEffect, useState } from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import "chart.js/auto";
import CenterIcon from "../../components/ui/CenterIcon";
import { PieChart, TeacherChart } from "../../components/ui/TeacherChart";
import Select from "react-select";
import http from "../../services/httpServices";
import auth from "../../services/authServices";
import TeacherInvoicesTable from "./TeacherInvoicesTable";
import TeacherSubscriptionsTable from "./TeacherSubscriptionsTable";

const TeacherStatistic = () => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const fetchTeacher = async () => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);
        try {
            const { data: res } = await http.get("/api/admin/teachers/options", config);
            setTeachers(res.map((teacher) => ({ value: teacher.value, label: teacher.text })));
        } catch (error) {
            console.log("err : ", error);
        }
    };

    useEffect(() => {
        fetchTeacher();
    }, []);

    return (
        <AdminContainer>
            <div className="w-full flex-center-both space-x-2 space-x-reverse pb-5">
                <CenterIcon
                    icon={"arcticons:questionnaire-star"}
                    className="font-big text-cyan-500"
                />
                <div className="font-w-bold font-h1 flex">
                    <div className={`react-select__outer-container relative`}>
                        <Select
                            value={selectedTeacher}
                            options={teachers}
                            placeholder="اختر المدرس"
                            menuPortalTarget={document.body}
                            styles={{
                                menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 9999,
                                }),
                                option: (base) => ({
                                    ...base,
                                    // background: "var(--color-primary-container)",
                                    borderRadius: "5px",
                                    marginBottom: "3px",
                                    marginTop: "3px",
                                }),
                            }}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    neutral0: "var(--color-primary-container)",
                                    primary: "var(--color-text-primary)",
                                    primary25: "var(--color-secondary-container)",
                                    primary50: "var(--color-third-container)",
                                },
                            })}
                            onChange={(val) => setSelectedTeacher(val)}
                        />
                    </div>
                    {/* <span className="text-blue-400 mr-2">Statistic</span> */}
                </div>
                <CenterIcon
                    icon={"arcticons:questionnaire-star"}
                    className="font-big text-cyan-500"
                />
            </div>
            {/* <div className="flex-center-both"></div> */}
            {selectedTeacher ? (
                <>
                    <div className="w-full flex-center-both flex-col space-y-10 py-10">
                        <TeacherChart teacherId={selectedTeacher.value} />
                        <PieChart teacherId={selectedTeacher.value} />
                        <div className="font-h1 font-w-bold underline">
                            الفواتير الخاصة بالمدرس !
                        </div>
                        <TeacherInvoicesTable teacherId={selectedTeacher.value} />
                        <div className="font-h1 font-w-bold underline">
                            الإشتراكات الخاصة بالمدرس !
                        </div>
                        <TeacherSubscriptionsTable teacherId={selectedTeacher.value} />
                    </div>
                </>
            ) : (
                <div className="font-h2 font-w-bold flex space-x-2 space-x-reverse">
                    <span>برجاء اختيار المدرس</span>
                    <span className="font-h3 flex-center-both pt-2">
                        <CenterIcon icon="grommet-icons:select" />
                    </span>
                </div>
            )}
        </AdminContainer>
    );
};

export default TeacherStatistic;
