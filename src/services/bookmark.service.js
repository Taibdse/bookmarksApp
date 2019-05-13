import db from '../db/db';

class BookmarkService {
    static getBookmarks() {
        return db.bookmarks.toArray();
    }

    static insertBookmark(bookmark) {
        return db.bookmarks.add(bookmark);
    }

    static updateBookmark(bookmark) {
        const { id } = bookmark;
        delete bookmark.id;
        return db.bookmarks.update(id, bookmark);
    }

    static removeBookmark(id) {
        return db.bookmarks.delete(id);
    }
}

export default BookmarkService;