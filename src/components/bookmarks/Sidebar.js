import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Context } from '../../context/GlobalState';
import classnames from 'classnames';

class BookmarkSidebar extends React.Component {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.state = {};
    }

    toggleSidebar = () => {
        const { openSidebar } = this.context;
        this.context.toggleSidebar(!openSidebar);
    }


    render() {
        const { openSidebar } = this.context;

        return (
            <div className={classnames('sidebar', { 'sidebar-closed': !openSidebar })} >
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
                    <div className="toggle-slide-in-out" onClick={this.toggleSidebar}>
                        <i className="fas fa-cog"></i>
                    </div>
                </div>
            </div>
        );
    }
}

BookmarkSidebar.propTypes = {};

export default BookmarkSidebar;
