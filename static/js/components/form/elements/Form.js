import React from "react";

import "./form.css";

const Form = ({ children, onSubmit, ...props }) => {
    return (
        <form encType="multipart/form-data" onSubmit={onSubmit} {...props}>
            {children}
        </form>
    );
};

export default Form;
