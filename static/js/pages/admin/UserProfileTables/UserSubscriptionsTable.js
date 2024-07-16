import React, { useEffect, useState } from "react";
import InputField from "../../../components/form/elements/InputField";
// import RemoteTable from "../../../components/ui/RemoteTable";
import auth from "../../../services/authServices";
import http from "../../../services/httpServices";
import { printFullDate } from "../../../utils/time";
import Table from "../../../components/ui/Table";
import { Link } from "react-router-dom";

const UserSubscriptionsTable = ({ user = { id: 0 } }) => {
    const api = `/api/users/${user["id"]}/profile/subscriptions/paginate`;

    const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

    const [sort, setSort] = useState({
        column: {
            sortField: "id",
        },
        sortDirection: "asc",
    });

    const setFacebook = async ({ currentTarget }, id) => {
        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);
        try {
            const response = await http.post(
                `/api/subscriptions/${id}/facebook`,
                { facebook: currentTarget.value },
                config
            );
            if (!response) {
                throw new Error({ response: { error: "error" } });
            }
            let newData = data.map((row) => {
                if (row.id === id) {
                    return { ...row, facebook: currentTarget.value };
                } else {
                    return row;
                }
            });
            setData(newData);
        } catch (error) {}
    };
    const columns = [
        {
            name: "التسلسل",
            reorder: true,
            selector: (row) => row.id,
            sortable: true,
            sortField: "id",
        },
        {
            name: "اسم الكورس",
            reorder: true,
            selector: (row) =>
                row.subscriptionable ? (
                    row.subscriptionable.name
                ) : (
                    <div className="text-rose-500">--تم حذف الكورس--</div>
                ),
            // sortable: true,
            // sortField: "id",
        },
        {
            name: "علامة",
            reorder: true,
            selector: (row) => (
                <InputField
                    id={row.id}
                    type="switch"
                    value={row.facebook}
                    onChange={(input, id) => {
                        setFacebook(input, id);
                    }}
                />
            ),
            sortable: true,
            sortField: "facebook",
        },
        {
            name: "طريقة الاشتراك",
            reorder: true,
            selector: (row) =>
                row.is_manual ? (
                    <div className="rounded-md px-2 py-1 bg-yellow-500 text-slate-800">
                        دفع يدوي
                    </div>
                ) : (
                    <div className="rounded-md px-2 py-1 bg-cyan-500 text-slate-100">
                        دفع اوتوماتك
                    </div>
                ),
            sortable: true,
            sortField: "id",
        },
        {
            name: "اشتراك من الكود ؟",
            reorder: true,
            selector: (row) =>
                row.subscription_method === "center_integration" ||
                row.subscription_method === "subscription_migration_from_insert_auto"
                    ? "من خلال انتجريشن ابلكيشن السنتر"
                    : row.subscription_method === "moving_subscriptions"
                    ? "من خلال شحن كود سنتر"
                    : "",
            sortable: true,
            sortField: "id",
        },
        {
            name: "الكود ؟",
            reorder: true,
            selector: (row) =>
                row.insert_auto_user ? (
                    <Link
                        className="block px-1 py-1 text-center underline"
                        element="Link"
                        to={`../../user_profile/${row.insert_auto_user.id}`}
                    >
                        {String(row.insert_auto_user.phone).padStart(11, "0")}
                    </Link>
                ) : (
                    ""
                ),
            sortable: true,
            sortField: "id",
        },
        {
            name: "رقم الفاتورة",
            reorder: true,
            selector: (row) =>
                row.invoice_id ? (
                    row.invoice_id
                ) : (
                    <div className="text-rose-500">-- لا يوجد فاتورة --</div>
                ),
            sortable: true,
            sortField: "id",
        },
        {
            name: "تاريخ الاشتراك",
            reorder: true,
            selector: (row) => row.created_at,
            sortable: true,
            sortField: "id",
            format: (row) => printFullDate(row.created_at),
        },
    ];

    const handleSort = async (column, sortDirection) => {
        // setLoading(true);

        if (column.sortField) {
            const token = auth.getAdminToken();
            const config = auth.getAdminAuthConfig(token);

            const response = await http.get(
                `${api}?page=1&per_page=${perPage}&delay=1&sort=${column.sortField}&order=${sortDirection}`,
                config
            );

            setSort({
                column,
                sortDirection,
            });

            setData(response.data.data);
            setTotalRows(response.data.total);
        }
        // setLoading(false);
    };

    const fetchUsers = async (page) => {
        // setLoading(true);

        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);
        const response = await http.get(
            `${api}?page=${page}&per_page=${perPage}&delay=1&sort=${sort.column.sortField}&order=${sort.sortDirection}`,
            config
        );

        setData(response.data.data);
        setTotalRows(response.data.total);
        // setLoading(false);
    };

    const handlePageChange = (page) => {
        fetchUsers(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        // setLoading(true);

        const token = auth.getAdminToken();
        const config = auth.getAdminAuthConfig(token);
        const response = await http.get(
            `${api}?page=${page}&per_page=${newPerPage}&delay=1&sort=${sort.column.sortField}&order=${sort.sortDirection}`,
            config
        );

        setData(response.data.data);
        setPerPage(newPerPage);
        // setLoading(false);
    };
    useEffect(() => {
        fetchUsers(1); // fetch page 1 of users
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Table
                title={""}
                columns={columns}
                data={data}
                // progressPending={loading}
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                onSort={handleSort}
                paginationServer
                sortServer
                pagination
            />
        </>
    );

    // return (
    //     <RemoteTable
    //         columns={columns}
    //     />
    // );
};

export default UserSubscriptionsTable;
