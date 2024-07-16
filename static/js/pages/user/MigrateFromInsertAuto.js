import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import MigrationFromInsertAutoForm from "./MigrationFromInsertAutoForm";
import UserMigratedCourses from "./UserMigratedCourses";
import Button from "../../components/ui/Button";

const MigrateFromInsertAuto = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex flex-col space-y-8">
            {user.creation_method !== "insert_auto" ? (
                user.insert_auto_id > 0 ? (
                    <div className="flex flex-col flex-center-both space-y-3">
                        <div className="text-center font-h3">
                            <div>كود السنتر الخاص بك هو :</div>
                            <div className="font-w-bold font-h1">00{user.insert_auto_code}</div>
                        </div>
                        <div className="font-w-bold font-h1">محاضرات الكود الخاص بك :</div>
                        <UserMigratedCourses />
                    </div>
                ) : (
                    <MigrationFromInsertAutoForm />
                )
            ) : (
                <div className="flex-center-both space-y-8 flex-col">
                    <div className="font-w-bold font-h2 text-center max-w-lg">
                        يجب عليك تسجيل الدخول من خلال رقم الهاتف الخاص بك لتفعيل كود السنتر
                    </div>
                    <div>
                        <Button element="Link" to="/logout" color="rose">
                            تسجيل الخروج
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MigrateFromInsertAuto;
