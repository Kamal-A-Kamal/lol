import React, { useEffect, useState } from "react";
import InputField from "../../components/form/elements/InputField";
import AdminContainer from "../../components/ui/AdminContainer";
import RemoteTable from "../../components/ui/RemoteTable";
import { isMultiYear } from "../../services/defaultSettings";
import { getYearPlaceHolder } from "../../services/yearSevices";
import { printFullDate } from "../../utils/time";
import { handleInputChange } from "../../services/formServices";
import http from "../../services/httpServices";
import Button from "../../components/ui/Button";
import modal from "../../services/modalServices";
import { baseURL } from "../../config";
import auth from "../../services/authServices";
import { printGovernment } from "../../utils/ar";
import modal2 from "../../services/modal2Services";

const AccountCreationRequestsTable = () => {
    const [governments, setGovernments] = useState([]);
    const [editableData, setEditableData] = useState(null);
    const [isToEditData, setIsToEditData] = useState(false);

    const handleClick = async (id, api = "decline") => {
        // console.log(api);
        // return;
        modal2.message({
            title: "هل انت متأكد؟",
            input: api === "decline" ? "text" : undefined,
            inputLabel: api === "decline" ? "اترك رسالة للطالب" : undefined,
            inputValue: api === "decline" ? "تم رفض حسابك" : undefined,
            inputValidator:
                api === "decline"
                    ? (value) => {
                          if (!value) {
                              return "يجب عليك كتب ملاحظة";
                          }
                      }
                    : undefined,
            icon: "warning",
            confirmButtonText: "تنفيذ",
            cancelButtonText: "إلغاء",
            showCancelButton: true,
            callback: async (e) => {
                if (e.isConfirmed) {
                    try {
                        const token = auth.getAdminToken();
                        const config = auth.getAdminAuthConfig(token);
                        // eslint-disable-next-line no-unused-vars
                        const { data } = await http.post(
                            `api/account_creation_requests/${id}/${api}`,
                            { message: e.value },
                            config
                        );
                        modal.message({
                            title: "تم تنفيذ طلبك بنجاح",
                            text: data.message,
                            icon: "success",
                            button: "حسنًا",
                        });
                        let newData = editableData.map((row) => {
                            if (row.id === id) {
                                return {
                                    ...row,
                                    request_status: api === "decline" ? "declined" : "accepted",
                                };
                            } else {
                                return row;
                            }
                        });
                        setEditableData(newData);
                        setIsToEditData(true);
                        // setIndex(index + 1);
                    } catch (error) {}
                }
            },
        });
    };

    const requestStatusPlaceHolder = {
        pending: <div className="px-2 py-1 rounded-md bg-blue-500 text-white">معلق</div>,
        accepted: <div className="px-2 py-1 rounded-md bg-green-500 text-white">مقبول</div>,
        declined: <div className="px-2 py-1 rounded-md bg-rose-500 text-white">مرفوض</div>,
    };

    let columns = [
        {
            name: "التسلسل",
            reorder: true,
            selector: (row) => row.id,
            sortable: true,
            sortField: "id",
        },
        {
            name: "الاسم الكامل",
            reorder: true,
            selector: (row) => row.full_name,
            sortable: true,
            sortField: "full_name",
        },
        {
            name: "حالة الطلب",
            reorder: true,
            selector: (row) => requestStatusPlaceHolder[row.request_status],
            sortable: true,
            sortField: "request_status",
        },
        {
            name: "اوامر",
            reorder: true,
            selector: (row) => (
                <div className="space-y-2 flex-center-both flex-col">
                    {row.request_status !== "accepted" ? (
                        <Button
                            onClick={() => handleClick(row.id, "accept")}
                            color="green"
                            className="shrink-0 flex-center-both flex-wrap px-1 pb-2 pt-1"
                        >
                            <span>قبول</span>
                        </Button>
                    ) : (
                        ""
                    )}
                    {row.request_status === "pending" ? (
                        <Button
                            onClick={() => handleClick(row.id, "decline")}
                            color="rose"
                            className="shrink-0 flex-center-both flex-wrap px-1 pb-2 pt-1"
                        >
                            <span>رفض</span>
                        </Button>
                    ) : (
                        ""
                    )}
                </div>
            ),
            sortable: true,
            sortField: "request_status",
        },
        {
            name: "رقم الهاتف",
            reorder: true,
            selector: (row) => row.phone,
            sortable: true,
            sortField: "phone",
        },
        {
            name: "رقم هاتف ولي الأب",
            reorder: true,
            selector: (row) => row.father_phone,
            sortable: true,
            sortField: "father_phone",
        },
        {
            name: "رقم هاتف الأم",
            reorder: true,
            selector: (row) => row.mother_phone,
            sortable: true,
            sortField: "mother_phone",
        },
        {
            name: "وظيفة ولي الأمر",
            reorder: true,
            selector: (row) => row.master_job,
            sortable: true,
            sortField: "master_job",
        },
        {
            name: "اثبات شخصية",
            reorder: true,
            selector: (row) => (
                <Button
                    color="blue"
                    onClick={(e) => {
                        e.preventDefault();
                        modal.message({ icon: `${baseURL}/${row.national_id_copy}` });
                    }}
                    className=""
                >
                    عرض الصورة
                </Button>
            ),
            sortable: true,
            sortField: "national_id_copy",
        },
        {
            name: "البريد الإلكتروني",
            reorder: true,
            selector: (row) => row.email,
            sortable: true,
            sortField: "email",
        },
        {
            name: "المحافظة",
            reorder: true,
            selector: (row) => printGovernment(governments, row.government_id),
            sortable: true,
            sortField: "government_id",
        },
    ];
    if (isMultiYear) {
        columns.push({
            name: "العام الدراسي",
            reorder: true,
            selector: (row) => row.year,
            format: (row) => getYearPlaceHolder(row.year),
            sortable: true,
            sortField: "year",
        });
    }

    columns = [
        ...columns,
        {
            name: "تاريخ انشاء الطلب",
            reorder: true,
            selector: (row) => row.created_at,
            format: (row) => printFullDate(row.created_at),
            sortable: true,
            sortField: "created_at",
        },
    ];

    const initialState = {
        phone: "",
        request_status: "pending",
        government_id: 0,
    };

    const [filterData, setFilterData] = useState(initialState);

    const [data, setData] = useState(initialState);

    async function getGovernments() {
        const { data } = await http.get("/api/governments");
        setGovernments(data);
    }
    useEffect(() => {
        getGovernments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AdminContainer>
            <div className="w-full space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-6 w-full">
                    <InputField
                        id="phone"
                        placeholder="رقم هاتف الطالب"
                        onChange={handleInputChange}
                        data={data}
                        setData={setData}
                        className="lg:col-span-2"
                    />
                    <InputField
                        id="government_id"
                        placeholder="المحافظة"
                        type="select"
                        options={[
                            {
                                value: 0,
                                text: "الكل",
                            },
                            ...governments,
                        ]}
                        onChange={handleInputChange}
                        data={data}
                        setData={setData}
                        className="lg:col-span-2"
                    />
                    <InputField
                        id="request_status"
                        placeholder="حالة الطلب"
                        type="select"
                        options={[
                            {
                                value: "pending",
                                text: "المعلقين",
                            },
                            {
                                value: "accepted",
                                text: "المقبولين",
                            },
                            {
                                value: "declined",
                                text: "المرفوضين",
                            },
                        ]}
                        onChange={handleInputChange}
                        data={data}
                        setData={setData}
                        className="lg:col-span-2"
                    />
                </div>
                <Button
                    className="w-full"
                    color="blue"
                    onClick={() => {
                        setFilterData(data);
                    }}
                >
                    بحث
                </Button>
                <RemoteTable
                    api={`/api/account_creation_requests/paginate`}
                    // toEdit={}
                    isToEditData={isToEditData}
                    setIsToEditData={setIsToEditData}
                    editableData={editableData}
                    setEditableData={setEditableData}
                    columns={columns}
                    filterData={filterData}
                />
            </div>
        </AdminContainer>
    );
};

export default AccountCreationRequestsTable;
