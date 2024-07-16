import React, { useEffect, useState } from "react";
import AdminContainer from "../../components/ui/AdminContainer";
import RemoteTable from "../../components/ui/RemoteTable";
// import { isMultiYear } from "../../services/defaultSettings";
// import { getYearPlaceHolder } from "../../services/yearSevices";
import { printFullDate } from "../../utils/time";
import Button from "../../components/ui/Button";
import { baseURL } from "../../config";
import InputField from "../../components/form/elements/InputField";
import { handleInputChange } from "../../services/formServices";

const links = {
    excel: `${baseURL}/insert_auto/`,
    "front-1": `${baseURL}/insert_auto_card/front/1/`,
    "back-1": `${baseURL}/insert_auto_card/back/1/`,
    "front-2": `${baseURL}/insert_auto_card/front/2/`,
    "back-2": `${baseURL}/insert_auto_card/back/2/`,
};
const placeHolders = {
    excel: "عرض اكسل",
    "front-1": "عرض كارت ١ - مقدمة",
    "back-1": "عرض كارت ١ - خلفية",
    "front-2": "عرض كارت 2 - مقدمة",
    "back-2": "عرض كارت 2 - خلفية",
};
const options = [
    { value: "excel", text: placeHolders.excel },
    { value: "front-1", text: placeHolders["front-1"] },
    { value: "back-1", text: placeHolders["back-1"] },
    { value: "front-2", text: placeHolders["front-2"] },
    { value: "back-2", text: placeHolders["back-2"] },
];

const InsertAutos = () => {
    const [cardTheme, setCardTheme] = useState({
        text: options[0].text,
        link: links[options[0].value],
    });
    const [data, setData] = useState({ theme: "excel" });
    useEffect(() => {
        setCardTheme({
            text: placeHolders[data.theme],
            link: links[data.theme],
        });
    }, [data.theme]);
    let columns = [
        {
            name: "التسلسل",
            reorder: true,
            selector: (row) => row.id,
            sortable: true,
            sortField: "id",
        },
        {
            name: "العنوان",
            reorder: true,
            selector: (row) => row.name,
            sortable: true,
            sortField: "name",
        },
        {
            name: "عدد الأكواد",
            reorder: true,
            selector: (row) => row.quantity,
            sortable: true,
            sortField: "duration",
        },
        {
            name: "من",
            reorder: true,
            // selector: (row) => row.insert_log.from,
            selector: (row) => row.number_from,
            sortable: true,
            sortField: "number_from",
        },
        {
            name: "إلى",
            reorder: true,
            selector: (row) => row.number_to,
            sortable: true,
            sortField: "number_to",
        },
        {
            name: "تاريخ الإضافة",
            reorder: true,
            selector: (row) => printFullDate(row.created_at),
            sortable: true,
            sortField: "created_at",
        },
        {
            name: "الأكواد",
            reorder: true,
            selector: (row) => (
                <div>
                    <Button
                        className="block"
                        element="a"
                        target="_blank"
                        href={`${cardTheme.link}${row.id}`}
                    >
                        {cardTheme.text}
                    </Button>
                </div>
            ),
            sortable: true,
            sortField: "created_at",
        },
    ];

    return (
        <AdminContainer>
            <div className="flex-center-both flex-col w-full space-y-6">
                <div className="text-center">طريقة عرض الأكواد ؟</div>
                <div className="w-full max-w-2xl">
                    <InputField
                        type="select"
                        data={data}
                        setData={setData}
                        id="theme"
                        onChange={handleInputChange}
                        options={options}
                    />
                </div>
            </div>
            <div className="w-full">
                <RemoteTable api={`/api/insert_autos/paginate`} columns={columns} />
            </div>
        </AdminContainer>
    );
};

export default InsertAutos;
