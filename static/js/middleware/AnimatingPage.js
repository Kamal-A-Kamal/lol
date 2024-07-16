import React, { useEffect } from "react";
// import { motion } from "framer-motion";

const AnimatingPage = ({ children }) => {
    useEffect(() => {
        return () => {
            window.scrollTo(0, 0);
        };
    }, []);
    return (
        // <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <>{children}</>
        // </motion.div>
    );
};

export default AnimatingPage;
