import { createContext, useEffect, useState } from "react";
import { navThemeRTL } from "../services/defaultSettings";
import theme from "../services/themeServices";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkmode, setDarkmode] = useState(false);
    const [isOpen, setIsOpen] = useState(false)

    const isRTL = navThemeRTL;

    useEffect(() => {
        setDarkmode(theme.getDarkmode());
        theme.setDarkmode(theme.getDarkmode());
    }, []);

    const toggleDarkmode = (value) => {
        setDarkmode(value);
        theme.setDarkmode(value);
    };
    const toggleSideNav = () => setIsOpen(!isOpen)

    return (
        <ThemeContext.Provider
            value={{
                isRTL,
                darkmode,
                toggleDarkmode,
                isOpen,
                toggleSideNav,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
