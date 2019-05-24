import React, { useState, useEffect } from 'react';
import BookmarkService from '../services/bookmark.service';
import { showSuccessMessage } from '../utils/alert';
import { isEmpty } from '../utils/validate';

export const BookmarkContext = React.createContext();

export const BookmarkProvider = (props) => {
    const [bookmarks, setBookmarks] = useState([]);
    const [bookmark, setBookmark] = useState({ site: '', link: '', description: '', topic: '' });

    useEffect(() => {
        getBookmarks();
    }, []);

    const getBookmarks = async () => {
        const bookmarks = await BookmarkService.getBookmarks();
        setBookmarks(bookmarks);
    }

    const addBookmark = async (bookmark) => {
        await BookmarkService.insertBookmark(bookmark);
        getBookmarks();
        changeBookmark({});
        showSuccessMessage({ title: 'Insert successfully!' })
    }
    
    const updateBookmark = async (bookmark) => {
        await BookmarkService.updateBookmark(bookmark);
        getBookmarks();
        changeBookmark({});
        showSuccessMessage({ title: 'Update successfully!' })
    }
    
    const removeBookmark = async (bm) => {
        await BookmarkService.removeBookmark(bm.id);
        getBookmarks();
        if(bm.id === bookmark.id) setBookmark({});
        showSuccessMessage({ title: 'Remove successfully!' })
    }

    const editBookmark = (bookmark) => {
        changeBookmark(bookmark);
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    }

    const changeBookmark = (bookmark) => {
        if(isEmpty(bookmark)){
            bookmark = { site: '', link: '', description: '', topic: '' };
        }
        setBookmark(bookmark);
    }

    const state = { bookmarks, bookmark };
    const methods = { getBookmarks, editBookmark, changeBookmark, updateBookmark, removeBookmark, addBookmark };

    return (
        <BookmarkContext.Provider value={{
            ...state,
            ...methods
        }}>
            {props.children}
        </BookmarkContext.Provider>
    )
}