// The state manager's job is to (a) manage the application's data, (b) notify components when critical changes have happened, and (c) allow components to notify it that data has changed.
import Database from "./database.js";
export default class StateManager {

    constructor() {
        // initialize tge data store:
        // this is our state. When anything changes
        // with any of these variables, we need to
        // notify our components:
        this.movies = [];
        this.searchResults = [];
        this.favorites = [];
        this.subscribers = []; // so that components can listen for changes to the state
        this.searchMode = true;
        this.showNotes = false;
        this.database = new Database();
        this.loadFavorites();
        // listeng so that any time a "like-requested" event happens, it will call the "saveMovieToFavorites" method.
        this.subscribe('like-requested', this.saveMovieToFavorites.bind(this));
        this.subscribe("movie-found", this.setSearchResults.bind(this));
        this.subscribe('favorites-loaded', this.setFavorites.bind(this));
        this.subscribe('show-notes', this.toggleNotes.bind(this));
        //
    }
    setSearchResults(movieDataList) {
        this.searchResults = movieDataList;
        this.movies = this.searchResults;
    }
    setFavorites(movieDataList) {
        this.favorites = movieDataList;
        this.movies = this.favorites;
    }

    toggleNotes(val) {
        this.showNotes = val;
        this.notify('redraw', this.movies);
    }
    // A method to read a user's favorites from IndexedDB when the page first loads.
    loadFavorites() {
        // 1. create a callback function that will fire after favorites loaded:
        const callbackFunction = function (movieDataList) {
            this.notify('favorites-loaded', movieDataList);
        };
        // 2. Invoke the "getAll" method, with the callback function
        // as an argument. When getALL finsishes loading the favorites,
        // it will fire the callback function with the favorites.
        this.database.getAll(callbackFunction.bind(this));
    }

    // A method to add a new movie to the user's favorites and save it to IndexedDB.
    saveMovieToFavorites(movieData) {
        // appends to the new movie to this.favorites and stores in DB
        console.log("I am about to save the movie to the DB!")
        console.log(movieData);
        this.database.addOrUpdate(movieData, function (){
            console.log('Successfully added to the database');
        })
    }
   
   
    // A method to notify components that something has changed. 
    notify(eventName, data) {
        // loops through all of the subcribers and invokes the subscriber's function.
        for(let i = 0; i < this.subscribers.length; i++) {
            const subscriber = this.subscribers[i];
            const subscriberEvent = subscriber[0];
            const callbackFunction = subscriber[1];

            // is the event that was just fired something that the subscriber is interested in, if so then execute the
            if (eventName == subscriberEvent) {
                callbackFunction(data);
            }
           
        }    
           
    }

    subscribe(eventName, callbackFunction) {
        // when a component wants to subscribe to the state manager, they need to tell the sm which event they're interested in and also what should happen if that event is fired (callback Function).
        this.subscribers.push([eventName, callbackFunction]);
    }
}