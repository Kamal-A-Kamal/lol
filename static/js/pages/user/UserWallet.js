import React from "react";
import WalletCharge from "./WalletCharge";
import UserWalletInvoicesTable from "../admin/UserProfileTables/UserWalletInvoicesTable";
import UserWalletRecords from "../admin/UserProfileTables/UserWalletRecords";
import { isChargeInsertAuto } from "../../services/defaultSettings";
import Button from "../../components/ui/Button";

const UserWallet = () => {
    return (
        <div className=" flex flex-col space-y-5">
            <WalletCharge />
            {isChargeInsertAuto ? (
                <div className="flex-center-both space-y-5">
                    <Button element="Link" to="/me/user/charge_insert_auto" color="blue">
                        شحن كود
                    </Button>
                </div>
            ) : (
                ""
            )}
            <UserWalletInvoicesTable />
            <UserWalletRecords />
        </div>
    );
};

export default UserWallet;
