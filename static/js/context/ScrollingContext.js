import { createContext, useEffect, useState } from "react";
import scroll from "../services/scrollingServices";

const ScrollingContext = createContext();

export const ScrollingProvider = ({ children }) => {
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = (event) => {
            setScrolling(scroll.getCurrentScrollingPosition());
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        scroll.toggleScrolledClass(scrolling);
    }, [scrolling]);

    return (
        <ScrollingContext.Provider
            value={{
                scrolling,
            }}
        >
            {children}
        </ScrollingContext.Provider>
    );
};

export default ScrollingContext;
