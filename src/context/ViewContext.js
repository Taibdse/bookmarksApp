import React, { useState } from 'react';

export const ViewContext = React.createContext();

export const ViewProvider = (props) => {
    const [openSidebar, setOpenSidebar] = useState(false);

    const toggleSidebar = (val) => setOpenSidebar(val);

    const state = { openSidebar };
    const methods = { toggleSidebar };
    return (
        <ViewContext.Provider value={{
            ...state,
            ...methods
        }}>
            { props.children }
        </ViewContext.Provider>
    )
}