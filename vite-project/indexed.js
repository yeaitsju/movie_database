import { openDB } from 'idb';

export const database = openDB('MovieStore', 1, {
  upgrade(db) {
    db.createObjectStore('favoriteMovies');
    db.createObjectStore('favoriteMovies');
   
  },
});
