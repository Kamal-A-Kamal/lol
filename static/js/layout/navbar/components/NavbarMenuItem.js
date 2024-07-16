import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "@headlessui/react";

import CenterIcon from "../../../components/ui/CenterIcon";

const NavbarMenuItem = ({ icon, text, to = "/" }) => {
    let location = useLocation();
    return (
        <Menu.Item>
            <Link
                to={to}
                state={{ prevPath: location.pathname }}
                className={`px-4 py-2 text-sm clr-text-primary hover:bg-secondary-container smooth flex flex-row space-x-2 space-x-reverse`}
            >
                <CenterIcon icon={icon} className="text-teal-500" nY="0" />
                <span>{text}</span>
            </Link>
        </Menu.Item>
    );
};

export default NavbarMenuItem;
