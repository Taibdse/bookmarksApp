import React, { useState, useEffect } from 'react';
import BookmarkService from '../services/bookmark.service';
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
        return BookmarkService.insertBookmark(bookmark);
    }
    
    const updateBookmark = async (bookmark) => {
        return BookmarkService.updateBookmark(bookmark);
    }
    
    const removeBookmark = async (bm) => {
        return BookmarkService.removeBookmark(bm.id);
    }

    const removeAllBookmarks = () => {
        return BookmarkService.removeAllBookmarks()
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
    const methods = { 
        getBookmarks, 
        editBookmark, 
        changeBookmark, 
        updateBookmark, 
        removeBookmark, 
        addBookmark, 
        removeAllBookmarks 
    };

    return (
        <BookmarkContext.Provider value={{
            ...state,
            ...methods
        }}>
            {props.children}
        </BookmarkContext.Provider>
    )
}