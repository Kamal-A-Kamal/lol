import React, { useEffect, useState } from "react";
import Table from "./Table";
import http from "../../services/httpServices";
import auth from "../../services/authServices";
import { isObjectEmpty, makeSearchQuery } from "../../utils/objects";
import LoadingIcon from "./LoadingIcon";

const RemoteTable = ({
    columns,
    title = "",
    api = "",
    // filterData = {},
    isAdmin = true,
    isTeacherAdmin = false,

    editableData = null,
    setEditableData = null,
    isToEditData = false,
    setIsToEditData = null,
    ...props
}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const [sort, setSort] = useState({
        column: {
            sortField: "id",
        },
        sortDirection: "asc",
    });

    const handleSort = async (column, sortDirection) => {
        setLoading(true);

        if (column.sortField) {
            let config = {};
            if (isAdmin) {
                const token = auth.getAdminToken();
                config = auth.getAdminAuthConfig(token);
            } else if (isTeacherAdmin) {
                const token = auth.getTeacherToken();
                config = auth.getTeacherAuthConfig(token);
            } else {
                const token = auth.getToken();
                config = auth.getAuthConfig(token);
            }

            const response = await http.get(
                `${api}?page=1&per_page=${perPage}&delay=1&sort=${
                    column.sortField
                }&order=${sortDirection}&${makeSearchQuery(props.filterData)}`,
                config
            );

            setSort({
                column,
                sortDirection,
            });

            setData(response.data.data);
            setTotalRows(response.data.total);
        }
        setLoading(false);
    };

    const fetchUsers = async (page) => {
        setLoading(true);

        let config = {};
        if (isAdmin) {
            const token = auth.getAdminToken();
            config = auth.getAdminAuthConfig(token);
        } else if (isTeacherAdmin) {
            const token = auth.getTeacherToken();
            config = auth.getTeacherAuthConfig(token);
        } else {
            const token = auth.getToken();
            config = auth.getAuthConfig(token);
        }
        const response = await http.get(
            `${api}?page=${page}&per_page=${perPage}&delay=1&sort=${sort.column.sortField}&order=${
                sort.sortDirection
            }&${makeSearchQuery(props.filterData)}`,
            config
        );

        setData(response.data.data);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    const handlePageChange = (page) => {
        fetchUsers(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true);

        let config = {};
        if (isAdmin) {
            const token = auth.getAdminToken();
            config = auth.getAdminAuthConfig(token);
        } else if (isTeacherAdmin) {
            const token = auth.getTeacherToken();
            config = auth.getTeacherAuthConfig(token);
        } else {
            const token = auth.getToken();
            config = auth.getAuthConfig(token);
        }
        const response = await http.get(
            `${api}?page=${page}&per_page=${newPerPage}&delay=1&sort=${
                sort.column.sortField
            }&order=${sort.sortDirection}&${makeSearchQuery(props.filterData)}`,
            config
        );

        setData(response.data.data);
        setPerPage(newPerPage);
        setLoading(false);
    };

    // useEffect(() => {
    //     fetchUsers(1); // fetch page 1 of users
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    useEffect(() => {
        fetchUsers(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.filterData]);

    useEffect(() => {
        if (setEditableData) {
            setEditableData(data);
        }
    }, [data]);

    useEffect(() => {
        if (editableData && setIsToEditData && isToEditData) {
            setData(editableData);
            setIsToEditData(false);
        }
    }, [editableData, isToEditData]);

    // const CustomLoader = () => (
    //     <div className="bg-primary-container smooth clr-text-primary py-32 w-full flex-center-both space-x-4 space-x-reverse">
    //         <LoadingIcon className="font-h1 text-blue-500" />
    //         <div>يتم تحميل البينات...</div>
    //     </div>
    // );

    return (
        <div className="relative overflow-hidden rounded-md">
            {loading ? (
                <div className="absolute inset-0 z-10 h-full w-full">
                    <div className="absolute h-full w-full bg-primary-container clr-text-primary smooth opacity-80 dark:opacity-90"></div>
                    <div className="relative z-10">
                        <div className="py-32 flex-center-both w-full space-x-4 space-x-reverse">
                            <LoadingIcon className="font-big text-blue-500" />
                            <div className="font-h3">يتم تحميل البينات...</div>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
            <Table
                title={title}
                columns={columns}
                data={data}
                // progressPending={loading}
                // progressComponent={<CustomLoader />}
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                onSort={handleSort}
                paginationServer
                sortServer
                pagination
                {...props}
            />
        </div>
    );
};

export default RemoteTable;
