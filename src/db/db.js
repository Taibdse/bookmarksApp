import Dexie from 'dexie';

const db = new Dexie('bookmarks');

db.version(1).stores({ 
    topics: '++id,name', 
    bookmarks: '++id,site,link,description,topic' 
});

export default db;