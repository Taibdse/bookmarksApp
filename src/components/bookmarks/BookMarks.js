import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { showConfirmMessage } from '../../utils/alert';

class BookMarks extends React.Component {

    static propTypes = {
        bookmarks: PropTypes.array.isRequired,
        onEditBookmark: PropTypes.func.isRequired,
        onRemoveBookmark: PropTypes.func.isRequired,
    };

    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }

    remove = async (e, bookmark) => {
        e.preventDefault();
        const confirm = await showConfirmMessage({ title: 'Are you sure?', text: 'Once deleted, it will never be recovered!' });
        if(confirm) {
            this.props.onRemoveBookmark(bookmark);
        }
    }

    edit = (e, bookmark) => {
        e.preventDefault();
        this.props.onEditBookmark(bookmark)
    }

    render() {
        const { bookmarks } = this.props;

        return (
            <div className="card">
                <div className="card-header">
                    <h4 className="text-center font-italic'">Bookmarks List</h4>
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
