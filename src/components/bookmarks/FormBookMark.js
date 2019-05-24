import React, { useContext } from 'react';
import {  BookmarkContext } from '../../context/BookmarkContext';
import { TopicContext } from '../../context/TopicContext';

const FormBookmark = (props) => {

    const bookmarkContext = useContext(BookmarkContext);
    const topicContext = useContext(TopicContext);
    
    const submit = async (e) => {
        e.preventDefault();
        const { bookmark } = bookmarkContext;
        if(bookmark.id){
            await bookmarkContext.updateBookmark(bookmark);
        } else {
            await bookmarkContext.addBookmark(bookmark);
        }
        bookmarkContext.changeBookmark({});
    }

    const onChange = (e) => {
        const bookmark = Object.assign({}, bookmarkContext.bookmark);
        bookmark[e.target.name] = e.target.value;
        bookmarkContext.changeBookmark(bookmark);
        // this.setState({ bookmark });
    }

    const addTopic = () => {
        topicContext.onInsertTopic();
    }

    const { bookmark } = bookmarkContext;

    return (
        (
            <div className="card card-body">
                <form onSubmit={submit}>
                    <div className="form-group">
                        <label>Site</label>
                        <input 
                            className="form-control"
                            name="site"
                            placeholder="Enter site name..."
                            value={bookmark.site}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Link</label>
                        <input 
                            className="form-control"
                            name="link"
                            placeholder="Enter link..."
                            value={bookmark.link}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input 
                            className="form-control"
                            name="description"
                            placeholder="Enter description..."
                            value={bookmark.description}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Topic</label>
                        <button type="button" className="btn btn-primary btn-sm float-right" 
                            onClick={addTopic}>
                                Add topic
                        </button>
                        <select className="form-control" 
                            value={bookmark.topic} 
                            name="topic" 
                            onChange={onChange}
                        >
                            { topicContext.topics.map(topic => (
                                <option key={topic.id} value={topic.id}>{ topic.name }</option>
                            )) }
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success float-right">Save</button>
                    <button type="button" 
                        onClick={() => bookmarkContext.changeBookmark({})} 
                        className="btn btn-secondary float-right mr-2">
                            Clear
                    </button>
                </form>
            </div>
        )
    );
}

export default FormBookmark;
