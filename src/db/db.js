import Dexie from 'dexie';

const db = new Dexie('bookmarks');
db.version(1).stores({ bookmarks: '++id,site,link,description' });
export default db;