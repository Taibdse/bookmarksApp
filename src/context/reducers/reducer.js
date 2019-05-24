
import BookmarkService from '../../services/bookmark.service';
import TopicService from '../../services/topic.service';

export const GET_BOOKMARKS = 'GET_BOOKMARKS';
export const GET_TOPICS = 'GET_TOPICS';
export const INSERT_BOOKMARK = 'INSERT_BOOKMARK';
export const EDIT_BOOKMARK = 'EDIT_BOOKMARK';
export const UPDATE_BOOKMARK = 'UPDATE_BOOKMARK';
export const DELETE_BOOKMARK = 'DELETE_BOOKMARK';
export const INSERT_TOPIC = 'INSERT_TOPIC';
export const EDIT_TOPIC = 'EDIT_TOPIC';
export const UPDATE_TOPIC = 'UPDATE_TOPIC';
export const DELETE_TOPIC = 'DELETE_TOPIC';
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

const getBookmarks = async (state) => {
    const bookmarks = await BookmarkService.getBookmarks();
    return { ...state, bookmarks };
}

const getTopics = async (state) => {
    const topics = await TopicService.getTopics();
    return { ...state, topics };
}

export const bookmarkReducer = (state, action) => {
    switch(action.type){
        case GET_BOOKMARKS: return getBookmarks();

        default: return state
    }
}

export const topicReducer = (state, action) => {
    switch(action.type){
        case GET_TOPICS: return getTopics();

        default: return state
    }
}