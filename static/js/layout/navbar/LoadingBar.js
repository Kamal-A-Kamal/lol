import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./LoadingBar.css";

const LoadingBar = () => {
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [location.pathname]);
    return (
        <div
            className={`${
                loading ? "" : "loading-hidden"
            } fixed inset-x-0 w-full h-1 top-0 z-50 smooth`}
        >
            <div className="loading-bar inset-0 w-full h-full smooth"></div>
        </div>
    );
};

export default LoadingBar;
