import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ViewContext } from '../../context/ViewContext';
import classnames from 'classnames';

const BookmarkSidebar = () => {

    const viewContext = useContext(ViewContext);

    useEffect(() => {
        const $ = window.$;
        $(document).click((e) => {
            const $target = $(e.target);
            if(!$target.hasClass('sidebar') && !$.contains($('.sidebar')[0], e.target)){
                viewContext.toggleSidebar(false);
            }
        })
    }, [])
   

    const toggleSidebar = () => {
        const { openSidebar } = viewContext;
        viewContext.toggleSidebar(!openSidebar);
    }

    return (
        <div className={classnames('sidebar', { 'sidebar-closed': !viewContext.openSidebar })} >
            <div className="left-content">
                <div className="book-icon">
                    <i className="fas fa-book-open"></i>
                </div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/">Bookmark</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/topic">Topic</Link>
                    </li>
                </ul>
            </div>
            <div className="right-content">
                <div className="toggle-slide-in-out" onClick={toggleSidebar}>
                    <i className="fas fa-cog"></i>
                </div>
            </div>
        </div>
    );
}

export default BookmarkSidebar;
