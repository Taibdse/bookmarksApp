import React, { useContext, useState, useEffect } from 'react';
import {  BookmarkContext } from '../../context/BookmarkContext';
import { TopicContext } from '../../context/TopicContext';
import { isEmpty } from '../../utils/validate';
import { showErrorMessage, showSuccessMessage } from '../../utils/alert';
import InputText from '../common/InputText';

const FormBookmark = (props) => {

    const bookmarkContext = useContext(BookmarkContext);
    const topicContext = useContext(TopicContext);
    const [errors, setErrors] = useState({ site: '', link: '', description: '' });
    const [submitted, setSubmitted] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const { bookmark } = bookmarkContext;
        const errors = validateInput(bookmark);
        setErrors(errors);
        if(!isEmpty(errors))  {
            showErrorMessage({
                title: 'Invalid input data?',
                text: Object.values(errors).join('\n')
            })
        } else {
            if(bookmark.id){
                bookmarkContext.updateBookmark(bookmark)
                .then(res => {
                    handleSuccessInsertAndUpdate('Update successfully!');
                })
                .catch(err => console.log(err));
            } else {
                bookmarkContext.addBookmark(bookmark)
                .then(res => {
                    handleSuccessInsertAndUpdate('Insert successfully!');
                })
                .catch(err => console.log(err));
            }
        }
    }

    const handleSuccessInsertAndUpdate = (titleMsg) => {
        bookmarkContext.getBookmarks();
        bookmarkContext.changeBookmark({});
        showSuccessMessage({ title: titleMsg });
        setSubmitted(false);
    }

    const validateInput = (bookmark) => {
        const { site, description, link } = bookmark;
        const errors = {};
        if(isEmpty(site)) errors.site = 'Title is Required!';
        if(isEmpty(link)) errors.link = 'Link is Required!';
        if(isEmpty(description)) errors.description = 'Description is Required!';
        return errors;
    }

    const onChange = (e) => {
        const bookmark = Object.assign({}, bookmarkContext.bookmark);
        bookmark[e.target.name] = e.target.value;
        bookmarkContext.changeBookmark(bookmark);
        const errors = validateInput(bookmark);
        setErrors(errors);
    }

    const addTopic = () => {
        topicContext.onInsertTopic();
    }

    const { bookmark } = bookmarkContext;

    return (
        (
            <div className="card card-body">
                <form onSubmit={submit}>
                    <InputText 
                        name="site" 
                        label="Site"
                        placeholder="Enter site name..." 
                        value={bookmark.site}
                        onChange={onChange}
                        error={submitted ? errors.site : ''}
                        hasSuccess={submitted && isEmpty(errors.site)}
                    />
                    
                    <a  
                        className="btn btn-sm btn-primary float-right"
                        style={{ fontSize: '12px', padding: '1px 3px' }} 
                        href={bookmark.link} 
                        target="_blank">
                            Test link
                    </a>

                    <InputText 
                        name="link" 
                        label="Link"
                        placeholder="Enter link..." 
                        value={bookmark.link}
                        onChange={onChange}
                        error={submitted ? errors.link: ''}
                        hasSuccess={submitted && isEmpty(errors.link)}
                    />     

                    <InputText 
                        name="description" 
                        label="Description"
                        placeholder="Enter description..." 
                        value={bookmark.description}
                        onChange={onChange}
                        error={submitted ? errors.description: ''}
                        hasSuccess={submitted && isEmpty(errors.description)}
                    />
                    
                    <div className="form-group">
                        <label>Topic</label>
                        <button 
                            type="button" 
                            className="btn btn-primary btn-sm float-right" 
                            style={{ fontSize: '12px', padding: '1px 3px' }} 
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
