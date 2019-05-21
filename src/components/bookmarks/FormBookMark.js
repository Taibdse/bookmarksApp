import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from '../../utils/validate';
import TopicService from '../../services/topic.service';
import { Consumer, Context } from '../../context/GlobalState';

class FormBookmark extends React.Component {

    static contextType = Context;

    submit = async (e) => {
        e.preventDefault();
        const { bookmark } = this.context;
        if(bookmark.id){
            await this.context.updateBookmark(bookmark);
        } else {
            await this.context.addBookmark(bookmark);
        }
        this.context.changeBookmark({});
    }

    onChange = (e) => {
        const bookmark = Object.assign({}, this.context.bookmark);
        bookmark[e.target.name] = e.target.value;
        this.context.changeBookmark(bookmark);
        // this.setState({ bookmark });
    }

    addTopic = () => {
        this.context.onInsertTopic();
    }

    render() {
        const { bookmark } = this.context;

        return (
                <Consumer>
                    {context => (
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
                                <div className="form-group">
                                    <label>Topic</label>
                                    <button type="button" className="btn btn-primary btn-sm float-right" onClick={this.addTopic}>Add topic</button>
                                    <select className="form-control" value={bookmark.topic} name="topic" onChange={this.onChange}>
                                        { context.topics.map(topic => (
                                            <option key={topic.id} value={topic.id}>{ topic.name }</option>
                                        )) }
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-success float-right">Save</button>
                                <button type="button" onClick={() => context.changeBookmark({})} className="btn btn-secondary float-right mr-2">Clear</button>
                            </form>
                        </div>
                    )}
                </Consumer>
        );
    }
}

export default FormBookmark;
