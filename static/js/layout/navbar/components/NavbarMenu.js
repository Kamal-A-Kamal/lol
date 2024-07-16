import { Menu } from "@headlessui/react";
import React, { useContext } from "react";

import ThemeContext from "../../../context/ThemeContext";

import ShowingTransition from "../../../components/ui/ShowingTransition";

const NavbarMenu = ({
    containerClass,
    menuButton = null,
    menuButtonClass = null,
    menuItems = null,
}) => {
    let { isRTL } = useContext(ThemeContext);
    return (
        <Menu as="div" className={`hover:clr-text-secondary relative ar ${containerClass}`}>
            <Menu.Button type="button" className={`p-1 smooth ${menuButtonClass}`}>
                {menuButton}
            </Menu.Button>

            <ShowingTransition>
                <Menu.Items
                    className={`${
                        !isRTL ? "origin-top-left left-0" : "origin-top-right right-0"
                    } absolute mt-2 w-48 rounded-md shadow-lg py-3 space-y-2 ring-1 ring-black ring-opacity-5 bg-third-container`}
                >
                    {menuItems}
                </Menu.Items>
            </ShowingTransition>
        </Menu>
    );
};

export default NavbarMenu;
