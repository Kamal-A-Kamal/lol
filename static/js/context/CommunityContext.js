import React, { createContext, useState } from "react";

const CommunityContext = createContext();

export const CommunityProvider = ({ children }) => {
    return <CommunityContext.Provider value={{}}>{children}</CommunityContext.Provider>;
};

export default CommunityContext;
