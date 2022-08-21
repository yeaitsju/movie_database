import "../style.css";
import StateManager from "./state-manager.js";
import SearchForm from "./search-form.js";
import MovieList from "./movie-list.js";


const stateManager = new StateManager();


// Below we're passing the state manager into the form so that the form can let the state manager know when it's received search results;
const searchForm = new SearchForm(stateManager);
searchForm.drawForm();

const movieList = new MovieList(stateManager);






// document.querySelector("#app").innerHTML = `
//   <h1>Movie Database!</h1>
// `;

// //this is my search function that execute when the user clicks the button
// const search = (ev) => {
//   //stopping the default behaivor
//   const parent = document.querySelector("#movieInfo");
//   while (parent.firstChild) {
//     parent.removeChild(parent.firstChild);
//   }
//   ev.preventDefault();
//   const title = document.querySelector("#title").value;
//   const year = document.querySelector("#year").value;
//   const plot = document.querySelector("#plot").value;




//   //template literals (by using backtick) allows us to embed variables within our string
//   const url = `https://www.omdbapi.com/?t=${title}&y=${year}&plot=${plot}&apikey=${apiKey}`;
//   console.log(url);

//   //below is fetching my data from the internet
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       console.log(data.Title);
//       console.log(data.Poster);
//       //This is creating the template. How to display the data using html
//       const movieTemplate = `
//       <div class="movie">
//         <h2>${data.Title}</h2>
//         <p>${data.Year}</p>
//         <img src="${data.Poster}">
//         <p>${data.Plot}</p
//         </div>
//       `;
//       //attaching the template to the dom. Teaching it where to attach it and thats what the selector is.
//       document
//         .querySelector("#movieInfo")
//         .insertAdjacentHTML("beforeend", movieTemplate);
//     });
// };
// //listens for a form submission and when a user clicks on it, it executes the search function
// document.querySelector("form").addEventListener("submit", search);
