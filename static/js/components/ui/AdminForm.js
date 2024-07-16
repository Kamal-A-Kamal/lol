import React from "react";
import Form from "../form/elements/Form";
import Button from "./Button";

const AdminForm = ({
    onSubmit,
    children,
    buttonText = "تنفيذ",
    isLoading,
    color = "blue",
    submitType = true,
    className = "",
}) => {
    if (buttonText === "auto") {
        if (submitType === "store") {
            buttonText = "اضافة";
            color = "blue";
        } else if (submitType === "update") {
            buttonText = "تعديل";
            color = "yellow";
        } else if (submitType === "delete") {
            buttonText = "حذف";
            color = "rose";
        }
    }
    if (!className.includes("space-y-")) {
        className += ` space-y-16`;
    }

    if (!className.includes("py-") && !className.includes("p-")) {
        className += ` py-10`;
    }

    return (
        <Form onSubmit={onSubmit} className="w-full">
            <div className={`flex flex-col w-full max-w-lg mx-auto ${className}`}>
                {children}

                {submitType ? (
                    <Button color={color} type="submit" isLoading={isLoading}>
                        {buttonText}
                    </Button>
                ) : (
                    ""
                )}
            </div>
        </Form>
    );
};

export default AdminForm;
