import React, { Component } from 'react';
import TopicService from '../services/topic.service';
import BookmarkService from '../services/bookmark.service';
import { showConfirmMessage, showSuccessMessage, showErrorMessage } from '../utils/alert';
import { isEmpty } from '../utils/validate';
import swal from 'sweetalert';

export const Context = React.createContext();

export class GlobalState extends Component{
    state = {
        topics: [],
        topic: {},
        alert: {},
        bookmarks: [],
        bookmark: { site: '', link: '', description: '', topic: '' },
        openSidebar: false,
    }

    componentDidMount = () => {
        this.getTopics();
        this.getBookmarks();
    }

    toggleSidebar = (val) => this.setState({ openSidebar: val });

    getBookmarks = async () => {
        const bookmarks = await BookmarkService.getBookmarks();
        this.setState({ bookmarks });
    }

    addBookmark = async (bookmark) => {
        await BookmarkService.insertBookmark(bookmark);
        this.getBookmarks();
        this.setState({ bookmark: {} });
        showSuccessMessage({ title: 'Insert successfully!' })
    }
    
    updateBookmark = async (bookmark) => {
        await BookmarkService.updateBookmark(bookmark);
        this.getBookmarks();
        this.setState({ bookmark: {} });
        showSuccessMessage({ title: 'Update successfully!' })
    }
    
    removeBookmark = async (bookmark) => {
        await BookmarkService.removeBookmark(bookmark.id);
        this.getBookmarks();
        if(bookmark.id === this.state.bookmark.id) this.setState({ bookmark: {} });
        showSuccessMessage({ title: 'Remove successfully!' })
    }

    editBookmark = (bookmark) => {
        this.setState({ bookmark: { ...bookmark } }, () => {
          window.scrollTo(0, 0);
        });
        // document.body.scrollTop = '10px';
    }

    changeBookmark = (bookmark) => {
        if(isEmpty(bookmark)){
            bookmark = { site: '', link: '', description: '', topic: '' };
        }
        this.setState({ bookmark });
    }

    getTopics = async () => {
        const topics = await TopicService.getTopics();
        this.setState({ topics });
    }

    updateTopic = async (topic) => {
        TopicService.updateTopic(topic);
        this.getTopics();
        this.changeTopic({});
        showSuccessMessage({ title: 'Update topic successfully!' });
    }

    removeTopic = async (id) => {
        const { bookmarks } = this.state;
        const active = bookmarks.some(b => b.topic === id);
        if(active){
            return showErrorMessage({ 
                title: 'Can not remove this topic', 
                text: 'This topic belongs to some bookmarks' 
            })
        }
        await TopicService.removeTopic(id);
        this.getTopics();
        const { topic } = this.state;
        if(topic.id === id) this.changeTopic({});
        showSuccessMessage({ title: 'Delete topic successfully!' });
    }

    insertTopic = async (topic) => {
        await TopicService.insertTopic(topic);
        this.getTopics();
        this.changeTopic({});
        showSuccessMessage({ title: 'Insert topic successfully' });
    }

    onInsertTopic = () => {
        swal({
          content: {
            element: "input",
            attributes: {
              placeholder: "Type topic",
              type: "text",
            },
          },
        })
        .then(async (topic) => {
          if(isEmpty(topic)) return showErrorMessage({ title: 'No topic inserted' });
          await this.insertTopic({ name: topic });
        })
        .catch(err => console.log(err));
    }

    changeTopic = (topic) => {
        if(isEmpty(topic)) topic = { name: '' };
        this.setState({ topic });
    }

    render(){
        const { updateBookmark, removeBookmark, addBookmark, editBookmark, changeBookmark,
            updateTopic, removeTopic, insertTopic, onInsertTopic, changeTopic,
            toggleSidebar } = this;
        return (
            <Context.Provider value={{ 
                ...this.state, 
                updateTopic,
                removeTopic,
                insertTopic,
                updateBookmark,
                removeBookmark,
                addBookmark,
                editBookmark,
                changeBookmark,
                onInsertTopic,
                changeTopic,
                toggleSidebar
            }}>
                { this.props.children }
            </Context.Provider>
        )
    }
} 

export const Consumer = Context.Consumer;