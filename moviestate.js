import { database } from "./indexed";

class Store {
  constructor(init) {
    const self = this;
    // store is context
    this.subscribers = [];

    database.then(async (db) => {
      this.db = db;
      let movie = await db.get("movies", "movie");

      if (movie) {
        this.set("movie", movie);
      }
    });

    this.state = new Proxy(init, {
      async set(state, key, value) {
        state[key] = value;
        // w.e parent node innerHTML is null
        console.log(self.subscribers);
        if (self.db) {
          await self.db.put("movies", value, key);
        }
        self.subscribers.forEach((subscriber) => subscriber(state));

        console.log("this is the set method");

        // return true;
      },
    });
  }
  subscribe(cb) {
    if (typeof cb !== "function") {
      throw new Error("You must subscribe with a function");
    }
    console.log(this.subscribers);
    this.subscribers.push(cb);

    // console.log('we have subscribed')
  }
  addMovie(state, value) {
    let newState = state.movies.push(value);
    // returns length of array
    console.log(value);
    console.log(newState);
    console.log(this.state.movies);
    this.state = Object.assign(this.state, state);

    console.log(this.state);
  }
  getAllMovies() {
    return this.state.movies;
  }
  favMovies() {
    let favMovie = [];
    let favButton = document.getElementById("favbutton");
    console.log(favButton);
  }
}
const store = new Store({ movies: [] });
console.log(store);
// create new store and want to sub to store
// sub to store anytime state changes subscriber is going to call method (adding comment)
store.subscribe((state) => {
  console.log(state);
  let movieState = state.movies;

  movieState.forEach((subMovies) => document.body.appendChild(subMovies));
});

class Movie extends HTMLElement {
  constructor() {
    super();
    this.title = "";
    this.year = "";
    this.plot = "";

    // to init the proper
    // used open string later will be changed
  }
  static get observedAttributes() {
    return ["title", "year", "plot"];
  }
  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[attributeName] = newValue;
    // updating the empty string with the new value;
    // using [] because dont quite know the atrr === this.name , this.email etc
  }

  connectedCallback() {
    // will be claaed fist time DOM is loaded
    this.innerHTML = `
        <p> title:  ${this.title} </p>
        <p> year: ${this.year} </p> 
        <p> plot: ${this.plot} </p>
        `;
  }
}
// name.email,comment are properties of JS
//

window.customElements.define("movie-display", Movie);

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("#button");
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    let movieDisplay = document.createElement("movie-display");
    const title = document.querySelector("#title").value;
    console.log(title);
    const year = document.querySelector("#year").value;
    console.log(year);
    const plot = document.querySelector("#plot").value;
    console.log(plot);

    const apiKey = "25e56c69";
    const url = `https://www.omdbapi.com/?t=${title}&y=${year}&plot=${plot}&apikey=${apiKey}`;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.Title);
        console.log(data.Poster);
        const movieTemplate = `
      
        <h2>${data.Title}</h2>
        <p>${data.Year}</p>
        <img src="${data.Poster}">
        <p>${data.Plot}</p>
    `;


    // let favButton = document.getElementById("round");
    // console.log(favButton);
    // favButton.addEventListener("click", (e)=>{
    // let savedfavmovies=[]
    // let clicked = document.querySelector("input[type=checkbox][name=round]:clicked")

    // if (clicked){
    //     savedfavMovies.push()

    // }
    // })
    //     let favbutton = document.createElement("button");
    //     favbutton.setAttribute("id", "favbutton");
    //     favbutton.setAttribute("type", "click");
        let result = document.createTextNode(movieTemplate);
        // result.appendChild(favbutton);

        // console.log(result);
        document.body.appendChild(result);

        movieDisplay.setAttribute("title", title);
        console.log(movieDisplay);
        movieDisplay.setAttribute("year", data.Year);
        movieDisplay.setAttribute("plot", data.Plot);

        document.body.appendChild(movieDisplay);
      });
      let favButton = document.getElementById("round");
    console.log(favButton);
    favButton.addEventListener("click", (e)=>{
    let savedfavmovies=[]
    

    
        savedfavMovies.push(movieDisplay)
        console.log(savedfavmovies);


    })
    store.addMovie(store.state, movieDisplay);
  });
});

export default "./moviestate.js";
