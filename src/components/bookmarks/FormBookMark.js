import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from '../../utils/validate';

class FormBookmark extends React.Component {

    static propTypes = {
        bookmark: PropTypes.object,
        onUpdateBookmark: PropTypes.func.isRequired,
        onAddBookmark: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            bookmark: { site: '', link: '', description: '' }
        };
    }

    componentWillReceiveProps = (nextProps) => {
        let bookmark = nextProps.bookmark;
        if(isEmpty(bookmark)) bookmark = { site: '', link: '', description: '' }
        this.setState({ bookmark })
    }

    submit = (e) => {
        e.preventDefault();
        const { bookmark } = this.state;
        if(bookmark.id){
            this.props.onUpdateBookmark(bookmark);
        } else {
            this.props.onAddBookmark(bookmark);
        }
    }

    onChange = (e) => {
        const bookmark = Object.assign({}, this.state.bookmark);
        bookmark[e.target.name] = e.target.value;
        this.setState({ bookmark });
    }

    render() {
        const { bookmark } = this.state;
        return (
            <div className="card card-body">
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <label>Site</label>
                        <input 
                            className="form-control"
                            name="site"
                            placeholder="Enter site name..."
                            value={bookmark.site}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Link</label>
                        <input 
                            className="form-control"
                            name="link"
                            placeholder="Enter link..."
                            value={bookmark.link}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input 
                            className="form-control"
                            name="description"
                            placeholder="Enter description..."
                            value={bookmark.description}
                            onChange={this.onChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-success float-right">Save</button>
                </form>
            </div>
        );
    }
}

export default FormBookmark;
