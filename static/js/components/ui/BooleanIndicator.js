import React from "react";

const BooleanIndicator = ({ value = false }) => {
    return (
        <>
            {value ? (
                <span className="rounded-md shadow-md bg-emerald-600 text-slate-100 py-1 px-5 block text-center">
                    مُفَعّل
                </span>
            ) : (
                <span className="rounded-md shadow-md bg-yellow-400 text-slate-800 py-1 px-5 block text-center">
                    غير مُفَعّل
                </span>
            )}
        </>
    );
};

export default BooleanIndicator;
