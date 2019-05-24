import React, { useContext, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { showConfirmMessage } from '../../utils/alert';
import { isEmpty } from '../../utils/validate';
import { BookmarkContext } from '../../context/BookmarkContext';
import { TopicContext } from '../../context/TopicContext';

const BookMarks = (props) => {

    const bookmarkContext = useContext(BookmarkContext);
    const topicContext = useContext(TopicContext);

    const [ filters, setFilters ] = useState({ site: '', topic: '' });

    const remove = async (e, bookmark) => {
        e.preventDefault();
        const confirm = await showConfirmMessage({ 
            title: 'Are you sure?', 
            text: 'Once deleted, it will never be recovered!' 
        });
        if(confirm) {
            bookmarkContext.removeBookmark(bookmark);
        }
    }

    const edit = (e, bookmark) => {
        e.preventDefault();
        bookmarkContext.editBookmark(bookmark);
    }

    const filterBookmarks = (bookmarks) => {
        if(isEmpty(bookmarks)) return [];
        const { site, topic } = filters;
        let arr = [];
        if(isEmpty(topic)) arr = bookmarks; 
        else arr = bookmarks.filter(b => b.topic === topic);
        return arr.filter(b => b.site.toLowerCase().indexOf(site.toLowerCase()) > -1);
    }

    const onChangeFilters = (e) => {
        const filters = Object.assign({}, filters);
        filters[e.target.name] = e.target.value;
        setFilters(filters);
    } 

    const bookmarks = filterBookmarks(bookmarkContext.bookmarks);

    return (
        <div className="card">
            <div className="card-header">
                <h4 className="text-center font-italic'">Bookmarks List</h4>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <input 
                                className="form-control" 
                                placeholder="Search site..." 
                                name="site"
                                onChange={onChangeFilters}
                                value={filters.site}/>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <select 
                                className="form-control" 
                                name="topic"
                                onChange={onChangeFilters}
                                value={filters.topic}
                            >
                                {<option value={''}>All</option>}
                                { topicContext.topics.map(topic => (
                                    <option value={topic.id} key={topic.id}>{ topic.name }</option>
                                )) }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body table-responsive">
                <table className="table table-striped table-condensed table-hover text-center">
                    <thead>
                        <tr>
                            <th>*</th>
                            <th>Site</th>
                            <th>Link</th>
                            <th>Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { bookmarks.map((bookmark, index) => (
                            <tr key={bookmark.id}>
                                <td>{ index + 1 }</td>
                                <td>{ bookmark.site }</td>
                                <td>
                                    <a href={ bookmark.link } target="_blank">{ bookmark.link }</a>
                                </td>
                                <td>{ bookmark.description }</td>
                                <td>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            ...
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#" 
                                                onClick={(e) => remove(e, bookmark)}>
                                                Remove
                                            </Dropdown.Item> 
                                            <Dropdown.Item href="#" 
                                                onClick={(e) => edit(e, bookmark)}>
                                                Edit
                                            </Dropdown.Item> 
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>  
        </div>
    );
}

export default BookMarks;
