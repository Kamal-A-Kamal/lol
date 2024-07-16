import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const ShowingTransition = ({ as = Fragment, isScalling = true, children, duration = 400 }) => {
    return (
        <Transition
            as={as}
            enter={`transition ease-out duration-${duration}`}
            enterFrom={`transform opacity-0 ${isScalling && "scale-95"}`}
            enterTo={`transform opacity-100 ${isScalling && "scale-100"}`}
            leave="transition ease-in duration-75"
            leaveFrom={`transform opacity-100 ${isScalling && "scale-100"}`}
            leaveTo={`transform opacity-0 ${isScalling && "scale-95"}`}
        >
            {children}
        </Transition>
    );
};

export default ShowingTransition;
