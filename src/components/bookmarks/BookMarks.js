import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { showConfirmMessage } from '../../utils/alert';
import { isEmpty } from '../../utils/validate';
import { Consumer, Context } from '../../context/GlobalState';

class BookMarks extends React.Component {

    // static propTypes = {
    //     bookmarks: PropTypes.array.isRequired,
    //     onEditBookmark: PropTypes.func.isRequired,
    //     onRemoveBookmark: PropTypes.func.isRequired,
    // };

    static contextType = Context;
    state = {
        filters: { site: '', topic: '' }
    }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         context: {}
    //     };
    // }

    remove = async (e, bookmark) => {
        e.preventDefault();
        const confirm = await showConfirmMessage({ title: 'Are you sure?', text: 'Once deleted, it will never be recovered!' });
        if(confirm) {
            this.context.removeBookmark(bookmark);
        }
    }

    edit = (e, bookmark) => {
        e.preventDefault();
        this.context.editBookmark(bookmark);
    }

    filterBookmarks = (bookmarks) => {
        if(isEmpty(bookmarks)) return [];
        const { site, topic } = this.state.filters;
        let arr = [];
        if(isEmpty(topic)) arr = bookmarks; 
        else arr = bookmarks.filter(b => b.topic === topic);
        return arr.filter(b => b.site.toLowerCase().indexOf(site.toLowerCase()) > -1);
    }

    onChangeFilters = (e) => {
        const filters = Object.assign({}, this.state.filters);
        filters[e.target.name] = e.target.value;
        this.setState({ filters });
    } 

    render() {
        const { context, state } = this;
        const bookmarks = this.filterBookmarks(context.bookmarks);

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
                                    onChange={this.onChangeFilters}
                                    value={state.filters.site}/>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <select 
                                    className="form-control" 
                                    name="topic"
                                    onChange={this.onChangeFilters}
                                    value={state.filters.topic}
                                >
                                    {<option value={''}>All</option>}
                                    { context.topics.map(topic => (
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
                                                    onClick={(e) => this.remove(e, bookmark)}>
                                                    Remove
                                                </Dropdown.Item> 
                                                <Dropdown.Item href="#" 
                                                    onClick={(e) => this.edit(e, bookmark)}>
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
}

export default BookMarks;
