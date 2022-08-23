export default class Movie {
  constructor(stateMananger, movieData) {
    this.stateMananger = stateMananger;
    this.movieData = movieData;
   
  }

  attachMovieToDOM(parentElement) {
    const html = this.toHTML(this.movieData);
    parentElement.insertAdjacentHTML("beforeend", html);

    // attach an event handler to the .like button:
    const likeButtonSelector = `#like_${this.movieData.imdbID}`;
    document
      .querySelector(likeButtonSelector)
      .addEventListener("click", this.like.bind(this));
      if (this.stateManager.showNotes) {
        // attach an event handler to the save button:
        const saveButtonSelector = `#save_${this.movieData.imdbID}`;
        console.log(saveButtonSelector);
        document.querySelector(saveButtonSelector).addEventListener('click', this.save.bind(this));
    }

  }

  toHTML(data) {
    // returns an HTML representation of the JSON data
    const movieTemplate = `
        <div id="movie_${this.movieData.imdbID}" class="movie">
            <div>
                <img src="${data.Poster}">
                <div>
                    <button class="like" id="like_${data.imdbID}">Like</button>
                </div>
            </div>
            <div>
                <h2>${data.Title}</h2>
                <p>${data.Year}</p>
                <p>${data.Plot}</p>
                ${ this.getNotesForm() }
            </div>
        </div>
    `;

    return movieTemplate;
  }

  getNotesForm() {
    if(this.stateMananger.showNotes){
    return `
    <div>
    <br>
    <label>Notes</label>
    </br>
    <textarea>${this.movieData.notes || ''}</textarea>
    <button>${this.movieData.imdbID}">Save</button>
    </div>
    `;
    } else {
      return '';
    }
  }



  like(ev) {
    //notifies the state manager that it would like to save the movie to the DB
    console.log("Like: add this data to indexDB!");
    this.stateMananger.notify("like-requested", this.movieData);
  }

  save (ev) {
    // notifies the state manager that it would like to
    // save the movie to the DB
    console.log('Save: add comment to movie!');
    const notes = document.querySelector(`#comment_${this.movieData.imdbID}`).value;
    this.movieData.notes = notes;
    console.log(this.movieData);
    this.stateManager.notify('save-requested', this.movieData);
}


  saveComment() {
    // updates the comment after the user has added some notes
  }
}

// // The search form should change the “search” state
// // A change in the “search” state should cause a movie lookup, with the results put into the “movies” state
// // A change in the “movies” state should change what movies are displayed. All movies in the “movies” state should be displayed
// // The API Key input should be saved into IndexedDB and and change the “key” state. On site load, the key from IndexedDB should be loaded into the “key” state.
// // A change in the “key” state (whether it’s available or not) should change whether the API Key input should be displayed
// // Add a “reset” button to the search form that resets all form fields, clears the “search” state, but keeps the “key” state.

// //

// //creating state store
// class Store {
//   //creating a constructor and will set the initial state(movie)
// constructor (init = {}){

//   //create a variable to hold our reference to the store
//   const self = this
//   //creating an array to hold the expected changes to the store
//   this.subscibers = []
//   //this is the stores state which is a proxy we are using the it to store changes to the state.
//   // It's initialized with the value of init from our constructor, if it's provided.
//   // The three arguments are the state (the original object), the key being changed, and the value being set(data.Title)
//   this.state = new Proxy(
//     init,{
//       // Set the value on the state. This won't re-trigger the proxy.
//       set(state,key,value){}
//     }

//   )
// }

// }
// class Movie extends HTMLElement {
//     constructor() {
//       super();
//     }
//     //this method is incharge of bulding the HTML for the component
//    //overiding the connected call back method with my own HTML code
//     connectedCallback() {
//       this.innerHTML = `
//       <section class="movie">
//       <h2>${this.getAttribute("title")}</h2>
//       <p>${this.getAttribute("year")}</p>
//       <p>${this.getAttribute("rating")}</p>
//       </section>

//       <div>
//       <h2>${this.getAttribute("title")}</h2>
//         <p>${this.getAttribute("year")}</p>
//         <img src="${data.Poster}">
//         <p>${data.Plot}</p
//         </div>
//             <movie-display title="${data.Title}
//             year="${data.Year}"
//             poster="${data.Poster}"
//             rating="${data.Rating}"
//       `;
//     }
//   }
//   //customelements.define is taking two arguments. first aergument is what i want the name of the tag to be. 2nd argument is the class that i want to use to controll that tag. which is the comment
//   customElements.define("movie-display", Movie);
