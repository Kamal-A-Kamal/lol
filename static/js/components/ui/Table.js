import React from "react";
import DataTable from "react-data-table-component";
import { extractColumn, extractString, isObjectEmpty } from "../../utils/objects";

import Button from "./Button";

import "./Table.css";

const Export = ({ onExport }) => (
    <Button className="font-normal" onClick={(e) => onExport(e.target.value)}>
        تحميل ملف اكسيل
    </Button>
);
const Table = ({ isExcel = true, ...props }) => {
    function convertArrayOfObjectsToCSV(array) {
        if (!props.data || isObjectEmpty(props.data)) {
            return "";
        }
        let result;

        const columnDelimiter = ",";
        const lineDelimiter = "\n";
        const keys = Object.keys(props.data[0]);

        result = "";
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        array.forEach((item) => {
            let ctr = 0;
            keys.forEach((key) => {
                if (ctr > 0) result += columnDelimiter;
                result += item[key];

                ctr++;
            });
            result += lineDelimiter;
        });
        return result;
    }

    function convertTableToCSV(array) {
        if (!props.data || isObjectEmpty(props.data)) {
            return "";
        }
        let result;

        const columnDelimiter = ",";
        const lineDelimiter = "\n";

        const keys = extractColumn(props.columns, "name");

        result = "";
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        array.forEach((item) => {
            keys.forEach((key, index) => {
                if (index > 0) result += columnDelimiter;
                result += extractString(props.columns[index].selector(item));
                // console.log(props.columns[index].selector(item));
            });
            result += lineDelimiter;
        });
        return result;
    }
    function downloadCSV(array) {
        const link = document.createElement("a");
        // let csv = convertArrayOfObjectsToCSV(array);
        let csv = convertTableToCSV(array);
        if (csv == null) return;

        const filename = "export.csv";

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,%EF%BB%BF${encodeURIComponent(csv)}`;
        }
        link.setAttribute("href", csv);
        link.setAttribute("download", filename);
        link.click();
    }
    let actionsMemo = React.useMemo(
        () => <Export onExport={() => downloadCSV(props.data, props.columns)} />,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props.data]
    );
    if (!isExcel) {
        actionsMemo = null;
    }
    const customStyles = {
        headCells: {
            style: {
                padding: "8 8px",
                fontWeight: "900",
                width: "150px",
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
            },
        },
        cells: {
            style: {
                padding: "4px 8px",
                width: "150px",
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                wordBreak: "break-word",
            },
        },
    };

    return (
        // <div className="en">
        <>
            <div className="datatablecomponent nodense overflow-hidden rounded-md">
                <DataTable
                    actions={actionsMemo}
                    responsive
                    direction="rtl"
                    paginationRowsPerPageOptions={[10, 30, 50, 100, 500, 1000, 5000, 10000]}
                    // pointerOnHover
                    // dense
                    paginationComponentOptions={{
                        rowsPerPageText: "صفوف الصفحة :",
                        rangeSeparatorText: "من",
                    }}
                    noDataComponent={
                        <>
                            <div className="py-7 font-w-bold">لا توجد بيانات</div>
                        </>
                    }
                    customStyles={customStyles}
                    {...props}
                />
            </div>
        </>
        // </div>
    );
};

export default Table;
