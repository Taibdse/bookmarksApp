import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { ViewContext } from '../../context/ViewContext';

const Navbar = (props) => {
    const viewContext = useContext(ViewContext);

    useEffect(() => {
        props.history.listen(location => viewContext.toggleSidebar(false));
    }, []);
    
    return (
        <div>
            <h1 className="text-center text-white bg-success py-2">Bookmarks App</h1>
        </div>
    );
};


export default withRouter(Navbar);
